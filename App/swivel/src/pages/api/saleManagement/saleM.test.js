import saleM from './saleM';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const createMockResponse = () => {
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  return { status, json };
};


afterAll(async () => {
  await mongoose.connection.close();
});

describe("Tests for saleM", () => {
  it("deberia regresar 200 si se asigno bien la compra", async () => {
    const req = { query: {gerente_id: "6448c4fbaf4b91297c2a3060"}, method: "PUT"};
    const res = createMockResponse();
    await saleM(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls[0][0].message).toBe("Compra asignada correctamente");
    expect(res.json.mock.calls[0][0].sellerId).toBeDefined();
  });

  it("deberia regresar 404 si no se encontro un vendedor", async () => {
    const req = { query: {gerente_id: "6448c4fbaf4b91297c2a3067"}, method: "PUT"};
    const res = createMockResponse();
    await saleM(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json.mock.calls[0][0].message).toBe("Usuario no encontrado");
  });

  it("deberia regresar 405 si el metodo no es PUT", async () => {
    const req = { query: {gerente_id: "6448c4fbaf4b91297c2a3060"}, method: "POST"};
    const res = createMockResponse();
    await saleM(req, res);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json.mock.calls[0][0].message).toBe("Metodo no permitido");
  });
});
