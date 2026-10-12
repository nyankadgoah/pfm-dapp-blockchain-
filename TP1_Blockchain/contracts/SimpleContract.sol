// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract SimpleContract {

    uint value;

    function setValue(uint _value)
    public
    {
        value = _value;
    }

    function getValue()
    public
    view
    returns(uint)
    {
        return value;
    }

}