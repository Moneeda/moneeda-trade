<script>
import { defineComponent, ref } from "vue";
import { useAuth0 } from "../core/useAuth";
import storage from "~/services/storage";

export default defineComponent({
  components: {},
  layout: "landing",
  setup() {
    const link = ref("");
    const loading = ref(false);
    const { isAuthenticated, login: authLogin } = useAuth0();
    const showCookieConsent = () => {
      window.cookiehub?.openSettings();
    };

    const liveChat = () => {
      window.drift?.api.openChat();
    };

    const login = async () => {
      try {
        await authLogin();
      } catch (e) {
        console.error(e);
      }
    };

    const setLanguage = (lng) => {
      storage.set("lng", lng);
    };

    return {
      link,
      loading,
      showCookieConsent,
      liveChat,
      login,
      isAuthenticated,
      setLanguage,
    };
  },
});
</script>

<template>
  <div class="p-4 pb-0">
    <section class="m-header relative bg-lighthighlight w-full rounded p-4">
      <div class="flex justify-between items-center">
        <img src="@/assets/img/logo.svg" alt="moneeda logo" class="h-[20px]" />
        <div class="flex space-x-4">
          <el-button v-if="!isAuthenticated" type="primary" @click="login">
            {{ $t("landing.login") }}
          </el-button>
          <router-link v-else :to="{ name: 'admin' }">
            <el-button type="primary">
              {{ $t("landing.dashboard") }}
            </el-button>
          </router-link>
        </div>
      </div>

      <div class="m-header__content flex flex-col justify-around">
        <div class="text-center">
          <h1 class="text-3xl sm:text-5xl font-title leading-relaxed">
            {{ $t("landing.welcome") }}
            <br />{{ $t("landing.welcomePhrase") }}
          </h1>
          <p class="text-sm mt-8">
            {{ $t("landing.welcomeSubtittle") }}
          </p>
          <el-button
            v-if="!isAuthenticated"
            plain
            icon="el-icon-right"
            type="primary"
            @click="login"
          >
            {{ $t("landing.startButton") }}
          </el-button>

          <router-link v-else :to="{ name: 'admin-overview' }">
            <el-button type="primary">
              {{ $t("landing.dashboard") }}
            </el-button>
          </router-link>
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
      class="p-8 flex flex-col sm:flex-row items-center justify-between text-xs rounded-t bg-highlight text-white"
    >
      <div
        class="flex flex-col sm:items-center sm:flex-row text-center sm:text-left"
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
          {{ $t("landing.termsOfService") }}
        </a>
      </div>

      <el-radio-group
        v-model="$i18n.locale"
        @change="setLanguage($event)"
        size="small"
      >
        <el-radio-button label="en">English</el-radio-button>
        <el-radio-button label="es">Español</el-radio-button>
      </el-radio-group>

      <div>
        <a
          href="https://twitter.com/HelloMoneeda"
          target="_new"
          class="!text-white mb-4 sm:mb-0 sm:mr-4"
        >
          Twitter
        </a>
        <span class="cursor-pointer" @click="liveChat">{{
          $t("landing.liveChat")
        }}</span>
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
  height: calc(100vh - 1rem - 1rem);

  &__content {
    margin-top: 80px;
    height: calc(100% - 1rem - 1rem - 80px);
  }
}
</style>
