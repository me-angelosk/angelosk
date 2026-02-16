<script lang="ts">
	import { page } from "$app/state";
	import { dev } from "$app/environment";
	import { m } from "$lib/paraglide/messages";
	import { locales, localizeHref } from "$lib/paraglide/runtime";
	import { injectAnalytics } from '@vercel/analytics/sveltekit'

	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";

	import type { LayoutProps } from "./$types";

	import NavMenu from "$lib/components/NavBar.svelte";
	import MenuIcon from "$lib/components/icons/menu-icon.svelte";

	let { children, data }: LayoutProps = $props();

	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>



<svelte:head>
  <title>{data.meta.title}</title>
	<link rel="icon" href={favicon} />
  <meta name="description" content={data.meta.description} />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#415F91" />

  <!-- Open Graph -->
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:description" content={data.meta.description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={data.meta.url} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>


<button popovertarget="menu" popovertargetaction="toggle" class="flex items-center gap-2">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" fill="currentColor" style="opacity:1;">
		<path  d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32m0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32m448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32"/>
	</svg>
	<span>Menu</span>
</button>
<div id="menu" popover="auto" class="shadow">
	<NavMenu 
		closePopover={() => document.getElementById("menu")?.hidePopover()} 
		links={data.links} /> 
</div>



<main class="layout">
	{@render children()}
</main>

<footer>
	<a href={localizeHref("/privacy-policy")}>{m.link_label_privacy()}</a>
</footer>

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>
			{locale}
		</a>
	{/each}
</div>

<style>
	button {
		anchor-name: --menuTrigger;
		position: fixed;
		top: 1rem;
		left: 1%;
		/* transform: translateX(-50%); */
		z-index: 1000;
		/* background-color: var(--md-sys-color-primary); */
		/* color: var(--md-sys-color-on-primary); */
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 0.725rem;
		cursor: pointer;

		&:hover,
		&:focus-within { 
			background-color: var(--md-sys-color-surface-container); 
			color: var(--md-sys-color-on-surface); 
		}
	}

	#menu[popover] {
		position-anchor: --menuTrigger;
		position: fixed;
		top: anchor(bottom);
		left: anchor(left);
		/* position-area: bottom center; */
		transform-origin: top left;
		transition: all 0.27s allow-discrete;
		border-radius: 8px;
		margin-block-start: .25rem;
		
		/* Exit-stage */
		opacity: 0;
		transform: translateY(-1rem) scale(0.75); 
		
		&:popover-open { 
			opacity: 1;
			transform: translateY(0) scale(1); 
			

			@starting-style {
				opacity: 0;
				transform: translateY(-1rem) scale(0.95); 
			}
		 }
	}

	/* main {
		margin-bottom: 3rem;
	} */
	footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		block-size: 2rem;
		background-color: var(--md-sys-color-surface-container-lowest);
		color: var(--md-sys-color-on-surface);
		padding: 0 1rem;

		@media print {
			display: none;
		}
	}
</style>
