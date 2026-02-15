import type { PageContent } from '$lib/types/content';

import privacy_el from './privacy/el.json';
import about_el from './about/el.json';

type Lang = 'el' | 'en';

const content: Record<Lang, Record<string, PageContent>> = {
	el: {
		privacy: privacy_el as PageContent,
		// about: about_el
	},
	en: {
		// privacy: privacy_en,
		// about: about_en
	}
};

export function getPageContent(lang: Lang, slug: string): PageContent | null {
	return content[lang]?.[slug] ?? null;
}