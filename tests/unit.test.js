
const request = require('supertest')
const app = require('../server')



const access_token =''
//...........POST test...........//
describe("POST /unit", () => {
    //201
    test("Unit not created.", async () => {
        const response = await request(app)
            .post("/api/unit")
            .send({

                su_id: 222,
                branch_id: 111,
                service_unit_name: "xxx",
                village_name: "xxx",
                tel1: "2222222",
                su_percent: 0,
                su_email: "example@gmail.com"

            })
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(403);
    });

})
//...........PUT..............//
describe("PUT /unit", () => {

    //200
    test("Unit uupdated.", async () => {
        const response = await request(app)
            .put("/api/unit")
            .send({

                su_id: 222,
                branch_id: 111,
                service_unit_name: "xxx",
                village_name: "xxx",
                tel1: "2222222",
                su_percent: 0,
                su_email: "example@gmail.com"

            })
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(200);
    });
    //404
    test("Unit not updated.", async () => {
        const response = await request(app)
            .put("/api/unit")
            .send({

                su_id: 222000,
                branch_id: 111,
                service_unit_name: "xxx",
                village_name: "xxx",
                tel1: "2222222",
                su_percent: 0,
                su_email: "example@gmail.com"

            })
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(404);
    });

})

//.............DELETE...............//
describe("DELETE /unit", () => {

    //200
    test("Unit DELETED.", async () => {
        const response = await request(app)
            .put("/api/unit/222")
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(200);
    });

    //404
    test("Unit not DELETED.", async () => {
        const response = await request(app)
            .put("/api/unit/010111")
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(404);
    });

})

//.........GET.................//
describe("GET /unit", () => {
    //200
    test("RETURN list of unit", async () => {
        const response = await request(app)
            .get("/api/unit")
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(200);
    });

})
//.........GET by branch id.................//
describe("GET /unit", () => {
    //200
    test("RETURN list of unit", async () => {
        const response = await request(app)
            .get("/api/unit/bybranch/1122")
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(200);
    });
    //400
    test(" Not RETURN list of unit", async () => {
        const response = await request(app)
            .get("/api/unit/bybranch/20300")
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(404);
    });

})

