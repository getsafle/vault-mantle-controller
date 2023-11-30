var assert = require('assert');
const Web3 = require('web3');
const CryptoJS = require('crypto-js');
const { KeyringController: MantleKeyring, getBalance } = require('../src/index')
const {
    HD_WALLET_12_MNEMONIC,
    HD_WALLET_12_MNEMONIC_TEST_OTHER,
    HD_WALLET_24_MNEMONIC,
    TESTING_MESSAGE_1,
    TESTING_MESSAGE_2,
    TESTING_MESSAGE_3,
    EXTERNAL_ACCOUNT_PRIVATE_KEY,
    EXTERNAL_ACCOUNT_ADDRESS,
    EXTERNAL_ACCOUNT_WRONG_PRIVATE_KEY_1,
    EXTERNAL_ACCOUNT_WRONG_PRIVATE_KEY_3,
    MANTLE_NETWORK: {
        TESTNET
    },
    TRANSFER_MANTLE: {
        MANTLE_AMOUNT,
        MANTLE_RECEIVER
    },
} = require('./constants');
/*
const CONTRACT_MINT_PARAM = {
    from: MANTLE_CONTRACT,
    to: '', // this will be the current account 
    amount: 1,
    nonce: 0,
    signature: [72, 0, 101, 0, 108, 0, 108, 0, 111, 0, 220, 122]
}
*/
const opts = {
    encryptor: {
        encrypt(pass, object) {
            const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(object), pass).toString();

            return ciphertext;
        },
        decrypt(pass, encryptedString) {
            const bytes = CryptoJS.AES.decrypt(encryptedString, pass);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            return decryptedData;
        },
    },
}

const opts_empty = {}

const PASSWORD = "random_password"

describe('Initialize wallet ', () => {
    const mantleKeyring = new MantleKeyring(opts)

    it("Create new vault and keychain", async () => {
        const res = await mantleKeyring.createNewVaultAndKeychain(PASSWORD)
        console.log("res=", res)
    })

    it("Create new vault and restore", async () => {
        const res = await mantleKeyring.createNewVaultAndRestore(PASSWORD, HD_WALLET_12_MNEMONIC)
        assert(mantleKeyring.keyrings[0].mnemonic === HD_WALLET_12_MNEMONIC, "Wrong mnemonic")
    }) 

    it("Export account (privateKey)", async () => {
        const res = await mantleKeyring.getAccounts()
        let account = res[0]
       // console.log(account)
        const accRes = await mantleKeyring.exportAccount(account)
        console.log("accRes ", accRes, Buffer.from(accRes, 'hex'))
    })

    it("Get accounts", async () => {
        const acc = await mantleKeyring.getAccounts()
        console.log("acc ", acc)
    })

    it("Should import correct account ", async () => {
        const address = await mantleKeyring.importWallet(EXTERNAL_ACCOUNT_PRIVATE_KEY)
        assert(address.toLowerCase() === EXTERNAL_ACCOUNT_ADDRESS.toLowerCase(), "Wrong address")
        assert(mantleKeyring.importedWallets.length === 1, "Should have 1 imported wallet")
    })
    it("Get fees with manual gasLimit", async () => {
        const accounts = await mantleKeyring.getAccounts()
        const web3 = new Web3(TESTNET.URL);
        const tx = {
            gasLimit: 2100
        }
        const fees = await mantleKeyring.getFees(tx, web3)
        console.log(" with manual gasLimit ", fees)

        const privateKey = await mantleKeyring.exportAccount(accounts[0])
        console.log('privatekey=',privateKey)
        const tx3 = await mantleKeyring.sign(TESTING_MESSAGE_1, privateKey, web3)
        console.log("tx3 ", tx3)
    })

    it("Get address balance", async () => {
        const accounts = await mantleKeyring.getAccounts()
        const web3 = new Web3(TESTNET.URL);
        //console.log("account" ,accounts);
        const balance = await getBalance(accounts[0], web3)
        console.log(" get balance ", balance, accounts)
    })

    it("Get fees for a mantle tx", async () => {
        const accounts = await mantleKeyring.getAccounts()
        const web3 = new Web3(TESTNET.URL);
        const tx = {
            from: accounts[0],
            to: '0x641BB2596D8c0b32471260712566BF933a2f1a8e',
            value: 0,
            data: '0x00'
        }
        const getEstimate = await mantleKeyring.getFees(tx, web3)
        console.log(" get gas estimate  ", getEstimate)
    })

    it("sign Transaction ", async () => {

        const accounts = await mantleKeyring.getAccounts()
        const from = accounts[0]
        const web3 = new Web3(TESTNET.URL);
        const rawTx = {
            to: '0xacde0f575d8caf7bdba417326797c1a1d1b21f88',        //recepient address
            from,
            nonce: await web3.eth.getTransactionCount(from),
            gasPrice: web3.utils.toHex(3),
            gas: web3.utils.toHex(300000),
            value: web3.utils.toHex(100000),
        }

        const privateKey = await mantleKeyring.exportAccount(accounts[0])
        const signedTX = await mantleKeyring.signTransaction(rawTx, privateKey)
        console.log("signedTX =", signedTX)

        //    const sentTX = await mantleKeyring.sendTransaction(signedTX, web3)
        //     console.log("sentTX ", sentTX)
    })

})