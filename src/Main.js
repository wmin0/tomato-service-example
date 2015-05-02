/* global require */
require({
  paths: {
    "Order": "/lib/requirejs/order",
    "React": "/lib/react/react-with-addons",
    "Tomato": "/tomato"
  }
});
require(['ServiceTest/Main'], function(Test) {
  "use strict";
  Test.call(this, document.querySelector("body"));
});

