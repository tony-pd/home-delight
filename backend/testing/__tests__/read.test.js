const app = require("../read");
const request = require("supertest");
const fs = require("fs");

jest.mock("fs");

describe("GET /", () => {
  test("It should respond with 200", async () => {
    const response = request(app).get("/api/user");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /api/user", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test("should return user data", () => {
        fs.readFileSync.mockReturnValueOnce(
            JSON.stringify([
                {
                    name: "Rahul",
                    age: 22,
                    address: "Bangalore",
                },
            ])
        );

        const response = request(app).get("/api/user");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("successfull");
        expect(response.body.message).toEqual([
            {
                name: "Rahul",
                age: 22,
                address: "Bangalore",
            },
        ]);
    });

    test("no user data", () => {
        fs.readFileSync.mockReturnValueOnce(
            JSON.stringify([])
        );

        const response = request(app).get("/api/user");

        expect(response.statusCode).toBe(404);
        expect(response.body.status).toBe("successfull");
        expect(response.body.message).toEqual("No users found");
    });

    test("file read error", () => {
        fs.readFile.mockImplementationOnce(() => {
            throw new Error("File read error");
        });

        const response = request(app).get("/api/user");

        expect(response.statusCode).toBe(500);
        expect(response.body.status).toBe("error");
        expect(response.body.message).toEqual("internal server error");
    });
});