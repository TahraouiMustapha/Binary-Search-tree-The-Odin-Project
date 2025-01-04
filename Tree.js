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

    nextBiggest(root) {
      if(root.leftChild == null) return root;
      return this.nextBiggest(root.leftChild);
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

    deleteItem(root, value) {
      if(root == null) return null;
      else {
        if(value < root.value) {
          root.leftChild = this.deleteItem(root.leftChild, value);
          return root;
        } else if(value > root.value) {
          root.rightChild = this.deleteItem(root.rightChild, value);
          return root;
        } else { // if the value == root.value
          if(root.leftChild == null && root.rightChild == null ) return null; // removing node has no child
          else if(root.leftChild != null && root.rightChild != null) { // removing node has two child
            const nextBigNode = this.nextBiggest(root.rightChild);
            root.rightChild = this.deleteItem(root.rightChild, nextBigNode.value);
            root.value = nextBigNode.value;
            return root;
          } else {
            return root.leftChild ? root.leftChild : root.rightChild; //removing node has one child 
          }
        }
      } 
    }

    find(root, value) {
      if(root == null) return null;
      else {
        if(value < root.value) {
          return this.find(root.leftChild, value)
        } else if( value > root.value ) {
          return this.find(root.rightChild, value)
        } else { // if the value == root.value
          return root;
        }
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
 

const test  = new Tree([50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 65, 90]);

prettyPrint(test.root);

console.log('the node with 30');
console.log(test.find(test.root, 30).value)
console.log('the node with 10');
console.log(test.find(test.root, 10).value)
console.log('the node with 70');
console.log(test.find(test.root, 70).value)

prettyPrint(test.root);






