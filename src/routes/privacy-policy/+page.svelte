<script lang="ts">
	import ContentRenderer from "$lib/components/ContentRenderer.svelte";
	import type { PageContent } from "$lib/types/content";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<article class="privacy-policy prose prose-invert">
	<a href="/">Πίσω στην Αρχή</a>
	<ContentRenderer content={data as PageContent} />
</article>

<style>
	.privacy-policy {
		position: relative;
		background-color: var(--md-sys-color-surface-container);
		color: var(--md-sys-color-on-surface);
		border-radius: 16px;
		max-inline-size: 100ch;
		margin: 20rem auto 5rem;
		padding: 6rem 3rem 3rem 3rem;


		> a {
			position: absolute;
			margin-block-start: -8.25rem;
			margin-inline-start: -2.25rem;
		}
	}
</style>
