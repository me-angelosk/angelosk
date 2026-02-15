export type TextSection = {
	id: string;
	title: string;
	subtitle?: string;
	type: 'text';
	content: string[];
	footer?: string;
};

export type ListSection = {
	id: string;
	type: 'list';
	title: string;
	subtitle?: string;
	items: string[];
	footer?: string;
};

export type Section = TextSection | ListSection;

export type PageContent = {
	slug: string;
	meta: {
		title: string;
		description: string;
	};
	sections: Section[];
};
