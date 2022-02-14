/* eslint-disable max-len */
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import fs from 'fs';
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
    it('given registration details when proper and role is admin should save in DB, login and forgot password', (done) => {
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
  describe('/book', () => {
    it('given book details if proper should pass all API tests.', (done) => {
      const bearerToken =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWY2YjBiYjU1NzIwOTI0M2NhNWQ1NDQiLCJmaXJzdE5hbWUiOiJTYW1lZXIiLCJsYXN0TmFtZSI6IkphZGhhdiIsImVtYWlsIjoic2FtZWVyMTkwOTE5OTRAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ0NjYzMTcyLCJleHAiOjE2NDUwMjMxNzJ9.tXiH5O4n69zLIyV7sag4F5shsgepuzvezQ_1NrmdAgQ';
      //Add Book
      request(app)
        .post('/api/v1/book/')
        .set({ authorization: bearerToken })
        .set('content-type', 'multipart/form-data')
        .field('author', 'test author')
        .field('title', 'test title')
        .attach('image', fs.readFileSync(`${__dirname}/rich dad.jpg`), `tests/integration/rich dad.jpg`)
        .field('quantity', 1)
        .field('price', 10)
        .field('description', 'this is an integration test')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          //get book
          request(app)
            .get('/api/v1/book/')
            .set({ authorization: bearerToken })
            .end((err, res) => {
              expect(res.statusCode).to.be.equal(200);
              const id = res.body.data[0]._id;
              //get book by id
              request(app)
                .get(`/api/v1/book/${id}`)
                .set({ authorization: bearerToken })
                .end((err, res) => {
                  expect(res.statusCode).to.be.equal(200);
                  //update book
                  request(app)
                    .get(`/api/v1/book/${id}`)
                    .set({ authorization: bearerToken })
                    .set('content-type', 'multipart/form-data')
                    .field('author', 'update author')
                    .field('title', 'test title')
                    .attach('image', fs.readFileSync(`${__dirname}/rich dad.jpg`), `tests/integration/rich dad.jpg`)
                    .field('quantity', 1)
                    .field('price', 10)
                    .field('description', 'this is an integration test')
                    .end((err, res) => {
                      expect(res.statusCode).to.be.equal(200);
                      const title = res.body.data.title;
                      //search book
                      request(app)
                        .get(`/api/v1/search/${title}`)
                        .set({ authorization: bearerToken })
                        .end((err, res) => {
                          expect(res.statusCode).to.be.equal(200);
                          //sort book in ascending order
                          request(app)
                            .get(`/api/v1/ascending/`)
                            .set({ authorization: bearerToken })
                            .end((err, res) => {
                              expect(res.statusCode).to.be.equal(200);
                              //sort book in descending order
                              request(app)
                                .get(`/api/v1/descending/`)
                                .set({ authorization: bearerToken })
                                .end((err, res) => {
                                  expect(res.statusCode).to.be.equal(200);
                                  //sort book in alphabetical order
                                  request(app)
                                    .get(`/api/v1/alphabetical/`)
                                    .set({ authorization: bearerToken })
                                    .end((err, res) => {
                                      expect(res.statusCode).to.be.equal(200);
                                      //sort book by price low to high
                                      request(app)
                                        .get(`/api/v1/priceLowToHigh/`)
                                        .set({ authorization: bearerToken })
                                        .end((err, res) => {
                                          expect(res.statusCode).to.be.equal(200);
                                          //sort book by price high to low
                                          request(app)
                                            .get(`/api/v1/priceHighToLow/`)
                                            .set({ authorization: bearerToken })
                                            .end((err, res) => {
                                              expect(res.statusCode).to.be.equal(200);
                                              //delete book
                                              request(app)
                                                .delete(`/api/v1/book/${id}`)
                                                .set({ authorization: bearerToken })
                                                .end((err, res) => {
                                                  expect(res.statusCode).to.be.equal(200);
                                                  done();
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
  });
  describe('/cart', () => {
    it('given cart details if proper should pass all API tests', (done) => {
      const bearerToken =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWY2YjBiYjU1NzIwOTI0M2NhNWQ1NDQiLCJmaXJzdE5hbWUiOiJTYW1lZXIiLCJsYXN0TmFtZSI6IkphZGhhdiIsImVtYWlsIjoic2FtZWVyMTkwOTE5OTRAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ0NjYzMTcyLCJleHAiOjE2NDUwMjMxNzJ9.tXiH5O4n69zLIyV7sag4F5shsgepuzvezQ_1NrmdAgQ';
      //Add Book
      request(app)
        .post('/api/v1/book/')
        .set({ authorization: bearerToken })
        .set('content-type', 'multipart/form-data')
        .field('author', 'test author')
        .field('title', 'test title')
        .attach('image', fs.readFileSync(`${__dirname}/rich dad.jpg`), `tests/integration/rich dad.jpg`)
        .field('quantity', 1)
        .field('price', 10)
        .field('description', 'this is an integration test')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          const id = res.body.data._id;
          const data = { quantity: res.body.data.quantity };
          const remove = {
            title: res.body.data.title,
            quantity: res.body.data.quantity
          };
          //Add to cart
          request(app)
            .post(`/api/v1/cart/${id}`)
            .set({ authorization: bearerToken })
            .send(data)
            .end((err, res) => {
              expect(res.statusCode).to.be.equal(201);
              //view cart
              request(app)
                .get(`/api/v1/cart/`)
                .set({ authorization: bearerToken })
                .end((err, res) => {
                  expect(res.statusCode).to.be.equal(200);
                  //remove book
                  request(app)
                    .put(`/api/v1/cart/`)
                    .set({ authorization: bearerToken })
                    .send(remove)
                    .end((err, res) => {
                      expect(res.statusCode).to.be.equal(200);
                      const cartId = res.body.data._id;
                      console.log(res.body.data._id);
                      //confirm booking
                      request(app)
                        .put(`/api/v1/cart/${cartId}`)
                        .set({ authorization: bearerToken })
                        .end((err, res) => {
                          expect(res.statusCode).to.be.equal(400);
                          done();
                        });
                    });
                });
            });
        });
    });
  });
  describe('/wishlist', () => {
    it.only('given details if proper should pass all API tests', (done) => {
      const bearerToken =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWY2YjBiYjU1NzIwOTI0M2NhNWQ1NDQiLCJmaXJzdE5hbWUiOiJTYW1lZXIiLCJsYXN0TmFtZSI6IkphZGhhdiIsImVtYWlsIjoic2FtZWVyMTkwOTE5OTRAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ0NjYzMTcyLCJleHAiOjE2NDUwMjMxNzJ9.tXiH5O4n69zLIyV7sag4F5shsgepuzvezQ_1NrmdAgQ';
      //Add Book
      request(app)
        .post('/api/v1/book/')
        .set({ authorization: bearerToken })
        .set('content-type', 'multipart/form-data')
        .field('author', 'test author')
        .field('title', 'test title')
        .attach('image', fs.readFileSync(`${__dirname}/rich dad.jpg`), `tests/integration/rich dad.jpg`)
        .field('quantity', 1)
        .field('price', 10)
        .field('description', 'this is an integration test')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          const id = res.body.data._id;
          //Add book to wishlist
          request(app)
            .post(`/api/v1/wishlist/${id}`)
            .set({ authorization: bearerToken })
            .end((err, res) => {
              expect(res.statusCode).to.be.equal(201);
              //Remove book from wishlist
              request(app)
                .put(`/api/v1/wishlist/${id}`)
                .set({ authorization: bearerToken })
                .end((err, res) => {
                  expect(res.statusCode).to.be.equal(200);
                  done();
                });
            });
        });
    });
  });
});
