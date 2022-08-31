<script setup>
import { EditPen, DeleteFilled } from "@element-plus/icons-vue";
import BaseCard from "../cards/BaseCard.vue";
import { useStrategies } from "~/core/useStrategies";
import { useLayout } from "~/core/useLayout";
import CardActionList from "../cards/CardActionList.vue";
import CardAction from "../cards/CardAction.vue";
import CardText from "../cards/CardText.vue";
import CardPropertyList from "../cards/CardPropertyList.vue";
import CardProperty from "../cards/CardProperty.vue";
import { CardType as _CardType, CardSize, Scale } from "../cards/types";
import { NodeType } from "../strategyFlowHelper";
defineProps({
  action: {
    type: Object,
    required: true,
  },
});
const { deleteAction, setActionToUpdate } = useStrategies();
const { switchLayout } = useLayout();
const updateAction = (action) => {
  setActionToUpdate(action);
  switchLayout(NodeType.ACTION);
};

const CardType = _CardType;
</script>

<template>
  <div>
    <BaseCard
      :title="action.type"
      :type="action.type === 'virtual-sell' ? CardType.SELL : CardType.SUCCESS"
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
            @click="updateAction(action)"
          ></el-button>
        </CardAction>
        <CardAction>
          <el-button
            circle
            size="small"
            type="danger"
            :icon="DeleteFilled"
            @click="deleteAction(action)"
          ></el-button>
        </CardAction>
      </CardActionList>
    </BaseCard>
  </div>
</template>
