// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./MarketPlace.sol";

// Factory Contract Address: 0xe688a2d721778D06A11B11fE4EDb662493d4D64f
contract MarketPlaceFactory{

    MarketPlace[] private marketPlaces;
    mapping(address => bool) private retailerAddresses;
    mapping(address => address) private retailerContract;

    event MarketPlaceCreated(address retailer, address marketPlace);
    
    function createMarketPlace(string memory _name, string memory _description) public returns (address) {
        require(!retailerAddresses[msg.sender], "Retailer already added");
        retailerAddresses[msg.sender] = true;
        MarketPlace marketPlace = new MarketPlace(_name, _description);
        marketPlaces.push(marketPlace);
        retailerContract[msg.sender] = address(marketPlace);
        emit MarketPlaceCreated(msg.sender, address(marketPlace));
        return address(marketPlace);
    }

    function isRetailer(address _retailer) public view returns (bool) {
        return retailerAddresses[_retailer];
    }

    // Assume that one retailer can have only one contract
    function getMarketPlaceCount() public view returns (uint8) {
        return uint8(marketPlaces.length);
    }

    function getRetailerContract(address _retailer) public view returns (address) {
        require(retailerAddresses[_retailer], "Retailer not added");

        return retailerContract[_retailer];
    }
}
