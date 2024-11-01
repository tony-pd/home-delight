const app = require("../api");
const request = require("supertest");
const userModel = require("../model/UserModel");

jest.mock("../model/UserModel");

describe("POST /api/v1/user/signup", () => {
    test("It should respond with 201", async () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        const payload = {
            name: "Rahul",
            email: "<EMAIL>",
            password: "<PASSWORD>",
            confirmPassword: "<PASSWORD>"
        };

        userModel.create.mockReturnValueOnce(payload);
 
        const response = request(app).post("/api/v1/user/signup").send(payload);
        expect(response.statusCode).toBe(201);
        expect(response.body.status).toBe("successfull");
        expect(response.body.message).toBe("User created successfully");
        expect(response.body.message.toHaveProperty("name", "Rahul"));
        expect(response.body.message.toHaveProperty("email", "<EMAIL>"));
        expect(response.body.message.toHaveProperty("password", "<PASSWORD>"));
    });

    test("It should respond an error", () => {
        const payload = {
            name: "Rahul",
            email: "<EMAIL>"       
        };

        userModel.create.mockImplementationOnce(() => {
            throw new Error("Invalid user data");
        });

        const response = request(app).post("/api/v1/user/signup").send(payload);
        expect(response.statusCode).toBe(500);
        expect(response.body.status).toBe("error");
        expect(response.body.message).toBe("Error while creating user");
    });
});