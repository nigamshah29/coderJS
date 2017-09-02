//= require Coder
console.log('HI');

// After migrate and moving to public folder:
// rename Coder.json to Coder.js
// set the contract equal to window.CoderContract. i.e:
// window.CoderContract = {...contract stuff}

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
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var CoderArtifact = CoderContract;
      App.contracts.Coder = TruffleContract(CoderArtifact);

      // Set the provider for our contract.
      App.contracts.Coder.setProvider(App.web3Provider);

      // get accounts from TestRPC
      web3.eth.getAccounts(function(error, accounts){
        if (error) {
          console.log(error);
        }
       });
    },


  handleStartRequirement: function(reqId, payment_amount) {
    var coderInstance;
    // var win = window;
    return new Promise((resolve, reject) => {
      const self = this;
      self.resolve = resolve;
      self.reject = reject;
      App.web3.eth.getAccounts(function(error, accounts){
        if (error) {
          console.log(error);
        } 
        // Set client equal to a testrpc account, change to MetaMask address
        let client = accounts[1];
        self.ethaccounts = accounts;
        return App.contracts.Coder.deployed().then(function(instance) {
          coderInstance = instance;
            return coderInstance.startRequirement(payment_amount, {
              from: client, 
              value: web3.toWei(payment_amount/100, "ether")
            });
        }).then(function(success) {
          alert("Payment Received");
          App.markInProgress(reqId);
          self.resolve(true);
        }).catch(function(err) {
          self.reject(false)
          console.error(err.message);
        });
      })

    }) //new promise
  },


  markInProgress: function(reqId) { 
    $(`#start_requirement_${reqId}`).text('In Progress...').attr('disabled', true);
  },


  approveRequirement: function() {
    var coderInstance;
    // var win = window;
    debugger;
    return new Promise((resolve, reject) => {
      const self = this;
      self.resolve = resolve;
      self.reject = reject;
      App.web3.eth.getAccounts(function(error, accounts){
        if (error) {
          console.log(error);
        } 
        // Set coderAdmin equal to a testrpc account, change to MetaMask address
        debugger;
        let coderAdmin = accounts[0];
        // App.contracts.Coder.deployed().
        //   then(function(instance) {
        //     coderInstance = instance;
        //     return coderInstance.getBalance().then(function(balance){
        //         console.log("Balance: ", balance);
        //       });
        //   });
        App.contracts.Coder.deployed().then(function(instance) {
          coderInstance = instance;
            return coderInstance.closeRequirement(coderAdmin, {
                to: coderAdmin
            });
        }).then(function(success) {
          alert("Payment Sent to Coder");
          return App.markApproved(reqId);
          self.resolve(true);
        }).catch(function(err) {
          self.reject(false);
          console.error(err.message);
        });
      });
    }) //new promise
  },


  markApproved: function(reqId) { 
    $(`#approve_requirement_${reqId}`).text('Approved...').attr('disabled', true);
  }

};



$(document).ready(() => {
  window.App = App; 
  App.initWeb3()

});
