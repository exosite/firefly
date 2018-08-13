<template>
  <div class="col-md-8 col-md-offset-2 container">
    <div class="logo">
      <img alt="alt_text" aria-hidden="true" border="0" height="100" onerror="this.src='/src/assets/img/logo.png'" src="/theme/logo.png" width="100">
      <h1 id="title" :style="{ 'color': primaryColor }">{{ legal.title }}</h1>
    </div>

    <div class="body">{{ legal.content }}</div>
    <div class="last_update">Last Updated on <span id="last_update">{{ legal.lastUpdate }}</span></div>

    <div class="footer legal-footer-padding">
      <a :href="footer.companyUrl" class="company">{{ footer.companyName }}</a>
      <div class="address">{{ footer.companyAddress }}</div>
      <div class="contact">{{ footer.companyContact }}</div>
      <a href="/#/legal" class="terms" :style="{ 'color': primaryColor }">Terms of Service</a>
    </div>
  </div>
</template>

<script>
  import main from './Legal.js'
  export default main
</script>

<style lang="scss">
  @import './Legal.scss'
</style>
