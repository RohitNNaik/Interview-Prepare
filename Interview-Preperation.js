//DCA: Data custumers and analytics

const data = {
  color: "blue",
  size: "small",
  type: "short",
};

const orginze = () => {
  const item = Object.keys(data).map((item) => {
    return {
      key: item,
      value: data[item],
    };
  });
  return { items: item, count: item.length };
};
// console.log(orginze());

let add = function (a) {
  return function (b) {
    if (b) {
      return add(a + b);
    }
    return a;
  };
};

console.log(add(1)(2)(3)());

let name = {
  firstname: "Akshay",
  lastname: "saini",
};

let printName = function () {
  console.log(this.firstname + "" + this.lastname);
};

let printMyName = printName.bind(name);
printMyName();

Function.prototype.myBind = function (...args) {
  let obj = this;
  params = args.slice(1);
  return function (...args2) {
    //obj.call(args[0], params);
    obj.apply(args[0], [...params, ...args2]);
  };
};

//polifill for call
const objIntro = {
  name: "rahul",
  city: "gwalior",
};

function sayIntro(company) {
  console.log(
    `name is ${this.name}, place is ${this.city} and company is ${company}`
  );
}

Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error(this, "invalid call");
  }

  //for apply
  if (!Array.isArray(args)) {
    throw new TypeError("arguments are not in array");
  }

  context.fnc = this;
  context.fnc(...args);
};
sayIntro.myCall(objIntro, "cognizant");

//Debouncing

function Debouncing(fn, d) {
  let timer;
  return function () {
    let context = this;
    args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      getData.apply(context, arguments);
    }, d);
  };
}

//Trottling
function Trottling(fn, d) {
  let flag = true;
  return function () {
    let context = this;
    args = arguments;
    if (flag) {
      getData.apply(context, args);
      flag = false;
    }
    timer = setTimeout(() => {
      flag = true;
    }, d);
  };
}

//polifill for map

Array.prototype.myMap = function (calbkfn) {
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    arr.push(calbkfn(this[i], i, this));
  }
  return arr;
};

//polifill for filter

Array.prototype.myFilter = function (calbkfn) {
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    if (calbkfn(this[i], i, this)) {
      arr.push(this[i]);
    }
  }
  return arr;
};

//Polifill for reducer

Array.prototype.myreduce = function (calbkfn, intialValue) {
  let accumalator = intialValue;
  for (let i = 0; i < this.length; i++) {
    if (accumalator !== undefined) {
      accumalator = calbkfn.call(undefined, accumalator, this[i], i, this);
    } else {
      accumalator = this[i];
    }
  }
  return accumalator;
};

//factorial

let n = 5;
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

console.log(factorial(n));

//fibonacci

let no = 5;
function fibonacci(num) {
  if (num == 1) return 0;
  if (num == 2) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
}

console.log(fibonacci(no));

//leaner search
function search(nums, target) {
  for (let index = 0; index < nums.length; index++) {
    if (nums[index] == target) {
      return index;
    }
  }
  return -1;
}

//Binary search
function BinSearch(nums, target) {
  let length = nums.length;
  mid = length / 2;
  let start = nums[0];
  let end = length - 1;

  while (start < end) {
    if (target === nums[mid]) {
      return true;
    } else if (target > nums[mid]) {
      start = mid + 1;
      end = length - 1;
      BinSearch(mid, start, end, target);
    } else {
      start = 0;
      end = mid - 1;
      BinSearch(mid, start, end, target);
    }
  }
}

// Bubble sort Implementation using Javascript

// Creating the bblSort function
function bblSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    // Last i elements are already in place
    for (var j = 0; j < arr.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (arr[j] > arr[j + 1]) {
        // If the condition is true
        // then swap them
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

//selection sort
function selectionSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }
  return array;
}

//Quick sort
function partition(items, leftIndex, rightIndex) {
  const pivotIndex = Math.floor((leftIndex + rightIndex) / 2);

  while (leftIndex <= rightIndex) {
    while (items[leftIndex] < items[pivotIndex]) {
      leftIndex++;
    }

    while (items[rightIndex] > items[pivotIndex]) {
      rightIndex--;
    }

    if (leftIndex <= rightIndex) {
      [items[leftIndex], items[rightIndex]] = [
        items[rightIndex],
        items[leftIndex],
      ];
      leftIndex++;
      rightIndex--;
    }
  }

  return leftIndex;
}

//Merge sort
function mergeSort(array) {
  // Base case: If the array has only one element, return it (already sorted)
  if (array.length === 1) {
    return array;
  }

  // Divide the array into two halves
  const middle = Math.floor(array.length / 2); // Find the middle index
  const left = array.slice(0, middle); // Split the array into left half
  const right = array.slice(middle); // Split the array into right half

  // Recursively call mergeSort on the left and right halves
  return merge(
    mergeSort(left), // Recursively sort the left half
    mergeSort(right) // Recursively sort the right half
  );
}
function merge(left, right) {
  let resultArray = [],
    leftIndex = 0,
    rightIndex = 0;

  // Loop through both arrays, comparing elements and adding the smaller one to the resultArray
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++; // Move to the next element in the `left` array
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++; // Move to the next element in the `right` array
    }
  }

  // Concatenate the remaining elements from either `left` or `right` (if any)
  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}
//Linked list
class Node {
  constructor(value) {
    (this.value = value), (this.next = null);
  }
}

class LinkedList {
  //Creates a linkedlist with passed value.
  constructor(value) {
    //Creates a head node
    this.head = {
      value: value,
      next: null,
    };
    //As there is only one element in the list, head is also a tail
    this.tail = this.head;
    //Length would be 1
    this.length = 1;
  }

  //Add the node at the tail of the linkedlist
  append(value) {
    //Create a new Node by creating a instance of a Node class
    const newNode = new Node(value);
    // Check if head is present or not, if head is empty creates a head
    if (this.head == null) {
      this.head = node;
    } //Else creates a tail
    else {
      //We need to point current tail's next to the newNode
      this.tail.next = newNode;
      //Now make newNode a tail node
      this.tail = newNode;
      //Increase the length by 1
      this.length++;
    }
    return this;
  }

