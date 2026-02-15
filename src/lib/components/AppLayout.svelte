<script lang="ts" module>
    import type { Snippet } from "svelte";



	type AppLayoutProps = {
		appNavigation?: Snippet;
		floatingNavbar?: boolean;
		children: Snippet
	}

</script>

<script lang="ts">


	let {appNavigation, children, floatingNavbar}: AppLayoutProps = $props();

</script>

<div class="app-layout-container">
	<div class="app-layout">

		{#if appNavigation}
		<aside class="app-navbar" class:floating={floatingNavbar} >
			<div class="navbar-container">
				{@render appNavigation()}
			</div>
		</aside>
		{/if}



		<main class="app-content min-h-dvh">
			{@render children()}
		</main>
	</div>
</div>


<style>


.app-layout-container {
	container: appLayout / inline-size;


	.app-layout {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto;
		grid-template-areas: "app" "navbar";


		> aside { grid-area: navbar; }
		> main {grid-area: app;}


		@container appLayout (width >= 840px) { 
			grid-template-rows: 1fr;
			grid-template-areas: "stack";

			> aside { grid-area: stack; }
			> main { grid-area: stack; }
		} 
	}
}





.app-navbar {
	background: red;

	position: sticky;
	bottom: 0;



	@container appLayout (width >= 840px) {
		bottom: unset; 
		top: 0; 
		block-size: calc(100dvh - 32px);
		inline-size: 80px;

		&.floating {
			
			block-size: fit-content;
			max-block-size: calc(100dvh - 32px);

		}
	}






		


	.navbar-container {
		container: navBar / inline-size;
	}
}

.app-content {
	display: grid;
	grid-template-columns: [edge-start] 80px [content-start] 1fr [content-end edge-end];
}
</style>