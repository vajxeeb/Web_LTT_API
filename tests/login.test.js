
const request = require('supertest')
const app = require('../server')

//...........POST test...........//
describe("POST /login", () => {

    //200
    test("Should login pass.", async () => {
        const response = await request(app)
            .post("/api/login/mk@scn.com/123")
        expect(response.statusCode).toBe(200);
    });

    //404
    test("Email Or password incorrect.", async () => {
        const response = await request(app)
            .post("/api/login/ADMIN/12349")
        expect(response.statusCode).toBe(404);
    });
})