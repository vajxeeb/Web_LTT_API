const connection = require('../DBConfig/connection')
const logger = require('../LogConfig/logger')
let user = require('../models/login.model')
let SQL = ``
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {

    user = req.params

    logger.info('POST/api/login/' + user.user_email + '/' + user.user_password)

    SQL = `SELECT * FROM public.tbl_user WHERE user_email = $1 AND user_password = $2`

    await connection.connect((err, client, done) => {

        if (!err) {
            client.query(SQL, [user.user_email, user.user_password], (error, results) => {

                if (error) {
                    logger.error(error)
                    res.status(403).send({ error: error })
                }
                if (results.rowCount == 0) {
                    res.status(404).send({ message: 'User do not exist' })
                }
                else {
                    logger.info(results)
                    jwt.sign({ user }, 'secretkey', (err, token) => {
                        if (!err) {
                            res.json({
                                accessToken: token,
                                data: results.rows,
                                expiresIn: '24h'
                            })
                        }
                    })
                }
            })

        }
        else {
            return res.status(500).send({ message: 'Server error' })
        }
        done();
    })
}