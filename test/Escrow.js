const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Escrow', () => {
    let realEstate
    let buyer, seller, inspector, lender

    // run all the code before each other tests deployment...
    beforeEach(async () => {
        // Setup accounts
        [buyer, seller, inspector, lender] = await ethers.getSigners() //returns an array of fake people on blockchain/metamask account woith eth inside for testing
        //console.log(signers)
        //buyer is the index 0 of the array of signers
        //seller is the index 1 of the array of signers

        // Deploy Real Estate contract
        const RealEstate = await ethers.getContractFactory('RealEstate')
        realEstate = await RealEstate.deploy()
      
        // Mint, seller connects to realEstate contact and create/mint a new NFT witjh the tokenURI
        let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmQUozrHLAusXDxrvsESJ3PYB3rUeUuBAvVWw6nop2uu7c/1.png")
        await transaction.wait()

        // Deploy Escrow
        const Escrow = await ethers.getContractFactory('Escrow')
        escrow = await Escrow.deploy(realEstate.address, seller.address, inspector.address, lender.address)
        
    })

    // check if the the entities are saved
    describe('Deployment', () => {
        it('Returns NFT address', async () => {
            const result = await escrow.nftAddress()
            expect(result).to.be.equal(realEstate.address)
        })
    
        it('Returns Seller', async () => {
            const result = await escrow.seller()
            expect(result).to.be.equal(seller.address)
        })
    
        it('Returns Inspector', async () => {
            const result = await escrow.inspector()
            expect(result).to.be.equal(inspector.address)
        })
    
        it('Returns Lender', async () => {
            const result = await escrow.lender()
            expect(result).to.be.equal(lender.address)
        })
    })


})
