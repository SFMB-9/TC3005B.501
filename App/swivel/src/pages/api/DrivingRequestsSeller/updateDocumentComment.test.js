import updateDocumentComment from './updateDocumentComment';
require('dotenv').config();
const mongoose = require('mongoose');

describe("Tests for updateDocumentComment", () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    const testCases = [
        {
            _id: "64505bca2abb04e36f428df3",
            doc_id: "1",
            comment: "sup",
            method: "PUT",
            expectedStatus: 200,
            expectedJson: (json) => {
                expect(json.message).toMatch('added comment: ' + 'sup' + ' in request: ' + '64505bca2abb04e36f428df3' + ' at document: ');
            }
        },
        {
            _id: "64505bca2abb04e36f428df4",
            doc_id: "1",
            comment: "sup",
            method: "PUT",
            expectedStatus: 404,
            expectedJson: (json) => {
                expect(json.message).toBe("No se encontro el proceso");
            }
        },
        {
            _id: "64505bca2abb04e36f428df3",
            doc_id: "300",
            comment: "sup",
            method: "PUT",
            expectedStatus: 404,
            expectedJson: (json) => {
                expect(json.message).toBe("No se encontro el documento");
            }
        },
        {
            _id: "64505bca2abb04e36f428df3",
            doc_id: "1",
            comment: "sup",
            method: "POST",
            expectedStatus: 405,
            expectedJson: (json) => {
                expect(json.message).toBe("Metodo no permitido");
            }
        }
    ];
    testCases.forEach(({ _id, doc_id, comment, method, expectedStatus, expectedJson }) => {
        it(`deberia regresar ${expectedStatus} si el metodo es ${method} y el usuario es ${_id}`, async () => {
            const req = { 
                body: {
                    _id: _id,
                    doc_id: doc_id,
                    comment: comment
                }
                , method };
            const json = jest.fn();
            const status = jest.fn(() => {
                return { json };
            });
            const res = {
                status
            };

            await updateDocumentComment(req, res);

            expect(status).toHaveBeenCalledWith(expectedStatus);
            expectedJson(json.mock.calls[0][0]);
        });
    });
});