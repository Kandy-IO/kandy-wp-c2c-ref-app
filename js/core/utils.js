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

// @file utils.js

/**
 * Utils is class that consists generic utility methods
 */
export class Utils {
  /**
   * Static method to check if the value is empty or not
   * @param {any} value   any type of value
   */
  static isEmpty(value) {
    return typeof value === 'undefined' || value === null
  }
  /**
   * Static method to return non-empty value based on priority list
   * @param {string} values   priority list
   */
  static prioritize(...values) {
    for (var value of values) if (!Utils.isEmpty(value)) return value
    return value
  }
  /**
   * Static method to fetch the value from object property chain
   * @param {object} obj   object to lookup
   * @param {string} path   property chain
   * @param {string} defaultValue   default value
   */
  static chain(obj, path, defaultValue) {
    const travel = regexp =>
      String.prototype.split
        .call(path, regexp)
        .filter(Boolean)
        .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj)
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
    return result === undefined || result === obj ? defaultValue : result
  }
  /**
   * Static method to capitalize the value
   * @param {string} value   string type of value
   */
  static capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
  }
  /**
   * Static method to string to boolean value
   * @param {string} value   string type of value
   */
  static toBool(value) {
    return !!value && (value.toLowerCase() == 'true' ? true : false)
  }
  /**
   * Static method to get the last item of an array
   * @param {array} value   array type of value
   */
  static last(value) {
    return value[value.length - 1]
  }
}
