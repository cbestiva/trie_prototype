window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},  
  initialize: function() {
    this.router = new this.Routers.Main();
    Backbone.history.start({pushState: true});

    App.Autocompleter = new Autocompleter();
    var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);
    ws.onmessage = function(m) { 
      App.Autocompleter.add(m.data); 
    };
  }
};

App.Routers.Main = Backbone.Router.extend({
  routes: {
    "": "main",
  },

  main: function(){
    var view = new App.Views.Main();
    $("#container").html(view.render().el);
  }
});

$(document).ready(function(){
  App.initialize();
});