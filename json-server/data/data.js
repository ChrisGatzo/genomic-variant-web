const genes = require('../../src/mocks/genes')

module.exports = () => {
  return {
    genes: genes,
    autocomplete: ['test1', 'test2']
  }
}