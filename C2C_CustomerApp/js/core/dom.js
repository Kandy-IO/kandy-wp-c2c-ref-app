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

// @file dom.js

import { Model } from '../comm/model.js'
import { DialpadModal } from '../view/dialpadmodal.js'

/**
 * Dom is class with methods to change the dom
 */
export class Dom {
  /**
   * Static method to apply changes in the provided element.
   * @param {object} elmRef   element reference
   */
  static apply(elmRef) {
    let map = bindStr => {
      let args = []
      if (!!bindStr && bindStr.indexOf(':') >= 0) {
        args = bindStr.split(':')
      }
      return args
    }
    let render = (elAttr, modelRef) => {
      switch (elAttr) {
        case 'text':
          container.text(eval(modelRef))
          break
        case 'html':
          container.html(eval(modelRef))
          break
        default:
          container.attr(elAttr, eval(modelRef))
          break
      }
    }
    var container = typeof elmRef === 'string' || elmRef instanceof String ? $(elmRef) : elmRef
    let rope = map(container.data('bind'))
    render(rope[0], rope[1])
  }
  /**
   * Static method to bind listener with the provided element.
   * @param {object} boxRef   box reference
   */
  static bind(boxRef) {
    boxRef.find('.auto-fill').each((i, el) => Dom.apply($(el)))
  }
}
