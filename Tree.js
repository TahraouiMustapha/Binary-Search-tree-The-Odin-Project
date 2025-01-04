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

    levelOrder(callback) {
      if(typeof callback !== 'function') throw new Error("a callback is required");
      else {
        let queue = [];
        queue.push(this.root);
        while(queue.length !== 0) {
          let node = queue.shift();
          callback(node);
          node.leftChild ? queue.push(node.leftChild) : null;
          node.rightChild ? queue.push(node.rightChild) : null;
        }
      }
    }

    preOrder(callback, root = this.root) {// root left right
      if(typeof callback !== 'function') throw new Error("a callback is required");
      if(root !== null) {
        callback(root);
        this.preOrder(callback, root.leftChild);
        this.preOrder(callback, root.rightChild);
      }
    }

    inOrder(callback, root = this.root) { // left root right
      if(typeof callback !== 'function') throw new Error("a callback is required");
      if(root !== null) {
        this.inOrder(callback, root.leftChild);
        callback(root);
        this.inOrder(callback, root.rightChild);
      }
    }

    postOrder(callback, root = this.root) { // left right root
      if(typeof callback !== 'function') throw new Error("a callback is required");
      if(root !== null) {
        this.postOrder(callback, root.leftChild);
        this.postOrder(callback, root.rightChild);
        callback(root);
      }
    }

    height(node) {
      if(node == null) return 0;
      if(node.leftChild || node.rightChild) {
        let leftHeight = this.height(node.leftChild);
        let rightHeight = this.height(node.rightChild);
        return 1 + ( leftHeight > rightHeight ? leftHeight : rightHeight);
      } 
      return 0;
    }

    depth( node, root = this.root) {
      if(node.value < root.value) return 1 + this.depth( node, root.leftChild);
      else if( node.value > root.value) return 1 + this.depth( node, root.rightChild);
      else return 0;// the root is the node given
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
test.insert(test.root, 92)
test.insert(test.root, 95)
prettyPrint(test.root);
const testNode = test.find(test.root, 95);
console.log(test.depth( testNode))





