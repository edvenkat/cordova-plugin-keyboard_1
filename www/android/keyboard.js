/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');
    channel = require('cordova/channel');

var Keyboard = function() {
};
/*
Keyboard.returnKeyType = function(hide) {
   // alert("return key");
    exec(null, null, "Keyboard", "returnKeyType", ["returnKeyType",hide]);
};
*/
Keyboard.show = function() {
    exec(null, null, "Keyboard", "show", []);
};

Keyboard.hide = function() {
    exec(null, null, "Keyboard", "hide", []);
};

Keyboard.isVisible = false;
channel.onCordovaReady.subscribe(function() {
    exec(success, null, 'Keyboard', 'init', []);

    function success(msg) {
        var action = msg.charAt(0);
        if ( action === 'S' ) {
            var keyboardHeight = msg.substr(1);
            cordova.plugins.Keyboard.isVisible = true;
            cordova.fireWindowEvent('keyboardWillShow', { 'keyboardHeight': + keyboardHeight });

            //deprecated
            cordova.fireWindowEvent('keyboardWillShow', { 'keyboardHeight': + keyboardHeight });
        } else if ( action === 'H' ) {
            cordova.plugins.Keyboard.isVisible = false;
            cordova.fireWindowEvent('keyboardWillHide');

            //deprecated
            cordova.fireWindowEvent('keyboardWillHide');
        }
    }
});


module.exports = Keyboard;
