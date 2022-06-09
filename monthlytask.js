require('dotenv').config()
const lastMonthReport = require('./modules/lastMonthReport')
const { connect } = require('./utilities/daily')
const main = async () => {
  await connect()
  lastMonthReport()
}
main()
