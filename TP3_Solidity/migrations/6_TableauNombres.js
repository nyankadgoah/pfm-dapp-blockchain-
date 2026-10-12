const TableauNombres = artifacts.require("TableauNombres");

module.exports = function (deployer) {
    deployer.deploy(TableauNombres);
}; 