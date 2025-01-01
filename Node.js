class Node {
    constructor(value) {
        this.value = value;
        this.leftChild = null;
        this.rightChild = null;
    }
}

const node = new Node(3);
console.log(node.value);

export { Node };