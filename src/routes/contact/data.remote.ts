import * as v from 'valibot';
import { form } from "$app/server";
import { redirect, error } from '@sveltejs/kit';
import { getDatabase } from '$lib/mongodb';
import { getLocale, localizeHref } from '$lib/paraglide/runtime';


const EmailSchema = v.pipe(
  v.string(),
  v.nonEmpty('Please enter your email.'),
  v.email('The email is badly formatted.'),
  v.maxLength(30, 'Your email is too long.')
);

export const addMessage = form(
	v.object({
		name: v.pipe(v.string(), v.nonEmpty('Please enter your full name.')),
		email: EmailSchema,
		message:v.pipe(v.string(), v.nonEmpty('Message can not be empty.'), v.minLength(30, 'Your message is too small.'))
	}),
	async ({ name, email, message }) => {
		let ok = false
		try {
			// Insert into the database
			const db = await getDatabase()
			await db.collection('contactMessages').insertOne({
				name, email, message, createdAt: new Date().toISOString() 
			})

			ok = true
		} catch (e) { console.log(e); }

		
		ok ? redirect(303, localizeHref(`/contact/thank_you`,{ locale: getLocale() })) : error(500, 'DB failed on me...');
	}
);