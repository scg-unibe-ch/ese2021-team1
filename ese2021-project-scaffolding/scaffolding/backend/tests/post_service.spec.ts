import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp)
import 'mocha'

// const server = new Server()

chai.use(chaiHttp)
const expect = chai.expect

describe("Correct admin login", () => {
    it("should return the admin user", () => {
        return chai.request("http://localhost:3000")
            .post("/user/login")
            .send({ userName: "admin", password: "Admin123!" })
            .then((res: any) => {
                assert(res.body.user.email, "admin@gmail.com")
            })
    })
})

describe("Wrong admin login", () => {
    it("should not return the admin user", () => {
        return chai.request("http://localhost:3000")
            .post("/user/login")
            .send({ userName: "admin", password: "wrongPassword!" })
            .then((res: any) => {
                console.log(res.message)
                assert(res.message, "Wrong password.")
            })
    })
})