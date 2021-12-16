/* 
Copyright © 2020 Ribbon Communications Operating Company, Inc. (“Ribbon”).
All rights reserved. Use of this media and its contents is subject to the 
terms and conditions of the applicable end user or software license 
agreement, right to use notice, and all relevant copyright protections.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// @file extendere.js

String.prototype.graft = function() {
  let self = this
  if (arguments.length == 1 && typeof arguments[0] == 'object' && !Array.isArray(arguments[0])) {
    for (let arg in arguments[0]) {
      self = self.replace(new RegExp('\\[' + arg + '\\]', 'g'), arguments[0][arg])
    }
  } else {
    for (let i = 0; i < arguments.length; i++) {
      self = self.replace('[' + i + ']', arguments[i])
    }
  }
  return self
}
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}
String.prototype.toBool = function() {
  return this.toLowerCase() == 'true' ? true : false
}
Array.prototype.last = function() {
  return this[this.length - 1]
}
