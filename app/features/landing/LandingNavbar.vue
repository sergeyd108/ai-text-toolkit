<script setup lang="ts">
const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 20)
const isMobileMenuOpen = ref(false)

function scrollTo(id: string) {
  isMobileMenuOpen.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <nav class="landing-nav" :class="{ 'landing-nav--scrolled': isScrolled }">
    <div class="landing-nav__container">
      <div class="landing-nav__logo">
        <AppLogo />
      </div>

      <div class="landing-nav__links">
        <a class="landing-nav__link" @click="scrollTo('features')">Features</a>
        <a class="landing-nav__link" @click="scrollTo('how-it-works')">How It Works</a>
      </div>

      <div class="landing-nav__actions">
        <UButton to="/workspace" label="Open Workspace" size="sm" :ui="{ base: 'landing-cta-btn' }" />
        <UColorModeButton />
        <button class="landing-nav__burger" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <UIcon :name="isMobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'" />
        </button>
      </div>
    </div>

    <div class="landing-nav__mobile-menu" :class="{ 'landing-nav__mobile-menu--open': isMobileMenuOpen }">
      <a class="landing-nav__link" @click="scrollTo('features')">Features</a>
      <a class="landing-nav__link" @click="scrollTo('how-it-works')">How It Works</a>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use 'styles/breakpoints' as *;
@reference '#main.css';

.landing-nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 50;

  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    backdrop-filter 0.3s ease;

  &--scrolled {
    background-color: light-dark(rgba(255, 255, 255, 0.85), rgba(25, 25, 25, 0.85));
    backdrop-filter: blur(12px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  &__container {
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: --spacing(288);
    padding: --spacing(4) --spacing(6);
  }

  &__links {
    display: none;
    gap: --spacing(8);

    @include above($bp-sm) {
      display: flex;
    }
  }

  &__link {
    @apply text-sm;

    cursor: pointer;
    font-weight: 500;
    text-decoration-line: none;

    color: light-dark(var(--color-gray-600), var(--color-gray-400));
    transition: color 0.2s ease;

    &:hover {
      color: light-dark(var(--color-brand-blue-500), var(--color-brand-blue-400));
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: --spacing(3);
  }

  &__burger {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    color: light-dark(var(--color-gray-600), var(--color-gray-400));

    @include above($bp-sm) {
      display: none;
    }
  }

  &__mobile-menu {
    @apply backdrop-blur-md;

    display: none;
    flex-direction: column;
    gap: --spacing(4);
    padding: --spacing(4) --spacing(6) --spacing(6);
    background-color: light-dark(rgba(255, 255, 255, 0.95), rgba(25, 25, 25, 0.95));

    &--open {
      display: flex;
    }

    .landing-nav__link {
      @apply text-base;
      padding: --spacing(2) 0;
    }
  }
}
</style>
