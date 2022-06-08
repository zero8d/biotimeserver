const sql = require('mssql')
const htmlToImage = require('node-html-to-image')
const convertToImageMonthly = async employees => {
  return htmlToImage({
    html: `<html>
        <head>
        <style>
            body {
              width: 1024px;
              height: 1400px;
            }
          </style>
          <script
            src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/js/bootstrap.min.js'
            integrity='sha512-EKWWs1ZcA2ZY9lbLISPz8aGR2+L7JVYqBAYTq5AXgBkSjRSuQEGqWx8R1zAX16KdXPaCjOCaKE8MCpU0wcHlHA=='
            crossorigin='anonymous'
            referrerpolicy='no-referrer'
          ></script>
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/css/bootstrap.min.css'
            integrity='sha512-Ez0cGzNzHR1tYAv56860NLspgUGuQw16GiOOp/I2LuTmpSK9xDXlgJz3XN4cnpXWDmkNBKXR/VDMTCnAaEooxA=='
            crossorigin='anonymous'
            referrerpolicy='no-referrer'
          />
        </head>
        <body>
          <div class='container'>
          <h1>Filial 3</h1>
            <table class='table table-striped'>
              <tr>
                <th class='col'>#</th>
                <th class='col'>id</th>
                <th class='col'>name</th>
                <th class='col'> Umumiy kech qolishlar (daq.)</th>
                <th class='col'> summa (so'm)</th>
              </tr>
              {{#each employees as |employee index|}}
                <tr>
                  <td>{{employee.i}}</td>
                  <td>{{employee.emp_code}}</td>
                  <td>{{employee.first_name}}</td>
                  <td>{{employee.jarima}}</td>
                  <td>{{employee.summa}}</td>
                </tr>
              {{/each}}
            </table>
          </div>
        </body>
      </html>`,
    content: { employees },
  })
}

const getEmployees = async () => {
  try {
    const getAllEmpQuery =
      'select first_name, emp_code from dbo.personnel_employee where personnel_employee.id in (91,92,94,95,96,97,84,98,1153,100,101,102,103,104,105,106,107,1183,109,1160,139,140,112,1151,1158,142,117,87,1159,1154,1152,134,138,1161,89,90)'
    const getLateEmpQuery =
      "select dbo.personnel_employee.emp_code, sum( DATEDIFF(MINUTE, '08:30:00',  CONVERT(VARCHAR(10), dbo.iclock_transaction.punch_time, 108))) AS timediff from dbo.personnel_employee join dbo.iclock_transaction on dbo.personnel_employee.emp_code = dbo.iclock_transaction.emp_code WHERE 31> DATEDIFF(day,CAST( punch_time AS Date ), CAST( GETDATE() AS Date )) and DATEDIFF(MINUTE, '08:30:00',CONVERT(VARCHAR(10), dbo.iclock_transaction.punch_time, 108)) > 0 and personnel_employee.id in (91,92,94,95,96,97,84,98,1153,100,101,102,103,104,105,106,107,1183,109,1160,139,140,112,1151,1158,142,117,87,1159,1154,1152,134,138,1161,89,90) group by dbo.personnel_employee.emp_code"
    const emp = await (await sql.query(getAllEmpQuery)).recordset
    const lateemp = (await sql.query(getLateEmpQuery)).recordset
    const result = emp.map(employee => {
      let jarima = 'Hali kech qolmagan'
      let summa = "0 so'm"
      for (let index = 0; index < lateemp.length; index++) {
        const element = lateemp[index]
        if (element.emp_code === employee.emp_code) {
          jarima = element.timediff + ' daq.'
          summa = element.timediff * 1000 + " so'm"
        }
      }
      employee.jarima = jarima
      employee.summa = summa
      return employee
    })
    return result
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getEmployees, convertToImageMonthly }
