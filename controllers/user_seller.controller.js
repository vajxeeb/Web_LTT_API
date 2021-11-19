
const db = require('../DBConfig/connection')
const logger = require('../LogConfig/logger')
let seller = require('../models/user_seller.model')
const process = require('../Processes')
let SQL = ``
const date = require('../getdate/datenow')

//................CREATE.......................//

exports.create = async (req, res) => {

    seller = req.body

    SQL = 'SELECT * FROM tbl_user_seller WHERE usid = $1'

    await db.connect((err, cleint, done) => {

        if (!err) {

            cleint.query(SQL, [seller.usid], (error, results) => {

                done();

                if (error) {
                    logger.error(error)
                    return res.status(403).send({ error: error })
                }
                if (results.rowCount > 0) {
                    return res.status(403).send({ message: 'This user already exist' })
                }
                else {
                    SQL = `INSERT INTO tbl_user_seller (usid, us_pwd, us_status, online_status, date_register, create_by, branch_id, unit_id, ref_code )
                           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, '123')`

                    const SQL2 = `  INSERT INTO tbl_user_seller2 (usid, us_name, us_phone, us_address, us_quota, us_percent)
                                    VALUES ($1, $2, $3, $4, $5, $6)`
                    process.POST2(
                        res,
                        'POST/api/user_seller',
                        req.body,
                        SQL,
                        [seller.usid, seller.us_pwd, 1, 2, date(), seller.create_by, seller.branch_id, seller.unit_id],
                        SQL2,
                        [seller.usid, seller.us_name, seller.us_phone, seller.us_address, seller.us_quota, seller.us_percent]
                    )
                }
            })
        }
        else {
            return res.status(500).send({ message: 'Server error' })
        }
    })
}

//................UPDATR SELLER.......................//
exports.update = async (req, res) => {

    seller = req.body
    SQL = `UPDATE tbl_user_seller SET us_pwd = $1, branch_id = $2, unit_id = $3 WHERE usid = $4`
    const SQL2 = `  UPDATE tbl_user_seller2 SET us_name = $1, us_phone = $2, us_address = $3, us_quota = $4, us_percent = $5 WHERE usid = $6`
    await process.PUT2(
        res,
        'PUT/api/user_seller',
        req.body,
        SQL,
        [seller.us_pwd, seller.branch_id, seller.unit_id, seller.usid],
        SQL2,
        [seller.us_name, seller.us_phone, seller.us_address, seller.us_quota, seller.us_percent, seller.usid]
    )

}

//................DELETE.......................//
exports.delete = async (req, res) => {

    seller = req.params

    SQL = 'UPDATE tbl_user_seller2 SET us_dlst = false WHERE usid = $1'

    await process.DELETE(
        res,
        'PUT/api/user_seller/' + seller.us_id,
        '',
        SQL,
        [seller.usid]
    )
}
//................GET.......................//
exports.get = async (req, res) => {
    SQL = `SELECT * FROM v_get_all_user_seller`
    process.GET(
        res,
        'GET/api/user_seller',
        '',
        SQL,
        ''
    )
}
//................BLOCK SELLER.......................//
exports.blockSeller = async (req, res) => {
    seller = req.params
    SQL = `UPDATE tbl_user_seller SET us_status = 3 WHERE usid = $1`
    await process.PUT(
        res,
        'GET/api/seller/block/' + seller.usid,
        '',
        SQL,
        [seller.usid]
    )
}

//................UNBLOCK SELLER.......................//
exports.unblock = async (req, res) => {
    seller = req.params
    SQL = `UPDATE tbl_user_seller SET us_status = 1 WHERE usid = $1`
    await process.PUT(
        res,
        'GET/api/seller/block/' + seller.usid,
        '',
        SQL,
        [seller.usid]
    )
}
