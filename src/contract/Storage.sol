pragma solidity ^0.5.0;

contract Storage {
    constructor () public {}

    mapping (string => string) _storage;

    function getItem(string memory key) public view returns (string memory) {
        return _storage[key];
    }

    function setItem(string memory key, string memory value) public {
        _storage[key] = value;
    }

}
