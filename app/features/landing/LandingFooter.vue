<template>
  <footer class="landing-footer">
    <div class="landing-footer__container">
      <p class="landing-footer__text">AI Text Toolkit • © {{ new Date().getFullYear() }}</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@reference '#main.css';

.landing-footer {
  padding: --spacing(8) --spacing(6);

  &__container {
    margin-inline: auto;
    text-align: center;
    max-width: --spacing(288);
  }

  &__text {
    @apply text-sm;
    color: light-dark(var(--color-gray-500), var(--color-gray-400));
  }
}
</style>
