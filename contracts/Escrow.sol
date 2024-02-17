//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

//can find this func in https://eips.ethereum.org/EIPS/eip-721, is like a copy of a function from IERC721
interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
}

contract Escrow {
    address public nftAddress;
    address payable public seller;
    address public inspector;
    address public lender;

    //key is the nftid and value is boolean if its listed or not
    mapping(uint256 => bool) public isListed;
    mapping(uint256 => uint256) public purchasePrice;
    mapping(uint256 => uint256) public escrowAmount;
    mapping(uint256 => address) public buyer;

    constructor(address _nftAddress, address payable _seller, address _inspector, address _lender){
        nftAddress = _nftAddress;
        seller = _seller;
        inspector = _inspector;
        lender = _lender;
    }

    // the NFT with nftID will pass from the guy who call this func to the creator of this SC
    // transfer NFT from seller to this contract
    function list(uint256 _nftID, address _buyer, uint256 _purchasePrice, uint256 _escrowAmount) public {
        IERC721(nftAddress).transferFrom(msg.sender, address(this), _nftID);
        isListed[_nftID] = true;
        purchasePrice[_nftID] = _purchasePrice;
        escrowAmount[_nftID] = _escrowAmount;
        buyer[_nftID] = _buyer;
    }


}
