<script lang="ts" module>
	export type Link = {
		href: string;
		label: string;
		icon: string;
	};
	type NavBarProps = {
		closePopover?: () => void;
		links: Link[];
	};
</script>

<script lang="ts">
	import { localizeHref, getLocale } from "$lib/paraglide/runtime";

	let { links, closePopover }: NavBarProps = $props();
</script>


<nav>
	{#each links as link}
		<a href={localizeHref(link.href, {locale: getLocale()})} class="link" onclick={closePopover}>
			<span class="icon">{link.icon}</span>
			<span class="label">{link.label}</span>
		</a>
	{/each}
</nav>


<style>
		
nav {
	display: grid;
	gap: .25rem;
	padding: .25rem .5rem;
	border-radius: 8px;
	min-inline-size: 20ch;
	background-color: var(--md-sys-color-surface-container);
	color: var(--md-sys-color-on-surface);
}




.link {
	display: inline flex;
	align-items: center;
	gap: .25rem;
	text-decoration: none;
	border-radius: 0.25rem;

	padding: 0.5rem;
	transition: background-color 0.2s;
}
.link:hover {
	background-color: var(--md-sys-color-surface-container-high);
	color: var(--md-sys-color-on-surface);
}
.icon {
	aspect-ratio: 1 / 1;
	inline-size: 24px;
}

</style>
