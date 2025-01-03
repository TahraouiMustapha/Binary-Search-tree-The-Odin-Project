import { sort } from "./sortModule.js";
import { Node } from "./Node.js";

class Tree {
    constructor(array = []) {
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

    insert(root, value) {
      if(root == null) {
        this.root = this.buildTree([value]); // for create the root if doesn't exist
        return;
      } else {
        const node = new Node(value);
        if(value < root.value) {
          if(root.leftChild == null) {
            root.leftChild = node;
          } else {
            root.leftChild = this.insert(root.leftChild, value);
          }
        } else if(value > root.value) {
          if(root.rightChild == null) {
            root.rightChild = node;
          } else {
            root.rightChild = this.insert(root.rightChild, value);
          }
        }
        return root;
      }

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
 
const test  = new Tree();
test.insert(test.root, 8)
test.insert(test.root, 4);
test.insert(test.root, 12);
test.insert(test.root, 2);
test.insert(test.root, 1);
test.insert(test.root, 3);
test.insert(test.root, 10);
prettyPrint(test.root);