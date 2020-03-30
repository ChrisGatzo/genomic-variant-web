const genes = require('./genes')

module.exports = () => {
  return {
    genes: genes,
    autocomplete: ['test1', 'test2']
  }
}