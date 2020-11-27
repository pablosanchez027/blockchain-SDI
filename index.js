import PKG from "./package.json";
import Block from "./blockchain/block";

const { name, version, description, author} = PKG;
const {genesis} = Block;

const block1 = Block.mine(genesis, "transact1");
console.log(block1.toString());

const block2 = Block.mine(block1, "transact2");
console.log(block2.toString());