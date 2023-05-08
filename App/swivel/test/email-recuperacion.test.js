import handler from '../src/pages/api/contrasena/email-recuperacion';
require('dotenv').config({ path: '.env.local' });

describe('POST /api/contrasena/email-recuperacion', () => {
    test("test to send recovery email", async () => {
        const req = { method: "POST", body: {email: "test@test.com"}};

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

    test("test to send recovery email with wrong method", async () => {

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
