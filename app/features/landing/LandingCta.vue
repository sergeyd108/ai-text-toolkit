<template>
  <section class="cta reveal">
    <div class="cta__container">
      <h2 class="cta__title">Ready to try it?</h2>
      <p class="cta__subtitle">No signup needed. Open the workspace and start transforming your text right away.</p>
      <UButton
        to="/workspace"
        label="Open Workspace"
        size="xl"
        trailing-icon="i-lucide-arrow-right"
        :ui="{ base: 'landing-cta-btn' }"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'styles/breakpoints' as *;
@reference '#main.css';

.cta {
  text-align: center;
  padding: --spacing(12) --spacing(4);
  background: linear-gradient(
    135deg,
    light-dark(var(--color-brand-blue-50), rgba(0, 119, 255, 0.06)),
    light-dark(var(--color-brand-green-50), rgba(1, 213, 174, 0.06))
  );
  border-top: 1px solid light-dark(var(--color-gray-200), var(--color-gray-800));
  border-bottom: 1px solid light-dark(var(--color-gray-200), var(--color-gray-800));

  &__container {
    margin-inline: auto;
    max-width: --spacing(144);
  }

  &__title {
    @apply text-2xl;

    font-weight: 700;
    margin-bottom: --spacing(3);
    color: light-dark(var(--color-gray-900), var(--color-gray-50));
  }

  &__subtitle {
    @apply text-lg;

    color: light-dark(var(--color-gray-500), var(--color-gray-400));
    margin-bottom: --spacing(8);
  }

  @include above($bp-sm) {
    padding: --spacing(20) --spacing(6);

    &__title {
      @apply text-3xl;
    }
  }
}
</style>
