'use strict';

module.exports = function (originalUrl, lang) {
  const me = this;

  this.body = {};
  this.headers = {};
  this.language = 'en' || lang;
  this.originalUrl = originalUrl;
  this.params = {};
  this.query = {};
  this.sessionDestroyed = false;
  this.session = {
    destroy(cb) {
      me.sessionDestroyed = true;
      return cb();
    }
  };
  this.get = function (key) {
    return this[key];
  };
  this.t = function (messageKey, data) {
    if (data) {
      return messageKey + JSON.stringify(data);
    }
    return messageKey;
  };
};
