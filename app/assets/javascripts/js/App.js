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
	      // Use our contract to retieve and mark the adopted pets.
	      return App.markAdopted();
	    });
  	},

  	handleAdopt: function() {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;

        return adoptionInstance.adopt(petId, {from: account});
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  markAdopted: function(adopters, account) {
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

$(document).ready(() => App.initWeb3());