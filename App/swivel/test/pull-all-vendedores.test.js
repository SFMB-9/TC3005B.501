import handler from '../src/pages/api/gerente/pull-all-vendedores';
import dbConnect from '../src/config/dbConnect';
import User from '../src/models/user'
import { encryptRole } from "../src/utils/crypto";

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

describe('GET /api/gerente/pull-all-vendedores', () => {
    const e_role = encryptRole("seller"); 

    afterAll(async () => {
        await User.deleteMany({ tipo_usuario: e_role });

        await mongoose.connection.close();
    });

    beforeAll(async () => {
        dbConnect();


        await User.create([
            {
                tipo_usuario: "seller",
                nombres: "Test",
                apellidos: "Test",
                email: "number@one.com"
            },
            {
                tipo_usuario: "seller",
                nombres: "Test",
                apellidos: "Test",
                email: "number@two.com"
            }
        ]);
    });

    test("test to get all sellers' data", async () => {
        const req = { method: "GET" };

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
                expect(entry).toHaveProperty("email", "number@one.com");
            } else if (index === 1) {
                expect(entry).toHaveProperty("tipo_usuario", e_role);
                expect(entry).toHaveProperty("nombres", "Test");
                expect(entry).toHaveProperty("apellidos", "Test");
                expect(entry).toHaveProperty("email", "number@two.com");
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