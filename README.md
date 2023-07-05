# vault-mantle-controller<code><a href="https://www.docker.com/" target="_blank"><img height="50" src="https://www.gitbook.com/cdn-cgi/image/width=256,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F2129957930-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FNHXgeqhgrznnRobzznxl%252Flogo%252FVdd8If7PeIF0Mrftq3Er%252FNYDPMM5Q.png%3Falt%3Dmedia%26token%3D2dd08523-d5b3-4bcf-aaf4-70368842ecdb"></a></code>

[![npm version](https://badge.fury.io/js/@getsafle%2Fvault-mantle-controller.svg)](https://badge.fury.io/js/@getsafle%2Fvault-mantle-controller)   <img alt="Static Badge" src="https://img.shields.io/badge/License-MIT-green">   [![Discussions][discussions-badge]][discussions-link]
 <img alt="Static Badge" src="https://img.shields.io/badge/Mantle_controller-documentation-purple">   

A Module is written in javascript for managing various keyrings of Mantle accounts, encrypting them, and using them. This repository contains `MANTLEHdKeyring` class to create **Mantle wallet** from **Safle Vault**.

- [Installation](#installation)
- [Initialize the Mantle Controller class](#initialize-the-mantle-controller-class)
- [Methods](#methods)
  - [Generate Keyring with 1 account and encrypt](#generate-keyring-with-1-account-and-encrypt)
  - [Restore a keyring with the first account using a mnemonic](#restore-a-keyring-with-the-first-account-using-a-mnemonic)
  - [Add a new account to the keyring object](#add-a-new-account-to-the-keyring-object)
  - [Export the private key of an address present in the keyring](#export-the-private-key-of-an-address-present-in-the-keyring)
  - [Sign a transaction](#sign-a-transaction)
  - [Sign a message](#sign-a-message)
  - [Get balance](#get-balance)


## Installation
```
npm install --save @getsafle/vault-mantle-controller
```
## Initialize the Mantle Controller class

```
const { KeyringController, getBalance } = require('@getsafle/vault-mantle-controller');

const mantleController = new KeyringController({
  encryptor: {
    // An optional object for defining encryption schemes:
    // Defaults to Browser-native SubtleCrypto.
    encrypt(password, object) {
      return new Promise('encrypted!');
    },
    decrypt(password, encryptedString) {
      return new Promise({ foo: 'bar' });
    },
  },
});
```

## Methods

### Generate Keyring with 1 account and encrypt

```
const keyringState = await mantleController.createNewVaultAndKeychain(password);
```

### Restore a keyring with the first account using a mnemonic

```
const keyringState = await mantleController.createNewVaultAndRestore(password, mnemonic);
```

### Add a new account to the keyring object

```
const keyringState = await mantleController.addNewAccount(keyringObject);
```

### Export the private key of an address present in the keyring

```
const privateKey = await mantleController.exportAccount(address);
```

### Sign a transaction

```
const signedTx = await mantleController.signTransaction(mantleTx, _fromAddress);
```

### Sign a message

```
const signedMsg = await mantleController.signMessage(msgParams);
```

### Sign a message

```
const signedObj = await mantleController.sign(msgParams, pvtKey, web3Obj);
```

### Get balance

```
const balance = await getBalance(address, web3);
```
[discussions-badge]: https://img.shields.io/badge/Code_Quality-passing-rgba
[discussions-link]: https://github.com/getsafle/vault-mantle-controller/actions
