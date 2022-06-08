const { Bot, InputFile } = require('grammy')
const { convertToImageDaily, getEmployees } = require('../utilities/daily')
const bot = new Bot('5492928469:AAEvqK4t8Hug2Bw3zG0plM0VC41EyoFdkvc')
const dailyReport = async () => {
  let employees = await getEmployees()
  employees = employees.map((el, index) => {
    return {
      ...el,
      i: index + 1,
      jarima: el.timediff < 0 ? el.timediff * -1000 + " so'm" : 'Yoq',
    }
  })

  const image = await convertToImageDaily(employees)
  await bot.api.sendPhoto(-665250506, new InputFile(image), {
    caption:
      'filial 3\n' +
      new Date().getDate() +
      '.' +
      new Date().getMonth() +
      '.' +
      new Date().getFullYear(),
  })
  console.log('Finished')
}

module.exports = dailyReport
