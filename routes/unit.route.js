
const express = require('express')
const route = express.Router()
const unit = require('../controllers/unit.controller')
const check_auth = require('../middleware/check-auth')

/**
 * @swagger
 * tags:
 *  name: Unit
 *  description: Unit api
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   unit:
 *    type: object
 *    required:
 *      - su_id
 *      - branch_id
 *      - service_unit_name
 *      - village_name
 *      - create_by
 *      - tel1
 *      - su_percent
 *      - su_email
 *    properties:
 *     su_id:
 *      type: integer
 *      description: Unit id
 *     branch_id:
 *      type: integer
 *      description: Branch id
 *     service_unit_name:
 *      type: string
 *      description: Unit name 
  *     village_name:
 *      type: string
 *      description: Unit address
 *     create_by:
 *      type: integer
 *      description: User id
 *     tel1:
 *      type: string
 *      description: Unit phone
 *     su_percent:
 *      type: integer
 *      description: Unit percent 
 *     su_email:
 *      type: string
 *      description: Unit email 
 *    example:
 *      su_id: 1
 *      branch_id: 2
 *      service_unit_name: xxx
 *      village_name: xxx
 *      create_by: 1
 *      tel1: 020xxxxxxxx
 *      su_percent: 0
 *      su_email: example@gmail.com
 */

//...........POST..................//
/**
 * @swagger
 * /api/unit:
 *  post:
 *   summary: Create a new unit
 *   tags: [Unit]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/unit'
 *   responses:
 *    201:
 *       description: Create
 *    403:
 *       description: Forbiden
 *    404:
 *       description: Not found
 *    500:
 *       description: Some server error
 */
route.post('/unit', unit.create)

//............PUT..................//

/**
 * @swagger
 * /api/unit:
 *  put:
 *   summary: Update the unit
 *   tags: [Unit]
 *   requestBody: 
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *         $ref: '#/components/schemas/unit'
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

route.put('/unit', unit.update)
//.............DELETE...............//

/**
 * @swagger
 * /api/unit/{su_id}:
 *  put:
 *   summary: Delete the unit by unit id
 *   tags: [Unit]
 *   parameters:
 *    - in: path
 *      name: su_id
 *      schema:
 *       type: integer
 *      require: true
 *      description: Unit id
 *      example: 2
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

route.put('/unit/:su_id', unit.delete)

//.............GET..................//

/**
 * @swagger
 * /api/unit:
 *  get:
 *   summary: Get a list of unit
 *   tags: [Unit]
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
route.get('/unit', unit.get)
/**
 * @swagger
 * /api/unit/bybranch/{branch_id}:
 *  get:
 *   summary: Get a list of unit
 *   tags: [Unit]
 *   parameters:
 *    - in: path
 *      name: branch_id
 *      schema:
 *       type: integer
 *      require: true
 *      description: branch id
 *      example: 2
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
 route.get('/unit/bybranch/:branch_id', unit.getbybranch)

module.exports = route