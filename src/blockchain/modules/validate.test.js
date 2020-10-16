import Blockchain from '../blockchain';
import validate from './validate';

describe('validate()', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    it('Se creó una cadena válida', () => {
        blockchain.addBlock('transact0');
        blockchain.addBlock('transact1');

        expect(validate(blockchain.blocks)).toBe(true);
    });

    it('Invalidando cadena con un genesis block corrupto', () => {
        blockchain.blocks[0].data = 'h4ck-data';

        expect(() => {
            validate(blockchain.blocks);
        }).toThrowError('Block genesis inválido');
    });

    it('Invalidando una cadena con un previous Hash corrupto en un block', () => {
        blockchain.addBlock('transact2');
        blockchain.blocks[1].previousHash = 'h4ck-previousHash';

        expect(() => {
            validate(blockchain.blocks);
        }).toThrowError('Invalid previous hash');
    });

    it('Invalidando una cadena con un block que tiene un hash corrupto', () => {
        blockchain.addBlock('transact3');
        blockchain.blocks[1].hash = 'h4ck-hash';

        expect(() => {
            validate(blockchain.blocks);
        }).toThrowError('Hash inválido');
    });
});