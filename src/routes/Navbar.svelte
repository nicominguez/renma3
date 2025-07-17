<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
	import type { User } from 'firebase/auth';

	let user = $state<User | null>(null);
	const provider = new GoogleAuthProvider();

	const handleSignIn = async () => {
		try {
			await signInWithPopup(auth, provider);
		} catch (e) {
			console.error('Sign-in error:', e);
		}
	};

	const handleSignOut = async () => {
		try {
			await signOut(auth);
		} catch (e) {
			console.error('Sign-out error:', e);
		}
	};

	onMount(() => {
		onAuthStateChanged(auth, (u) => {
			user = u;
		});
	});
</script>

<nav class="flex w-full items-center justify-between bg-white px-6 py-4 shadow dark:bg-gray-800 relative z-10">
	<div class="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">RENMA</div>
	<div class="flex items-center space-x-4">
		{#if user}
			<span class="text-gray-700 dark:text-gray-300">Hello, {user.displayName}!</span>
			<button
				onclick={handleSignOut}
				class="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
			>
				Sign Out
			</button>
		{:else}
			<button
				onclick={handleSignIn}
				class="flex items-center space-x-2 rounded bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
			>
				Sign In
			</button>
		{/if}
	</div>
</nav>
