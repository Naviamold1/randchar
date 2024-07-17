<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Header from './Header.svelte';
</script>

<ModeWatcher />
<Header />

<slot />
