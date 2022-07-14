<script setup>
import BaseCard from "../cards/BaseCard.vue";
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
      <CardPropertyList>
        <CardProperty :value="action.params[0].percentage" label="Percentage" />
        <CardProperty :value="action.params[0].fee" label="Fee" />
      </CardPropertyList>
      <slot />
    </BaseCard>
  </div>
</template>
