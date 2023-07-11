// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
    uint256 totalTip;
    address payable public owner;
    constructor() payable{
        // set owner as however deploys contract
        owner = payable(msg.sender);
        }

    // 
    event NewTip (
        address indexed from,
        uint256 timestamp,
        string message_tip, 
        string name
    );

    struct Tips {
        address sender;
        string message_tip;
        string name;
        uint256 timestamp;
        
    } 

    // empty data array, later populated
    Tips[] tips;

    function getAllTips() public view returns (Tips[] memory) {
        return tips;
    }

    function getTotalTips() public view returns (uint256) {
    return totalTip; // see number right under contract
    }


    function leaveTip (
        string memory _message_tip,
        string memory _name
        ) public payable {
            require(msg.value >= 0.001 ether, "Minimum tip is 0.001");
            
            totalTip += 1;
            tips.push(Tips(msg.sender, _message_tip, _name, block.timestamp));

            (bool success, ) = owner.call{value: msg.value}("");
            require(success, "Failed to send Ether to Daniel. Please try again.");

            emit NewTip(msg.sender, block.timestamp, _message_tip, _name);
        }

}