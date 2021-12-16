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

// @file i18n.js

import { Model } from '../comm/model.js'

/**
 * I18N is class with methods to change the dom
 */
export class I18N {
  /**
   * Static method to translate the provided dictionary.
   * @param {object} dict   dictionary
   */
  static translate(dict) {
    const entries = Object.entries(dict)
    for (const [key, val] of entries) {
      if (typeof dict[key] === 'object') {
        dict[key] = I18N.translate(dict[key])
      } else if (typeof dict[key] === 'string') {
        let localePresence = val.indexOf('i18n|')
        if (localePresence >= 0) {
          let localeKey = val.substring(localePresence + 5)
          dict[key] = Model.i18n[localeKey]
        }
      }
    }
    return dict
  }
  /**
   * Static method to check whether the language is right-to-left
   * @param {string} langISOCode   the ISO Code of the language
   */
  static isRTL(langISOCode) {
    const LANGUAGES_RTL = ['ar', 'dv', 'fa', 'ha', 'he', 'ks', 'ku', 'ps', 'ur', 'yi']
    let langCode = langISOCode.substring(0, 2)
    return LANGUAGES_RTL.indexOf(langCode) > -1
  }
  /**
   * Static method to re-align the text based on set language.
   */
  static realign() {
    if (I18N.isRTL(Model.queryParams.languageCode)) {
      $('body').addClass('rtl')
      $('button.btn.call_stop').addClass('to-left')
      $('button.btn.call_stop').removeClass('to-right')
    } else {
      $('body').removeClass('rtl')
      $('button.btn.call_stop').removeClass('to-left')
      $('button.btn.call_stop').addClass('to-right')
    }
  }
  /**
   * Static method to determine the default language of the browser
   */
  static getNavigatorLanguage() {
    return navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en'
  }
}
