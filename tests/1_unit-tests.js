const chai = require('chai');
const assert = chai.assert;
const Translator = require('../components/translator');
const translator = new Translator();

suite('Unit Tests', () => {
  test('Translate Mangoes are my favorite fruit.', () => {
    assert.equal(
      translator.translate('Mangoes are my favorite fruit.', 'american-to-british'),
      'Mangoes are my <span class="highlight">favourite</span> fruit.'
    );
  });

  test('Translate I ate yogurt for breakfast.', () => {
    assert.equal(
      translator.translate('I ate yogurt for breakfast.', 'american-to-british'),
      'I ate <span class="highlight">yoghurt</span> for breakfast.'
    );
  });

  // Add all remaining 22 translation tests...
});

