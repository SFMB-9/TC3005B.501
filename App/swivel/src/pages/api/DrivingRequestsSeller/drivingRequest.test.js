import drivingRequest from './drivingRequest';
require('dotenv').config();
const mongoose = require('mongoose');

describe("Tests for drivingRequest", () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    const testCases = [
        {
            vendedor_id: "6448c555af4b91297c2a3061",
            tipo_proceso: "pruebaManejo",
            method: "GET",
            expectedStatus: 200,
            expectedJson: (json) => {
                expect(json.message).toBe("Se encontraron los procesos");
                expect(json.procesos).toBeDefined();
                expect(json.procesos[0]._doc.vendedor_id.toString()).toEqual("6448c555af4b91297c2a3061");
            }
        },
        {
            vendedor_id: "6448b23e9b381e63ff823f7e",
            tipo_proceso: "pruebaManejo",
            method: "GET",
            expectedStatus: 404,
            expectedJson: (json) => {
                expect(json.message).toBe("No se encontraron procesos");
            }
        },
        {
            vedndedor_id: "6448b23e9b381e63ff823f7f",
            tipo_proceso: "pruebaManejo",
            method: "POST",
            expectedStatus: 405,
            expectedJson: (json) => {
                expect(json.message).toBe("Metodo no permitido");
            }
        }
    ];
    testCases.forEach(({ vendedor_id, tipo_proceso, method, expectedStatus, expectedJson }) => {
        it(`deberia regresar ${expectedStatus} si el metodo es ${method} y el usuario es ${vendedor_id}`, async () => {
            const req = { query: { vendedor_id, tipo_proceso }, method };
            const json = jest.fn();
            const status = jest.fn(() => {
                return { json };
            });
            const res = {
                status
            };

            await drivingRequest(req, res);

            expect(status).toHaveBeenCalledWith(expectedStatus);
            expectedJson(json.mock.calls[0][0]);
        });
    });
});