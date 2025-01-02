import { sort } from "./sortModule.js";
import { Node } from "./Node.js";

class Tree {
    constructor(array) {
        array = [...new Set(array)];// to remove the dublicate numbers with O(n) rather than O(n^2) time complexity
        array = sort(array);
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        let middleIndex = Math.floor(array.length / 2);
        if(array[middleIndex]){        
            const node = new Node(array[middleIndex]);
            node.leftChild = array[middleIndex - 1] ? this.buildTree(array.slice(0, middleIndex)) : null;
            node.rightChild = array[middleIndex + 1] ? this.buildTree(array.slice(middleIndex + 1)) : null;
            return node; 
        }
        return null;
    }


}   

// this function is from Odin Project site
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}
 
const test  = new Tree([34, 34 , 3, 3, 2, 1]);
prettyPrint(test.root)