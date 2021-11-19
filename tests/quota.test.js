
const request = require('supertest')
const app = require('../server')

const access_token = ''

const quota =
    [
        {
            "max_values": 1000000
        },
        {
            "max_values": 2000000
        },
        {
            "max_values": 30000000
        },
        {
            "max_values": 40000000
        },
        {
            "max_values": 50000000
        },
        {
            "max_values": 600000000
        }
    ]
//...........POST test...........//
// describe("PUT /quota", () => {

//     //200
//     test("Quoata created.", async () => {
//         for(let i=0; i<6; i++){
//             const response = await request(app)
//             .put("/api/quota")
//             .send({
//                 max_values: quota
//             })
//            .set('Authorization', `Bearer ${access_token}`)
//             expect(response.statusCode).toBe(200);
//         }
       
//     });
// });
// //...........GET test...........//
describe("GET /quota", () => {

    //200
    test("Return list of quota.", async () => {
        const response = await request(app)
            .get("/api/quota")
            .set('Authorization', `Bearer ${access_token}`)
        expect(response.statusCode).toBe(200);
    });
});