  //Add the node as a head of the linkedlist
  prepend(value) {
    //Create a new Node by creating a instance of a Node class
    const newNode = new Node(value);
    //Points this node's next to the head
    newNode.next = this.head;
    //Now make this node a head node
    this.head = newNode;
    //Increase the length by 1
    this.length++;
    return this;
  }

  //Insertes a node at specified index, say we want to insert 30 at index 2
  //Current list: 10 -> 20 -> 40 -> 50
  insert(index, value) {
    //Create a new Node by creating a instance of a Node class
    const newNode = new Node(value);

    //Counter to loop
    let count = 1;

    //Create a temp node to traverse through list, point it to the head
    //Pointing to 10
    let previousNode = this.head;

    //Traverse the list one node before the specified index
    while (count < index) {
      //Points temp node to its next node
      previousNode = previousNode.next;

      //Increase the count to compare it with index;
      count++;
    }
    //When the loop ends you will able have temp node pointing to the previous node of the index.

    //First, points new node's next to the current node's next, so it can hold the list ahead of its index
    //Current node = 20, New node = 30, So new node will be 30 -> 40 -> 50
    newNode.next = previousNode.next;

    //Now just point current node's next to new node.
    //Merge left side of the list, 10 -> 20 -> 30 -> 40 -> 50
    previousNode.next = newNode;
  }

  deleteHead() {
    this.head = this.head.next;
    this.length--;
  }

  deleteTail() {
    let secondLastNode = this.head;
    while (secondLastNode.next.next !== null) {
      secondLastNode = secondLastNode.next;
    }
    secondLastNode.next = null;
    this.length--;
  }

  deleteAtIndex(index) {
    if (index === 0) {
      this.head = this.head.next;
      this.length--;
      return this;
    }
    let count = 1;
    let previousNode = this.head;
    while (count < index) {
      previousNode = previousNode.next;
      count++;
    }
    previousNode.next = previousNode.next.next;
    this.length--;
    return this;
  }

  deleteNodeByValue(value) {
    //Current node to loop through the list
    let currentNode = this.head;

    //Previous node to update its pointer to next.next node
    let previousNode = null;

    while (currentNode != null) {
      //Check if we find the value we are looking for
      if (currentNode.value === value) {
        //Check if it is a head or not by comparing previous node with null
        if (previousNode === null) {
          //If it is head, then update head to nextnode
          this.head = currentNode.next;
        } else {
          //If it is not head then simply update previous node
          previousNode.next = currentNode.next;
        }
        //Reduce length by 1
        this.length--;
      }

      //Previous node will point to this node with every iteration
      previousNode = currentNode;
      //Current node will point to next node for iteration
      currentNode = currentNode.next;
    }
  }

  searchElement(value) {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.next;
    }
    return false;
  }

  printList() {
    //Creates an empty array.
    let printArrayList = [];
    //Pointer which points to the head node
    let currentNode = this.head;
    //Start iterating from the first node till you reach the last node
    while (currentNode !== null) {
      //Add every node's value to the array
      printArrayList.push(currentNode.value);
      //Point pointer to the next node
      currentNode = currentNode.next;
    }
    //Return the array
    return printArrayList.join(" -> ");
  }

  reverse() {
    let prev = null;
    let next = null;
    let current = this.head;

    while (current != null) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
    return this.head;
  }
}
console.log("Creating a LinkList at constant time O(1): 20:");
const myLinkedList = new LinkedList(20);
console.log(myLinkedList.printList());
console.log("");

console.log("Appendding Node at constant time O(1): 40 -> 50:");
myLinkedList.append(40).append(50);
console.log(myLinkedList.printList());
console.log("");

console.log("Prepending Node at constant time O(1): 10:");
myLinkedList.prepend(10);
console.log(myLinkedList.printList());
console.log("");

console.log("Inserting Node at index 2 with time complexty of O(n): 30");
myLinkedList.insert(2, 30);
console.log(myLinkedList.printList());
console.log("Inserting at index 1: 15");
myLinkedList.insert(1, 15);
console.log(myLinkedList.printList());
console.log("");

console.log("Deleting Head-Node at constant time O(1): 10:");
myLinkedList.deleteHead();
console.log(myLinkedList.printList());
console.log("");

console.log("Deleting Tail-Node at O(n) time: 50:");
myLinkedList.deleteTail();
console.log(myLinkedList.printList());
console.log("");

console.log("Deleting Node at index 2 with time complexty of O(n): 30:");
myLinkedList.deleteAtIndex(2);
console.log(myLinkedList.printList());
console.log("");

console.log("Deleting Node with value 40 with time complexty of O(n):");
myLinkedList.deleteNodeByValue(40);
console.log(myLinkedList.printList());
console.log("");

console.log("Deleting Node with value 40 with time complexty of O(n):");
myLinkedList.deleteNodeByValue(40);
console.log(myLinkedList.reverse());
console.log("");

console.log("Searching for value 20 with time complexty of O(n):");
console.log(myLinkedList.printList());
console.log(myLinkedList.searchElement(20));
console.log("Searching for value 50 with time complexty of O(n):");
console.log(myLinkedList.searchElement(50));

//Binary search tree
function BinaryTree(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
}

//Inorder
const inorder = (root) => {
  const nodes = [];
  if (root) {
    inorder(root.left);
    nodes.push(root.val);
    inorder(root.right);
  }
  return nodes;
};

//postOrder
const postorder = (root) => {
  const nodes = [];
  if (root) {
    postorder(root.left);
    postorder(root.right);
    nodes.push(root.val);
  }
  return nodes;
};

//Preorder
const preorder = (root) => {
  const nodes = [];
  if (root) {
    nodes.push(root.val);
    preorder(root.left);
    preorder(root.right);
  }
  return nodes;
};

