const sql = require('mssql')
const htmlToImage = require('node-html-to-image')
const { Bot, InputFile } = require('grammy')
const bot = new Bot('5492928469:AAEvqK4t8Hug2Bw3zG0plM0VC41EyoFdkvc')
const { connect, getEmployees, convertToImage } = require('./utilities/dailiy')
const main = async () => {
  const connection = await connect()
  console.log('connected: ', connection.connected)
  let employees = await getEmployees()
  employees = employees.map((el, index) => {
    return { ...el, i: index + 1 }
  })

  const image = await convertToImage(employees)
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
main()
