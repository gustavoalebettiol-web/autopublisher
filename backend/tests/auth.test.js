const request = require('supertest');
const { app, connectDB } = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

jest.setTimeout(30000);

beforeAll(async () => {
  // Asegurarse de usar DB en memoria (connectDB lo iniciará si MONGO_URI no existe)
  process.env.NODE_ENV = 'test';
  // unset MONGO_URI to force in-memory server
  delete process.env.MONGO_URI;
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  // si connectDB creó el mongod lo liberamos
  if (connectDB._mongod) await connectDB._mongod.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('Auth flow', () => {
  test('register -> login -> get token', async () => {
    const email = 'testuser@example.com';
    const password = '123456';

    const reg = await request(app)
      .post('/api/auth/register')
      .send({ email, password, nombre: 'Test User' });
    expect([201, 409]).toContain(reg.status); // Puede ser creado o ya existir
    if (reg.status === 201) expect(reg.body.token).toBeDefined();

    const login = await request(app)
      .post('/api/auth/login')
      .send({ email, password });
    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
  });
});
