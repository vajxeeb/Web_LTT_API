
const connection = require('../DBConfig/connection')
const logger = require('../LogConfig/logger')
let branch = require('../models/branch.model')
const process = require('../Processes')
const date = require('../getdate/datenow')

//............CREATE.................//
exports.Create = async (req, res) => {
    branch = req.body

    SQL = `SELECT * FROM public.tbl_branch_code WHERE branch_id = $1`

    await connection.connect((err, client, done) => {
        if (!err) {
            client.query(SQL, [branch.branch_id], (error, results) => {

                done();

                if (error) logger.error(error)

                if (results.rowCount > 0) {
                    res.status(403).send({ message: 'ສາຂານີ້ມີ້ຢູ່ໃນລະບົບແລ້ວ' })
                }
                else {

                    //add to brance_code
                    SQL = `INSERT INTO public.tbl_branch_code (branch_id, create_by, create_date, phone)
                                    VALUES ($1, $2, $3, $4)`

                    const SQL2 = `INSERT INTO public.tbl_branch_name (branch_id, branch_name) VALUES ($1, $2)`

                    process.POST2(
                        res,
                        'POST/api/branch',
                        req.body,
                        SQL,
                        [branch.branch_id, branch.create_by, date(), branch.phone],
                        SQL2,
                        [branch.branch_id, branch.branch_name]
                    )

                }
            })
        }
        else {
            return res.status(500).send({ message: 'Server error' })
        }
    })

}
//............PUT.................//
exports.Update = async (req, res) => {

    branch = req.body

    //branch_code
    SQL = `UPDATE tbl_branch_code SET phone = $1 WHERE branch_id = $2`
    //brance_name
    const SQL2 = `UPDATE tbl_branch_name SET branch_name = $1 WHERE branch_id = $2`
    await process.PUT2(
        res,
        req.body,
        'PUT/api/branch',
        SQL,
        [branch.phone, branch.branch_id],
        SQL2,
        [branch.branch_name, branch.branch_id]
    )
}

//............DELETE.................//
exports.Delete = async (req, res) => {

    branch = req.params

    SQL = `UPDATE tbl_branch_name SET branch_dlst = false WHERE branch_id = $1`
    await process.DELETE(
        res,
        'DELETE/api/branch/' + branch.branch_id,
        '',
        SQL,
        [branch.branch_id],
    )
}
//............GET................./
exports.Get = async (req, res) => {
    SQL = `SELECT  tbl_branch_code.branch_id, tbl_branch_code.phone, tbl_branch_name.branch_name,tbl_branch_code.create_date
                   FROM tbl_branch_code, tbl_branch_name
           WHERE   tbl_branch_code.branch_id = tbl_branch_name.branch_id
           AND     tbl_branch_name.branch_dlst = true `
    await process.GET(
        res,
        'GET/api/branch',
        '',
        SQL,
        '',
    )
}


