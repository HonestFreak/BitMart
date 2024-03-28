// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;


contract Retailer {
    mapping(address => bool) public retailerAddresses;
    
    // mapping of retailer address to his contract address
    mapping(address => address) public retailerContract;

    uint8 public retailerCount;

    event RetailerAdded(address retailer);

    constructor() {
        retailerAddresses[msg.sender] = true;
        retailerCount = 1;
    }

    function addRetailer(address _retailer) public {
        require(!retailerAddresses[_retailer], "Retailer already added");

        retailerAddresses[_retailer] = true;
        retailerCount++;

        emit RetailerAdded(_retailer);
    }

    function isRetailer(address _retailer) public view returns (bool) {
        return retailerAddresses[_retailer];
    }

    function getRetailerCount() public view returns (uint8) {
        return retailerCount;
    }

    function setRetailerContract(address _retailer, address _contract) public {
        require(retailerAddresses[_retailer], "Retailer not added");

        retailerContract[_retailer] = _contract;
    }

    function getRetailerContract(address _retailer) public view returns (address) {
        require(retailerAddresses[_retailer], "Retailer not added");

        return retailerContract[_retailer];
    }
}