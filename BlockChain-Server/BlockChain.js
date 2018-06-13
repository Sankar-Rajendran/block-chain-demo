const crypto = require('crypto');

class Blockchain {
    constructor() {
        // Create chain and transaction
        this.chain = []
        this.current_transactions = []

        // Binding of this
        this.newBlock = this.newBlock.bind(this)
        this.newTransaction = this.newTransaction.bind(this)
        this.lastBlock = this.lastBlock.bind(this)
        this.proofOfWork = this.proofOfWork.bind(this)

        // Mining  the genesis block
        this.newBlock(100, 1)
    }

    newBlock(proof, previousHash) {
        const block = {
            index: this.chain.length + 1,
            timestamp: new Date(),
            transactions: this.current_transactions,
            proof: proof,
            hash:this.hash(proof),
            previous_hash: previousHash
        }
        this.current_transactions = []
        this.chain.push(block)
        return block
    }

    newTransaction(params) {
        let engineChasisNo = 'ASDFRT12412', color = 'Blue', vehicleNo = 'TN 76 QE0006';
        var { oldOwner, newOwner, saleAmount, date, kmDriven, remarks } = params;
        this.current_transactions.push({
            oldOwner, newOwner, saleAmount, engineChasisNo, date, color, vehicleNo, kmDriven, remarks
        })
        return this.lastBlock()['index'] + 1
    }

    hash(block) {
        const blockString = JSON.stringify(block);
        console.log(blockString);
        const hash = crypto.createHmac('SHA1', 'secret@123')
            .update(blockString)
            .digest('hex')
        return hash
    }

    validProof(lastProof, proof) {
        const guessHash = crypto.createHmac('SHA1', 'secret@123')
            .update(`${lastProof}${proof}`)
            .digest('hex');
        return guessHash.substr(0, 5) === 'c4ee3';
    }

    proofOfWork(lastProof) {
        let proof = 0
        while (true) {
            if (!this.validProof(lastProof, proof)) {
                proof++
            } else {
                break
            }
        }
        return proof
    }

    lastBlock() {
        return this.chain.slice(-1)[0]
    }
}

module.exports = Blockchain
