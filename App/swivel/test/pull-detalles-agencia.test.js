import handler from '../src/pages/api/gerente/pull-detalles-agencia';
import dbConnect from '../src/config/dbConnect';
import { SellerUser } from '../src/models/user'
import { encryptRole } from "../src/utils/crypto";

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

describe('GET /api/gerente/pull-detalles-agencia', () => {
    afterAll(async () => {
        await SellerUser.deleteMany({ agency: "AgencyA" });

        await mongoose.connection.close();
    });

    beforeAll(async () => {
        dbConnect();

        await SellerUser.create([
            {
                agencia: "AgencyA",
                horas_min: 8,
                horas_max: 16,
                dias_anticipo: 3,
                dias_max: 20,
                documentos_requeridos_compra: ["ine","licencia","acta de nacimiento"]
            }
        ]);
    });

    test("test to get all of the agency's data", async () => {
        const req = { method: "GET" , body: { agency: "AgencyA" }};

        const json = jest.fn();

        const status = jest.fn(() => {
            return { json };
        });

        const res = { 
            status,
            json
        };

        await handler(req,res);

        expect(status).toHaveBeenCalledWith(200);

        const responseData = json.mock.calls[0][0];

        expect(responseData.horas_min).toBe(8);
        expect(responseData.horas_max).toBe(16);
        expect(responseData.dias_anticipo).toBe(3);
        expect(responseData.dias_max).toBe(20);
        expect(responseData.documentos_requeridos_compra).toEqual(["ine", "licencia", "acta de nacimiento"]);
    });

    test("test to get all the agency's data with a wrong method", async () => {

        const req = { method: "POST" };

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