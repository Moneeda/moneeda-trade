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
  color: #7d7b8b;
  border-left: 2px solid rgba(0, 0, 0, 0.1);
  padding-left: 6px;
}
</style>
