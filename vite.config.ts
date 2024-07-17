import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			scope: '/',
			base: '/',
			registerType: 'autoUpdate',
			manifest: {
				short_name: 'RandChar',
				name: 'Random Character Generator',
				start_url: '/',
				icons: [
					{
						src: 'pwa-64x64.png',
						sizes: '64x64',
						type: 'image/png'
					},
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'maskable-icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				],
				background_color: '#09090b',
				display: 'standalone',
				scope: '/',
				theme_color: '#09090b',
				description: 'Site for spinning random characters written in the list',
				screenshots: [
					{
					 "src": "Screenshot_1.png",
					  "sizes": "1441x1220",
					  "type": "image/png",
					  "form_factor": "wide",
					  "label": "Home Page"
					},
					{
					 "src": "Screenshot_2.png",
					  "sizes": "378x701",
					  "type": "image/png",
					  "form_factor": "narrow",
					  "label": "Home Page on Mobile"
					}
				]
			}
		})
	]
});
