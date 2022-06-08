const sql = require('mssql')
const htmlToImage = require('node-html-to-image')
const convertToImageDaily = async employees => {
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
                <th class='col'>Kelgan vaqti</th>
              </tr>
              {{#each employees as |employee index|}}
                <tr>
                  <td>{{employee.i}}</td>
                  <td>{{employee.emp_code}}</td>
                  <td>{{employee.first_name}}</td>
                  <td>{{employee.punch_time}}</td>
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
    const query =
      "select CONVERT(VARCHAR(10), dbo.iclock_transaction.punch_time, 108) as punch_time, DATEDIFF(MINUTE, CONVERT(VARCHAR(10), dbo.iclock_transaction.punch_time, 108), '08:30:00') AS timediff , personnel_employee.id, personnel_employee.first_name, personnel_employee.emp_code from dbo.personnel_employee join dbo.iclock_transaction on dbo.personnel_employee.emp_code = dbo.iclock_transaction.emp_code WHERE CAST( punch_time AS Date ) = CAST( GETDATE() AS Date ) and personnel_employee.id in (91,92,94,95,96,97,84,98,1153,100,101,102,103,104,105,106,107,1183,109,1160,139,140,112,1151,1158,142,117,87,1159,1154,1152,134,138,1161,89,90) "

    const res = await sql.query(query)
    return res.recordset
  } catch (error) {
    console.log(error)
  }
}

const connect = async () => {
  try {
    return sql.connect(
      'Server=193.38.235.24,1433;Database=BioTime;User Id=user;Password=1;Encrypt=false'
    )
  } catch (error) {
    console.log(error)
  }
}

module.exports = { convertToImageDaily, getEmployees, connect }
