import { siteStructure } from "$lib/content/site.structure"
import { m } from "$lib/paraglide/messages"
import { getLocale } from "$lib/paraglide/runtime"


export const load = () => {
	return {

		meta: {
			title: m.home_meta_title(),
			description: m.home_meta_description(),
			url: m.home_meta_url()
		},
		links: siteStructure[getLocale()].navigation

	}
}