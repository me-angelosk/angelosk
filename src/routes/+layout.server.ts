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
		// links: siteStructure[getLocale()].navigation

		links: [
			{ href: '/', label: m.link_label_home() },
			{ href: '/about', label: m.link_label_about() },
			{ href: '/contact', label: m.link_label_contact() },
		]
	}
}