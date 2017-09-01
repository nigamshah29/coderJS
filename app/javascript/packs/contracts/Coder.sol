pragma solidity ^0.4.4;

contract Coder {

  address public coderAdmin;  //ETH wallet address for the Coder project admin or PM
  address public client;  //ETH wallet address for the client
  uint256 contract_amount; //expected_hours * project_bill_rate


  //Constructor function to initialize smart contract
  function Coder() {
  }


  function startRequirement(uint256 _contract_amount) payable returns (bool) {
      client = msg.sender;
      contract_amount = _contract_amount;
      require(msg.value == contract_amount); 
      return true;
  }


  function closeRequirement(address _coderAdmin) payable returns (bool) {
      coderAdmin = _coderAdmin;
      coderAdmin.transfer(this.balance);
      return true;
      selfdestruct(client);
  }

  function getBalance() constant returns (uint256) {
    return this.balance;
  }


}