//IS BTS is valid or not
const isValidBST = (root) => {
  const helper = (node, min, max) => {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return (
      helper(node.left, min, node.val) && helper(node.right, node.val, max)
    );
  };
  return helper(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
};

//Cal max dept of the BTS
const maxDepth = function (root) {
  const calc = (node) => {
    if (!node) return 0;
    return Math.max(1 + calc(node.left), 1 + calc(node.right));
  };
  return calc(root);
};

//is BTS least common ascestor
//Verify if p or q is found in the left subtree or right subtree
//Then, verify if the current node is p or q
//If one of p or q is found in the left or right subtree, and one of p or q is the node itself, we have found the LCA
//If both p and q are found in the the left or right subtree, we have found the LCA
const lowestCommonAncestor = function (root, p, q) {
  // let lca = null;
  // const isCommonPath = (node) => {
  //   if (!node) return false;
  //   var isLeft = isCommonPath(node.left);
  //   var isRight = isCommonPath(node.right);
  //   var isMid = node == p || node == q;
  //   if ((isMid && isLeft) || (isMid && isRight) || (isLeft && isRight)) {
  //     lca = node;
  //   }
  //   return isLeft || isRight || isMid;
  // };
  // isCommonPath(root);
  // return lca;
if(root == null || root == p || root==q ){
  return root;
}
let left = lowestCommonAncestor(root.left, p, q)
let right = lowestCommonAncestor(root.right, p, q)

if(left == null){
  return right;
}else if(right == null){
  return left
} else{
  return root;
}

};

//stack

class Stack {
  constructor() {
    this.items = [];
  }

  // Add a number to the stack
  push(number) {
    this.items.push(number);
  }

  // Take the top number off the stack
  pop() {
    if (this.items.length === 0) return "Oops, the stack is empty!";
    return this.items.pop();
  }

  // See what the top number is
  peek() {
    return this.items[this.items.length - 1];
  }

  // Check if the stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Find out how many items are in the stack
  size() {
    return this.items.length;
  }
}

// Using the stack
let myStack = new Stack();
myStack.push(5);
myStack.push(10);
console.log(myStack.peek()); // Output: 10
myStack.pop();
console.log(myStack.peek()); // Output: 5

//Breadthfirst Search
function breadthFirstSearch() {
  let currentNode = this.root;

  let list = [];
  let queue = [];

  queue.push(currentNode);
  while (queue.length > 0) {
    currentNode = queue.shift();
    list.push(currentNode.value);

    if (currentNode.left) {
      queue.push(currentNode.left);
    }

    if (currentNode.right) {
      queue.push(currentNode.right);
    }
  }

  return list;
}

//Depth first search with preorder, inorder, postorder
function traversePreOrder(node, list) {
  list.push(node.value);
  if (node.left) {
    traversePreOrder(node.left, list);
  }
  if (node.right) {
    traversePreOrder(node.right, list);
  }
  return list;
}

function traversePostOrder(node, list) {
  if (node.left) {
    traversePostOrder(node.left, list);
  }
  if (node.right) {
    traversePostOrder(node.right, list);
  }
  list.push(node.value);
  return list;
}

function traverseInOrder(node, list) {
  if (node.left) {
    traverseInOrder(node.left, list);
  }
  list.push(node.value);
  if (node.right) {
    traverseInOrder(node.right, list);
  }
  list.push(node.value);
  return list;
}

//Dikstra shortest path algorithm
// Define a graph using an adjacency list
const graph = {
  A: { B: 1, C: 4 }, // Node A is connected to Node B with a weight of 1 and Node C with a weight of 4
  B: { A: 1, C: 2, D: 5 }, // ... and so on for other nodes
  C: { A: 4, B: 2, D: 1 },
  D: { B: 5, C: 1 },
};

function dijkstra(graph, start) {
  // Create an object to store the shortest distance from the start node to every other node
  let distances = {};

  // A set to keep track of all visited nodes
  let visited = new Set();

  // Get all the nodes of the graph
  let nodes = Object.keys(graph);

  // Initially, set the shortest distance to every node as Infinity
  for (let node of nodes) {
    distances[node] = Infinity;
  }

  // The distance from the start node to itself is 0
  distances[start] = 0;

  // Loop until all nodes are visited
  while (nodes.length) {
    // Sort nodes by distance and pick the closest unvisited node
    nodes.sort((a, b) => distances[a] - distances[b]);
    let closestNode = nodes.shift();

    // If the shortest distance to the closest node is still Infinity, then remaining nodes are unreachable and we can break
    if (distances[closestNode] === Infinity) break;

    // Mark the chosen node as visited
    visited.add(closestNode);

    // For each neighboring node of the current node
    for (let neighbor in graph[closestNode]) {
      // If the neighbor hasn't been visited yet
      if (!visited.has(neighbor)) {
        // Calculate tentative distance to the neighboring node
        let newDistance = distances[closestNode] + graph[closestNode][neighbor];

        // If the newly calculated distance is shorter than the previously known distance to this neighbor
        if (newDistance < distances[neighbor]) {
          // Update the shortest distance to this neighbor
          distances[neighbor] = newDistance;
        }
      }
    }
  }

  // Return the shortest distance from the start node to all nodes
  return distances;
}

// Example: Find shortest distances from node A to all other nodes in the graph
console.log(dijkstra(graph, "A")); // Outputs: { A: 0, B: 1, C: 3, D: 4 }

// “CSS files in which all class names and animation names are scoped locally by default”. 
// What does this mean? 
// CSS Modules are not specs or an implementation in the browser, 
// but rather a process in a build step (with the help of Webpack or Browserify) that 
// changes class names and selectors to be scoped (kinda like namespaced). 

//npx is also a CLI tool whose purpose is to make it easy to install and manage dependencies hosted in the npm registry.
//It’s now very easy to run any sort of Node.js based executable that you would normally install via npm.

//npm CLI is a combination of words where npm refers to Node Package Manager and CLI refers to the Command Line Interface . 
//Using the command line we are trying to access the packages and dependencies of the NodeJS. 
//npm CLI provides different commands for developers to install, delete, and manage.


//Package.json


import React, {
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "React";

export default counter = ({ onSearch, a, b }) => {
  const cartReducer = (state, action) => {
    switch (action.type) {
      case "add":
        return [...state, action.payload];
      case "remove":
        return [...state, action.payload];
      default:
        return state;
    }
  };
  const [count, setCount] = useState(0);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [isPending, startTransition] = useTransition();

  const inputRef = useRef();
  const add = (item) => {
    dispatch({ type: "add", payload: "item" });
  };

  const remove = (item) => {
    dispatch({ type: "remove", payload: "item" });
  };

  const preContext = React.createContext("light");

  useEffect(() => {
    //api call;
  }, [count]);


  function handleClick() {
    startTransition(() => {
      setState(newState); // This state update is marked as a transition
    });
  }

  return (
    <>
      {/* Your component JSX */}
      <button onClick={handleClick}>Update State</button>
      {isPending && <div>Loading...</div>}
    </>
  );
}
  function getTheme() {
    const newTheme = useContext(preContext);
    return (
      <>
        <div
          style={{ backgroundColor: newTheme == "light" ? "grey" : "black" }}
        ></div>
      </>
    );
  }
  const handleQueryChange = useCallback(
    (event) => {
      //api oper
      setQuery(event.target.value);
      onSearch(even.target.value);
    },
    [onSearch]
  );

  const setTotalValue = useMemo(
    (item) => {
      return setTotal(a + b);
    },
    [a, b]
  );

  const handleFocus = () => {
    inputRef.current.focus();
  };

  useDebugValue(inputRef.current.value, "is the value updated");

  useImperativeHandle(ref, () => {
    focus: () => {
      inputRef.current.focus();
    };
    value: () => {
      inputRef.current.value;
    };
  });
  return (
    <>
      {getTheme()}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <div>Count : {count}</div>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -
      </button>
      <input type="text" value={query} onChange={handleQueryChange} />
      <input type="text" ref={inputRef} />
      <button onClick={handleFocus}>Focus Input</button>
    </>
  );
};

//Lazy loading 
//const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
{/* <Suspense fallback={<Loading />}>
  <h2>Preview</h2>
  <MarkdownPreview />
 </Suspense> */}
 //SCSS is a powerful tool that can help you write cleaner, more maintainable CSS code in your ReactJS applications, 
 //SCSS is a powerful preprocessor for CSS
 //null== undefined : true
 //null=== undefined : false

 //structuredClone :The global structuredClone() method creates a deep clone of a given value using the structured clone algorithm.

//Custome hook

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data];
};

