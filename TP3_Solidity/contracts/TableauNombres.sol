// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TableauNombres {

    uint[] nombres;

    constructor() {
        nombres.push(10);
        nombres.push(20);
        nombres.push(30);
    }

    function ajouterNombre(uint nombre) public {
        nombres.push(nombre);
    }

    function getElement(uint index) public view returns (uint) {
        require(index < nombres.length, "Index inexistant");
        return nombres[index];
    }

    function afficheTableau() public view returns (uint[] memory) {
        return nombres;
    }

    function calculerSomme() public view returns (uint) {
        uint somme = 0;

        for (uint i = 0; i < nombres.length; i++) {
            somme += nombres[i];
        }

        return somme;
    }
} 