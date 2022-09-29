<script stup></script>

<template>
  <div class="admin-profile">
    <div class="profile">
      <h1 class="profile--title">Personal Info</h1>
      <h2 class="profile--label">Full Name</h2>
      <p class="profile--input">John Doe</p>
      <h2 class="profile--label">Telegram Name</h2>
      <p class="profile--input">September 9</p>
      <h2 class="profile--label">Email</h2>
      <p class="profile--input">example@example.com</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-profile {
  display: grid;
  height: 30rem;
  margin: 0 auto;
}

.profile {
  align-self: center;
  justify-self: center;
  border: 2px;
  border-style: solid;
  border-color: rgb(204 219 233);
  padding: 3rem;
  border-radius: 1.2rem;
  width: 30rem;


  &--title {
    position: relative;
    left: 8rem;
    color: rgb(95, 165, 227);
    padding-bottom: 1.6rem;
    font-size: large;
  }

  &--label {
    font-weight: 500;
    color: rgb(219 129 65);
  }

  &--input {
    font-weight: 200;
    padding-bottom: 0.6rem;
  }
}
</style>
