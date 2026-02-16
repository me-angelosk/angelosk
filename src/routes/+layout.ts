import FolderCodeIcon from "@tabler/icons-svelte/icons/folder-code";

import HomeIcon from "@tabler/icons-svelte/icons/triangles";
import AboutIcon from "@tabler/icons-svelte/icons/brand-apple-podcast";
import ContactIcon from "@tabler/icons-svelte/icons/plug-connected";
import { m } from "$lib/paraglide/messages.js";

export const load = async ({data}) => ({ links: data.links.map((link) => {
	let icon
	switch (link.href) {
		case '/': icon = HomeIcon; break;
		case '/about': icon = AboutIcon; break;
		case '/contact': icon = ContactIcon; break;
	
		default: icon = FolderCodeIcon; break;
	}
	return { ...link, icon }
}) })