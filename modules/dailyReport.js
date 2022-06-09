const { Bot, InputFile } = require('grammy')
const { convertToImageDaily, getEmployees } = require('../utilities/daily')
const bot = new Bot(process.env.BOTTOKEN)
const dailyReport = async () => {
  let employees = await getEmployees()
  employees = employees.map((el, index) => {
    return {
      ...el,
      i: index + 1,
      jarima: el.timediff > 0 ? el.timediff * 200 + " so'm" : 'Yoq',
    }
  })
  const image = await convertToImageDaily(employees)
  await bot.api.sendPhoto(-1001545780698, new InputFile(image), {
    caption:
      'Kunlik hisobot\n' +
      new Date().getDate() +
      '.' +
      new Date().getMonth() +
      '.' +
      new Date().getFullYear(),
  })
  console.log('Finished')
}

module.exports = dailyReport
