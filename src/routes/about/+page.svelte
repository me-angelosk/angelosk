<script lang="ts">
	import type { PageProps } from "./$types";

	let {data}: PageProps = $props()
</script>

<section class="contact">
	<div class="contact-content">
		<h2 class="contact-title">{data.title}</h2>

		<div class="max-w-[50ch] text-start">
			{@html data.manifest}
		</div>
	</div>
</section>

<style lang="css">
	.contact {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 2rem;
		text-align: center;
		background-color: var(--md-sys-color-background);
		color: var(--md-sys-color-on-background);
	}

	.contact-content {
		max-width: 700px;

		background-color: var(--md-sys-color-surface-container);
    border-radius: 14px;
    padding: 1rem 2rem 2rem;
	}

	.contact-title {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.contact-subtitle {
		font-size: 1.2rem;
		opacity: 0.85;
		margin-bottom: 2rem;
	}
</style>
