export async function GET() {
  const pages = [
    '',
    '/work',
    '/contact',
    '/privacy-policy',
    '/en',
    '/en/work',
    '/en/contact',
    '/en/privacy-policy',
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${pages
		.map(
			(page) => `
		<url>
			<loc>https://angelosk.gr${page}</loc>
		</url>`
		)
		.join('')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}