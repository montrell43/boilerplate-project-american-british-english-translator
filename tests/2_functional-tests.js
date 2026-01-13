const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const assert = chai.assert;

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Translation with text and locale', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Mangoes are my favorite fruit.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
        done();
      });
  });

  test('Translation with invalid locale', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Hello', locale: 'invalid-locale' })
      .end((err, res) => {
        assert.equal(res.body.error, 'Invalid value for locale field');
        done();
      });
  });

  // Add remaining functional tests for missing fields, empty text, no translation
});
