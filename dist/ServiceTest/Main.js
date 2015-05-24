/* global define */
define([
  "React",
  "Tomato/service"
], function(
  React,
  Service
) {
  "use strict";
  // Debug
  window.React = React;

  var service  = null;

  var onTest1 = function(event) {
    // Test connection
    Service.connectService({
      name: 'test',
      type: 'tomato',
      config: {
        // override client side function
        updateTime: function(data) {
          console.log('updateTime', data);
          return new Date;
        }
      },
      callback: function(s) {
        service = s;
        console.log('service', service);
      }
    });
  };

  var onTest2 = function(event) {
    // Test Server call
    service.getTime('orz', function(data) {
      console.log('getTime callback', this, data);
    });
  };

  var onTest3 = function(event) {
    // Test Server call Client
    service.setTime(123);
  };

  var onTest4 = function(event) {
    // Test Observe
    service.observe(function(changes) {
      console.log('observing', changes);
    });
  };

  var onTest5 = function(event) {
    // Set SyncData
    service.syncTest = 'update';
  };

  var onTest6 = function(event) {
    // Get SyncData Test
    service.getSyncTest({}, function(data) {
      console.log('client syncTest', service.syncTest);
      console.log('server syncTest', data);
    });
  };

  var onTest7 = function(event) {
    // Set SyncData With Callback
    Service.setWithCallback(service, 'syncTest', 'update', function() {
      console.log('update resp', arguments);
    });
  };

  var onTest8 = function(event) {
    // Destory
    console.log('destroy service');
    service.destroy();
  };

  var TestBed = React.createClass({displayName: "TestBed",
    render: function() {
      return (
        React.createElement("div", null, 
          React.createElement("p", null, "Please Press In Order"), 
          React.createElement("div", null, 
            React.createElement("button", {ref: "btn1", onClick: onTest1}, "test1"), 
            React.createElement("button", {ref: "btn2", onClick: onTest2}, "test2"), 
            React.createElement("button", {ref: "btn3", onClick: onTest3}, "test3"), 
            React.createElement("button", {ref: "btn4", onClick: onTest4}, "test4"), 
            React.createElement("button", {ref: "btn5", onClick: onTest5}, "test5"), 
            React.createElement("button", {ref: "btn6", onClick: onTest6}, "test6"), 
            React.createElement("button", {ref: "btn7", onClick: onTest7}, "test7"), 
            React.createElement("button", {ref: "btn8", onClick: onTest8}, "test8")
          ), 
          React.createElement("div", null, 
            React.createElement("p", null, "Test1: Test connection"), 
            React.createElement("p", null, "Test2: Test Server call"), 
            React.createElement("p", null, "Test3: Test Server call Client"), 
            React.createElement("p", null, "Test4: Test Observe"), 
            React.createElement("p", null, "Test5: Set SyncData"), 
            React.createElement("p", null, "Test6: Get SyncData Test"), 
            React.createElement("p", null, "Test7: Set SyncData With Callback"), 
            React.createElement("p", null, "Test8: Destory")
          )
        )
      );
    }
  });

  return function(body) {
    React.render(React.createElement(TestBed, null), body);
  };
});