//The splice() method adds and/or removes array elements.
//The slice() method returns selected elements in an array, as a new array.
//The shift() method removes the first item of an array.
//The unshift() method adds new elements to the beginning of an array.

//Error Code
//1xx Informational
//2xx Succesful -  200 OK - 201 Created - 202 	Accepted
//3xx Redirection
//4xx Client Error - 400	Bad Request - 401	Unauthorized - 402	Payment Required - 403	Forbidden - 404	Not Found
//5xx Server Error - 500	Internal Server Error - 501	Not Implemented - 502	Bad Gateway - 503	Service Unavailable

//[1, 2, 3, [4, 5, [6, 7, [8]], {
//a: 8,
//b: 9,
//c: {
//d: 10
//}
//}]] output - [ 1, 2, 3, 4, 5, 6, 7, 8, { d: 10 }, { a: 8, b: 9 } ]
function flatten(elements) {
  const result = [];

  function getFlattenObject(data) {
    const final = Object.keys(data || {}).reduce((acc, count) => {
      if (data[count] instanceof Object) {
        acc = { ...acc, ...getFlattenObject(data[count]) };
      } else {
        acc[count] = data[count];
        console.log("acc", acc);
      }

      return acc;
    }, {});
    console.log("acc final ", final);
    result.push(final);
  }

  function flateenInto(element) {
    element.map((item) => {
      if (Array.isArray(item) && item.length != 0) {
        flateenInto(item);
      } else if (item instanceof Object) {
        getFlattenObject(item);
      } else {
        result.push(item);
      }
    });
  }
  flateenInto(elements);
  return result;
}

console.log(
  flatten([
    1,
    2,
    3,
    [
      4,
      5,
      [6, 7, [8]],
      {
        a: 8,
        b: 9,
        c: {
          d: 10,
        },
      },
    ],
  ])
);

//ANAGRAM
var isAnagram = function (s, t) {
  if (s.split("").sort().join("") === t.split("").sort().join("")) {
    return true;
  }
  return false;
};

var containsDuplicate = function (nums) {
  nums.sort((a, b) => a - b);
  for (let i = 0; i <= nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      return true;
    }
    return false;
  }
};

//nums = [1,1,1,2,2,3] k = 2 output:[1,2]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  let count = 0;
  const result = [];
  if (nums.length === 1) {
    result.push([nums]);
  }
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      if (nums[i] === nums[j]) {
        count++;
      }
    }
    if (count >= k) {
      result.push([nums[i]]);
      count = 0;
    }
  }
  return result;
};

//validate sudoku
//Because we only want to start vertical traversal when horizontal traversal is done.

//Use / for vertical traversal because
// Math.floor(0 / 3) = 0
// Math.floor(1 / 3) = 0
// Math.floor(2 / 3) = 0

//Use % for horizontal traversal beause
// 0 % 3 = 0
// 1 % 3 = 1
// 2 % 3 = 2

var isValidSudoku = function (board) {
  for (let i = 0; i < 9; i++) {
    let row = new Set(),
      col = new Set(),
      box = new Set();

    for (let j = 0; j < 9; j++) {
      let _row = board[i][j];
      let _col = board[j][i];
      let _box =
        board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)];

      if (_row != ".") {
        if (row.has(_row)) return false;
        row.add(_row);
      }
      if (_col != ".") {
        if (col.has(_col)) return false;
        col.add(_col);
      }

      if (_box != ".") {
        if (box.has(_box)) return false;
        box.add(_box);
      }
    }
  }
  return true;
};

var groupAnagrams = function (strs) {
  var obj = {};
  for (let i = 0; i < strs.length; i++) {
    if (!obj[strs[i].split("").sort().join("")])
      obj[strs[i].split("").sort().join("")] = [];
    console.log(obj[strs[i].split("").sort().join("")], strs[i]);
    obj[strs[i].split("").sort().join("")] = [
      ...obj[strs[i].split("").sort().join("")],
      strs[i],
    ];
  }
  return Object.values(obj);
};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));

