window.CoderContract = {
  "contract_name": "Coder",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_contract_amount",
          "type": "uint256"
        }
      ],
      "name": "startRequirement",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": true,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "client",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "coderAdmin",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_coderAdmin",
          "type": "address"
        }
      ],
      "name": "closeRequirement",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": true,
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "type": "constructor"
    }
  ],
  "unlinked_binary": "0x6060604052341561000f57600080fd5b5b5b5b610235806100216000396000f300606060405263ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630d6a6a6d8114610069578063109e94cf1461008857806312065fe0146100b757806360a66a02146100dc5780638651ed2b1461010b575b600080fd5b610074600435610133565b604051901515815260200160405180910390f35b341561009357600080fd5b61009b610177565b604051600160a060020a03909116815260200160405180910390f35b34156100c257600080fd5b6100ca610186565b60405190815260200160405180910390f35b34156100e757600080fd5b61009b610195565b604051600160a060020a03909116815260200160405180910390f35b610074600160a060020a03600435166101a4565b604051901515815260200160405180910390f35b6001805473ffffffffffffffffffffffffffffffffffffffff191633600160a060020a03161790556002819055600034821461016e57600080fd5b5060015b919050565b600154600160a060020a031681565b600160a060020a033016315b90565b600054600160a060020a031681565b60008054600160a060020a0380841673ffffffffffffffffffffffffffffffffffffffff199092169190911780835581169030163180156108fc0290604051600060405180830381858888f19350505050151561016e57600080fd5b5060015b9190505600a165627a7a72305820219c58f4912bf60dd1939cd1f06d17977aa5d11cc5ea35d63a96220b855ab5940029",
  "networks": {
    "1502810624790": {
      "events": {},
      "links": {},
      "address": "0xf1e005760fc20496ce13051bced65b1b923531a5",
      "updated_at": 1504285181084
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1504285181084
}