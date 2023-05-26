import getDrivingRequest from './getDrivingRequest';
require('dotenv').config();
const mongoose = require('mongoose');

describe("Tests for getDrivingRequest", () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    const testCases = [
        {
            _id: "64546f1db4d14568536877ec",
            method: "GET",
            expectedStatus: 200,
            expectedJson: (json) => {
                expect(json.message).toBe("Se ha encontrado el proceso");
                expect(json.proceso).toBeDefined();
                expect(json.proceso._doc._id.toString()).toEqual("64546f1db4d14568536877ec");
            }
        },
        {
            _id: "64546f1db4d14568536877ea",
            method: "GET",
            expectedStatus: 404,
            expectedJson: (json) => {
                expect(json.message).toBe("No se encontro el proceso");
            }
        },
        {
            _id: "64546f1db4d14568536877ec",
            method: "POST",
            expectedStatus: 405,
            expectedJson: (json) => {
                expect(json.message).toBe("Metodo no permitido");
            }
        }
    ];
    testCases.forEach(({ _id, method, expectedStatus, expectedJson }) => {
        it(`deberia regresar ${expectedStatus} si el metodo es ${method} y el usuario es ${_id}`, async () => {
            const req = { query: { _id }, method };
            const json = jest.fn();
            const status = jest.fn(() => {
                return { json };
            });
            const res = {
                status
            };

            await getDrivingRequest(req, res);

            expect(status).toHaveBeenCalledWith(expectedStatus);
            expectedJson(json.mock.calls[0][0]);
        });
    });
});