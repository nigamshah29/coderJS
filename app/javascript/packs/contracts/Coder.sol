pragma solidity ^0.4.4;

contract Coder {

  enum GameState {notStarted, inProgress, requirementApproved}  //states that a "Requirement" object will go through
  GameState public currentState;  //currentState variable that is set to the state the Requirement is in
  address public coderAdmin;  //ETH wallet address for the Coder project admin or PM
  address public client;  //ETH wallet address for the client
  // address public coderUser;  //ETH wallet address for the developer or worker executing on Requirement
  uint256 contract_amount; //expected_hours * project_bill_rate


  modifier onlyState(GameState expectedState) { if(expectedState == currentState) { _; } else { revert(); } }

  //Constructor function to initialize smart contract
  function Coder() {
    currentState = GameState.notStarted;
  }


  function startRequirement(uint256 _contract_amount) onlyState(GameState.notStarted) payable returns (bool) {
      // client = _client;
      client = msg.sender;
      contract_amount = _contract_amount;
      if (msg.value == contract_amount) {
        currentState = GameState.inProgress;
        return true;
      }
      else {
        revert();
        return false;
      }
      return true;
  }


  // function approvalRequest(address _coderAdmin) onlyState(GameState.inProgress) returns (bool) {
  //     coderAdmin = _coderAdmin;
  //     currentState = GameState.pendingApproval;
  //     return true;
  // }


  function closeRequirement(address _coderAdmin) onlyState(GameState.inProgress) payable returns (bool) {
      coderAdmin = _coderAdmin;
      coderAdmin.transfer(this.balance);
      currentState = GameState.requirementApproved;
      return true;
      selfdestruct(client);
  }

  function getBalance() constant returns (uint256) {
    return this.balance;
  }


}

