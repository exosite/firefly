export default {
  name: 'AlexaLogin',
  data (router) {
    return {
      email: '',
      errorMsg: '',
      footer: {},
      password: '',
      primaryColor: '#00BAFF',
      showError: false
    }
  },
  methods: {
    async getTheme () {
      try {
        this.$api.getTheme()
          .then(({ body: {
            company_address: companyAddress,
            company_contact: companyContact,
            company_name: companyName,
            company_url: companyUrl,
            primary_color: primaryColor
          } }) => {
            this.footer = {
              companyAddress,
              companyContact,
              companyName,
              companyUrl
            }
            this.primaryColor = primaryColor
          })
      } catch (error) {
        throw new Error(`Failed to get Theme data (Error: ${error})`)
      }
    },
    async reloadSession () {
      try {
        await this.$api.getSession()
          .then((res) => {
            const state = this.$cookie.get('state')

            if (state !== undefined && res.status === 200) {
              window.location.replace(`${window.location.origin}/authorize_approved?session=1`)
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
    login () {
      const { email, password } = this
      this.resetErrorMsg()

      this.$api.login({ email, password })
        .catch((e) => {
          this.showError = true
          this.errorMsg = e.bodyText
        })
        .then(() => this.reloadSession())
    },
    resetErrorMsg () {
      this.errorMsg = ''
    }
  },
  mounted () {
    return this.getTheme()
      .then(() => this.reloadSession())
  }
}
