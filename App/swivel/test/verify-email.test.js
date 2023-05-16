import handler from '../src/pages/api/registro/verify-email';
import dbConnect from '../src/config/dbConnect';
import User from '../src/models/user'
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

describe('POST /api/registro/verify-email', () => {
    afterAll(async () => {
        await User.deleteMany({ email: "test@test.com" });

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
            is_account_verified: false,
            email_verification_token: "abcdef"
        });
    });

    test("test to verify an email", async () => {
        const req = { method: "POST", query: { token: "abcdef", email: "test@test.com" }};

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

    test("test to verify an email with an invalid email", async () => {
        const req = { method: "PUT", body: { token: "abcdef", email: "test@yeet.com" }};

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

    test("test to verify an email with an invalid token", async () => {
        const req = { method: "PUT", body: { token: "token", email: "test@test.com" }};

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

    test("test to verify email with wrong method", async () => {

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
