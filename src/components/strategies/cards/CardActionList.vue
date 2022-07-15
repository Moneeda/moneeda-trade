<template>
  <div>
    <div class="card-action-list"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
.card-action-list {
  display: flex;
  gap: 0.4rem;
  position: absolute;
  right: 0.4rem;
  top: 0.8rem;
}
</style>
