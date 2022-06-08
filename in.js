const dailyReport = require('./modules/dailyReport')
const lastMonthReport = require('./modules/lastMonthReport')
const { connect } = require('./utilities/daily')
const main = async () => {
  await connect()
  //   dailyReport()
  lastMonthReport()
}
main()
