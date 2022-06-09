const { Bot, InputFile } = require('grammy')
const { convertToImageMonthly, getEmployees } = require('../utilities/montly')
const bot = new Bot(process.env.BOTTOKEN)
const lastMonthReport = async () => {
  let employees = await getEmployees()
  employees = employees.map((el, index) => {
    return {
      ...el,
      i: index + 1,
    }
  })

  const image = await convertToImageMonthly(employees)
  await bot.api.sendPhoto(-1001545780698, new InputFile(image), {
    caption:
      'Oylik hisobot' 
  })
  console.log('Finished')
}

module.exports = lastMonthReport
