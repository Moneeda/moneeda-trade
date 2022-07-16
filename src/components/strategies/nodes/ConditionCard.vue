<script setup>
import { EditPen, DeleteFilled } from "@element-plus/icons-vue";
import { useStrategies } from "~/core/useStrategies";
import { useLayout } from "~/core/useLayout";
import CardActionList from "../cards/CardActionList.vue";
import CardAction from "../cards/CardAction.vue";
import BaseCard from "../cards/BaseCard.vue";
import CardText from "../cards/CardText.vue";
import CardPropertyList from "../cards/CardPropertyList.vue";
import CardProperty from "../cards/CardProperty.vue";
import { CardColor, CardSize, Scale } from "../cards/types";
import { NodeType } from "../strategyFlowHelper";
defineProps({
  condition: {
    type: Object,
    required: true,
  },
});
const { deleteCondition, setConditionToUpdate } = useStrategies();
const { switchLayout } = useLayout();

const updateCondition = (condition) => {
  setConditionToUpdate(condition);
  switchLayout(NodeType.CONDITION);
};
</script>

<template>
  <div>
    <BaseCard
      :title="condition.type"
      :color="CardColor.INFO"
      :size="CardSize.LITTLE"
      :scale="Scale.LITTLE"
    >
      <CardText :text="condition.method" />
      <CardPropertyList>
        <CardProperty :value="condition.period" label="Period" />
        <CardProperty :value="condition.product" label="Product" />
      </CardPropertyList>
      <CardActionList>
        <CardAction>
          <el-button
            size="small"
            circle
            type="warning"
            :icon="EditPen"
            @click="updateCondition(condition)"
          ></el-button>
        </CardAction>
        <CardAction>
          <el-button
            circle
            size="small"
            type="danger"
            :icon="DeleteFilled"
            @click="deleteCondition(condition)"
          ></el-button>
        </CardAction>
      </CardActionList>
    </BaseCard>
  </div>
</template>
