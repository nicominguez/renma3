<script lang="ts">
	const userTypes = ['Real Estate Agent', 'Homeowner', 'Company/Other'];
	let userType = '';
	let currentStep = 0; // 0: initial state, 1: customer info, 2: home info, 3: confirmation/price

	// State variables to bind to inputs for data persistence across steps
	let email = '';
	let phoneNumber = '';
	let name = '';
	let address = '';
	let date = '';
	let time = '';
	let sqft = '';
	let notes = '';

	// SvelteKit's form prop to receive data from server actions
	export let form;

	function nextStep() {
		currentStep++;
	}

	function prevStep() {
		currentStep--;
	}

	// Reactive statement to transition to the confirmation screen on successful form submission
	$: if (form?.success && currentStep === 2) {
		currentStep = 3;
	}
</script>

<section class="px-6 py-16 bg-gray-50 dark:bg-gray-900">
	{#if currentStep === 0}
		<div class="flex flex-col items-center justify-center text-center">
			<h2 class="text-4xl font-extrabold text-black mb-2">
				Real Estate Photography - Made Simple
			</h2>
			<p class="text-2xl font-bold text-black mb-8">
				Starting at 79$
			</p>
			<button
				on:click={nextStep}
				class="rounded-lg bg-indigo-600 px-8 py-4 text-xl font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				Book Now
			</button>
		</div>
	{:else}
		<div class="mx-auto my-12 max-w-4xl rounded-xl bg-white px-6 py-16 shadow-xl dark:bg-gray-800">
			<h2 class="mb-10 text-center text-3xl font-extrabold text-indigo-700 dark:text-indigo-300">
				Book Your Photoshoot
			</h2>
			<form method="POST" action="?/bookPhotoshoot" class="flex flex-col gap-4">
				{#if currentStep === 1}
					<input
						type="email"
						name="email"
						placeholder="Email"
						required
						bind:value={email}
						class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
					/>
					<input
						type="tel"
						name="phoneNumber"
						placeholder="Phone Number"
						required
						bind:value={phoneNumber}
						class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
					/>
					<input
						type="text"
						name="name"
						placeholder="Name"
						required
						bind:value={name}
						class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
					/>
					<div id="userType" class="flex flex-wrap justify-center gap-2 mt-2">
						{#each userTypes as type}
							<button
								type="button"
								class={`rounded-md border px-4 py-2 transition ${
									userType === type
										? 'border-indigo-600 bg-indigo-600 text-white'
										: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:border-gray-600'
								}`}
								on:click={() => (userType = type)}
							>
								{type}
							</button>
						{/each}
					</div>
					<input type="hidden" name="userType" bind:value={userType} />
					<div class="flex justify-center mt-6">
						<button
							type="button"
							on:click={nextStep}
							class="rounded-md bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Next
						</button>
					</div>
				{:else if currentStep === 2}
					<!-- Hidden inputs for data from Step 1 to ensure all data is submitted -->
					<input type="hidden" name="email" value={email} />
					<input type="hidden" name="phoneNumber" value={phoneNumber} />
					<input type="hidden" name="name" value={name} />
					<input type="hidden" name="userType" value={userType} />

					<input
						type="text"
						name="address"
						placeholder="Property Address"
						required
						bind:value={address}
						class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
					/>
					<input
						type="date"
						name="date"
						required
						bind:value={date}
						class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
					/>
					<input
						type="time"
						name="time"
						required
						bind:value={time}
						class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
					/>
					<input
						type="number"
						name="sqft"
						placeholder="Square Footage"
						required
						bind:value={sqft}
						class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
					/>
					<input
						type="text"
						name="notes"
						placeholder="Any additional notes."
						bind:value={notes}
						class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
					/>
					<div class="flex justify-between mt-6">
						<button
							type="button"
							on:click={prevStep}
							class="rounded-md bg-gray-300 px-6 py-3 text-gray-800 transition hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
						>
							Previous
						</button>
						<button
							type="submit"
							class="rounded-md bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Submit Booking
						</button>
					</div>
				{:else if currentStep === 3}
					<div class="text-center">
						<h3 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Got it!</h3>
						{#if form?.price !== undefined}
							<p class="text-xl text-gray-700 dark:text-gray-300">
								Your estimated price is: <span class="font-bold text-indigo-600">${form.price.toFixed(2)}</span>
							</p>
							{#if form?.discountApplied}
								<p class="text-green-600 dark:text-green-400 text-md mt-2">
									(Half-off discount applied for your first booking!)
								</p>
							{/if}
						{:else if form?.error}
							<p class="text-red-600 dark:text-red-400 text-lg mt-4">
								{form.error}
							</p>
						{:else}
							<p class="text-gray-600 dark:text-gray-400 text-lg mt-4">
								Calculating your price...
							</p>
						{/if}
					</div>
				{/if}
			</form>
		</div>
	{/if}
</section>
