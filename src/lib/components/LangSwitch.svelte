<script lang="ts">
	import { getLocale, locales, setLocale } from "$lib/paraglide/runtime";


const regionNamesInEnglish = new Intl.DisplayNames(["en"], { type: "language" });
let regionNamesInGreek = new Intl.DisplayNames(["el"], { type: "language" });



const enL = locales.map((locale) => ({ region: locale, name: regionNamesInEnglish.of(getLocale()) }))
const grL = locales.map((locale) => ({ region: locale, name: regionNamesInGreek.of(getLocale()) }))

const getLocaleLabel = (locale: 'el'|'en') =>
	getLocale() === 'el' ? regionNamesInGreek.of(locale) : regionNamesInEnglish.of(locale)


const displayLocalLanguage =  getLocale() === 'el' ?  regionNamesInGreek.of('el') : regionNamesInEnglish.of('en')
console.log(regionNamesInGreek.of("el"))
</script>
	


<button popovertarget="intlPopover" popovertargetaction="show">{displayLocalLanguage}</button>

<div popover="auto" id="intlPopover">
	<div class="grid gap-1 text-start">
		{#each locales as locale}
			 <button onclick={ () => setLocale(locale)} class="inline-flex items-center gap-2 rounded-sm p-2 hover:bg-[var(--md-sys-color-surface-container-high)] hover:text-[var(--md-sys-color-on-surface)]">
				{getLocaleLabel(locale)}
			 </button>
		{/each}
	</div>
</div>


<style>
	[popovertarget="intlPopover"] {
		anchor-name: --intlSwitcher;
		font-size: 14px;
		border-radius: 4px;
		padding: .125rem .5rem;

		&:hover,
		&:focus-within {
			cursor: pointer;
			background-color: var(--md-sys-color-surface-container-low);
		}
	}

	#intlPopover {
		position: fixed;
		min-inline-size: 15ch;
		background-color: var(--md-sys-color-surface-container-lowest);
		color: var(--md-sys-color-on-surface);
		position-anchor: --intlSwitcher;
		position-area: top span-right;
		border-radius: 8px;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, .15)) drop-shadow(0 1px 3px rgba(0, 0, 0, .3));

		padding: .25rem .5rem;
		margin-block-end: .25rem;
	}
</style>