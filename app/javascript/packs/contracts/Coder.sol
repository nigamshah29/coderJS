pragma solidity ^0.4.4;

contract Coder {

  enum GameState {notStarted, inProgress, pendingApproval, requirementApproved}  //4 states that a "Requirement" object will go through
  GameState public currentState;  //currentState variable that is set to the state the Requirement is in
  address public coderAdmin;  //ETH wallet address for the Coder project admin or PM
  address public client;  //ETH wallet address for the client
  // address public coderUser;  //ETH wallet address for the developer or worker executing on Requirement
  uint contract_amount; //expected_hours * project_bill_rate


  modifier onlyState(GameState expectedState) { if(expectedState == currentState) { _; } else { revert(); } }

  //Constructor function to initialize smart contract
  function Coder() {
    currentState = GameState.notStarted;
  }

  function startRequirement(int _contract_amount) onlyState(GameState.notStarted) payable public returns (bool) {
      // client = _client;4
      client = msg.sender;2
      contract_amount = uint(_contract_amount);
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

  function approvalRequest(address _coderAdmin) onlyState(GameState.inProgress) returns (bool) {
      coderAdmin = _coderAdmin;
      currentState = GameState.pendingApproval;
      return true;
  }

  function closeRequirement() onlyState(GameState.pendingApproval) returns (bool){
      currentState = GameState.requirementApproved;
      return true;    
  }

  function payCoder() onlyState(GameState.requirementApproved) payable returns (bool){
    coderAdmin.transfer(this.balance);
    currentState = GameState.notStarted;
    return true;
    selfdestruct(client);
  }

  function getBalance() constant returns (uint256) {
    return this.balance;
  }


}

