// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

abstract contract Forme {

    int public x;
    int public y;

    constructor(int _x, int _y) {
        x = _x;
        y = _y;
    }

    function deplacerForme(int dx, int dy) public {
        x = x + dx;
        y = y + dy;
    }

    function afficheXY() public view returns (int, int) {
        return (x, y);
    }

    function afficheInfos() public view virtual returns (string memory);

    function surface() public view virtual returns (uint);
} 