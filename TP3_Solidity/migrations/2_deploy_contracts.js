const Rectangle = artifacts.require("Rectangle");
const Payment = artifacts.require("Payment");

module.exports = async function (deployer, network, accounts) {

    await deployer.deploy(Rectangle, 10, 20, 5, 8);

    await deployer.deploy(Payment, accounts[0]);

}; 