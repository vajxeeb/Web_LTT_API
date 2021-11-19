
const express = require('express')
const route = express.Router()
const seller = require('../controllers/user_seller.controller')
const check_auth = require('../middleware/check-auth')

/**
 * @swagger
 * tags:
 *  name: User_seller
 *  description: User seller api
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   user_seller:
 *    type: object
 *    required:
 *      - usid
 *      - us_pwd
 *      - create_by
 *      - branch_id
 *      - unit_id
 *      - us_name
 *      - us_phone
 *      - us_address
 *      - us_quota
 *      - us_percent
 *    properties:
 *     usid:
 *      type: integer
 *      description: User seller id
 *     us_pwd:
 *      type: string
 *      description: User seller password
 *     create_by:
 *      type: integer
 *      description: User id (user who create) 
  *     branch_id:
 *      type: integer
 *      description: Branch id
 *     unit_id:
 *      type: integer
 *      description: Unit id
 *     us_name:
 *      type: string
 *      description: User seller name
 *     us_phone:
 *      type: string
 *      description: User seller phone 
 *     us_address:
 *      type: string
 *      description: User seller address 
 *     us_quota:
 *      type: integer
 *      description: User seller qouta
 *     us_percent:
 *      type: integer
 *      description: User seller percent 
 *    example:
 *      usid: 1
 *      us_pwd: 1234
 *      create_by: 1
 *      branch_id: 2
 *      unit_id: 22
 *      us_name: xxx
 *      us_phone: 020xxxx
 *      us_address: xxxxx
 *      us_quota: 200000
 *      us_percent: 0
 */

//...........POST..................//
/**
 * @swagger
 * /api/seller:
 *  post:
 *   summary: Create a new user seller
 *   tags: [User_seller]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/user_seller'
 *   responses:
 *    201:
 *       description: Created
 *    403:
 *       description: Forbiden
 *    404:
 *       description: Not found
 *    500:
 *       description: Some server error
 */
route.post('/seller', seller.create)

//............PUT..................//

/**
 * @swagger
 * /api/user:
 *  put:
 *   summary: Update the user seller
 *   tags: [User_seller]
 *   requestBody: 
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *         $ref: '#/components/schemas/user_seller'
 *   responses:
 *    200:
 *       description: OK
 *    401:
 *       descrition: Unauthorization
 *    404:
 *       description: Not found
 *    500:
 *       description: Some server error
 */

route.put('/seller', seller.update)
//.............DELETE...............//

/**
 * @swagger
 * /api/seller/{us_id}:
 *  put:
 *   summary: Delete the user seller by  id
 *   tags: [User_seller]
 *   parameters:
 *    - in: path
 *      name: us_id
 *      schema:
 *       type: integer
 *      require: true
 *      description: User seller id
 *      example: 2123
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

route.put('/seller/:usid', seller.delete)


//..........BLOCKED...............//
/**
 * @swagger
 * /api/seller/block/{us_id}:
 *  put:
 *   summary: Block the user seller by  id
 *   tags: [User_seller]
 *   parameters:
 *    - in: path
 *      name: us_id
 *      schema:
 *       type: integer
 *      require: true
 *      description: User seller id
 *      example: 2123
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

route.put('/seller/block/:usid', seller.blockSeller)

//..........UNBLOCKED...............//
/**
 * @swagger
 * /api/seller/unblock/{us_id}:
 *  put:
 *   summary: UNBlock the user seller by  id
 *   tags: [User_seller]
 *   parameters:
 *    - in: path
 *      name: us_id
 *      schema:
 *       type: integer
 *      require: true
 *      description: User seller id
 *      example: 2123
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

 route.put('/seller/unblock/:usid', seller.blockSeller)

//.............GET..................//


/**
 * @swagger
 * /api/seller:
 *  get:
 *   summary: Get a list of user seller
 *   tags: [User_seller]
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
route.get('/seller', seller.get)

module.exports = route