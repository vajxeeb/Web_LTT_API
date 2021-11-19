
const DB = require('../DBConfig/connection')
const logger = require('../LogConfig/logger')
const process = require('../Processes')


//...............PUT.....................//

exports.update = async (req, res) => {



    logger.info(req.body)

    const SQL1 = `SELECT * FROM tbl_quota`
    const SQL2 = 'UPDATE tbl_quota SET max_values = $1, price_per_number = $2 WHERE digit_lenght = $3'

    await DB.connect((err, cleint, done) => {

        if (!err) {
            cleint.query(SQL1, (error, results) => {
                if (error) {
                    logger.error(error)
                    return res.status(403).send({ error: error })
                }
                else {


                    let price_per_number = 0


                    for (let i = 0; i < 6; i++) {

                        if (i == 0) price_per_number = 10
                        if (i == 1) price_per_number = 100
                        if (i == 2) price_per_number = 1000
                        if (i == 3) price_per_number = 10000
                        if (i == 4) price_per_number = 100000
                        if (i == 5) price_per_number = 1000000


                        let max_values = 0
                        let id = results.rows[i].digit_lenght

                        if (id == 1) max_values = req.body[0].max_values
                        if (id == 2) max_values = req.body[1].max_values
                        if (id == 3) max_values = req.body[2].max_values
                        if (id == 4) max_values = req.body[3].max_values
                        if (id == 5) max_values = req.body[4].max_values
                        if (id == 6) max_values = req.body[5].max_values

                        cleint.query(SQL2, [max_values, max_values / price_per_number, id], (err) => {

                            if (err) {
                                logger.error(err)
                                return res.status(403).send({ error: error })
                            }
                            if (i == 5)
                                return res.send({ message: "Success" })
                        })

                    }
                }
            })
            done();
        } else {
            return res.status(500).send({ message: 'Server error' })
        }
    })
}

//....................GET ..................//
exports.get = async (req, res) => {

    await process.GET(
        res,
        'GET/api/quota',
        '',
        'SELECT * FROM tbl_quota ORDER BY digit_lenght',
        ''
    )

}