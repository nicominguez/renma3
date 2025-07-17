<script lang="ts">
	let galleryContainer: HTMLDivElement;
	let expandedImage: string | null = null;

	function handleWheel(event: WheelEvent) {
		event.preventDefault();
		galleryContainer.scrollBy({ left: event.deltaY, behavior: 'smooth' });
	}

	function openImage(src: string) {
		expandedImage = src;
	}

	function closeImage() {
		expandedImage = null;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeImage();
		}
	}
</script>

<section class="overflow-x-auto py-12 bg-gray-50">
	<div
		bind:this={galleryContainer}
		on:wheel={handleWheel}
		class="custom-scrollbar flex snap-x snap-mandatory space-x-4 overflow-x-auto px-2"
	>
		{#each [{ src: '/images/arcalis.jpg', alt: 'Arcalís property' }, { src: '/images/javiuso.jpg', alt: 'Javiuso property' }, { src: '/images/paloma.jpg', alt: 'Paloma property' }, { src: '/images/plaza.jpg', alt: 'Plaza property' }, { src: '/images/sierra.jpg', alt: 'Sierra property' }] as image}
			<img
				src={image.src}
				alt={image.alt}
				loading="lazy"
				on:dblclick={() => openImage(image.src)}
				class="h-80 cursor-pointer snap-center rounded-lg object-cover shadow-md transition duration-300 hover:scale-101 dark:shadow-lg"
			/>
		{/each}
	</div>

	{#if expandedImage}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
			role="dialog"
			aria-modal="true"
			tabindex="0"
			on:click|self={closeImage}
			on:keydown={handleKeyDown}
		>
			<button
				on:click={closeImage}
				class="absolute top-4 right-3 text-3xl font-bold text-white hover:text-gray-300"
				aria-label="Close full image view"
			>
				&times;
			</button>
			<img
				src={expandedImage}
				alt="Expanded"
				class="max-h-[90vh] w-[90vw] max-w-5xl rounded-lg object-contain shadow-lg transition duration-300"
			/>
		</div>
	{/if}
</section>
