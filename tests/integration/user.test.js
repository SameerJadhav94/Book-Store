import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST /users', () => {
    it('given registration details when proper and role is user should save in DB', (done) => {
      const register = {
        firstName: 'Sameerone',
        lastName: 'Jadhav',
        email: 'sameerone@gmail.com',
        password: 'Sameer123'
      };
      request(app)
        .post('/api/v1/users/user')
        .send(register)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);

          done();
        });
    });
  });
  describe('POST /users', () => {
    it.only('given registration details when proper and role is admin should save in DB, login and forgot password', (done) => {
      const register = {
        firstName: 'Sameerone',
        lastName: 'Jadhav',
        email: 'sameerone@gmail.com',
        password: 'Sameer123'
      };
      const login = {
        email: 'sameerone@gmail.com',
        password: 'Sameer123'
      };
      const forgotpassword = {
        email: 'sameerone@gmail.com'
      };
      request(app)
        .post('/api/v1/users/admin')
        .send(register)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          request(app)
            .post('/api/v1/users/login')
            .send(login)
            .end((err, res) => {
              expect(res.statusCode).to.be.equal(200);
              request(app)
                .post('/api/v1/users/forgotpassword')
                .send(forgotpassword)
                .end((err, res) => {
                  expect(res.statusCode).to.be.equal(200);
                  done();
                });
            });
        });
    });
  });
  // describe('/book', () => {
  //   it.only('given book details if proper should save in DB', (done) => {

  //   });
  // });
});
