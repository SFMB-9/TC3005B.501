import handler from '../src/pages/api/registro/registro-grupo-automotriz';
import dbConnect from '../src/config/dbConnect';
import User from '../src/models/user'
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

describe('POST /api/registro/registro-grupo-automotriz', () => {
    beforeAll(async () => {
        dbConnect();

        await User.create({ 
            tipo_usuario: "exists", 
            nombres: "GAExists", 
            email: "already@exists.com", 
            contraseña: "password", 
    
            direccion:{ 
              calle: "street", 
              numero_exterior: "ext_number", 
              numero_interior: "int_number",
              ciudad: "city",
              estado: "state", 
              pais: "country",
              codigo_postal: "postal_code", 
            },
    
            is_account_verified: true, 
            email_verification_token: null,
          });
    });

    afterAll(async () => {
        await User.deleteMany({ nombres: "GAExists" });
        await User.deleteMany({ nombres: "Test" });
        await User.deleteMany({ nombres: "177013" });

        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteOne({ nombres: "Test" });
    });

    test("test to register a new auto group user", async () => {
        const req = { method: "POST", 
                    body: {
                        role: "test", 
                        name: "Test", 
                        email: "a01025453@tec.mx", 
                        password: "testPassword",
                        street: "testStreet", 
                        ext_number: "testExt_number", 
                        int_number: "testInt_number",
                        city: "testCity",
                        state: "testState", 
                        country: "testCountry",
                        postal_code: "testPostal_code"
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

    test("test to register a new auto group user with a wrong name format", async () => {
        const req = { method: "POST", 
                    body: {
                        role: "test", 
                        name: "177013", 
                        email: "a01025453@tec.mx", 
                        password: "testPassword",
                        street: "testStreet", 
                        ext_number: "testExt_number", 
                        int_number: "testInt_number",
                        city: "testCity",
                        state: "testState", 
                        country: "testCountry",
                        postal_code: "testPostal_code"
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

    test("test to register a new auto group user with a wrong email format", async () => {
        const req = { method: "POST", 
                    body: {
                        role: "test", 
                        name: "Test", 
                        email: "wrong/email/format", 
                        password: "testPassword",
                        street: "testStreet", 
                        ext_number: "testExt_number", 
                        int_number: "testInt_number",
                        city: "testCity",
                        state: "testState", 
                        country: "testCountry",
                        postal_code: "testPostal_code"
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
                        email: "notanemail", 
                        password: "testPassword",
                        street: "testStreet", 
                        ext_number: "testExt_number", 
                        int_number: "testInt_number",
                        city: "testCity",
                        state: "testState", 
                        country: "testCountry",
                        postal_code: "testPostal_code"
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
                        email: "already@exists.com", 
                        password: "testPassword",
                        street: "testStreet", 
                        ext_number: "testExt_number", 
                        int_number: "testInt_number",
                        city: "testCity",
                        state: "testState", 
                        country: "testCountry",
                        postal_code: "testPostal_code"
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

        expect(status).toHaveBeenCalledWith(400);
    });
});
