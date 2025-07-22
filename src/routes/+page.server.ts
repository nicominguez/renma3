import type { Actions } from './$types';
import { db } from '$lib/firebase';
import { addDoc, collection, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
    bookPhotoshoot: async ({ request }) => {
        const formData = await request.formData();

        const email       = formData.get('email');
        const phoneNumber = formData.get('phoneNumber');
        const name        = formData.get('name');
        const userType    = formData.get('userType');

        const address     = formData.get('address');
        const date        = formData.get('date');
        const time        = formData.get('time');
        const sqft        = formData.get('sqft');
        const notes       = formData.get('notes');

        // Validate required fields
        if (!email || !phoneNumber || !name || !userType || !address || !date || !time || !sqft) {
            return fail(400, {
                email, phoneNumber, name, userType, address, date, time, sqft, notes,
                error: 'Please fill out all required fields.'
            });
        }

        let calculatedPrice = 0;
        let discountApplied = false;
        const sqftNum = parseInt(sqft as string);

        // Determine base price based on square footage
        if (sqftNum <= 1000) {
            calculatedPrice = 79;
        } else if (sqftNum <= 2000) {
            calculatedPrice = 89;
        } else if (sqftNum <= 3000) {
            calculatedPrice = 109;
        } else if (sqftNum <= 4000) {
            calculatedPrice = 129;
        } else { // 4000+
            calculatedPrice = 149;
        }

        try {
            // Check if this email has any previous bookings
            const q = query(collection(db, 'photoshoots'), where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                // First booking for this email, apply half-off discount
                calculatedPrice /= 2;
                discountApplied = true;
            }

            await addDoc(collection(db, 'photoshoots'), {
                email,
                phoneNumber,
                name,
                userType,
                address,
                date,
                time,
                sqft: sqftNum, // Store as number
                notes,
                submittedAt: serverTimestamp(),
                status: 'pending',
                price: calculatedPrice, // Store the calculated price
                discountApplied // Store if discount was applied
            });

            return {
                message: 'Your photoshoot booking has been submitted successfully!',
                success: true,
                price: calculatedPrice,
                discountApplied
            };

        } catch (err) {
            console.error('Error saving photoshoot booking:', err);

            return fail(500, {
                email, phoneNumber, name, userType, address, date, time, sqft, notes,
                error: 'Oops, something went wrong with the submission. Please try again later.'
            });
        }
    }
};
