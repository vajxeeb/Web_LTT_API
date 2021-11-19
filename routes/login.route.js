const express = require('express');
const router = express.Router();
const user = require('../controllers/login.controller');
const check_auth = require('../middleware/check-auth')
/**
 * @swagger
 * tags:
 *  name: Login
 *  description: The login api
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   login:
 *    type: object
 *    required:
 *      - user_email
 *      - user_password
 *    properties:
 *     user_email:
 *      type: string
 *      description: Email of user
 *     user_password:
 *      type: string
 *      description: Password of user
 */



/**
 * @swagger
 * /api/login/{user_email}/{user_password}:
 *  post:
 *   summary: Login
 *   tags: [Login]
 *   parameters:
 *    - in: path
 *      name: user_email
 *      schema:
 *       type: string
 *      required: true
 *      description: Email
 *      example: ADMIN
 *    - in: path
 *      name: user_password
 *      schema:
 *       type: string
 *      required: true
 *      description: Password
 *      example: 1234
 *   responses:
 *    200:
 *       description: OK
 *    403:
 *       description: Forbiden
 *    404:
 *       description: Not found
 *    500:
 *       description: Some server error
 */
router.post('/login/:user_email/:user_password', user.login);


module.exports = router;