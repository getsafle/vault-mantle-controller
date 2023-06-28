# vault-mantle-controller

This repository contains `mantleHdKeyring` class to create **Mantle wallet** from **Safle Vault**.

## Install

`npm install --save @getsafle/vault-mantle-controller`

## Initialize the MANTLE Controller class

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
### Get balance

```
const balance = await getBalance(address, web3);
```

### Import Wallet into keyring

```
const address = await mantleController.importWallet(_privatekey);
```