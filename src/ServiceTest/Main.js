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
  var observeFunc = function(changes) {
    console.log('observing', changes);
  };

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
    service.observe(observeFunc);
    console.log('observe done');
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
    // Test Unobserve
    service.unobserve(observeFunc);
    console.log('unobserve done');
  };

  var onTest9 = function(event) {
    // Destory
    console.log('destroy service');
    service.destroy();
  };

  var TestBed = React.createClass({
    render: function() {
      return (
        <div>
          <p>Please Press In Order</p>
          <div>
            <button ref='btn1' onClick={onTest1}>test1</button>
            <button ref='btn2' onClick={onTest2}>test2</button>
            <button ref='btn3' onClick={onTest3}>test3</button>
            <button ref='btn4' onClick={onTest4}>test4</button>
            <button ref='btn5' onClick={onTest5}>test5</button>
            <button ref='btn6' onClick={onTest6}>test6</button>
            <button ref='btn7' onClick={onTest7}>test7</button>
            <button ref='btn8' onClick={onTest8}>test8</button>
            <button ref='btn9' onClick={onTest9}>test9</button>
          </div>
          <div>
            <p>Test1: Test connection</p>
            <p>Test2: Test Server call</p>
            <p>Test3: Test Server call Client</p>
            <p>Test4: Test Observe</p>
            <p>Test5: Set SyncData</p>
            <p>Test6: Get SyncData Test</p>
            <p>Test7: Set SyncData With Callback</p>
            <p>Test8: Test Unobserve</p>
            <p>Test9: Destory</p>
          </div>
        </div>
      );
    }
  });

  return function(body) {
    React.render(<TestBed />, body);
  };
});
