import updateDocumentStatus from './updateDocumentStatus';
require('dotenv').config();
const mongoose = require('mongoose');

describe("Tests for updateDocumentComment", () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    const testCases = [
        {
            _id: "644c85a9bc77cc2db42477e7",
            doc_id: "1",
            stat: "sup",
            method: "PUT",
            expectedStatus: 200,
            expectedJson: (json) => {
                expect(json.message).toMatch("in request: 644c85a9bc77cc2db42477e7 to sup");
            }
        },
        {
            _id: "64505bca2abb04e36f428df4",
            doc_id: "1",
            stat: "sup",
            method: "PUT",
            expectedStatus: 404,
            expectedJson: (json) => {
                expect(json.message).toBe("No se encontro el proceso");
            }
        },
        {
            _id: "644c85a9bc77cc2db42477e7",
            doc_id: "300",
            stat: "sup",
            method: "PUT",
            expectedStatus: 404,
            expectedJson: (json) => {
                expect(json.message).toBe("No se encontro el documento");
            }
        },
        {
            _id: "64505bca2abb04e36f428df3",
            doc_id: "1",
            stat: "sup",
            method: "POST",
            expectedStatus: 405,
            expectedJson: (json) => {
                expect(json.message).toBe("Metodo no permitido");
            }
        }
    ];
    testCases.forEach(({ _id, doc_id, stat, method, expectedStatus, expectedJson }) => {
        it(`deberia regresar ${expectedStatus} si el metodo es ${method} y el usuario es ${_id}`, async () => {
            const req = { 
                body: {
                    _id: _id,
                    doc_id: doc_id,
                    status: stat
                }
                , method };
            const json = jest.fn();
            const status = jest.fn(() => {
                return { json };
            });
            const res = {
                status
            };

            await updateDocumentStatus(req, res);

            expect(status).toHaveBeenCalledWith(expectedStatus);
            expectedJson(json.mock.calls[0][0]);
        });
    });
});