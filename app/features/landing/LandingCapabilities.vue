<script setup lang="ts">
import { capabilities } from './data/capabilities'
</script>

<template>
  <section class="section reveal">
    <div class="section__container">
      <h2 class="section__title">Built for Real Writing Workflows</h2>
      <p class="section__subtitle">Powerful capabilities that make AI text editing seamless and reliable.</p>

      <div class="capabilities">
        <div v-for="cap in capabilities" :key="cap.name" class="capabilities__item">
          <div class="capabilities__icon">
            <UIcon :name="cap.icon" />
          </div>
          <div class="capabilities__content">
            <h3 class="capabilities__title">{{ cap.name }}</h3>
            <p class="capabilities__description">{{ cap.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'styles/breakpoints' as *;
@reference '#main.css';

.capabilities {
  display: flex;
  flex-direction: column;
  gap: --spacing(5);

  &__item {
    display: flex;
    align-items: flex-start;
    gap: --spacing(5);
    padding: --spacing(6);
    border-radius: --spacing(4);
    border: 1px solid light-dark(var(--color-gray-200), var(--color-gray-800));
    background-color: light-dark(var(--color-gray-50), var(--color-gray-900));
    transition:
      box-shadow 0.3s ease,
      transform 0.2s ease,
      border-color 0.3s ease;

    &:hover {
      box-shadow: 0 --spacing(2) --spacing(6) light-dark(rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.3));
      transform: translateY(2px);
      border-color: light-dark(var(--color-brand-green-200), var(--color-brand-green-800));
    }
  }

  &__icon {
    @apply text-xl;

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: --spacing(12);
    height: --spacing(12);
    border-radius: --spacing(3);
    background: linear-gradient(
      135deg,
      light-dark(var(--color-brand-green-100), rgba(1, 213, 174, 0.15)),
      light-dark(var(--color-brand-blue-100), rgba(0, 119, 255, 0.15))
    );
    color: light-dark(var(--color-brand-green-600), var(--color-brand-green-400));
  }

  &__title {
    @apply text-lg;

    font-weight: 600;
    margin-bottom: --spacing(1);
    color: light-dark(var(--color-gray-900), var(--color-gray-50));
  }

  &__description {
    @apply text-sm;
    color: light-dark(var(--color-gray-500), var(--color-gray-400));
  }
}
</style>
