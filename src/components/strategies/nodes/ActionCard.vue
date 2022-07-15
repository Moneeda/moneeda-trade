<script setup>
import { EditPen, DeleteFilled } from "@element-plus/icons-vue";
import BaseCard from "../cards/BaseCard.vue";
import CardActionList from "../cards/CardActionList.vue";
import CardAction from "../cards/CardAction.vue";
import CardText from "../cards/CardText.vue";
import CardPropertyList from "../cards/CardPropertyList.vue";
import CardProperty from "../cards/CardProperty.vue";
import { CardColor, CardSize, Scale } from "../cards/types";
defineProps({
  action: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <BaseCard
      :title="action.type"
      :color="CardColor.SUCCESS"
      :size="CardSize.LITTLE"
      :scale="Scale.LITTLE"
    >
      <CardText :text="action.type" />
      <CardPropertyList v-if="action && action.params && action.params[0]">
        <CardProperty :value="action.params[0].percentage" label="Percentage" />
        <CardProperty :value="action.params[0].fee" label="Fee" />
      </CardPropertyList>
      <CardActionList>
        <CardAction>
          <el-button
            size="small"
            circle
            type="warning"
            :icon="EditPen"
          ></el-button>
        </CardAction>
        <CardAction>
          <el-button
            circle
            size="small"
            type="danger"
            :icon="DeleteFilled"
          ></el-button>
        </CardAction>
      </CardActionList>
    </BaseCard>
  </div>
</template>
