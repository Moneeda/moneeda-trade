<script setup>
import translations from "../../services/translations";
import storage from "../../services/storage";

const setLanguage = (lng) => {
  storage.set("lng", lng);
  translations.setLanguage(lng);
};

</script>

<template>
      <el-button @click="setLanguage('en')"> EN </el-button>
      <el-button @click="setLanguage('es')"> ES </el-button>
</template>