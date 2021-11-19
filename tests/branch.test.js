
const request = require('supertest')
const app = require('../server')

const access_token =''
//...........POST test...........//
describe("POST /branch", () => {

    //201
    test("Branch created.", async () => {
        const response = await request(app)
            .post("/api/branch")
            .send({
                brance_id: 22,
                brance_name: "test",
                brance_phone: "55555555"
            })
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(201);
    });

    //404
    test("Brance not created.", async () => {
        const response = await request(app)
            .post("/api/branch")
            .send({
                brance_id: 10,
                brance_name: "test",
                brance_phone: "55555555"
            })
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(404);
    });
})

//...........PUT..............//
describe("PUT /branch", () => {

    //200
    test("Brance updated.", async () => {
        const response = await request(app)
            .put("/api/branch")
            .send({
                brance_id: 10,
                brance_name: "test",
                brance_phone: "55555555"
            })
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(200);
    });

    //404
    test("Brance not updated.", async () => {
        const response = await request(app)
            .put("/api/branch")
            .send({
                brance_id: 100,
                brance_name: "test",
                brance_phone: "55555555"
            })
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(404);
    });
   
})

//.............DELETE...............//
describe("DELETE /branch", () => {

    //200
    test("Brance DELETED.", async () => {
        const response = await request(app)
            .put("/api/branch/22")
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(200);
    });

    //404
    test("Brance NOT DELETED.", async () => {
        const response = await request(app)
            .delete("/api/branch/100")
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(404);
    });

})


//.........GET.................//
describe("GET /branch", () => {

    //200
    test("RETURN list of branch", async () => {
        const response = await request(app)
            .get("/api/branch")
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(200);
    });

})

