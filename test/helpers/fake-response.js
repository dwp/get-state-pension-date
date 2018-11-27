'use strict';

const Request = require('./fake-request');

module.exports = function (request) {
  const me = this;

  this.locals = {};
  this.redirect = function (url) {
    me.redirectedTo = url;
    return me;
  };
  this.req = request || new Request();
  this.status = function (statusCode) {
    this.statusCode = statusCode;
    return this;
  };
  this.json = function (jsonObject) {
    this.body = JSON.stringify(jsonObject);
    return this;
  };
  this.contentType = function (typeString) {
    this.type = typeString;
    return this;
  };
};
