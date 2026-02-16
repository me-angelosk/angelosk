import { getLocale } from "$lib/paraglide/runtime"

const html = String.raw

const greekManifest = html`
<p class="text-pretty">Πιστεύω ότι η ευθύνη διαμορφώνει τον χαρακτήρα.</p>
<br />
<p class="text-pretty">
	Η θάλασσα διδάσκει επίγνωση. <br />
	Μαθαίνεις να διαβάζεις συνθήκες. <br />
	Μαθαίνεις ότι τα μικρά λάθη έχουν σημασία.
</p>
<br />
<p class="text-pretty">Φέρνω την ίδια νοοτροπία στο κώδικα.</p>
<br />
<p class="text-pretty">
	Μου αρέσει να κατασκευάζω πράγματα που λειτουργούν. <br />
	Σαφής. Λειτουργικός. --Εσκεμένα.
</p>
<br /><br />
<p class="text-pretty">
	Χωρίς θόρυβο. <br />
	Χωρίς εγώ. <br />
	Απλά καλά μελετημένη δομή και σταθερή εκτέλεση.
</p>
<br /><br />
<p class="text-pretty">
	Εξακολουθώ να εξερευνώ τι μπορώ να γίνω. <br />
	Αλλά ξέρω πώς να λειτουργώ υπό πίεση -
	και πώς να μετατρέπω ιδέες σε κάτι λειτουργικό.				
</p>
`.trim()

const englishManifest = html`
<p class="text-pretty">I believe responsibility shapes character.</p>
<br />
<p class="text-pretty">
	The sea teaches awareness. <br />
	You learn to read conditions. <br />
	You learn that small mistakes matter.
</p>
<br />
<p class="text-pretty">I bring that same mindset to systems.</p>
<br />
<p class="text-pretty">
	I like building things that work.
	Clear. Functional. Intentional.
</p> <br /> <br />
<p class="text-pretty">
	No noise. <br />
	No ego. <br />
	Just well-thought structure and steady execution.
</p> <br /> <br />
<p class="text-pretty">
	I’m still exploring what I can become.
	But I know how to operate under pressure —
	and how to turn ideas into something real.
</p>
`.trim()


export const load = () => {
	return {
		meta: {
			title: getLocale() === 'el' ? 'Angelos K. | Σχετικά με εμένα' : 'Angelos K. | About me',
			description: '',
			url: 'https://www.angelosk.gr/about'
		},
		title: getLocale() === 'el' ? 'Σχετικά με εμένα' : 'About me',
		manifest: getLocale() === 'el' ? greekManifest : englishManifest
	}

}