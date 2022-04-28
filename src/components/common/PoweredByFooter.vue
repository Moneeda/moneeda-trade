<script>
const Services = Object.freeze({
  STRIPE: {
    link: 'https://stripe.com',
    logo: 'stripe-black.svg',
  },
  SQUARE: {
    link: 'https://square.com',
    logo: 'square-logo.png',
  },
  ETHEREUM: {
    link: 'https://metamask.io',
    logo: 'mm.svg',
  },
})

export default {
  props: {
    service: {
      type: String,
      default: 'STRIPE',
    },
  },
  computed: {
    serviceLink() {
      return Services[this.service]?.link
    },
    serviceLogo() {
      if (!Services[this.service]?.logo) {
        return null
      }
      return require(`@/assets/img/services/${Services[this.service].logo}`)
    },
  },
}
</script>

<template>
  <div
    class="flex flex-col sm:flex-row items-center justify-center w-full text-sm"
  >
    Checkout service offered by
    <nuxt-link to="/" class="text-highlight mx-1"
      ><strong>moneeda</strong></nuxt-link
    >
    and
    <a :href="serviceLink" target="_new" rel="norel,noopener" class="ml-1">
      <img
        :src="serviceLogo"
        :alt="service"
        height="20"
        class="w-auto h-[20px]"
      /> </a
    >.
  </div>
</template>
