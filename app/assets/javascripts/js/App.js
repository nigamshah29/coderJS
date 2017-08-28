console.log('HI');

App = {
  web3Provider: null,
  contracts: {},

  initWeb3: function() {
      // Initialize web3 and set the provider to the testRPC.
    App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545');
    App.web3 = new Web3(App.web3Provider);
     //  if (typeof web3 !== 'undefined') {
     //    App.web3Provider = App.web3.currentProvider;
     //    App.web3 = new Web3(App.web3.currentProvider);
     //  } else {
     //    // set the provider you want from Web3.providers
      //   console.log(web3);
      // }

      App.initContract();
    },


  initContract: function() {
    $.getJSON('/Coder.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var CoderArtifact = data;
      App.contracts.Coder = TruffleContract(CoderArtifact);

      // Set the provider for our contract.
      App.contracts.Coder.setProvider(App.web3Provider);

      // get accounts from TestRPC
      web3.eth.getAccounts(function(error, accounts){
        if (error) {
          console.log(error);
        }
       });
     })
    },


  handleStartRequirement: function(reqId, payment_amount) {
    var coderInstance;
    App.web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      } 
      // Set client equal to a testrpc account, change to MetaMask address
      let client = accounts[2];

      App.contracts.Coder.deployed().then(function(instance) {
        coderInstance = instance;
          return coderInstance.startRequirement({
            contract_amount: payment_amount,
            from: client, 
            value: web3.toWei(payment_amount/100, "ether")
          });
      }).then(function(success) {
        alert("Payment Received");
        App.markInProgress(reqId);
      }).catch(function(err) {
        console.error(err.message);
      });
    })
  },


  markInProgress: function(reqId) { 
    $(`#start_requirement_${reqId}`).text('In Progress...').attr('disabled', true);
  },


  approveRequirement: function(reqId, payment_amount) {
    var coderInstance;
    App.web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      } 
      // Set coderAdmin equal to a testrpc account, change to MetaMask address
      let coderAdmin = accounts[4];

      App.contracts.Coder.deployed().then(function(instance) {
        coderInstance = instance;
          return coderInstance.closeRequirement({
            contract_amount: payment_amount,
            from: client, 
            value: web3.toWei(payment_amount/100, "ether")
          });
      }).then(function(success) {
        return App.markInProgress(reqId);
      }).catch(function(err) {
        console.error(err.message);
      });
    })
  },


};



$(document).ready(() => {
  window.App = App; 
  App.initWeb3()
});