import managerP from './managerP';
require('dotenv').config();
const mongoose = require('mongoose');

describe("Tests for managerP", () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    const testCases = [
        {
            id: "6448b23e9b381e63ff823f7f",
            method: "GET",
            expectedStatus: 200,
            expectedJson: (json) => {
                expect(json.message).toBe("Usuario encontrado");
                expect(json.userData).toBeDefined();
                expect(json.userData._doc._id.toString()).toEqual("6448b23e9b381e63ff823f7f");
            }
        },
        {
            id: "6448b23e9b381e63ff823f7e",
            method: "GET",
            expectedStatus: 404,
            expectedJson: (json) => {
                expect(json.message).toBe("Usuario no encontrado");
            }
        },
        {
            id: "6448b23e9b381e63ff823f7f",
            method: "POST",
            expectedStatus: 405,
            expectedJson: (json) => {
                expect(json.message).toBe("Metodo no permitido");
            }
        }
    ];

    testCases.forEach(({ id, method, expectedStatus, expectedJson }) => {
        it(`deberia regresar ${expectedStatus} si el metodo es ${method} y el usuario es ${id}`, async () => {
            const req = { query: { id }, method };
            const json = jest.fn();
            const status = jest.fn(() => {
                return { json };
            });
            const res = {
                status
            };

            await managerP(req, res);

            expect(status).toHaveBeenCalledWith(expectedStatus);
            expectedJson(json.mock.calls[0][0]);
        });
    });
});
