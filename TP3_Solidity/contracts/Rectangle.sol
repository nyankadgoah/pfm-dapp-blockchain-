// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Forme.sol";

contract Rectangle is Forme {

    uint public lo;
    uint public la;

    constructor(int _x, int _y, uint _lo, uint _la)
        Forme(_x, _y)
    {
        lo = _lo;
        la = _la;
    }

    function surface() public view override returns (uint) {
        return lo * la;
    }

    function afficheLoLa() public view returns (uint, uint) {
        return (lo, la);
    }

    function afficheInfos() public view override returns (string memory) {
        return "Rectangle";
    }
} 