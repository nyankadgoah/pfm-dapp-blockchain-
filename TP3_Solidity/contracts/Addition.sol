// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Addition {

    uint a = 10;
    uint b = 20;

    function addition1()
        public
        view
        returns (uint)
    {
        return a + b;
    }

    function addition2(uint x, uint y)
        public
        pure
        returns (uint)
    {
        return x + y;
    }
}