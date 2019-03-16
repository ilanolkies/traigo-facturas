const TraigoFacturas = artifacts.require('TraigoFacturas');

module.exports = function(deployer) {
  deployer.deploy(TraigoFacturas);
};
