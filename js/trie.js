// Defines the node object
var Node = function(value) {
  this.children = [];
  this.isWord   = false;
  this.value    = value || null;
  this.word     = null;

  // Find the child that matches the given value
  //
  // Returns Node
  this.getChild = function(value) {

    var numChildren = this.children.length,
        i;
    // return a child node where it's value == value
    if( numChildren === 0) return null;

    for(i = 0; i < numChildren; i++) {
      if(this.children[i].value === value) return this.children[i];
    }
    return null;
  };

  // Adds a child node with the given value
  this.add = function(value) {

    if(this.getChild(value) !== null) return;

    var node = new Node(value);

    this.children.push(node);
    return node;

  };
};

var Trie = function() {
  this.head = new Node();

  // Inserts string into the Trie.
  this.insert = function(string) {

    if(string.length === 0) return;

    this._insert(this.head, string);

  };

  // Recursive function. Helper function for the insert function.
  this._insert = function(root, string, fullString) {

    var currChar    = string[0],
        isWord      = (string.length - 1) === 0,
        nextNode    = root.getChild(currChar) || root.add(currChar);

    if(isWord) {
      nextNode.isWord = isWord;
      nextNode.word = fullString || string;
      return;
    }

    this._insert(nextNode, string.slice(1), fullString || string);

  };

  // Returns true if string is in the trie. Returns false otherwise.
  this.includes = function(string) {

    if(!string || string.length === 0 || this.head.children.length === 0) {
      return false;
    }

    return this._includes(this.head, string);

  };

  // Recursive function. Returns true if string is in the trie. Returns false
  // otherwise.
  this._includes = function(root, string) {

    var currChar    = string[0],
        isWord      = (string.length - 1) === 0,
        nextNode    = root.getChild(currChar);

    if(isWord){
      return nextNode && nextNode.isWord;
    }

    return this._includes(nextNode, string.slice(1));

  };

  // Search for all strings that have 'prefix' as the prefix.
  //
  // Returns Array of Strings.
  this.search = function(prefix) {

    var arr = [];

    if(this.head.children.length === 0) {
      return arr;
    }

    return arr.concat(this._search(this.head, prefix || ""));

  };

  // Recursive function. Helper function for the search function.
  this._search = function(root, prefix) {

    var currChar,
        i,
        numChildren = root.children.length,
        arr         = [];

    if(!prefix || prefix.length === 0) {
      for(i = 0; i < numChildren; i++) {
        arr = arr.concat(this._search(root.children[i], ""));
      }

    }
    else {
      currChar = prefix[0];
      nextNode = root.getChild(currChar)

      if(nextNode !== null) {
        arr = arr.concat(this._search(nextNode, prefix.slice(1) || ""));
      }

    }

    if(prefix === undefined) console.log("Undefined");

    if(root.isWord && prefix.length === 0 || root.word === prefix) {
      if(root.word === 'do') console.log(prefix);
      arr.push(root.word);
    }

    return arr;

  };

  // Find the node that correspond to the last character in the string.
  //
  // Returns Node.
  this.findLastNode = function(string) {

    return this._findLastNode(this.head, string || "");

  };

  // Recursive function. Helper function for the findLastNode function.
  this._findLastNode = function(root, string) {

    var currChar,
        nextNode;

    if(!string || string.length === 0) return root;

    currChar = string[0];

    nextNode = root.getChild(currChar);

    if(nextNode === null)
      return null;

    return this._findLastNode(nextNode, string.slice(1));

  };

  // Given a node, return all the strings that are part of this node.
  //
  // Returns Array of Strings.
  this.iterate = function(node) {

    var arr = [];

    if(!node) return arr;

    return arr.concat(this._iterate(node, node.value));

  };

  // Recursive helper function for .iterate
  this._iterate = function(root, value) {

    var arr         = [],
        numChildren = root.children.length,
        i,
        child,
        childVal;

    if( numChildren === 0) {
      // handle situation where root = Trie.head
      if(value !== null) arr.push(value);
      return arr;
    };

    for(i = 0; i < numChildren; i++) {
      child     = root.children[i];
      childVal  = child.value;
      newVal = value === null ? childVal : value + childVal;
      arr = arr.concat(this._iterate(child, newVal));
    }

    if(root.isWord) {
      arr.push(value);
    }

    return arr;

  };

  // You may find this function useful for implementing iterate().
  //
  // Returns true if object is empty. False otherwise.
  this.isEmpty = function (object) {
    for(var i in object) {
      return false;
    }
    return true;
  }
};

