App.Views.Main = Backbone.View.extend({
  id: 'tries',

  events: {
    'keyup #somethingSearched':  'search'
  },

  render: function() {
    //html code for the searchbox to render on the main page
    $(this.el).html("<h3>Search word: <input id= 'somethingSearched' type='text'></h3>");
    //html code for the unordered list that is to be appended to the main page
    $(this.el).append("<ul id='foundWord'></ul>");
    return this;
  },

  search: function(event) {
    //Empty the uordered list everytime a new search is made
    $("#foundWord").empty();
    //Take the value of what is in the searchbox
    //And have the autocompleter complete that value (which returns an array)
    var currentSearch = $("#somethingSearched").val();
    var searchResults = App.Autocompleter.complete(currentSearch);
    console.log(searchResults);
    //If the value of the searchbox is greater than 0
    if (currentSearch.length > 0) {
      searchResults.forEach(function(result){
        //Append the result to the unordered list foundWord
        $("#foundWord").append("<li>" + result + "</li>");
      });
    }
  }

});
