<script setup lang="ts">
import { features } from './data/features'
</script>

<template>
  <section class="section reveal">
    <div class="features section__container">
      <h2 class="section__title">Powerful AI Tools</h2>
      <p class="section__subtitle">
        Five specialized tools to transform your text — select a range or apply to the whole document.
      </p>

      <div class="features__grid">
        <div v-for="feat in features" :key="feat.name" class="features__card">
          <div class="features__icon">
            <UIcon :name="feat.icon" />
          </div>
          <h3 class="features__title">{{ feat.name }}</h3>
          <p class="features__description">{{ feat.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'styles/breakpoints' as *;
@reference '#main.css';

.features {
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: --spacing(6);

    @include above($bp-sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include above($bp-lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__card {
    padding: --spacing(8);
    border-radius: --spacing(4);
    border: 1px solid light-dark(var(--color-gray-200), var(--color-gray-800));
    background-color: light-dark(var(--color-gray-50), var(--color-gray-900));
    transition:
      box-shadow 0.3s ease,
      transform 0.2s ease,
      border-color 0.3s ease;

    &:hover {
      box-shadow: 0 --spacing(2) --spacing(6) light-dark(rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.3));
      transform: translateY(-2px);
      border-color: light-dark(var(--color-brand-blue-200), var(--color-brand-blue-800));
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: --spacing(12);
    height: --spacing(12);
    border-radius: --spacing(3);
    margin-bottom: --spacing(4);
    background: linear-gradient(
      135deg,
      light-dark(var(--color-brand-blue-50), rgba(0, 119, 255, 0.15)),
      light-dark(var(--color-brand-green-50), rgba(1, 213, 174, 0.15))
    );
    color: light-dark(var(--color-brand-blue-500), var(--color-brand-blue-400));
  }

  &__title {
    @apply text-lg;

    font-weight: 600;
    margin-bottom: --spacing(2);
    color: light-dark(var(--color-gray-900), var(--color-gray-50));
  }

  &__description {
    @apply text-sm;
    color: light-dark(var(--color-gray-500), var(--color-gray-400));
  }
}
</style>
