<script lang="ts">
	import ModeSwitcher from '$lib/components/ModeSwitcher.svelte';
</script>

<header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
	<nav
		class="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
	>
		<a href="/" class="flex w-full justify-center">
			<h1 class="text-2xl font-bold">Random Character Generator</h1>
		</a>
		<ModeSwitcher />
	</nav>
</header>
