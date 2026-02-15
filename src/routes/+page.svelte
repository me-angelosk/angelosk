<script lang="ts">
    import { m } from "$lib/paraglide/messages";
    import { localizeHref } from "$lib/paraglide/runtime";


</script>

<section class="hero">
  <div class="hero-content">
    <h1 class="hero-name">{m.hero_name()}</h1>
    <p class="hero-subtitle">{m.hero_subtitle()}</p>
    <div class="hero-philosophy">
      <span>{m.hero_philosophy1()}</span>
      <span>{m.hero_philosophy2()}</span>
      <span>{m.hero_philosophy3()}</span>
    </div>
		<div class="hero-links mt-6">
			<!-- <a href={localizeHref("/work")}>{m.hero_cta_work()}</a> -->
			<a href={localizeHref("/contact")}>{m.hero_cta_contact()}</a>
		</div>
  </div>
</section>

<style lang="css">
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background-color: var(--md-sys-color-background);
  color: var(--md-sys-color-on-background);
}

.hero-content {
  max-width: 800px;
}

.hero-name {
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin: 1rem 0 2rem;
  opacity: 0.85;
}

.hero-links a {
  color: var(--md-sys-color-primary);
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s ease; /* smooth transition */
	padding: .25rem .5rem;
}

.hero-links a:hover {
  opacity: 0.8; /* subtle effect */
}

.hero-philosophy {
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  font-size: 1.2rem;
}

.hero-philosophy span::after {
  content: "•";
  margin-left: 0.5rem;
  opacity: 0.5;
}

.hero-philosophy span:last-child::after {
  content: "";
}
</style>
