/**
 * Created by yangjie on 2017/9/24.
 */
function BinaryTree() {
    var Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };
    var root = null;
    
    var insertNode = function (node,newNode) {
        if(newNode.key < node.key) {
           if(node.left == null) { //如果新节点的值小于老节点的值,并且老节点的left值不存在的话,就将新节点置为老节点的left值
               node.left = newNode;
           } else {
               insertNode(node.left,newNode);
           }
        } else {
            if(node.right == null) { //如果新节点的值大于老节点的值,并且老节点的right值不存在的话,就将新节点置为老节点的right值
                node.right = newNode;
            } else {
                insertNode(node.right,newNode);
            }
        }
    }

    var inOrderTraversNode = function (node,callBack) { //二叉树的遍历 中序遍历
        if(node !== null) {
            inOrderTraversNode(node.left,callBack);
            callBack(node.key);
            inOrderTraversNode(node.right,callBack);
        }
    }

    var callBack = function (key) {
        console.log(key);
    }

    this.insert = function (key) {
        var newNode = new Node(key);
        if(root == null) {
            root = newNode
        } else {
            insertNode(root,newNode);
        }
    }

    this.inOrderTravers = function () {
        inOrderTraversNode(root,callBack);
    }
}

var nodes = [78,3,1,8,14,6,7,13,2,79];
var binaryTree = new BinaryTree();
nodes.forEach(function (item) {
    binaryTree.insert(item);
});
binaryTree.inOrderTravers();