(function(){
  var a = b = 3;
})();
console.log(a)//print is not defined beacuse its in var block scope
console.log(b);//print 3 beacuse b is not defined with any key word so its in global scope

//Mongo DB installtion and Server start on mac
//xcode-select --install
//brew tap mongodb/brew
//brew update
//brew install mongodb-community@7.0
//Check installed Version mongod -version
//start the mongodb server mongosh
//Sharding in mango db is a data distrubution process and stores a single data set into multiple databases.
//Replication Duplicating the same data across multiple mongodb servers.
//Indexing
//Mongo agregation It enables us to group, filter, and manipulate data to produce summarized results. 
//MongoDB Aggregation is typically carried out using the aggregation pipeline, which is a framework for data

// What happens when you type google.com into your browser address bar?
// When you type google.com into your browser's address bar, a series of events occur behind the scenes.
// , the browser checks its cache for a DNS(domain name server) record to find the corresponding IP address of google.com.
// The request goes to the system's DNS cache if it's not found.
//  the system cache also doesn't have this information, the ISP's DNS server is queried.

// Once the IP address is found, the browser initiates a TCP connection with the server.
// The browser is sending an HTTP request to the web server, which responds with an HTTP response.
//  response usually contains the HTML content of the webpage.

// The browser then begins rendering the HTML. It parses the HTML, CSS, and JavaScript and constructs the DOM (Document Object Model) tree.
//  browser then is rendering the page on the screen, starting from the top and working down.

// JavaScript, the latest specification is ECMAScript 2021 (or ES12).
// This update includes features like replaceAll method, Promise.any, WeakRefs, and Logical Assignment Operators.

// React 18 New Features
// Concurrent Features
// Transitions
// Suspense on the
//StrictMode
//Strict mode will guarantee that components are resistant to effects being repeatedly mounted and unmounted.
// Concurrency in React
// React can interrupt, pause, restart, or quit a render in React 18 with concurrent rendering.
// This enables React to react rapidly to user input while engaged in a time-consuming rendering operation.

// The foundation of concurrent rendering is introduced in React 18, along with new features like suspense, streaming server rendering, and transitions.

// As a React developer, you concentrate on how you want the user experience to be delivered, and React takes care of the technical details.

// Concurrent React is a foundational improvement to the fundamental rendering model of React, making it more significant than a normal implementation detail.
// Therefore, even while understanding concurrency's workings isn't crucial, having a general understanding of it could be useful.

// Transition
// In order to distinguish between urgent and non-urgent updates, React has introduced a new concept called transition.

// Transition updates move the user interface (UI) from one view to another.
// Urgent updates reflect direct input, such as typing, clicking, pressing, etc.
// So let me give you an example: if you are doing a task and another urgent task comes in that has a higher priority,
//react will stop that task and work on the higher priority task and then start that task again.

//How do JavaScript engines work under the hood?
// JavaScript engines are complex pieces of software that interpret and execute JavaScript code.
// The most well-known JavaScript engine is V8, used in Chrome and Node.js.

// When JavaScript code is run, the engine first parses the code into a data structure — Abstract Syntax Tree (AST).
// This tree is the syntactic structure of the code. The engine then compiles the AST into bytecode, a lower-level code representation.

// The JavaScript engine also includes an interpreter, which can execute the bytecode.
// However, for performance-critical code, the engine uses a Just-In-Time (JIT) compiler to compile the bytecode into machine code, which can later be executed directly by the computer's processor.

// The engine also includes a garbage collector, which automatically frees up memory no longer in use.
// This is crucial for managing resources and preventing memory leaks in JavaScript applications.

// In addition, modern JavaScript engines like V8 use inline caching and hidden classes to optimize object property access and improve execution speed.

//CI/CD Process

//input 'i-love-javascript' output 'iLoveJavascript'

function checkit(str) {
  const result = [];
  const arr = str.split("");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "-") {
      result.push(arr[i + 1].toUpperCase());
      i++;
    } else {
      result.push(arr[i]);
    }
  }
  return result.join("");
}

console.log(checkit("i-love-javascript"));

//ZigZag (Spiral) level order traversal.
function ZigZag(root) {
  const result = [];

  const lot = (root, level) => {
    if (!root) return;

    if (root[level]) {
      root[level].push(root.value);
    } else {
      root[level] = [root.value];
    }

    lot(root.left, level + 1);
    lot(root.right, level + 1);
  };

  lot(root, 0);

  return result.map((item, index) => (index % 2 ? item.reverse() : item));
}
const p = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve("Promise is resolved")
  },5000)
})

const p2= new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve("Promise is resolved")
  },10000)
})
//async and await
async function promi(){
  //always return promise or wrap promise around premitive types
  const val = await p;
  console.log("This will print after  5 sec")
  console.log(val)

  const val2 = await p2;
  console.log("This will print after  10 sec")
  console.log(val2)
  //if you change the order of the promises then entire this function will excute after 10 seconds
}

//remove duplicated from an array 
//const arr =1, 1, 3, 7, 2, 3, 2, 5, 1]
// const rsu = new Set([...arr])
// console.log(rsu)
//The every() method executes a function for each array element.
const arr =[1, 1, 3, 7, 2, 3, 2, 5, 1]

function some(arr){
 return arr.filter((item, index)=>{
        if(arr.indexOf(item)!== index){
           return item 
        }
    }
           )
}

console.log(some(arr))

var removeOuterParentheses = function(s) {
  let count = 0; let result = '';
  for (let i = 0; i < s.length; i ++){
      if(s[i] == '('){
          count ++;
      }
      if(count > 0){
          result + = s[i]
      }

      if(s[i]== ')'){
          count--;
      }

  }
  return result;
}

//sort based on the frequency
let s = "tree"
let arr = s.split('')
const obj ={}
let count = 0
for (let i = 0; i <=arr.length -1 ; i++){
    for(let j = 0; j<=arr.length -1 ; j++){
    if(arr[i] == arr[j]){count++}
    obj[arr[i]] = count;

    }
    count =0
    
}

