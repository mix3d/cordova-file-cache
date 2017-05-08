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
/***/ (function(module, exports, __webpack_require__) {

// +----------------------------------------------------------------------+
// | murmurHash3.js v2.1.2 (http://github.com/karanlyons/murmurHash.js)   |
// | A javascript implementation of MurmurHash3's x86 hashing algorithms. |
// |----------------------------------------------------------------------|
// | Copyright (c) 2012 Karan Lyons                                       |
// | Freely distributable under the MIT license.                          |
// +----------------------------------------------------------------------+

//Modified to remove the x64 flavor ~ @mix3d

;(function (root, undefined) {
	'use strict';
	
	// Create a local object that'll be exported or referenced globally.
	var library = {
		'version': '2.1.2',
	};
	
	// PRIVATE FUNCTIONS
	// -----------------
	
	function _x86Multiply(m, n) {
		//
		// Given two 32bit ints, returns the two multiplied together as a
		// 32bit int.
		//
		
		return ((m & 0xffff) * n) + ((((m >>> 16) * n) & 0xffff) << 16);
	}
	
	
	function _x86Rotl(m, n) {
		//
		// Given a 32bit int and an int representing a number of bit positions,
		// returns the 32bit int rotated left by that number of positions.
		//
		
		return (m << n) | (m >>> (32 - n));
	}
	
	
	function _x86Fmix(h) {
		//
		// Given a block, returns murmurHash3's final x86 mix of that block.
		//
		
		h ^= h >>> 16;
		h  = _x86Multiply(h, 0x85ebca6b);
		h ^= h >>> 13;
		h  = _x86Multiply(h, 0xc2b2ae35);
		h ^= h >>> 16;
		
		return h;
	}

	// PUBLIC FUNCTIONS
	// ----------------
	
	library.hash32 = function (key, seed) {
		//
		// Given a string and an optional seed as an int, returns a 32 bit hash
		// using the x86 flavor of MurmurHash3, as an unsigned int.
		//
		
		key = key || '';
		seed = seed || 0;
		
		var remainder = key.length % 4;
		var bytes = key.length - remainder;
		
		var h1 = seed;
		
		var k1 = 0;
		
		var c1 = 0xcc9e2d51;
		var c2 = 0x1b873593;
		
		for (var i = 0; i < bytes; i = i + 4) {
			k1 = ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(i + 1) & 0xff) << 8) | ((key.charCodeAt(i + 2) & 0xff) << 16) | ((key.charCodeAt(i + 3) & 0xff) << 24);
			
			k1 = _x86Multiply(k1, c1);
			k1 = _x86Rotl(k1, 15);
			k1 = _x86Multiply(k1, c2);
			
			h1 ^= k1;
			h1 = _x86Rotl(h1, 13);
			h1 = _x86Multiply(h1, 5) + 0xe6546b64;
		}
		
		k1 = 0;
		
		switch (remainder) {
			case 3:
				k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
			
			case 2:
				k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
			
			case 1:
				k1 ^= (key.charCodeAt(i) & 0xff);
				k1 = _x86Multiply(k1, c1);
				k1 = _x86Rotl(k1, 15);
				k1 = _x86Multiply(k1, c2);
				h1 ^= k1;
		}
		
		h1 ^= key.length;
		h1 = _x86Fmix(h1);
		
		return h1 >>> 0;
	};
	
	
	library.hash128 = function (key, seed) {
		//
		// Given a string and an optional seed as an int, returns a 128 bit
		// hash using the x86 flavor of MurmurHash3, as an unsigned hex.
		//
		
		key = key || '';
		seed = seed || 0;
		
		var remainder = key.length % 16;
		var bytes = key.length - remainder;
		
		var h1 = seed;
		var h2 = seed;
		var h3 = seed;
		var h4 = seed;
		
		var k1 = 0;
		var k2 = 0;
		var k3 = 0;
		var k4 = 0;
		
		var c1 = 0x239b961b;
		var c2 = 0xab0e9789;
		var c3 = 0x38b34ae5;
		var c4 = 0xa1e38b93;
		
		for (var i = 0; i < bytes; i = i + 16) {
			k1 = ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(i + 1) & 0xff) << 8) | ((key.charCodeAt(i + 2) & 0xff) << 16) | ((key.charCodeAt(i + 3) & 0xff) << 24);
			k2 = ((key.charCodeAt(i + 4) & 0xff)) | ((key.charCodeAt(i + 5) & 0xff) << 8) | ((key.charCodeAt(i + 6) & 0xff) << 16) | ((key.charCodeAt(i + 7) & 0xff) << 24);
			k3 = ((key.charCodeAt(i + 8) & 0xff)) | ((key.charCodeAt(i + 9) & 0xff) << 8) | ((key.charCodeAt(i + 10) & 0xff) << 16) | ((key.charCodeAt(i + 11) & 0xff) << 24);
			k4 = ((key.charCodeAt(i + 12) & 0xff)) | ((key.charCodeAt(i + 13) & 0xff) << 8) | ((key.charCodeAt(i + 14) & 0xff) << 16) | ((key.charCodeAt(i + 15) & 0xff) << 24);
			
			k1 = _x86Multiply(k1, c1);
			k1 = _x86Rotl(k1, 15);
			k1 = _x86Multiply(k1, c2);
			h1 ^= k1;
			
			h1 = _x86Rotl(h1, 19);
			h1 += h2;
			h1 = _x86Multiply(h1, 5) + 0x561ccd1b;
			
			k2 = _x86Multiply(k2, c2);
			k2 = _x86Rotl(k2, 16);
			k2 = _x86Multiply(k2, c3);
			h2 ^= k2;
			
			h2 = _x86Rotl(h2, 17);
			h2 += h3;
			h2 = _x86Multiply(h2, 5) + 0x0bcaa747;
			
			k3 = _x86Multiply(k3, c3);
			k3 = _x86Rotl(k3, 17);
			k3 = _x86Multiply(k3, c4);
			h3 ^= k3;
			
			h3 = _x86Rotl(h3, 15);
			h3 += h4;
			h3 = _x86Multiply(h3, 5) + 0x96cd1c35;
			
			k4 = _x86Multiply(k4, c4);
			k4 = _x86Rotl(k4, 18);
			k4 = _x86Multiply(k4, c1);
			h4 ^= k4;
			
			h4 = _x86Rotl(h4, 13);
			h4 += h1;
			h4 = _x86Multiply(h4, 5) + 0x32ac3b17;
		}
		
		k1 = 0;
		k2 = 0;
		k3 = 0;
		k4 = 0;
		
		switch (remainder) {
			case 15:
				k4 ^= key.charCodeAt(i + 14) << 16;
			
			case 14:
				k4 ^= key.charCodeAt(i + 13) << 8;
			
			case 13:
				k4 ^= key.charCodeAt(i + 12);
				k4 = _x86Multiply(k4, c4);
				k4 = _x86Rotl(k4, 18);
				k4 = _x86Multiply(k4, c1);
				h4 ^= k4;
			
			case 12:
				k3 ^= key.charCodeAt(i + 11) << 24;
			
			case 11:
				k3 ^= key.charCodeAt(i + 10) << 16;
			
			case 10:
				k3 ^= key.charCodeAt(i + 9) << 8;
			
			case 9:
				k3 ^= key.charCodeAt(i + 8);
				k3 = _x86Multiply(k3, c3);
				k3 = _x86Rotl(k3, 17);
				k3 = _x86Multiply(k3, c4);
				h3 ^= k3;
			
			case 8:
				k2 ^= key.charCodeAt(i + 7) << 24;
			
			case 7:
				k2 ^= key.charCodeAt(i + 6) << 16;
			
			case 6:
				k2 ^= key.charCodeAt(i + 5) << 8;
			
			case 5:
				k2 ^= key.charCodeAt(i + 4);
				k2 = _x86Multiply(k2, c2);
				k2 = _x86Rotl(k2, 16);
				k2 = _x86Multiply(k2, c3);
				h2 ^= k2;
			
			case 4:
				k1 ^= key.charCodeAt(i + 3) << 24;
			
			case 3:
				k1 ^= key.charCodeAt(i + 2) << 16;
			
			case 2:
				k1 ^= key.charCodeAt(i + 1) << 8;
			
			case 1:
				k1 ^= key.charCodeAt(i);
				k1 = _x86Multiply(k1, c1);
				k1 = _x86Rotl(k1, 15);
				k1 = _x86Multiply(k1, c2);
				h1 ^= k1;
		}
		
		h1 ^= key.length;
		h2 ^= key.length;
		h3 ^= key.length;
		h4 ^= key.length;
		
		h1 += h2;
		h1 += h3;
		h1 += h4;
		h2 += h1;
		h3 += h1;
		h4 += h1;
		
		h1 = _x86Fmix(h1);
		h2 = _x86Fmix(h2);
		h3 = _x86Fmix(h3);
		h4 = _x86Fmix(h4);
		
		h1 += h2;
		h1 += h3;
		h1 += h4;
		h2 += h1;
		h3 += h1;
		h4 += h1;
		
		return ("00000000" + (h1 >>> 0).toString(16)).slice(-8) + ("00000000" + (h2 >>> 0).toString(16)).slice(-8) + ("00000000" + (h3 >>> 0).toString(16)).slice(-8) + ("00000000" + (h4 >>> 0).toString(16)).slice(-8);
	};
	
	
	// INITIALIZATION
	// --------------

	// Export murmurHash3 for CommonJS, either as an AMD module or just as part
	// of the global object.
	if (true) {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = library;
		}
		
		exports.murmurHash3 = library;
	}
	
	else if (typeof define === 'function' && define.amd) {
		define([], function() {
			return library;
		});
	}
	
	else {
		// Use murmurHash3.noConflict to restore `murmurHash3` back to its
		// original value. Returns a reference to the library object, to allow
		// it to be used under a different name.
		library._murmurHash3 = root.murmurHash3
		
		library.noConflict = function () {
			root.murmurHash3 = library._murmurHash3;
			library._murmurHash3 = undefined;
			library.noConflict = undefined;
			
			return library;
		};
		
		root.murmurHash3 = library;
	}
})(this);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var hash = __webpack_require__(0).hash128;
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
              //REMOVED: No need for a "final" event; this causes the last download item to get fired twice.
              // final progress event!
              // if(onSingleDownloadProgress) onSingleDownloadProgress(new ProgressEvent());

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