run tests, folder of tests are in test/Escrow.js, to test the Escrow SC
npx hardhat test


deploy SC on a local blockchain
npx hardhat node
cahnge scripts/deploy.js file to deplopy SC on blockchain

npx hardhat run scripts/deploy.js --network localhost


run webserver
npm run start

inside localhost:3000, go to metamask create a new network with
Network name: Hardhat
New RPC URL: will be the hardhat server local get from  npx hardhat run scripts/deploy.js --network localhost, it will be  http://127.0.0.1:8545/
ChainID: you can find inside src/config.json 31337
Current symbol: ETH

import accounts 
on the network terminal initiate by npx hardhat run scripts/deploy.js --network localhost

get the first 5 accounts private keys, 
go to metamask, click on accounts, add account -> import account, paste the private key of the account, rename the name account to Hardhat1,2,3...
