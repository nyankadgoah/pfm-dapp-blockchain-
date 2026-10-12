const SimpleContract_Ganache = artifacts.require("SimpleContract_Ganache");

module.exports = function (deployer) {
  deployer.deploy(SimpleContract_Ganache);
};