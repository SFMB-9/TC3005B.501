import handler from '../src/pages/api/registro/registro-vendedor';
import dbConnect from '../src/config/dbConnect';
import { SellerUser } from '../src/models/user'

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

describe('POST /api/registro/registro-vendedor', () => {
    afterAll(async () => {
        await SellerUser.deleteOne({ email: "test@registro.com" });
        await SellerUser.deleteOne({ email: "registro@vendedores.com" });

        await mongoose.connection.close();
    });

    beforeAll(async () => {
        dbConnect();

        await SellerUser.create({
            nombres: "Test",
            apellidos: "Test",
            email: "registro@vendedores.com",
            contraseña: "password",
            telefono: "1234567890",
            agencia: "AgencyTest"
        });
    });

    test("test to register a new seller", async () => {
        const req = { method: "POST", body: {
                                                name: "Test",
                                                last_name: "Test", 
                                                email: "test@registro.com", 
                                                password: "password", 
                                                cellphone: "1234567890", 
                                                agency: "AgencyTest"
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

    test("test to register a new seller with an already used email", async () => {
        const req = { method: "POST", body: {
                                                name: "Test",
                                                last_name: "Test", 
                                                email: "registro@vendedores.com", 
                                                password: "password", 
                                                cellphone: "1234567890", 
                                                agency: "AgencyTest"
                                            }};

        const json = jest.fn();

        const status = jest.fn(() => {
            return { json };
        });

        const res = { 
            status
        };

        await handler(req,res);

        expect(status).toHaveBeenCalledWith(400);
    });

    test("test to register a seller with a wrong method", async () => {

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