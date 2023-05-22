import handler from '../src/pages/api/gerente/eliminar-vendedor';
import dbConnect from '../src/config/dbConnect';
import User from '../src/models/user'

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

describe('DELETE /api/gerente/eliminar-vendedor', () => {
    afterAll(async () => {
        await User.deleteOne({ email: "eliminar@vendedor.com" });

        await mongoose.connection.close();
    });

    beforeAll(async () => {
        dbConnect();
        await User.create({
            nombres: "Test",
            apellidos: "Test",
            email: "eliminar@vendedor.com",
            contraseña: "password",
            telefono: "1234567890",
            agencia: "AgencyTest"
        });
    });

    test("test to delete an existing seller", async () => {
        const req = { method: "DELETE", body: { email: "eliminar@vendedor.com", agency: "AgencyTest" }};

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

    test("test to delete a non-existing seller", async () => {
        const req = { method: "DELETE", body: { email: "test@eliminar.com", agency: "AgencyTest" }};

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

    test("test to delete a seller with a wrong method", async () => {

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