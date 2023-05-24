import handler from '../src/pages/api/gerente/pull-all-vendedores';
import dbConnect from '../src/config/dbConnect';
import { SellerUser } from '../src/models/user'
import { encryptRole } from "../src/utils/crypto";

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

describe('GET /api/gerente/pull-all-vendedores', () => {
    const e_role = encryptRole("seller"); 

    afterAll(async () => {
        await SellerUser.deleteMany({ tipo_usuario: e_role });

        await mongoose.connection.close();
    });

    beforeAll(async () => {
        dbConnect();

        await SellerUser.create([
            {
                tipo_usuario: e_role,
                nombres: "Test",
                apellidos: "Test",
                email: "number@one.com",
                agencia: "AgencyA"
            },
            {
                tipo_usuario: e_role,
                nombres: "Test",
                apellidos: "Test",
                email: "number@two.com",
                agencia: "AgencyA"
            }
        ]);
    });

    test("test to get all sellers' data", async () => {
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

        responseData.forEach((entry, index) => {
            if (index === 0) {
                expect(entry).toHaveProperty("tipo_usuario", e_role);
                expect(entry).toHaveProperty("nombres", "Test");
                expect(entry).toHaveProperty("apellidos", "Test");
                expect(entry).toHaveProperty("agencia", "AgencyA");
            } else if (index === 1) {
                expect(entry).toHaveProperty("tipo_usuario", e_role);
                expect(entry).toHaveProperty("nombres", "Test");
                expect(entry).toHaveProperty("apellidos", "Test");
                expect(entry).toHaveProperty("agencia", "AgencyA");
            }
        });

        const hasOneInEmail = responseData.some((entry) => entry["email"] === "number@one.com");
        expect(hasOneInEmail).toBe(true);

        const hasTwoInEmail = responseData.some((entry) => entry["email"] === "number@two.com");
        expect(hasTwoInEmail).toBe(true);
    });

    test("test to get all sellers' data with a wrong method", async () => {

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