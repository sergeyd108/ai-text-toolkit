<script setup lang="ts">
import { steps } from './data/steps'
</script>

<template>
  <section class="section reveal">
    <div class="section__container">
      <h2 class="section__title">How It Works</h2>
      <p class="section__subtitle">From raw text to polished result in four simple steps.</p>

      <div class="how-it-works__steps">
        <div class="how-it-works__connector" />

        <div v-for="step in steps" :key="step.icon" class="how-it-works__step">
          <div class="how-it-works__icon">
            <UIcon :name="step.icon" />
          </div>
          <h3 class="how-it-works__title">{{ step.title }}</h3>
          <p class="how-it-works__description">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'styles/breakpoints' as *;
@reference '#main.css';

.how-it-works {
  &__steps {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: --spacing(10);

    @include above($bp-md) {
      flex-direction: row;
      align-items: flex-start;
      gap: --spacing(8);
    }
  }

  &__connector {
    display: none;

    @include above($bp-md) {
      display: block;
      position: absolute;
      top: --spacing(8);
      left: calc(12.5% + --spacing(6));
      right: calc(12.5% + --spacing(6));
      height: 2px;
      background: linear-gradient(
        90deg,
        light-dark(var(--color-brand-blue-300), var(--color-brand-blue-700)),
        light-dark(var(--color-brand-green-300), var(--color-brand-green-700))
      );
    }
  }

  &__step {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: --spacing(80);

    @include above($bp-md) {
      flex: 1 1 0;
      max-width: none;
    }
  }

  &__icon {
    @apply text-2xl;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: calc(infinity * 1px);
    color: white;

    width: --spacing(16);
    height: --spacing(16);
    margin-bottom: --spacing(6);
    background: linear-gradient(
      135deg,
      light-dark(var(--color-brand-blue-500), var(--color-brand-blue-400)),
      light-dark(var(--color-brand-blue-600), var(--color-brand-blue-500))
    );
    box-shadow: 0 --spacing(1) --spacing(3) light-dark(rgba(0, 119, 255, 0.25), rgba(0, 119, 255, 0.15));
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
    max-width: --spacing(64);
    margin: 0 auto;
  }
}
</style>
