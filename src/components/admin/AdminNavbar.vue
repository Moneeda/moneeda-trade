<script setup>
import AdminMenu from "./AdminMenu.vue";
import { ChatDotSquare, SwitchButton } from "@element-plus/icons-vue";

import { useAuth0 } from "../../core/useAuth";
import api from "../../api";

const auth0 = useAuth0();

const logout = () => {
  api.logout();
  auth0.logout();
};

const help = () => {
  window.drift?.api.openChat();
};
</script>

<template>
  <nav
    class="flex justify-between items-center h-navbar px-4 border border-b border-border"
  >
    <div class="flex items-center">
      <img src="@/assets/img/moneeda-icon.svg" width="40" class="mr-4" />
      <AdminMenu />
    </div>

    <div class="flex">
      <el-button @click="$i18n.locale = 'en'"> EN </el-button>
      <el-button @click="$i18n.locale = 'es'"> ES </el-button>
      <el-button :icon="ChatDotSquare" @click="help"></el-button>
      <el-button :icon="SwitchButton" @click="logout"></el-button>
    </div>
  </nav>
</template>