//another way
for(let i =0; i <arr.length; i++){
  let counter = a[i];
  obj[counter] = (obj[counter]|0) + 1;
}
console.log(obj)
let result2 = ''
const sorted = Object.entries(obj).sort((a,b)=>b[1]-a[1]);
sorted.map((item)=>{
   for(let i =0; i<item[1]; i++){
      result2 += item[0] 
   } 
})
console.log(result2)


//largestelememnt in an array 
const a = [2,5,1,3,0]

const largestNumber =(nums)=>{
    let max = a[0];
    for(let i =1; i < nums.length; i++){
        if(a[i] > max){
            max = a[i];
        }
    }
    return max;
}

console.log(largestNumber(a));
function Bysort(nums){
  const sorted = nums.sort((a,b)=>a-b);
  return sorted[sorted.length-1]
}
console.log(Bysort([2,5,1,3,0]))

function removeDuplicate(nums){
  return nums.filter((item,index)=>{
      return nums.indexOf(item) === index;
  })
}

console.log(removeDuplicate([1,1,2,2,2,3,3]));


const b = [1,2,3,4,5,6,7] 

function rotate(nums, d){
    const temp = [];
    for(let i = 1; i<=d; i++){
        temp[d - i] = nums[nums.length - i];
    }

    for(let j = 0; j < nums.length - d; j++){
        temp[d + j]=nums[j]
    }

    return temp;
}

console.log(rotate([1,2,3,4,5,6,7], 5))

function traversal(root){
  const queue =[];
  const stack = [];
  if(root === null) return stack;

  queue.push(root);
  while(!queue.isEmpty()){
let level =[];
for (let i =0; i < queue.length; i++){
  let currentNode = queue.shift();
  if(currentNode.left ! =null) queue.push(currentNode.left)
    if(currentNode.right ! =null) queue.push(currentNode.right)
      level.push(currentNode.value)

}
stack.push(level)
  }
  return stack;
}


function MaxDepthofaTree(root){
  if(!root){return 0}

  let l = MaxDepthofaTree(root.left);
  let r = MaxDepthofaTree(root.right);

  //for checking the balanced tree formula is lefthieght - righthieght <= 1

  if(l === -1 && r == -1) return -1
  if(l-r > 1) return -1
  return 1 + max(l,r);

}

///Boundry Traversal

function addLeftBoundary(node, res){
  let current = node.left;
  while(current){
  if(!isLeaf(current)) res.push(current.value);
  if(current.left) {current= current.left;
  }else{
    current= current.right;
  }
}

}


function addRightBoundary(node, res){
  let temp =[]
  let current = node.right;
  while(current){
  if(!isLeaf(current)) temp.push(current.value);
  if(current.right) {current= current.right;
  }else{
    current= current.left;
  }
  for(let i = temp.length(); i>=0; --i){
    res.push(temp[i]);
  }
}
}

function addLeafs(node, ans){
if(isLeaf(node)){
  ans.push(node.value)
  return;
}
if(node.left){addLeafs(node.left, ans)}
if(node.right){addLeafs(node.right, ans)}

}
function BoundryTraversal(root){
  if(!root) return 0;
  const stack =[]
  if(!isLeaf(root)){
    stack.push(root.value);
  }
  addLeftBoundary(root, stack);
  addLeafs(root, stack);
  addRightBoundary(root,stack);
  return stack;
}

isSymmentric(root){
  if(!root) return
  symatric(root.left, root.right);
  function symatric(left,right){
    if(left==null || right== null){
return left == right 
    }

    if(left.val != right.val) return false;

    return (isSymmentric(left.left, right.right) && isSymmentric(left.right, right.left));
  }
}

function f(i, j,  s,t, dp){
if(i == 0 || j==0) return 0;

if(dp[i][j] !== -1) return dp[i][j];
if(s[i]== t[j]){
  return dp[i][j] = 1 + f(i-1, j-1, s, t, dp);
}
return dp[i][j]= Math.max(f(i-1, j, s,t, dp), f(i,j-1,s,t, dp))

}

//Loggest common substrings
function LCS( s, t){
  let n = s.length;
  let m = t.length;
  const dp =[]
 dp[i][j]= -1
  return f(n-1, m-1, s,t, dp);
}

//This command is similar to npm install, 
//except it's meant to be used in automated environments such as test platforms, continuous integration, 
//and deployment -- or any situation where you want to make sure you're doing a clean install of your dependencies.

//useLayoutEffect is a version of useEffect that fires before the browser repaints the screen.

// The Promise.all() static method takes an iterable of promises as input and returns a single Promise. 
// This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), 
// with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason.

//The Promise.any() static method takes an iterable of promises as input and returns a single Promise. 
// This returned promise fulfills when any of the input's promises fulfills, with this first fulfillment value.
// It rejects when all of the input's promises reject.

// The Promise.race() static method takes an iterable of promises as input and returns a single Promise. 
// This returned promise settles with the eventual state of the first promise that settles.

// The Promise.allSettled() static method takes an iterable of promises as input and returns a single Promise. 
// This returned promise fulfills when all of the input's promises settle .


//typescript to javascript compilation is called as transpilation.
//configer ts compiler tsc init to get the tsconfig file.
//TypeScript’s strict null check throws an error at compile time
//TypeScript types
//any
//unkown
//never
//enum
//touple

//ts enables the code complition feature where if we define let num:number[]=[1,2,3]; num.(it will give all the possible operation we can do on a number)
//const enum Size {small=1, meduim, big}
//const sized :Size= Size.Medium;
//function calculate(parameter:number):number//retrurn value of this fumnctin{
  //return 0
//}

// TypeScript has a utility type called omit that lets you construct a new type by passing a current type/interface and selecting the keys to be excluded from the new type
// removes the `email` property from the User interface
// type UserPreview = Omit<User, "email">;
//Enums or enumerated types are a means of defining a set of named constants.

// enum UserType {
//   Guest = "G",
//   Verified = "V",
//   Admin = "A",
// }

// const userType: UserType = UserType.Verified;

// class User {
//   private username; // only accessible inside the `User` class

