import handler from '../src/pages/api/registro/registro-usuario';
import dbConnect from '../src/config/dbConnect';
import User from '../src/models/user'
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

describe('POST /api/registro/registro-usuario', () => {
    beforeAll(async () => {
        dbConnect();

        await User.create({ 
            tipo_usuario: "exists", 
            nombres: "USERexists", 
            appellidos: "userExists",
            email: "already@exists.com", 
            contraseña: "password",
            numero_telefonico: "1234567890",     
            is_account_verified: true, 
            email_verification_token: null,
          });
    });

    afterAll(async () => {
        await User.deleteOne({ nombres: "USERexists" });
        await User.deleteMany({ nombres: "Test" });
        await User.deleteMany({ nombres: "177013" });

        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteOne({ calle: "testStreet" });
    });

    test("test to register a new user", async () => {
        const req = { method: "POST", 
                    body: {
                        role: "test", 
                        name: "Test", 
                        last_name: "Test",
                        email: "a01025453@tec.mx", 
                        password: "testPassword",
                        cellphone: "1234567890",
                    }
        };

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

    test("test to register a new user with a wrong name format", async () => {
        const req = { method: "POST", 
                    body: {
                        role: "test", 
                        name: "177013", 
                        last_name: "Test",
                        email: "a01025453@tec.mx", 
                        password: "testPassword",
                        cellphone: "1234567890",
                    }
        };

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

    test("test to register a new user with a wrong last name format", async () => {
        const req = { method: "POST", 
                    body: {
                        role: "test", 
                        name: "Test", 
                        last_name: "177013",
                        email: "a01025453@tec.mx", 
                        password: "testPassword",
                        cellphone: "1234567890",
                    }
        };

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

    test("test to register a new user with a wrong email format", async () => {
        const req = { method: "POST", 
                    body: {
                        role: "test", 
                        name: "Test", 
                        last_name: "Test",
                        email: "wrong/email/format", 
                        password: "testPassword",
                        cellphone: "1234567890",
                    }
        };

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

    test("test to register a new user with a wrong cellphone format", async () => {
        const req = { method: "POST", 
                    body: {
                        role: "test", 
                        name: "Test", 
                        last_name: "Test",
                        email: "a01025453@tec.mx", 
                        password: "testPassword",
                        cellphone: "12",
                    }
        };

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

    test("test to register a new auto group user with a non-existent email", async () => {
        const req = { method: "POST", 
                    body: {
                        role: "test", 
                        name: "Test", 
                        last_name: "Test",
                        email: "notanemail", 
                        password: "testPassword",
                        cellphone: "1234567890",
                    }
        };

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

    test("test to register a new auto group user with an already used email", async () => {
        const req = { method: "POST", 
                    body: {
                        role: "test", 
                        name: "Test", 
                        last_name: "Test",
                        email: "already@exists.com", 
                        password: "testPassword",
                        cellphone: "1234567890",
                    }
        };

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

    test("test to register auto group user with wrong method", async () => {

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
