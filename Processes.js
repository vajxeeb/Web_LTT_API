
const connection = require('./DBConfig/connection')
const logger = require('./LogConfig/logger')

//............POST................./
const POST = async function (res, request, log, SQL, Parameters) {

    logger.info(request)
    logger.info(log)

    await connection.connect((err, cleint, done) => {
        if (!err) {
            cleint.query(SQL, Parameters, (err, results) => {

                if (err) {
                    logger.error(err);
                    return res.status(403).send({ err: err })
                }
                else {
                    logger.info(results)
                    return res.status(201).send({ message: "Created" })
                }
            });
            done();
        }
        else {
            return res.status(500).send({ message: 'Server error' })
        }
    })

}

//............POST2................./
const POST2 = async function (res, request, log, SQL, Parameters, SQL2, Parameters2,) {
    logger.info(request)
    logger.info(log)

    await connection.connect((err, cleint, done) => {
        if (!err) {
            cleint.query(SQL, Parameters, (err) => {
                if (err) {
                    logger.error(err);
                    return res.status(403).send({ err: err })
                }

                else {
                    cleint.query(SQL2, Parameters2, (er) => {

                        if (er) {
                            logger.error(er);
                            return res.status(403).send({ err: er })
                        }
                        else {
                            return res.status(201).send({ message: 'Created' })
                        }
                    });
                }
            });
            done();
        }
        else {
            return res.status(500).send({ message: 'Server error' })
        }

    })

}

//............GET................./
let GET = async function (res, request, log, SQL, Parameters) {

    logger.info(request)
    logger.info(log)

    await connection.connect((err, cleint, done) => {
        if (!err) {
            cleint.query(SQL, Parameters, (err, results) => {
                if (err) {
                    logger.error(err);
                    return res.status(403).send({ err: err })
                }
                if (results.rowCount == 0) {
                    return res.status(404).send({ message: "Not found data Or data in database empty" })
                }
                else {
                    logger.info(results)
                    return res.status(200).send(results.rows)
                }
            });
            done();
        } else {
            return res.status(500).send({ message: 'Server error' })
        }
    })
}
//............PUT................./
let PUT = async function (res, request, log, SQL, Parameters) {

    logger.info(request);
    logger.info(log)

    await connection.connect((err, cleint, done) => {
        if (!err) {
            cleint.query(SQL, Parameters, (err, results) => {
                if (err) {
                    logger.error(err);
                    return res.status(403).send({ err: err })
                }
                if (results.rowCount == 0) {
                    return res.status(404).send({ message: "Not found data for update" })
                }
                else {
                    logger.info(results)
                    return res.status(200).send({ message: "Updated" })
                }
            });
            done();
        }
        else {
            return res.status(500).send({ message: 'Server error' })
        }
    })

}
let PUT2 = async function (res, request, log, SQL, Parameters, SQL2, Parameters2) {

    logger.info(request);
    logger.info(log)

    await connection.connect((err, cleint, done) => {
        if (!err) {

            cleint.query(SQL, Parameters, (err, results) => {
                if (err) {
                    logger.error(err);
                    return res.status(403).send({ err: err })
                }
                if (results.rowCount == 0) {
                    return res.status(404).send({ message: "Not found data for update" })
                }
                else {
                    cleint.query(SQL2, Parameters2, (error) => {
                        if (error) {
                            logger.error(error);
                            return res.status(403).send({ err: error })
                        }
                        if (results.rowCount == 0) {
                            return res.status(404).send({ message: "Not found data for update" })
                        }
                        else {
                            return res.status(200).send({ message: "Updated" })
                        }
                    });
                }
            });
            done();
        }
        else {
            return res.status(500).send({ message: 'Server error' })
        }

    })

}

//............DELTE................./
let DELETE = async function (res, request, log, SQL, Parameters) {

    logger.info(request);
    logger.info(log)

    await connection.connect((err, cleint, done) => {
        if (!err) {
            cleint.query(SQL, Parameters, (err, results) => {
                if (err) {
                    logger.error(err);
                    return res.status(403).send({ err: err })
                }
                if (results.rowCount == 0) {
                    res.status(404).send({ message: "Not found data for delete" })
                }
                else {
                    logger.info(results)
                    return res.status(200).send({ message: "Deleted" })
                }
            });
            done();
        }
        else {
           
            return res.status(500).send({ message: 'Server error' })
        }
    })
}

module.exports = { POST, POST2, GET, DELETE, PUT, PUT2 }