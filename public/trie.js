Trie = function(){
  this.characters = {};
  this.isWord = false;
};

Trie.prototype.learn = function(word, index){
  // This function should add the given word,
  // starting from the given index,
  // to this Trie.

  // It will be recursive.  It will tell
  // the correct child of this Trie to learn the word
  // starting from a later index.

  // Consider what the learn function should do
  // when it reaches the end of the word?
  // A word does not necessarily end at a leaf.
  // You must mark nodes which are the ends of words,
  // so that the words can be reconstructed later.

  //If index is undefined set it equal to 0
  if (index === undefined) {
    index = 0;
  }

  var wordLength = word.length;

  //If index is not equal to word length
  if (index !== wordLength){
    //If the key for the trie's characters is undefined
    if (this.characters[word[index]] === undefined) {
      //Make the key for the trie's characters a new trie
      this.characters[word[index]] = new Trie();
    }
    //Set this new trie as a child_trie varialbe
    var childT = this.characters[word[index]];
    //And have this child_trie learn the next index of the word
    childT.learn(word, index += 1);
    //When the index is equal to the word length
  } else if (index === wordLength) {
    //set this trie as word to equal true
    this.isWord = true;
  }
};

Trie.prototype.getWords = function(words, currentWord){
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.
  
  // return this.words;

  //If words is undefined set it equal to an empty array
  if (words === undefined) {
    words = [];
  }

  //If currentWord is undefined set it equal to and empty string
  if (currentWord === undefined) {
    currentWord = "";
  }

  //If this trie is a word push it into the words array
  if (this.isWord === true) {
    words.push(currentWord);
  }

  //For the keys in this trie's characters
  for (var keys in this.characters) {
    //Add key to the empty string and set it equal to variable prefix
    var prefix = currentWord + keys;
    //Then run the getWords function (recursively) on this trie (the current trie) with the key [keys]
    this.characters[keys].getWords(words, prefix);
  } 
 
  return(words);
};

Trie.prototype.find = function(word, index){
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.

  // Be sure to consider what happens if the word is not in this Trie.

  //If index is undefined set it equal to 0
  if (index === undefined) {
    index = 0;
  }

  if (word.length === 0) {
    return false;
  }

  //If this trie's characters key (is the true)
  if (this.characters[word[index]]) {
    //Return this trie's character key and have it find the next word's index
    return this.characters[word[index]].find(word, index + 1);
    //If the index is equal to the word length
  } else if (index === word.length) {
    //Return this trie
    return this;
    //Otherwise return false
  } else{
    return false;
  }
};

Trie.prototype.autoComplete = function(prefix){
  // This function will return all completions 
  // for a given prefix.
  // It should use find and getWords.

  //If prefix is undefined set it equal to 0
  if (prefix === undefined) {
    prefix = "";
  }

  var lookUp = this.find(prefix);
  if (lookUp) {
    return lookUp.getWords([], prefix);
  } else {
    return [];
  }

};