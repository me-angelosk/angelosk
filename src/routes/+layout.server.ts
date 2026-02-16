import { siteStructure } from "$lib/content/site.structure"
import { m } from "$lib/paraglide/messages"
import { getLocale } from "$lib/paraglide/runtime"


export const load = () => {
	return {
		links: [
			{ href: '/', label: m.link_label_home() },
			{ href: '/about', label: m.link_label_about() },
			{ href: '/contact', label: m.link_label_contact() },
		]
	}
}