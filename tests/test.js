let app = require('../app');

// Import the dependencies for testing
let chai = require('chai');
let chaiHttp = require('chai-http');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("GET /api/test", () => {
    it("It should return 'hello' ", (done) => {
        chai.request(app)
            .get('/api/test')
            .end((err, resp) => {
                resp.should.have.status(200);
                chai.expect(resp.text).to.equal("hello")
                done();
            })


        // Test to get single student record
        // it("should not get a single student record", (done) => {
        //     const id = 5;
        //     chai.request(app)
        //         .get(`/${id}`)
        //         .end((err, res) => {
        //             res.should.have.status(404);
        //             done();
        //         });
        // });
    });
});