//   // only accessible inside the `User` class and its subclass
//   protected updateUser(): void {}

//   // accessible from any location
//   public getUser() {}
// }



//There is a command named –outfile that is follwed by the JavaScript filename and the multiple TypeScript files
//tsc --outfile combined.js script1.ts script2.ts script3.ts
// Modules are used to create a collection of multiple data types that may include the classes, functions, interfaces and variables. 
// The modules have their own scope. The members defined inside modules can not be accessed directly by the other code.
//  Modules are imported using the import statement and defined using the export keyword to export it.
//A TypeScript file can be debugged using the –sourcemap command that is followed by the file name. 
//It will create a new file with the fileName.ts.map name.

//tsc --sourcemap script.ts

// The use of generics provides reusability and flexibility by allowing a component to work over a variety of types rather than a single one while preserving its precision (unlike the use of any).
// function updateUser<Type>(arg: Type): Type {
//   return arg;
// }

// explicitly specifying the type
// let user = updateUser<string>("Bob");

// // type argument inference
// let user = updateUser("Bob");

//SOAP (Simple Object Access Protocol) is a protocol designed to exchange data with the security of programs that are built on different platforms or using different programming languages.
//REST (Representational State Transfer), is an API that follows a set of rules through which applications and servers communicate. 
//It was specifically designed for working with components like files, objects, and media components. 
//Restfull: Web application follows REST architecture, providing interoperability between different systems.
//HTTP is a protocol used for communication over the web, while REST is an architectural style for building scalable and maintainable web services using HTTP.


//HyperText Transfer Protocol (HTTP)
// HTTPS is just HTTP with encryption. 
// The primary distinction between these two names is that HTTPS is more secure than HTTP since it uses TLS (SSL) encryption for all HTTP requests and answers, 
// even the standard ones.
//HTTPS, the communication protocol is encrypted using Transport Layer Security.
//HTTPS employs an encryption mechanism called Secure Sockets Layer (SSL), also known as Transport Layer Security, to enable encryption.  
//HTTP uses port number 80 for communication.HTTPs uses 443 port number for communication.


//Kafka.
// core abstraction Kafka offers a Kafka broker, a Kafka Producer, and a Kafka Consumer. 
// Kafka broker is a node on the Kafka cluster, its use is to persist and replicate the data. 
// A Kafka Producer pushes the message into the message container called the Kafka Topic. 
// Whereas a Kafka Consumer pulls the message from the Kafka Topic.

// Point to Point Messaging System
// Here, messages are persisted in a queue. Although, 
// a particular message can be consumed by a maximum of one consumer only, 
// even if one or more consumers can consume the messages in the queue. Also, 
// it makes sure that as soon as a consumer reads a message in the queue, it disappears from that queue.

// Publish-Subscribe Messaging System
// Here, messages are persisted in a topic. 
// In this system, Kafka Consumers can subscribe to one or more topic and consume all the messages in that topic. 
// Moreover, message producers refer publishers and message consumers are subscribers here.

// Apache Kafka — Kafka Architecture

// a. Kafka Producer API

// This Kafka Producer API permits an application to publish a stream of records to one or more Kafka topics.

// b. Kafka Consumer API

// To subscribe to one or more topics and process the stream of records produced to them in an application, 
// we use this Kafka Consumer API.

// c. Kafka Streams API

// In order to act as a stream processor consuming an input stream from one or more topics and producing an output stream to one or more output topics and also effectively transforming the input streams to output streams, 
// this Kafka Streams API gives permission to an application.

// d. Kafka Connector API

// This Kafka Connector API allows building and running reusable producers or consumers that connect Kafka topics to existing applications or data systems. 
// For example, a connector to a relational database might capture every change to a table.

//The global structuredClone() method creates a deep clone of a given value using the structured clone algorithm.

//React compile time optimization
// Use binding functions in constructors
// Avoid inline style attributes
// Avoid extra tags by using React fragments
// Avoid inline function in the render method
// Avoid bundling all of the front end code in a single file
//Tree shaking is a term used to describe the process of removing unused exports from a module

// Optimizing the performance of a React application involves a combination of strategies, 
// from the fundamental understanding of React's 
// diffing algorithm to leveraging built-in features and third-party tools.

//React Query is often described as the missing data-fetching library for React, 
// but in more technical terms, it makes fetching, caching, 
// synchronizing and updating server state in your React applications a breeze.
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
      res.json()
    )
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  )
}






//system designing
//Scaling 1. Buy bigger machine - Vertical scaling
//2. Buy more machine - Horizontal scaling.- Load balancer required

//Consistent Hashing:Load balancing - hashing(requestid) % number of server.This  gives the server detaisl which the request need to send.
//SQL: structured query laungage.
//Monolithic arcitecture: single unit development.single code base.single CI/CD pipeline.
//Redeployment problem,scaling problem,lots of dependecies,
//Microservices:loosly coupled independent units ,
//Optimise processes and increase the throughput with the same resource - vertical scaling

//atomicity, consistency, isolation, and durability
//Storing images in two formats. 1. file 2.Blob(binary large object). amazone s3 static data base is good option to store blob images
//for blob we need content delivery network CDN. 

//For serching we need to use Text search engine. implementaion is provided by elastic search engine, solr.
//both are build upon apache lucene.
//Hadoop is for datawarehouse where it will be a large amount of data not for transaction related,
//these kind of data is used for the analystics or report genrating purposes.
//structured data with accurery go for SQL(RDBMS)
//documentdb: mongo and couchbase
//MongoDB stores data in BSON (Binary JSON) format, which supports a rich, document-based structure.
//MongoDB supports horizontal scaling through sharding, allowing for distribution of data across multiple servers. 
//Replication: MongoDB supports replica sets, which are sets of MongoDB servers that maintain the same data, ensuring redundancy and high availability.
//This makes it easier to manage large datasets and handle high-throughput operations.
//column db: large data (ever growing data) less quearies : cassandra,hbase

//HTTP is Client-server comunication protocol (which is not effceint for chatting apps)
//xmpp is peer to peer protocol 
//polling-short and long polling http recuring reqest and response system.
//sse-server sent events. unidirectional from server to client

