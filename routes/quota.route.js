
const express = require('express')
const route = express.Router()
const branch = require('../controllers/branch.controller')
const check_auth = require('../middleware/check-auth')
const quota = require('../controllers/quota.controller')

/**
 * @swagger
 * tags:
 *  name: Quota
 *  description: Quota api
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Quota:
 *    type: object
 *    required:
 *      - max_values
 *    properties:
 *     max_values:
 *      type: integer
 *      description: max_values numer 1 to number 6
 *    example:
 *      [
 *        {
 *         max_values: 1000000
 *        },
 *        {
 *        max_values: 2000000
 *        },
 *        {
 *        max_values: 30000000
 *        },
 *        {
 *       max_values: 40000000
 *        },
 *        {
 *        max_values: 50000000
 *        },
 *        {
 *        max_values: 600000000
 *         }
 *      ]
 */

/**
 * @swagger
 * /api/quota/{digit_lenght}:
 *  put:
 *   summary: Update max values
 *   tags: [Quota]
 *   requestBody: 
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *         $ref: '#/components/schemas/Quota'
 *   responses:
 *    200:
 *       description: OK
 *    401:
 *       description: Unauthorization
 *    403:
 *       description: Forbiden
 *    404:
 *       description: Not found
 *    500:
 *       description: Some server error
 */

route.put('/quota', quota.update)

//.............GET..................//

/**
 * @swagger
 * /api/quota:
 *  get:
 *   summary: Get a list of quota
 *   tags: [Quota]
 *   responses:
 *    200:
 *       description: OK
 *    401:
 *       description: Unauthorization
 *    403:
 *       description: Forbiden
 *    404:
 *       description: Not found
 *    500:
 *       description: Some server error
 * 
 */
route.get('/quota', quota.get)


module.exports = route