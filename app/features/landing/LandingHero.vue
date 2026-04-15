<template>
  <section class="hero reveal">
    <div class="hero__container">
      <span class="hero__badge">
        <UIcon name="i-lucide-sparkles" />
        Free & Open
      </span>

      <h1 class="hero__title">
        AI-Powered Writing,<br />
        <span class="hero__gradient">Reimagined</span>
      </h1>

      <p class="hero__subtitle">
        Summarize, rewrite, translate, adjust tone, and fix grammar — all in one workspace with real-time AI streaming.
      </p>

      <div class="hero__actions">
        <UButton
          to="/workspace"
          label="Open Workspace"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
          :ui="{ base: 'landing-cta-btn' }"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'styles/breakpoints' as *;
@reference '#main.css';

.hero {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: --spacing(24) --spacing(4) --spacing(12);

  &__container {
    position: relative;
    z-index: 1;
    margin-inline: auto;
    max-width: --spacing(192);
  }

  &__badge {
    @apply text-xs;

    display: inline-flex;
    align-items: center;
    border-radius: calc(infinity * 1px);
    font-weight: 600;

    gap: --spacing(2);
    padding: --spacing(1.5) --spacing(4);
    margin-bottom: --spacing(8);
    color: light-dark(var(--color-brand-blue-700), var(--color-brand-blue-300));
    background-color: light-dark(var(--color-brand-blue-50), rgba(0, 119, 255, 0.1));
    border: 1px solid light-dark(var(--color-brand-blue-200), rgba(0, 119, 255, 0.2));
  }

  &__title {
    @apply text-4xl;

    line-height: 1.25;
    font-weight: 800;
    margin-bottom: --spacing(6);
    color: light-dark(var(--color-gray-900), var(--color-gray-50));
  }

  &__gradient {
    background: linear-gradient(
      135deg,
      light-dark(var(--color-brand-blue-500), var(--color-brand-blue-400)),
      light-dark(var(--color-brand-green-500), var(--color-brand-green-400))
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__subtitle {
    @apply text-lg;

    color: light-dark(var(--color-gray-500), var(--color-gray-400));
    max-width: --spacing(128);
    margin: 0 auto --spacing(10);
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: --spacing(4);
  }

  @include above($bp-sm) {
    padding: --spacing(32) --spacing(6) --spacing(20);

    &__title {
      @apply text-6xl;
    }

    &__subtitle {
      @apply text-xl;
    }
  }
}
</style>
