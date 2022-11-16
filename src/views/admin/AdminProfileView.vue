<script setup>
import { Connection } from "@element-plus/icons-vue";
import { useUserInfo } from "../../core/useUserInfo";

const { userInfo } = useUserInfo();
</script>

<template>
  <div class="py-4 px-8 max-w-[70%]">
    <h1 class="flex items-center text-2xl my-6">
      <el-icon :size="32" class="mr-4">
        <Connection />
      </el-icon>
      {{ $t("profileView.connection.title") }}
    </h1>
    <p class="text-content mb-4">
      {{ $t("profileView.connection.description") }}
    </p>
    <div v-if="!!userInfo && !userInfo.hasTelegramChannel">
      <el-link type="primary" :href="userInfo.channelValidationUrl">{{
        $t("profileView.connection.cta", { provider: "Telegram" })
      }}</el-link>

      <el-divider>
        {{ $t("profileView.connection.or") }}
      </el-divider>

      <p>
        {{
          $t("profileView.connection.commandExplanation", {
            provider: "Telegram",
            name: userInfo.channelBot,
          })
        }}
      </p>
      <el-alert
        :title="
          $t('profileView.connection.command', {
            token: userInfo.channelValidationId,
          })
        "
        type="info"
        :closable="false"
      />
    </div>
    <div v-else-if="!!userInfo">
      <h2 class="flex items-center text-2xl my-6">
        {{
          $t("profileView.connection.confirmed", {
            provider: "Telegram",
            user: userInfo.channelName,
          })
        }}
      </h2>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
