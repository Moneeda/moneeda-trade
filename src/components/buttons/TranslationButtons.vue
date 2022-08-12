<script setup>
import translations from "../../services/translations";
import storage from "../../services/storage";

const setLanguage = (lng) => {
  storage.set("lng", lng);
  translations.setLanguage(lng);
};
</script>

<template>
  <el-radio-group
    v-model="$i18n.locale"
    @change="setLanguage($event)"
    size="small"
    class="mr-4"
  >
    <el-radio-button label="en">English</el-radio-button>
    <el-radio-button label="es">Español</el-radio-button>
  </el-radio-group>
</template>
