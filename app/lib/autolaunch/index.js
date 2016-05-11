/**
 * @module storjshare-gui/AutoLaunch
 */

'use strict';

var app = require('electron').app;
/* jshint ignore:start */
var win = require('./win');
var mac = require('./mac');
var lin = require('./lin');
/* jshint ignore:end */
const PLATFORM = require('../platform');
/**
 * Cross-platform interface for Application Boot Options
 * @constructor
 */

var platformCheckFailed = new Error('OS-specific startup options not found');

function AutoLaunch(optsObj){
  if(!optsObj.name) {
    throw new Error('Application name must be specified');
  }

  this.opts = {
    appName: optsObj.name,
    isHiddenOnLaunch: !!optsObj.isHidden,
    appPath: (optsObj.path) ?
      optsObj.path :
      app.getPath('exe')
  };

  this.api = PLATFORM;
}

AutoLaunch.prototype.enable = function() {
  var self = this;
  var promise = new Promise(function(resolve, reject){
    if(!self.api) {
      return reject(platformCheckFailed);
    }

    self.api.enable(self.opts).then(
      function success(data) {
        resolve(data);
      },
      function fail(err) {
        reject(err);
      }
    );
  });

  return promise;
};

AutoLaunch.prototype.disable = function() {
  var self = this;
  var promise = new Promise(function(resolve, reject){
    if(!self.api) {
      return reject(platformCheckFailed);
    }

    self.api.disable(self.opts).then(
      function success(data) {
        resolve(data);
      },
      function fail(err) {
        reject(err);
      }
    );
  });

  return promise;
};

AutoLaunch.prototype.isEnabled = function() {
  var self = this;
  var promise = new Promise(function(resolve, reject){
    if(!self.api) {
      return reject(platformCheckFailed);
    }

    self.api.isEnabled(self.opts).then(
      function success(data) {
        resolve(data);
      },
      function fail(err) {
        reject(err);
      }
    );
  });

  return promise;
};

module.exports = AutoLaunch;
