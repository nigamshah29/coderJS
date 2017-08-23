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
         // Use our contract to retrieve and mark the started requirements.
         return App.handleStartRequirement();
         // return App.startRequirement();
	      });
	    })
    },


	handleStartRequirement: function(reqId, payment_amount) {
    // var payment = String(payment_amount);
    var coderInstance;
    App.web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      } 
      // Set client equal to a testrpc account
      let client = accounts[0];
      App.contracts.Coder.deployed().then(function(instance) {
        coderInstance = instance;
          return coderInstance.startRequirement({
            contract_amount: payment_amount,
            from: client.toString(), 
            value: web3.toWei(1, "ether")
          });
      }).then(function(success) {
        debugger;
        App.markReadytoStart(reqId);
      }).catch(function(err) {
        console.error(err.message);
      });
    })
  },


  markReadytoStart: function(reqId) {      
    $('#start_requirement_reqId').find('button').text('Requirement Started').attr('disabled', true);
  }

};



$(document).ready(() => {
  window.App = App; 
  App.initWeb3()
});