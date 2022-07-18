<template>
  <div>
    <div class="card-property-list"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
.card-property-list {
  display: grid;
  grid-auto-flow: column;
  margin-bottom: 0.25rem;
  font-weight: bold;
  color: #7d7b8b;
}
</style>
