<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import { addMessage } from './data.remote';


</script>

<section class="contact">
  <div class="contact-content">
    <h2 class="contact-title">{m.contact_title()}</h2>
    <p class="contact-subtitle">{m.contact_subtitle()}</p>

    <form class="contact-form"  {...addMessage}>
			<div class="flex flex-col">
				<input {...addMessage.fields.name.as('text')} placeholder={m.contact_form_name()}  />
				{#each addMessage.fields.name.issues() as issue}
					<p class="issue">{issue.message}</p>
				{/each}
			</div>

			<div class="flex flex-col">
				<input  {...addMessage.fields.email.as('email')} placeholder={m.contact_form_email()}  />

				{#each addMessage.fields.email.issues() as issue}
					<p class="issue">{issue.message}</p>
				{/each}
			</div>


			<div class="flex flex-col">
				<textarea  {...addMessage.fields.message.as('text')} placeholder={m.contact_form_message()} ></textarea>

				{#each addMessage.fields.message.issues() as issue}
					<p class="issue">{issue.message}</p>
				{/each}
			</div>

      <button type="submit">{m.contact_form_submit()}</button>
    </form>
  </div>
</section>

<style lang="css">
.contact {
	display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background-color: var(--md-sys-color-background);
  color: var(--md-sys-color-on-background);
}

.contact-content {
  max-width: 700px;
}

.contact-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.contact-subtitle {
  font-size: 1.2rem;
  opacity: 0.85;
  margin-bottom: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form input,
.contact-form textarea {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: 8px;
  background-color: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: var(--md-sys-color-primary);
  box-shadow: 0 0 0 3px rgba(65,95,145,0.2); /* subtle focus glow */
  outline: none;
}

.contact-form textarea {
  resize: vertical;
  min-height: 120px;
}

.contact-form button {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--md-sys-color-on-primary);
  background-color: var(--md-sys-color-primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.contact-form button:hover {
  opacity: 0.85;
}
</style>
