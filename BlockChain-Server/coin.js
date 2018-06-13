const Blockchain = require('./BlockChain');

class Coin {
    constructor() {
        this.blockchain = new Blockchain()
        this.getChain = this.getChain.bind(this);
        this.mine = this.mine.bind(this);
        this.newTransaction = this.newTransaction.bind(this);
        this.lastTransaction = this.lastTransaction.bind(this);
    }
    getChain(req, res, next) {
        req.responseValue = {
            message: 'Get Chain',
            chain: this.blockchain.chain
        }
        return next()
    }


    lastTransaction(req, res, next) {
        req.responseValue = {
            message: 'Get last transaction',
            lastTransaction:this.blockchain.chain.slice(-1)[0]
        }
        return next()
    }

    mine(req, res, next) {
        const lastBlock = this.blockchain.lastBlock();
        const lastProof = lastBlock.proof;
        const proof = this.blockchain.proofOfWork(lastProof);

        // Create a new transaction with from 0 (this node) to our node (NODE_NAME) of 1 Chiccocoin
        //this.blockchain.newTransaction('0', 'Sankar', 1)

        // Forge the new Block by adding it to the chain
        const previousHash = this.blockchain.hash(lastProof)
        const newBlock = this.blockchain.newBlock(proof, previousHash)

        const responseValue = Object.assign({
            message: 'New Block mined'
        }, newBlock)
        req.responseValue = responseValue
        return next()
    }

    newTransaction(req, res, next) {
        const trans = req.body;
        const index = this.blockchain.newTransaction(req.body)
        const responseValue = {
            message: `Transaction will be added to Block ${index}`
        }
        req.responseValue = responseValue
        return next()
    }
}

module.exports = new Coin()
