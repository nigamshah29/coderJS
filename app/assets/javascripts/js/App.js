console.log('HI');

App = {
	web3Provider: null,
	contracts: {},

	initWeb3: function() {
	    // Initialize web3 and set the provider to the testRPC.
	    if (typeof web3 !== 'undefined') {
	      App.web3Provider = web3.currentProvider;
	      web3 = new Web3(web3.currentProvider);
	    } else {
	      // set the provider you want from Web3.providers
	      App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545');
	      web3 = new Web3(App.web3Provider);
	      console.log(web3);
	    }
	    return App.initContract();
  	},

  	initContract: function() {
	    $.getJSON('/Coder.json', function(data) {
	    	debugger;
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
  	      });
  	    })
      },

  	handleStartRequirement: function(reqId, payment_amount) {
      debugger;
      // var reqId = parseInt($(event.target).data('id'));

      var coderInstance;

      web3.eth.getAccounts(function(error, accounts){
        if (error) {
          console.log(error);
        }

        // Set client equal to Testrpc account 0
        let client = accounts[0];

        App.contracts.Coder.deployed().then(function(instance) {
          coderInstance = instance;
        debugger;
          return coderInstance.startRequirement(client, payment_amount);
        }).then(function(result) {
          return App.startRequirement();
        }).catch(function(err) {
          console.log(err.message);
        });
      });
    },

    markAdopted: function(adopters, account) {

      let coderAdmin = accounts[1];

      var adoptionInstance;
      debugger;
      console.log(App.web3Provider);

      App.contracts.Coder.deployed().then(function(instance) {
        adoptionInstance = instance;

        return adoptionInstance.getAdopters.call();
      }).then(function(adopters) {
        for (i = 0; i < adopters.length; i++) {
          if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
            $('.panel-pet').eq(i).find('button').text('Pending...').attr('disabled', true);
          }
        }
      }).catch(function(err) {
        console.log(err.message);
      });  
    }
  }


$(document).ready(() => {
  window.App = App; 
  App.initWeb3()
});