import PKG from './package.json';
import Block from './src/blockchain/block'

const { name, version, description, main, repository, author, license  } = PKG;
const { genesis } = Block;

// console.log( `${description} ${author}` );

const block1 = Block.mine(genesis, 'transact1');
console.log( block1.toString() );

const block2 = Block.mine(block1, 'transact2');
console.log( block2.toString() );