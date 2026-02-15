<script lang="ts">
	import type { PageContent, Section } from '$lib/types/content';

	let { content }: {content: PageContent} = $props();
</script>

<svelte:head>
	<title>{content.meta.title}</title>
	<meta name="description" content={content.meta.description} />
</svelte:head>

<h1>{content.meta.title}</h1>

{#each content.sections as section (section.id)}
	<section id={section.id}>
		<h2>{section.title}</h2>

		{#if section.type === 'text'}
			{#each section.content as paragraph}
				<p>{paragraph}</p>
			{/each}
		{:else if section.type === 'list'}
			<ul>
				{#each section.items as item}
					<li>{item}</li>
				{/each}
			</ul>

			{#if section.footer}
				<p>{section.footer}</p>
			{/if}
		{/if}
	</section>
{/each}