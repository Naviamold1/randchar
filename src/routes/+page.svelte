<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import Slider from '$lib/components/ui/slider/slider.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { writable } from 'svelte/store';
	import * as Card from '$lib/components/ui/card';
	import { DCHeroList, MCUHeroList, UFC } from './lists';
	import * as Popover from '$lib/components/ui/popover';
	import RefreshCw from 'lucide-svelte/icons/refresh-cw';

	const characters = writable<string[]>([]);

	let charValues = '';
	$: $characters = charValues.split('\n');
	let playerValue = 3;
	let count = 0;
	let rollValue = 2;
	let winnerJSON: string[][] = [];
	let charNames: string[] = [];
	let charsCopy: string[] = []

	const spin = (players: number, rolls: number, chars: string[]) => {
		console.log(chars);
		winnerJSON = [];
		charsCopy = [...chars];
		for (let i = 0; i < players; i++) {
			let winnerList: string[] = [];
			for (let i = 0; i < rolls; i++) {
				let rand = Math.floor(Math.random() * charsCopy.length);
				let winner = charsCopy[rand];
				winnerList.push(winner);
				charsCopy.splice(rand, 1);
			}
			winnerJSON.push(winnerList);
		}
		console.log(winnerJSON);
		count = playerValue;
	};

	const reSpin = (player: number, item: number) => {
		winnerJSON[player][item] = charsCopy[Math.floor(Math.random() * charsCopy.length)];
	};

	const replaceTextValue = (text: string[]) => {
		charValues = text.join('\n');
	};
</script>

<svelte:head>
	<title>Character Generator</title>
</svelte:head>

<main class="container flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
	<Label>Pre-made lists</Label>
	<div>
		<Button on:click={() => spin(3, 5, DCHeroList)}>DEV</Button>
		<Button on:click={() => replaceTextValue(DCHeroList)}>DC Heroes</Button>
		<Button on:click={() => replaceTextValue(MCUHeroList)}>Marvel Heroes</Button>
		<Button on:click={() => replaceTextValue(UFC)}>UFC/MMA Fighters</Button>		
	</div>
	<div class="flex flex-col flex-wrap justify-center gap-2">
		<div class="flex flex-row items-center gap-3">
			<!-- <Slider value={[count]} min={1} max={10} step={1} class="max-w-[20%]" /> -->
			<Label for="count" class="text-lg">Number of Players:</Label>

			<Popover.Root portal={null}>
				<Popover.Trigger asChild let:builder>
					<Button builders={[builder]} id="count" variant="outline">Open</Button>
				</Popover.Trigger>
				<Popover.Content class="w-80">
					<div class="grid gap-4">
						<div class="space-y-2">
							<h4 class="font-medium leading-none">Number of Players</h4>
							<p class="text-sm text-muted-foreground">
								Set the amount of players and there names for the spin.
							</p>
							<Input bind:value={playerValue} type="number" aria-valuemin={1} required />
						</div>
						<div class="grid gap-2">
							{#each { length: playerValue } as _, i}
								<div class="grid grid-cols-3 items-center gap-4">
									<Label for={`name${i + 1}`}>Player {i + 1} Name</Label>
									<Input
										id={`name${i + 1}`}
										placeholder={`Player ${i + 1}`}
										bind:value={charNames[i]}
										class="col-span-2 h-8"
									/>
								</div>
							{/each}
						</div>
					</div>
				</Popover.Content>
			</Popover.Root>
		</div>
		<div class="flex flex-row items-center gap-3">
			<Label for="rolls" class="text-lg">Number of Rolls:</Label>
			<Input
				id="rolls"
				bind:value={rollValue}
				type="number"
				aria-valuemin={1}
				required
				class="max-h-[2%] max-w-[15%] flex flex-wrap"
			></Input>
		</div>
	</div>
	<div class="flex flex-col md:flex-row gap-8">
		<form class="w-full md:w-1/3">
		  <div
			class="grid w-full gap-4 text-sm after:invisible after:max-h-[700px] after:min-h-[100px] after:whitespace-pre-wrap after:border after:px-3.5 after:py-2.5 after:text-inherit after:content-[attr(data-cloned-val)_'_'] after:[grid-area:1/1/2/2] [&>textarea]:resize-y [&>textarea]:overflow-x-auto [&>textarea]:text-inherit [&>textarea]:[grid-area:1/1/2/2]"
			data-cloned-val={charValues}
		  >
			<Textarea
			  bind:value={charValues}
			  class="min-h-48"
			  required
			  placeholder="Enter each character on a new line here..."
			/>
			<Button
			  class="w-full"
			  disabled={charValues.length === 0}
			  type="submit"
			  on:click={() => spin(playerValue, rollValue, $characters)}
			>
			  Spin
			</Button>
		  </div>
		</form>
		
		<div class="w-full md:w-2/3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		  {#each winnerJSON as player, i}
			<Card.Root>
			  <Card.Header>
				{#if charNames[i] === undefined}
				  <Card.Title>Player {i + 1}</Card.Title>
				{:else}
				  <Card.Title>{charNames[i]}</Card.Title>
				{/if}
			  </Card.Header>
			  <Card.Content>
				{#each player as item, index}
				  <div class="flex items-center justify-between gap-2 mb-2">
					<p class="truncate flex-grow">{item}</p>
					<Button variant="secondary" on:click={() => reSpin(i, index)} class="flex-shrink-0">
					  <RefreshCw class="h-4 w-4" />
					</Button>
				  </div>
				{/each}
			  </Card.Content>
			</Card.Root>
		  {/each}
		</div>
	  </div>
</main>
