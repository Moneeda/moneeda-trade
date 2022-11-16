<script>
import { defineComponent, ref } from "vue";
import { useAuth0 } from "../core/useAuth";
import TranslationButtons from "../components/buttons/TranslationButtons.vue";

export default defineComponent({
  components: { TranslationButtons },
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

    return {
      link,
      loading,
      showCookieConsent,
      liveChat,
      login,
      isAuthenticated,
    };
  },
});
</script>

<template>
  <div class="p-4 pb-0">
    <section class="m-header relative bg-lighthighlight w-full rounded p-4">
      <div class="flex justify-between items-center responsive-login">
        <img src="@/assets/img/logo.svg" alt="moneeda logo" class="h-[2rem]" />
        <div class="flex space-x-4">
          <el-button
            class="responsive-button"
            v-if="!isAuthenticated"
            type="primary"
            @click="login"
          >
            {{ $t("landing.login") }}
          </el-button>
          <router-link v-else :to="{ name: 'admin' }">
            <el-button 
            class="responsive-button"
             type="primary">
              {{ $t("landing.dashboard") }}
            </el-button>
          </router-link>
        </div>
      </div>

      <div class="m-header__content flex flex-col justify-around">
        <div class="text-center">
          <h1
            class="text-3xl sm:text-5xl font-title leading-relaxed responsive-title"
          >
            {{ $t("landing.welcome") }}
            <br />{{ $t("landing.welcomePhrase") }}
          </h1>
          <p class="text-sm m-4 responsive-subtitle">
            {{ $t("landing.welcomeSubtittle") }}
          </p>
          <el-button
            v-if="!isAuthenticated"
            plain
            icon="el-icon-right"
            class="responsive-button"
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
        <div
          class="flex items-center justify-center flex-wrap responsive-paymethods"
        >
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
      class="p-8 flex flex-col sm:flex-row items-center justify-between text-xs rounded-t bg-highlight text-white responsive-footer"
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

      <TranslationButtons />

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

@media only screen and (min-width: 280px) and (max-width: 320px) {
  .m-header {
    height: calc(100vh - 1rem - 1rem);

    &__content {
      margin-top: 3rem;
      height: calc(100% - 1rem - 1rem - 16rem);
    }
  }
  .responsive-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 6rem;
  }
  .responsive-title {
    font-size: 1.5rem;
    padding: 7rem 0 0 0;
  }

  .responsive-subtitle {
    font-size: 1.1rem;
    padding: 0 0 1rem 0;
  }
  .responsive-paymethods {
    height: 6rem;
    padding: 0 0 8rem 0;
  }

  .responsive-footer {
    height: 12rem;
    padding: 4rem 0 0 0;
  }
}

@media only screen and (min-width: 325px) and (max-width: 380px) {
  .m-header {
    height: calc(100vh - 1rem - 8rem);

    &__content {
      height: calc(100% - 1rem - 1rem - 10rem);
    }
  }
  .responsive-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 6rem;
  }

  .responsive-button {
    height: 2.5rem;
    font-size: 1.2rem;
  }

  .responsive-title {
    font-size: 1.8rem;
  }

  .responsive-subtitle {
    font-size: 1.1rem;
    padding: 0 0 1rem 0;
  }
}

@media only screen and (min-width: 380px) and (max-width: 414px) {
  .m-header {
    height: calc(100vh - 1rem - 8rem);

    &__content {
      height: calc(100% - 1rem - 1rem - 14rem);
    }
  }
  .responsive-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 6rem;
  }

  .responsive-button {
    height: 2.5rem;
    font-size: 1.6rem;
  }

  .responsive-title {
    font-size: 2rem;
    padding: 0 0 2rem 0;
  }

  .responsive-subtitle {
    font-size: 1.4rem;
    line-height: 2rem;
    padding: 0 0 2rem 0;
  }

}
</style>
