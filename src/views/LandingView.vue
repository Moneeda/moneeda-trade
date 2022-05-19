<script>
import createAuth0Client from "@auth0/auth0-spa-js";
import { defineComponent, onMounted, ref } from "vue";
import { useAuth0 } from "../core/useAuth";

export default defineComponent({
  components: {},
  layout: "landing",
  setup() {
    const link = ref("");
    const loading = ref(false);
    const auth0 = useAuth0();

    onMounted(() => {});

    const showCookieConsent = () => {
      window.cookiehub?.openSettings();
    };

    const liveChat = () => {
      window.drift?.api.openChat();
    };

    const login= async () => {
      try {
        const user = await auth0.login("auth0");
        auth0.setUser(user);
      } catch (e) {
        console.error(e);
      }
    };
    console.log(typeof auth0.isAuthenticated.value)

    return {
      auth0,
      link,
      loading,
      showCookieConsent,
      liveChat,
      login,
    };
  },
});
</script>

<template>
  <div class="p-4 pb-0">
    <section class="m-header relative bg-lighthighlight w-full rounded p-4">
      <div class="flex justify-between items-center">
        <img src="@/assets/img/logo.svg" alt="moneeda logo" class="h-[20px]" />
        <div>
          <el-button
            v-if="auth0.isAuthenticated"
            type="primary"
            @click="login"
          >
            {{ auth0.isAuthenticated }}
          </el-button>
          <router-link v-else :to="{ name: 'admin' }">
            <el-button type="primary"> Dashboard </el-button>
          </router-link>
        </div>
      </div>

      <div class="m-header__content flex flex-col justify-around">
        <div class="text-center">
          <h1 class="text-3xl sm:text-5xl font-title leading-relaxed">
            Trading strategiesare complicated. <br />We simplify them.
          </h1>
          <p class="text-sm mt-8">
            Generate simple payment and subscription links without writing code
            or via an API call.
          </p>
          <el-button
            v-if="!auth0.isAuthenticated"
            plain
            icon="el-icon-right"
            type="primary"
            @click="login"
          >
            Get started with moneeda
          </el-button>

          <nuxt-link v-else :to="{ name: 'admin-overview' }">
            <el-button type="primary"> Dashboard </el-button>
          </nuxt-link>
        </div>
        <div class="flex items-center justify-center flex-wrap mt-5">
          <img
            src="@/assets/img/landing/stripe-black.svg"
            class="h-[30px] m-3"
          />
          <img
            src="@/assets/img/landing/connect-square.svg"
            class="h-[40px] m-3"
          />

          <!-- <img
            src="@/assets/img/landing/ethereum-logo.svg"
            class="h-[40px] m-3"
          /> -->

          <img src="@/assets/img/landing/mollie.png" class="h-[18px] m-3" />

          <img
            src="@/assets/img/landing/checkout-logo.svg"
            class="h-[20px] m-3"
          />

          <img
            src="@/assets/img/services/klarna-black.svg"
            class="h-[18px] m-3"
          />
        </div>
      </div>
    </section>

    <footer
      class="
        p-8
        flex flex-col
        sm:flex-row
        items-center
        justify-between
        text-xs
        rounded-t
        bg-highlight
        text-white
      "
    >
      <div
        class="
          flex flex-col
          sm:items-center sm:flex-row
          text-center
          sm:text-left
        "
      >
        <img
          src="@/assets/img/logo-white.svg"
          class="h-[16px] mb-4 sm:mb-0 sm:mr-4"
          alt="moneeda"
        />

        <a
          href="https://portal.termshub.io/moneeda.com/website_tos/"
          target="_new"
          class="!text-white"
        >
          Terms of Service
        </a>
        <span class="hidden sm:inline mx-2"> · </span>

        <button @click="showCookieConsent">Change cookie settings</button>
      </div>

      <div>
        <a
          href="https://twitter.com/HelloMoneeda"
          target="_new"
          class="!text-white mb-4 sm:mb-0 sm:mr-4"
        >
          Twitter
        </a>
        <span class="cursor-pointer" @click="liveChat"> Live chat</span>
        <span class="hidden sm:inline mx-2"> · </span>
        <a href="mailto:hello@moneeda.com" target="_new" class="!text-white">
          hello@moneeda.com
        </a>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.m-header {
  height: calc(100vh - theme("spacing.4") - theme("spacing.4"));

  &__content {
    margin-top: 80px;
    height: calc(100% - theme("spacing.4") - theme("spacing.4") - 80px);
  }
}
</style>
