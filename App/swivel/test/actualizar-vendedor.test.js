import handler from '../src/pages/api/gerente/actualizar-vendedor';
import dbConnect from '../src/config/dbConnect';
import { SellerUser } from '../src/models/user'

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

describe('PUT /api/gerente/actualizar-vendedor', () => {
    afterAll(async () => {
        await SellerUser.deleteOne({ email: "actualizar@vendedor.com" });
        await SellerUser.deleteOne({ email: "hakita@florp.com" });

        await mongoose.connection.close();
    });

    beforeAll(async () => {
        dbConnect();
        await SellerUser.create({
            nombres: "Test",
            apellidos: "Test",
            email: "actualizar@vendedor.com",
            contraseña: "password",
            telefono: "1234567890",
            agencia: "AgencyTest"
        });
    });

    test("test to update a seller", async () => {
        const req = { method: "PUT", body: { 
                                                name: "Arsi",
                                                last_name: "Parala", 
                                                oldEmail: "actualizar@vendedor.com", 
                                                newEmail: "hakita@florp.com", 
                                                cellphone: "0987654321", 
                                                agency: "Heresy"
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

    test("test to update a seller with a wrong method", async () => {

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