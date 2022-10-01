<script stup></script>

<template>
  <div class="admin-profile flex justify-center">
    <div class="profile self-center p-12">
      <h1 class="profile--title relative">Personal Info</h1>
      <hr class="profile--title-underlined flex self-center relative" />
      <h2 class="profile--font-medium">Full Name</h2>
      <hr class="profile--header-underlined flex self-center " />
      <p class="profile--font-extralight">John Doe</p>
      <h2 class="profile--font-medium">Telegram Name</h2>
      <hr class="profile--header-underlined flex self-center" />
      <p class="profile--font-extralight">September 9</p>
      <h2 class="profile--font-medium">Email</h2>
      <hr class="profile--header-underlined flex self-center" />
      <p class="profile--font-extralight">example@example.com</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.admin-profile {
  height: 30rem;
  margin: 0 auto;
}

.profile {
  border: 2px;
  border-style: solid;
  border-color: rgb(204 219 233);
  border-radius: 1.2rem;
  width: 30rem;

  &--title {
    left: 8rem;
    color: rgb(95, 165, 227);
    padding-bottom: 1.6rem;
    /* font-weight: 500; */
    font-size: large;
  }

  &--title-underlined {
  bottom: 1.3rem;
  left: 6rem;
  width: 50%;
  border: 1px solid rgb(163 218 235);
  border-radius: 5px;
}

&--header-underlined {
  bottom: 1.3rem;
  left: 6rem;
  width: 50%;
  border: 1px solid rgb(235 210 163);
  border-radius: 5px;
  margin-bottom: 0.6rem;
}

  &--font-medium {
    font-weight: 500;
    color: rgb(219 129 65);
  }

  &--font-extralight {
    font-weight: 200;
    padding-bottom: 0.6rem;
  }
}
</style>
