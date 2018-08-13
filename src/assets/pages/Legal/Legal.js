export default {
  name: 'Legal',
  data () {
    return {
      footer: {},
      legal: {},
      primaryColor: '#00BAFF'
    }
  },
  methods: {
    async getLegal () {
      try {
        this.$api.getLegal()
          .then(({ body: {
            body: content,
            last_update,
            title
          }}) => {
            this.legal = {
              content,
              lastUpdate: this.setLastUpdated(last_update),
              title
            }
          })
      } catch (error) {
        throw new Error(`Failed to get Legal data (Error: ${error})`)
      }
    },
    async getTheme () {
      try {
        this.$api.getTheme()
          .then(({ body: {
            company_address: companyAddress,
            company_contact: companyContact,
            company_name: companyName,
            company_url: companyUrl,
            primary_color: primaryColor
          }}) => {
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
    setLastUpdated (ts) {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]

      const date = new Date(ts)
      const mm = monthNames[date.getMonth()]
      const dd = date.getDate()
      const yyyy = date.getFullYear()

      return `${mm}, ${dd}, ${yyyy}`
    }
  },
  mounted () {
    return this.getTheme()
      .then(() => this.getLegal())
  }
}
