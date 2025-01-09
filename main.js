import { Tree, prettyPrint } from "./Tree.js";

let randomArray = [55, 32, 94, 73, 82, 89, 24, 54, 15, 43];

const myTree = new Tree(randomArray);
console.log(`The Tree is ${myTree.isBalanced() ? 'Balanced' : 'Unbalanced'}`);

prettyPrint(myTree.root);
// print out all elements in (pre, in, post, level) order
printOutAllElement(myTree);

// adding several numbers > 100 
myTree.insert(100)
myTree.insert(101)

prettyPrint(myTree.root);
// confirm that the tree in unbalanced
console.log(`The Tree is ${myTree.isBalanced() ? 'Balanced' : 'Unbalanced'}`);
// rebalance the tree
myTree.rebalance();
prettyPrint(myTree.root);
console.log(`The Tree is ${myTree.isBalanced() ? 'Balanced' : 'Unbalanced'}`);
// print out all elements again
printOutAllElement(myTree);

function printOutAllElement( tree ) {
    let myTraverse = [];
    const orders = ['preOrder', 'inOrder', 'postOrder', 'levelOrder'];
    orders.forEach((order) => {
        myTraverse = [];
        tree[order]((node) => myTraverse.push(node.value));
        console.log(`The elements in ${order} : ${myTraverse}`);
    })
}