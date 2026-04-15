<script setup lang="ts">
import LandingNavbar from '~/features/landing/LandingNavbar.vue'
import LandingHero from '~/features/landing/LandingHero.vue'
import LandingFeatures from '~/features/landing/LandingFeatures.vue'
import LandingCapabilities from '~/features/landing/LandingCapabilities.vue'
import LandingHowItWorks from '~/features/landing/LandingHowItWorks.vue'
import LandingCta from '~/features/landing/LandingCta.vue'
import LandingFooter from '~/features/landing/LandingFooter.vue'
import { useScrollReveal } from '~/features/landing/use-scroll-reveal'
import '~/features/landing/styles/index.scss'

definePageMeta({ layout: 'landing' })
useScrollReveal(useTemplateRef('root'))
</script>

<template>
  <div ref="root">
    <LandingNavbar />
    <LandingHero />
    <LandingFeatures id="features" />
    <LandingCapabilities />
    <LandingHowItWorks id="how-it-works" />
    <LandingCta />
    <LandingFooter />
  </div>
</template>
