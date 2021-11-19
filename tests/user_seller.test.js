
const request = require('supertest')
const app = require('../server')

const access_token = ''
//...........POST test...........//
describe("POST /user_seller", () => {
    //201
    test("Unit  created.", async () => {
        const response = await request(app)
            .post("/api/seller")
            .send({
                usid: 1,
                us_pwd: 1234,
                create_by: 1,
                branch_id: 2,
                unit_id: 22,
                us_name: "xxx",
                us_phone: "020xxxx",
                us_address: "xxxxx",
                us_quota: 200000,
                us_percent: 0

            })
            .set('Authorization', `Bearer ${access_token}`)
        expect(response.statusCode).toBe(201);
    });

})
//...........PUT..............//
describe("PUT /user_seller", () => {

    //200
    test("seller updated.", async () => {
        const response = await request(app)
            .put("/api/seller")
            .send({
                usid: 102,
                us_pwd: 1234,
                branch_id: 2,
                unit_id: 22,
                us_name: "xxx",
                us_phone: "020xxxx",
                us_address: "xxxxx",
                us_quota: 200000,
                us_percent: 0

            })
            .set('Authorization', `Bearer ${access_token}`)
        expect(response.statusCode).toBe(200);
    });
    //404
    test("seller not updated.", async () => {
        const response = await request(app)
            .put("/api/seller")
            .send({
                usid: 1000,
                us_pwd: 1234,
                create_by: 1,
                branch_id: 2,
                unit_id: 22,
                us_name: "xxx",
                us_phone: "020xxxx",
                us_address: "xxxxx",
                us_quota: 200000,
                us_percent: 0

            })
            .set('Authorization', `Bearer ${access_token}`)
        expect(response.statusCode).toBe(404);
    });

})
//.............DELETE...............//
describe("DELETE /User_seller", () => {

    //200
    test("User_seller DELETED.", async () => {
        const response = await request(app)
            .put("/api/seller/102")
            .set('Authorization', `Bearer ${access_token}`)
        expect(response.statusCode).toBe(200);
    });

    //404
    test("seller not DELETED.", async () => {
        const response = await request(app)
            .put("/api/seller/10000")
            .set('Authorization', `Bearer ${access_token}`)
        expect(response.statusCode).toBe(404);
    });

})
//.........GET.................//
describe("GET /user seller", () => {
    //200
    test("RETURN list of user seller ", async () => {
        const response = await request(app)
            .get("/api/seller")
            .set('Authorization', `Bearer ${access_token}`)
        expect(response.statusCode).toBe(200);
    });

})
//.........BLOCK.................//
describe("PUT /block seller", () => {
    //200
    test("block seller ", async () => {
        const response = await request(app)
            .put("/api/seller/block/1122")
            .set('Authorization', `Bearer ${access_token}`)
        expect(response.statusCode).toBe(200);
    });
    //404
    test(" not block seller ", async () => {
        const response = await request(app)
            .put("/api/seller/block/112200")
            .set('Authorization', `Bearer ${access_token}`)
        expect(response.statusCode).toBe(404);
    });
})
//.........UNBLOCK.................//
describe("PUT /unblock seller", () => {
    //404
    test("unblock seller ", async () => {
        const response = await request(app)
            .put("/api/seller/unblock/1231")
            .set('Authorization', `Bearer ${access_token}`)
        expect(response.statusCode).toBe(404);
    });
    //200
    test("unblock seller ", async () => {
        const response = await request(app)
            .get("/api/seller/unblock/1122")
            .set('Authorization', `Bearer ${access_token}`)
        expect(response.statusCode).toBe(200);
    });
})

