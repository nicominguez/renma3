// src/routes/book/+page.server.ts
import type { Actions } from './$types';
import { db } from '$lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const actions: Actions = {
    bookPhotoshoot: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        const date = formData.get('date');

        if (typeof name !== 'string' || name.trim() === '') {
            return {
                status: 400,
                body: {
                    error: 'Name is required.',
                    name: name,
                    date: date
                }
            };
        }

        const parsedDate = new Date(date as string);
        if (isNaN(parsedDate.getTime())) {
             return {
                status: 400,
                body: {
                    error: 'Invalid date format.',
                    name: name,
                    date: date
                }
            };
        }


        try {
            await addDoc(collection(db, 'photoshoots'), {
                name: name,
                date: parsedDate,
                timestamp: serverTimestamp()
            });

            return {
                status: 200,
                body: {
                    message: 'Thanks! Your message has been sent.',
                    success: true
                }
            };

        } catch (err) {
            console.error('Error saving message:', err);

            return {
                status: 500,
                body: {
                    error: 'Oops, something went wrong. Try again later.',
                    name: name,
                    date: date
                }
            };
        }
    }
};