var CordovaFileCache =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Wrapped version of SipHash from https://raw.githubusercontent.com/jedisct1/siphash-js/
 * 
 * function is wrapped to provide the same hash input/output as expected by cordova-file-cache. 
 * SipHashDouble.hash() returns an array of four 32-bit strings otherwise.
 * 
 * key is a randomly generated 8 bit hex integer from random.org
 * 
 * @param {string} value to hash
 * @return {number} 128-bit hex hash 
 */

var SipHashDouble=function(){"use strict";function h(h,r){var t=h.l+r.l,l={h:h.h+r.h+(t/2>>>31)>>>0,l:t>>>0};h.h=l.h,h.l=l.l}function r(h,r){h.h^=r.h,h.h>>>=0,h.l^=r.l,h.l>>>=0}function t(h,r){var t={h:h.h<<r|h.l>>>32-r,l:h.l<<r|h.h>>>32-r};h.h=t.h,h.l=t.l}function l(h){var r=h.l;h.l=h.h,h.h=r}function n(n,o,u,e){h(n,o),h(u,e),t(o,13),t(e,16),r(o,n),r(e,u),l(n),h(u,o),h(n,e),t(o,17),t(e,21),r(o,u),r(e,n),l(u)}function o(h,r){return h.charCodeAt(r+3)<<24|h.charCodeAt(r+2)<<16|h.charCodeAt(r+1)<<8|h.charCodeAt(r)}function u(h,t){var l,u={h:h[1]>>>0,l:h[0]>>>0},e={h:h[3]>>>0,l:h[2]>>>0},a={h:u.h,l:u.l},i=u,s={h:e.h,l:e.l},c=e,f=0,v=t.length,d=v-7,A=new Uint8Array(new ArrayBuffer(8));for(r(a,{h:1936682341,l:1886610805}),r(s,{h:1685025377,l:1852075907}),r(i,{h:1819895653,l:1852142177}),r(c,{h:1952801890,l:2037671283});f<d;)l={h:o(t,f+4),l:o(t,f)},r(c,l),n(a,s,i,c),n(a,s,i,c),r(a,l),f+=8;A[7]=v;for(var b=0;f<v;)A[b++]=t.charCodeAt(f++);for(;b<7;)A[b++]=0;l={h:A[7]<<24|A[6]<<16|A[5]<<8|A[4],l:A[3]<<24|A[2]<<16|A[1]<<8|A[0]},r(c,l),n(a,s,i,c),n(a,s,i,c),r(a,l),r(i,{h:0,l:238}),n(a,s,i,c),n(a,s,i,c),n(a,s,i,c),n(a,s,i,c);var g={h:a.h,l:a.l};r(g,s),r(g,i),r(g,c),r(s,{h:0,l:221}),n(a,s,i,c),n(a,s,i,c),n(a,s,i,c),n(a,s,i,c);var S=a;return r(S,s),r(S,i),r(S,c),[S.h,S.l,g.h,g.l]}function e(h){return[o(h,0),o(h,4),o(h,8),o(h,12)]}function a(h,r){var t=u(h,r);return("0000000"+t[0].toString(16)).substr(-8)+("0000000"+t[1].toString(16)).substr(-8)+("0000000"+t[2].toString(16)).substr(-8)+("0000000"+t[3].toString(16)).substr(-8)}function i(h,r){var t=u(h,r);return 4294967296*(2097151&t.h)+t.l}return{string16_to_key:e,hash:u,hash_hex:a,hash_uint:i}}(),
key=[ 0xff478982, 0xb0daae9c, 0xde70de3a, 0x91c5757f],
module=module||{},exports=module.exports=function(string){
	return SipHashDouble.hash(key,string).join('');
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var hash = __webpack_require__(0);
var Promise = null;

/* Cordova File Cache x */
function FileCache(options){
  var self = this;
  // cordova-promise-fs
  this._fs = options.fs;
  if(!this._fs) {
    throw new Error('Missing required option "fs". Add an instance of cordova-promise-fs.');
  }
  // Use Promises from fs.
  Promise = this._fs.Promise;

  // 'mirror' mirrors files structure from "serverRoot" to "localRoot"
  // 'hash' creates a 1-deep filestructure, where the filenames are hashed server urls (with extension)
  this._mirrorMode = options.mode !== 'hash';
  this._retry = options.retry || [500,1500,8000];
  this._cacheBuster = !!options.cacheBuster;

  // normalize path
  this.localRoot = this._fs.normalize(options.localRoot || 'data');
  this.serverRoot = this._fs.normalize(options.serverRoot || '');

  // set internal variables
  this._downloading = [];    // download promises
  this._added = [];          // added files
  this._cached = {};         // cached files

  // list existing cache contents
  this.ready = this._fs.ensure(this.localRoot)
  .then(function(entry){
    self.localInternalURL = typeof entry.toInternalURL === 'function'? entry.toInternalURL(): entry.toURL();
    self.localUrl = entry.toURL();
    return self.list();
  });
}

FileCache.hash = hash;

/**
 * returns the currently cached list for quick synchronous access
 * to the cached files.
 */
FileCache.prototype.getCached = function getCached(){
  return this._cached;
};

/**
 * Helper to cache all 'internalURL' and 'URL' for quick synchronous access
 * to the cached files. Rechecks the file system every time it is run
 */
FileCache.prototype.list = function list(){
  var self = this;
  return new Promise(function(resolve,reject){
    self._fs.list(self.localRoot,'rfe').then(function(entries){
      self._cached = {};
      entries = entries.map(function(entry){
        var fullPath = self._fs.normalize(entry.fullPath);
        self._cached[fullPath] = {
          toInternalURL: typeof entry.toInternalURL === 'function'? entry.toInternalURL(): entry.toURL(),
          toURL: entry.toURL(),
        };
        return fullPath;
      });
      resolve(entries);
    },function(){
      resolve([]);
    });
  });
};

FileCache.prototype.add = function add(urls){
  if(!urls) urls = [];
  if(typeof urls === 'string') urls = [urls];
  var self = this;
  urls.forEach(function(url){
    url = self.toServerURL(url);
    if(self._added.indexOf(url) === -1) {
      self._added.push(url);
    }
  });
  return self.isDirty();
};

/**
 * remove files from the cache, by their remote URL.
 * urls: string url or Array of urls
 * returnPromises: if `true`, return a promise that resolves when all the files are deleted.
 */
FileCache.prototype.remove = function remove(urls,returnPromises){
  if(!urls) urls = [];
  var promises = [];
  if(typeof urls === 'string') urls = [urls];
  var self = this;
  urls.forEach(function(url){
    var index = self._added.indexOf(self.toServerURL(url));
    if(index >= 0) self._added.splice(index,1);
    var path = self.toPath(url);
    promises.push(self._fs.remove(path));
    delete self._cached[path];
  });
  return returnPromises? Promise.all(promises): self.isDirty();
};

FileCache.prototype.getDownloadQueue = function(){
  var self = this;
  var queue = self._added.filter(function(url){
    return !self.isCached(url);
  });
  return queue;
};

FileCache.prototype.getAdded = function() {
  return this._added;
};

FileCache.prototype.isDirty = function isDirty(){
  return this.getDownloadQueue().length > 0;
};

FileCache.prototype.download = function download(onprogress,includeFileProgressEvents){
  var fs = this._fs;
  var self = this;
  includeFileProgressEvents = includeFileProgressEvents || false;
  self.abort();

  return new Promise(function(resolve,reject){
    // make sure cache directory exists and that
    // we have retrieved the latest cache contents
    // to avoid downloading files we already have!
    fs.ensure(self.localRoot).then(function(){
      return self.list();
    }).then(function(){
      // no dowloads needed, resolve
      if(!self.isDirty()) {
        resolve(self);
        return;
      }

      // keep track of number of downloads!
      var queue = self.getDownloadQueue();
      var done = self._downloading.length;
      var total = self._downloading.length + queue.length;
      var percentage = 0;
      var errors = [];

      // download every file in the queue (which is the diff from _added with _cached)
      queue.forEach(function(url){
        var path = self.toPath(url);
        // augment progress event with done/total stats
        var onSingleDownloadProgress;
        if(typeof onprogress === 'function') {
          onSingleDownloadProgress = function(ev){
            ev.queueIndex = done;
            ev.queueSize = total;
            ev.url = url;
            ev.path = path;
            ev.percentage = done / total;
            if(ev.loaded > 0 && ev.total > 0 && done !== total){
               ev.percentage += (ev.loaded / ev.total) / total;
            }
            ev.percentage = Math.max(percentage,ev.percentage);
            percentage = ev.percentage;
            onprogress(ev);
          };
        }

        // callback
        var onDone = function(){
          done++;
          if(onSingleDownloadProgress) onSingleDownloadProgress(new ProgressEvent());

          // when we're done
          if(done === total) {
            // reset downloads
            self._downloading = [];
            // check if we got everything
            self.list().then(function(){
              // final progress event!
              if(onSingleDownloadProgress) onSingleDownloadProgress(new ProgressEvent());
              // Yes, we're not dirty anymore!
              if(!self.isDirty() && errors.length === 0) {
                resolve(self);
              // Aye, some files got left behind!
              } else {
                reject(errors);
              }
            },reject);
          }
        };
        var onErr = function(err){
          if(err && err.target && err.target.error) err = err.target.error;
          errors.push(err);
          onDone();
        };

        var downloadUrl = url;
        if(self._cacheBuster) downloadUrl += "?"+Date.now();
        var download = fs.download(downloadUrl,path,{retry:self._retry},includeFileProgressEvents && onSingleDownloadProgress? onSingleDownloadProgress: undefined);
        download.then(onDone,onErr);
        self._downloading.push(download);
      });
    },reject);
  });
};

FileCache.prototype.abort = function abort(){
  this._downloading.forEach(function(download){
    download.abort();
  });
  this._downloading = [];
};

FileCache.prototype.isCached = function isCached(url){
  url = this.toPath(url);
  return !!this._cached[url];
};

FileCache.prototype.clear = function clear(){
  var self = this;
  this._cached = {};
  return this._fs.removeDir(this.localRoot).then(function(){
    return self._fs.ensure(self.localRoot);
  });
};

/**
 * Helpers to output to various formats
 */
FileCache.prototype.toInternalURL = function toInternalURL(url){
  var path = this.toPath(url);
  if(this._cached[path]) return this._cached[path].toInternalURL;
  return url;
};

FileCache.prototype.get = function get(url){
  var path = this.toPath(url);
  if(this._cached[path]) return this._cached[path].toURL;
  return this.toServerURL(url);
};

FileCache.prototype.toDataURL = function toDataURL(url){
  return this._fs.toDataURL(this.toPath(url));
};

FileCache.prototype.toURL = function toURL(url){
  var path = this.toPath(url);
  return this._cached[path]? this._cached[path].toURL: url;
};

FileCache.prototype.toServerURL = function toServerURL(path){
  var path = this._fs.normalize(path);
  return path.indexOf('://') < 0? this.serverRoot + path: path;
};

/**
 * Helper to transform remote URL to a local path (for cordova-promise-fs)
 */
FileCache.prototype.toPath = function toPath(url){
  if(this._mirrorMode) {
    var query = url.indexOf('?');
    if(query > -1){
      url = url.substr(0,query);
    }
    url = this._fs.normalize(url || '');
    var len = this.serverRoot.length;
    if(url.substr(0,len) !== this.serverRoot) {
      return this.localRoot + url;
    } else {
      return this.localRoot + url.substr(len);
    }
  } else {
      var ext = url.match(/\.[a-z,0-9]{1,}/g);
    if (ext) {
      ext = ext[ext.length-1];
    } else {
      ext = '.txt';
    }
    return this.localRoot + hash(url) + ext;
  }
};

module.exports = FileCache;


/***/ })
/******/ ]);