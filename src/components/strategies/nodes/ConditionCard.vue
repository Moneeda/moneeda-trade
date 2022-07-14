<script setup>
import BaseCard from "../cards/BaseCard.vue";
import CardText from "../cards/CardText.vue";
import CardPropertyList from "../cards/CardPropertyList.vue";
import CardProperty from "../cards/CardProperty.vue";
import { CardColor, CardSize, Scale } from "../cards/types";
defineProps({
  condition: {
    type: Object,
    required: true,
  },
});
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
      <slot />
    </BaseCard>
  </div>
</template>
