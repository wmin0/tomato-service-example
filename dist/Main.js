/* global require */
require({
  paths: {
    "Order": "/lib/requirejs/order",
    "React": "/lib/react/react-with-addons",
    "Socket": "/socket.io/socket.io",
    "Tomato": "Tomato"
  }
});
require(['ServiceTest/Main'], function(Test) {
  "use strict";
  Test.call(this, document.querySelector("body"));
});

