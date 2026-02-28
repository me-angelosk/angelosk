import { m } from "$lib/paraglide/messages"

export const load = () => {
	return {
		meta: {
			title: m.contact_meta_title(),
			description: m.contact_meta_description(),
			url: 'https://www.angelosk.gr/contact',
		}
	}
}