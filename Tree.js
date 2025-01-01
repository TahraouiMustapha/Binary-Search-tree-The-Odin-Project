import { sort } from "./sortModule.js";

class Tree {
    constructor() {
        this.root = null;
    }

    buildTree(array) {
        array = [...new Set(array)];// to remove the dublicate numbers with O(1) time complexity
        array = sort(array);
    }
}   

const test  = new Tree(); 
console.log(test.buildTree([]))
