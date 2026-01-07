<script lang="ts">
	import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
	import { db } from '$lib/firebase';

	let email = '';
	let message = '';
	let formError = '';
	let formSuccess = '';

	const validate = () => {
		formError = '';
		formSuccess = '';

		if (!email.trim() || !message.trim()) {
			formError = 'Please fill out all fields.';
			return false;
		}

		return true;
	};

	const handleSubmit = async () => {
		if (!validate()) {
			return;
		}

		try {
			await addDoc(collection(db, 'contactMessages'), {
				email: email.trim(),
				message: message.trim(),
				timestamp: serverTimestamp()
			});
			formSuccess = 'Thanks! Your message has been sent.';
			email = '';
			message = '';
		} catch (err) {
			console.error('Error saving message:', err);
			formError = 'Oops, something went wrong. Try again later.';
		}
	};
</script>

<footer class="bg-white dark:bg-gray-800 w-full px-6 py-12">
	<h2 id="contactTitle" class="text-2xl font-semibold mb-6 text-center dark:text-indigo-300">Contact Us</h2>
	<form
		class="max-w-md mx-auto flex flex-col gap-4"
		on:submit|preventDefault={handleSubmit}
	>
		<input
			type="email"
			name="email"
			placeholder="Your email"
			bind:value={email}
			class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-gray-800"
			aria-invalid={formError && !email ? 'true' : 'false'}
		/>
		<textarea
			name="message"
			rows="4"
			placeholder="Your message"
			bind:value={message}
			class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-gray-800"
			aria-invalid={formError && !message ? 'true' : 'false'}
		></textarea>
		<button
			type="submit"
			class="self-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition mb-2"
		>
			Send Message
		</button>

		<div class="h-6">
			{#if formError}
				<p class="text-red-600 text-center text-sm">{formError}</p>
			{:else if formSuccess}
				<p class="text-green-600 text-center text-sm">{formSuccess}</p>
			{:else}
				<p class="invisible text-sm">&nbsp;</p>
			{/if}
		</div>
	</form>
</footer>
