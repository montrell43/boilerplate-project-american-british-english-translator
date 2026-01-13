const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {
  translate(text, locale) {
    let translation = text;

    // Titles
    const titles = locale === 'american-to-british'
      ? americanToBritishTitles
      : invertDict(americanToBritishTitles);

    // Word dictionaries
    const americanToBritish = {
      ...americanOnly,
      ...americanToBritishSpelling
    };

    const britishToAmerican = {
      ...britishOnly,
      ...invertDict(americanToBritishSpelling)
    };

    const dict = locale === 'american-to-british' ? americanToBritish : britishToAmerican;

    // Sort keys by length descending to replace longer phrases first
    const sortedDictKeys = Object.keys(dict).sort((a, b) => b.length - a.length);
    const sortedTitleKeys = Object.keys(titles).sort((a, b) => b.length - a.length);

    // Replace titles first
    for (const key of sortedTitleKeys) {
      const val = titles[key];
      const re = new RegExp(`\\b${escapeRegex(key)}(?=\\s)`, 'g');
      translation = translation.replace(re, `<span class="highlight">${val}</span>`);
    }

    // Replace words/phrases
    for (const key of sortedDictKeys) {
      const val = dict[key];
      const re = new RegExp(`\\b${escapeRegex(key)}\\b`, 'gi');
      translation = translation.replace(re, `<span class="highlight">${val}</span>`);
    }

    // Translate time formats (10:30 ↔ 10.30)
    if (locale === 'american-to-british') {
      translation = translation.replace(/(\d{1,2}):(\d{2})/g, '<span class="highlight">$1.$2</span>');
    } else {
      translation = translation.replace(/(\d{1,2})\.(\d{2})/g, '<span class="highlight">$1:$2</span>');
    }

    // If no changes
    if (translation === text) return 'Everything looks good to me!';

    return translation;
  }
}

// Helper: invert dictionary
function invertDict(dict) {
  const inverted = {};
  for (const key in dict) {
    inverted[dict[key]] = key;
  }
  return inverted;
}

// Helper: escape special regex characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = Translator;
