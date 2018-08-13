<template>
  <div class="container col-md-4 col-md-offset-4">
    <div class="logo">
      <img
        alt="alt_text"
        aria-hidden="true"
        border="0"
        height="100"
        onerror="this.src='/src/assets/img/logo.png'"
        src="/theme/logo.png"
        width="100"
      >
      <h1 class="title" :style="{ 'color': primaryColor }">Sign In</h1>
    </div>
    <div class="login-form">
      <form id="loginform" @submit.prevent="login">
        <div class="email-password-fields">
            <div>
              <p>EMAIL</p>
              <input required class="form-control" type="email" name="email" placeholder="Email Address" v-model="email">
            </div>
            <div>
              <p>PASSWORD</p>
              <input required class="form-control" type="password" name="password" placeholder="Password" v-model="password">
            </div>
        </div>

        <div id="loginerror" class="error-message" v-if="showError">
          <p class="error-title">There was an issue signing in</p>
          <p class="error-content">{{ errorMsg }}</p>
        </div>
        <div class="action">
          <div class="login-button">
            <button type="submit" class="signin-button" :style="{ 'background': primaryColor, 'border-color': primaryColor }">Sign In</button>
          </div>
          <a href="/api:1/social/handle/Facebook/loginurl" class="signin-button fb">Sign In with Facebook</a>
        </div>
      </form>
      <div class="footer alexa-login-footer-padding">
        <a :href="footer.companyUrl" class="company">{{ footer.companyName }}</a>
        <div class="address">{{ footer.companyAddress }}</div>
        <div class="contact">{{ footer.companyContact }}</div>
        <a href="/#/legal" class="terms" :style="{ 'color': primaryColor }">Terms of Service</a>
      </div>
    </div>
  </div>
</template>

<script>
  import main from './AlexaLogin.js'
  export default main
</script>

<style lang="scss">
  @import './AlexaLogin.scss'
</style>
