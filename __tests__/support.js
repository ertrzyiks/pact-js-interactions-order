const { pactWith } = require("jest-pact")

exports.pactWith = function (cb) {
  pactWith({ consumer: 'Consumer', provider: 'Provider', pactfileWriteMode: 'merge' }, cb)
}
