import { m } from "$lib/paraglide/messages"

export const load = () => {


	return { meta : {
		title: m.home_meta_title(),
		description: m.home_meta_description(),
		url: m.home_meta_url()
	}}
}