import handler from '../src/pages/api/agencia/modificar-disponibilidad-pruebas';
import dbConnect from '../src/config/dbConnect';
import User from '../src/models/user'

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

describe('PUT /api/agencia/modificar-disponibilidad-pruebas', () => {
    afterAll(async () => {
        await User.deleteMany({ agencia: "AgencyTest" });

        await mongoose.connection.close();
    });

    beforeAll(async () => {
        dbConnect();
        await User.create({
            agencia: "AgencyTest",
            horas_min: 1, 
            horas_max: 2, 
            dias_anticipo: 3, 
            dias_max: 4

        });
    });

    test("test to update an agency's test scheduling", async () => {
        const req = { method: "PUT", body: { 
                                                agency: "AgencyTest", 
                                                horas_min: 5, 
                                                horas_max: 6, 
                                                dias_anticipo: 7, 
                                                dias_max: 8
                                            }};

        const json = jest.fn();

        const status = jest.fn(() => {
            return { json };
        });

        const res = { 
            status
        };

        await handler(req,res);

        expect(status).toHaveBeenCalledWith(200);
    });

    test("test to update an agency's test scheduling with a wrong method", async () => {

        const req = { method: "GET" };

        const json = jest.fn();

        const status = jest.fn(() => {
            return { json };
        });

        const res = { 
            status
        };

        await handler(req,res);

        expect(status).toHaveBeenCalledWith(405);
    });
});