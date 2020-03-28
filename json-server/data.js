// const initialization = require('../cypress/fixtures/initialization.json')
// const currentUser = require('../cypress/fixtures/currentUser.json')
// const countryStates = require('../cypress/fixtures/countryStates.json')
// const validateZipCode = require('../cypress/fixtures/validateZipCode.json')
// const requisition = require('../cypress/fixtures/requisition.json')

const genes = require('../src/mocks/genes')

module.exports = () => {
  return {
    genes: genes,
    autocomplete: ['test1', 'test2']
  }
}