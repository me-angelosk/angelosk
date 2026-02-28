<script lang="ts">
	import { m } from "$lib/paraglide/messages";
</script>

<section class="contact">
  <div class="contact-content">
    <h2 class="contact-title">{m.thx_contact_title()}</h2>
    <p class="contact-subtitle">{m.thx_contact_subtitle()}</p>
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

</style>
