<template functional>
  <div class="switch">
    <p
        :class="{active: props.lang === 'en'}"
        @click="listeners['change-lang']('en')"
    >English</p>
    <p
        :class="{active: props.lang === 'ar'}"
        @click="listeners['change-lang']('ar')"
    >Arabic</p>
  </div>
</template>

<style>
</style>