//wesocket first handshaske request http, get the response 101 connection established.

//Database caching using redis.

//Relational dbs is used based on schema and ACID
//A: Atomicity
//C:consitency
//I:ISOLATION
//D:DUrability.
//difficult to scale horizontly

//NOSQL dbs:
//key value store
//documentbased dbs: no fixed schema.heavy reads and write
//highly scalable , sharding, 

//column dbs: fixed schema but not quaranties of ACID, music app
//heavy write, special read.best for distrubuted dbs
//casandraa, Hbase


//search dbs: elastic , solar

//API standards:RPC,SOAP,REST
//Caching:TTL: time to live is the method for expiring the cache.
//cacheeviction: 1.FIFO 2. Least recentlt used
//Caching mechanism: Read through pattern( heavy write), cache aside pattern(heavy reads), write through pattern(mix ), write back pattern(cache failure, db failure).

//Guidelines of the REST: cilent server, cacheable,layered,stateless,uniform interface,code on demand. 


//MESSAGE Queue
//async workflow: 
//Decoupling
//Loadbalancing: consistant hashing
//Deffered processing(puting it in backlogs)
//Data Streaming

//Performence Matrics
//Throughput: some amount of work done in specific time
//Bandwidth
//Latency:Latency refers to the time it takes for a request to travel from its point of origin to its destination and receive a response.
//Response time

//Authentication system
//Password-Based Authentication:Users provide a username and password to gain access.
//Multi-Factor Authentication (MFA):Requires two or more verification methods, combining something the user knows (password), something the user has (smartphone), and something the user is (biometrics).
//Biometric Authentication:Uses unique biological characteristics like fingerprints, facial recognition, or iris scans.
//Token-Based Authentication: Involves the use of a token that can be a hardware device or a software-based token (e.g., JWT - JSON Web Token).
//Certificate-Based Authentication:Uses digital certificates issued by a trusted Certificate Authority (CA) to authenticate users or devices.
//Single Sign-On (SSO):Allows users to authenticate once and gain access to multiple systems without re-entering credentials.
//Federated Identity Management:Extends SSO across multiple organizations, allowing users to use their credentials from one organization to access resources in another.
//Knowledge-Based Authentication (KBA):Asks users questions based on personal information (e.g., "What is your mother's maiden name?").
//Contextual Authentication:Evaluates contextual information (e.g., location, device, behavior) as part of the authentication process.
//Passwordless Authentication:Eliminates passwords entirely, using alternative methods such as biometrics, magic links, or hardware tokens.

//Identity and Access Management (IAM) with Single Sign-On (SSO) allows users to authenticate once and gain access to multiple applications or systems without needing to log in separately to each one.
//IAMSSO 
//Key Components:
//Identity Provider (IdP):

// The IdP is responsible for authenticating the user and issuing authentication tokens. Examples include Okta, Microsoft Azure AD, and Google Identity.
// Service Provider (SP):

// The SP is the application or resource that the user wants to access. It relies on the IdP to handle user authentication.
// Authentication Token:

// A digital token (e.g., SAML assertion, OIDC token) that contains information about the authenticated user and is used to grant access to resources.
// Common SSO Protocols:
// SAML (Security Assertion Markup Language):

// An XML-based protocol used for exchanging authentication and authorization data between an IdP and an SP. SAML is widely used in enterprise environments.
// OAuth (Open Authorization):

// A framework that allows third-party applications to obtain limited access to a user's resources without exposing their credentials. OAuth is often used for authorization, not authentication.
// OIDC (OpenID Connect):

//An authentication layer built on top of OAuth 2.0. 
//OIDC provides a way to verify the identity of a user based on the authentication performed by an IdP, as well as obtain basic profile information about the user.

//network layers is the OSI (Open Systems Interconnection) model, but the TCP/IP model is also commonly used in practice

//Performence management tool.
//Fault and failures

//MessageQueue/ taskqueue provides notifier, consistency, load balancing, heart-beat.
//Monolithic will have procedure call or function call
//microservices will have rpc call remote procedure calll.
//Gateway:direct the request to correct service.

//Client server protocol is HTTP protocol
//Peer to peer protocol is XMPP or websockets/TCP.
//Distributed database: Casandra and amazone dynamo
// sharding database Horizontal partitioning.
//video diffrent quality is called Codec.

//Usage of chache : save network calls, avoid repeated computation to speed up the responses.
//Cache policy: LRU :least recent used
//LFR: leasr frequenlty used.


//cons of caching: extra time, Trashing loading the cache and not using and updating the cache.
//write-through cache  and write back cahe

//api : aplication programable interface
//Event driven services
//Message-queue trigger and forget.
//pub-sub model:

//Antipattern: using dadtabase as message que. we should avaoid this
 
//XMPP is a short form for Extensible Messaging Presence Protocol. 
//It’s protocol for streaming XML elements over a network in order to exchange messages and present information in close to real-time.

//Health service: exampe zookeeper

//A service-level agreement (SLA) is a contract between a service provider and 
//its customers that documents what services the provider will furnish and defines the service standards the provider is obligated to meet.
//CDN: A content delivery network or content distribution network is a geographically distributed network of proxy servers and their data centers.
// The goal is to provide high availability and performance by distributing the service spatially relative to end users.
//Famouse CDN provider is AKAmai, openconnect

//File Transfer Protocol(FTP) is an application layer protocol that moves files between local and remote file systems. 
//It runs on top of TCP, like HTTP. 
//To transfer a file, 2 TCP connections are used by FTP in parallel: control connection and data connection.

//Disadvantages of FTP
//File size limit is the drawback of FTP only 2 GB size files can be transferred.
//More then one receivers are not supported by FTP.
//FTP does not encrypt the data this is one of the biggest drawbacks of FTP.
//FTP is unsecured we use login IDs and passwords making it secure but they can be attacked by hackers.

//Normalization is the process of minimizing redundancy from a relation or set of relations. 
//Redundancy in relation may cause insertion, deletion, and update anomalies. 
//So, it helps to minimize the redundancy in relations. Normal forms are used to eliminate or reduce redundancy in database tables.


