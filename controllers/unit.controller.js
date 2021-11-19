const DB = require('../DBConfig/connection')
const logger = require('../LogConfig/logger')
let unit = require('../models/unit.model')
const process = require('../Processes')
let SQL = ``
const date = require('../getdate/datenow')

//.........POST..............//

exports.create = async (req, res) => {

    unit = req.body

    SQL = 'SELECT su_id FROM tbl_service_unit WHERE su_id = $1'

    await DB.connect((err, cleint, done) => {
        if(!err) {
            cleint.query(SQL, [unit.su_id], async (err, results) => {

                done();
    
                if (err) {
                    logger.error(err)
                    return res.status(403).send({ err: err })
                }
                if (results.rowCount > 0) {
                    return res.status(403).send({ message: 'This unit already exist' })
                }
                else {
                    SQL = `INSERT INTO tbl_service_unit (su_id, branch_id, service_unit_name, village_name, create_by, create_date, tel1)
                            VALUES($1, $2, $3, $4, $5, $6, $7); `
    
                    const SQL2 = `INSERT INTO tbl_service_unit2 (su_id, su_percent, su_email)
                                  VALUES ($1, $2, $3)`
    
                  await process.POST2(
                        res,
                        'POST/unit',
                        req.body,
                        SQL,
                        [unit.su_id, unit.branch_id, unit.service_unit_name, unit.village_name, unit.create_by, date(), unit.tel1],
                        SQL2,
                        [unit.su_id, unit.su_percent, unit.su_email],
                    )
    
                }
            })
        }
        else {
            return res.status(500).send({message: 'Server error'})
        }
    })
}
//.............PUT..........................//

exports.update = async (req, res) => {

    unit = req.body

    //unit1
    SQL = `UPDATE tbl_service_unit SET branch_id = $1, service_unit_name = $2, village_name = $3,tel1 = $4
           WHERE su_id = $5 `
           
    //unit2
    const SQL2 = `UPDATE tbl_service_unit2 SET su_percent = $1, su_email = $2 WHERE su_id = $3 `

   await process.PUT2(
        res,
        'PUT/api/unit',
        req.body,
        SQL,
        [unit.branch_id, unit.service_unit_name, unit.village_name, unit.tel1, unit.su_id],
        SQL2,
        [unit.su_percent, unit.su_email, unit.su_id]
    )
}

//...........DELETE..........// 
exports.delete = async (req, res) => {
    unit = req.params
  await  process.DELETE(
        res,
        'PUT/api/unit',
        req.body,
        'UPDATE tbl_service_unit2 SET su_dlst = false WHERE su_id = $1',
        [unit.su_id]
    )
}

//..............GET..................// 
exports.get = async (req, res) => {
   await process.GET(
        res,
        'GET/api/unit',
        '',
        'SELECT * FROM v_get_all_unit',
        ''
    )
}

//............GET By branch............//
exports.getbybranch = async (req, res) => {

    unit = req.params
    SQL = `SELECT  tbl_service_unit.su_id,tbl_service_unit.service_unit_name, tbl_branch_name.branch_name, tbl_service_unit.village_name, tbl_service_unit.tel1,
                   tbl_service_unit2.su_percent, tbl_service_unit2.su_email, tbl_branch_name.branch_id
            FROM   tbl_service_unit, tbl_service_unit2, tbl_branch_name
            WHERE  tbl_service_unit.su_id      = tbl_service_unit2.su_id
            AND    tbl_service_unit.branch_id  = tbl_branch_name.branch_id
            AND    tbl_service_unit2.su_dlst   = true
            AND    tbl_branch_name.branch_dlst = true
            AND    tbl_branch_name.branch_id     = $1`

  await  process.GET(
        res,
        'GET/api/unit',
        '',
        SQL,
        [unit.branch_id]
    )
}
