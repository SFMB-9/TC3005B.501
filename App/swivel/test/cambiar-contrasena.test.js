import handler from '../src/pages/api/contrasena/cambiar-contrasena';
import dbConnect from '../src/config/dbConnect';
import User from '../src/models/user'
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

describe('PUT /api/contrasena/cambiar-contrasena', () => {
    afterAll(async () => {
        await User.deleteOne({ email: "test@test.com" });

        await mongoose.connection.close();
    });

    beforeEach(async () => {
        dbConnect();
        await User.deleteOne({ email: "test@test.com" });

        await User.create({
            nombres: "Test",
            apellidos: "Test",
            email: "test@test.com",
            contraseña: "oldPassword",
        });
    });

    test("test to update user password with a new password", async () => {
        const req = { method: "PUT", body: {email: "test@test.com", password: "newPassword"}};

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

    test("test to update user password the same password", async () => {
        const req = { method: "PUT", body: {email: "test@test.com", password: "oldPassword"}};

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

    test("test to update user password with wrong method", async () => {

        const req = { method: "GET" };

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
});
