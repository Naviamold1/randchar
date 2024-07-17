<script lang="ts">
	import ModeSwitcher from '$lib/components/ModeSwitcher.svelte';
</script>

<header
	class="sticky top-0 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6"
>
	<a href="/" class="flex w-full items-center md:justify-center">
		<h1 class="text-lg font-bold sm:text-xl md:text-2xl">Random Character Generator</h1>
	</a>

	<nav class="flex items-center gap-4">
		<ModeSwitcher />

		<!-- Mobile menu button (if needed) -->
		<!-- 
	  <button class="md:hidden">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
		  <line x1="3" y1="12" x2="21" y2="12"></line>
		  <line x1="3" y1="6" x2="21" y2="6"></line>
		  <line x1="3" y1="18" x2="21" y2="18"></line>
		</svg>
	  </button>
	  -->
	</nav>
</header>
