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

// @file inputfield.js

import '../core/extendere.js'

/**
 * InputFields controls the input text fields.
 */
export class InputField {
  constructor(formRef, model) {
    this.model = model
    this.parentRef = formRef
    this.steers = {}
  }
  /**
   * This function hides the container.
   */
  hide() {
    this.container.addClass('hide')
  }
  /**
   * This function shows the container.
   */
  show() {
    this.container.removeClass('hide')
  }
  render() {
    let tmpl = `
        <div class="form-group">
            <label class="form-label" for="lp_[id]">[label]</label>
            <input class="form-input" type="text" id="lp_[id]" placeholder="[hint]" maxlength="30" pattern="[valid]" title="[tip]">
            <div class="form-input-hint hide">[errmsg]</div>
        </div>`
    $(this.parentRef).append(tmpl.graft(this.model))
  }
  showValidationError(bool) {
    if (bool) {
      this.container.addClass('is-error')
      this.container.siblings('.form-input-hint').removeClass('hide')
    } else {
      this.container.removeClass('is-error')
      this.container.siblings('.form-input-hint').addClass('hide')
    }
  }
  data() {
    return {
      name: this.model.id,
      value: this.container.val()
    }
  }
  validate() {
    var validity = new RegExp(this.model.match)
    if (!!this.container.val()) {
      if (validity.test(this.container.val())) {
        return true
      } else {
        this.showValidationError(true)
        this.container.on('keyup', this.steers.onChangeValue)
        return false
      }
    } else {
      return true
    }
  }
  onChangeValue(e) {
    this.showValidationError(false)
    this.container.off('keyup', this.steers.onChangeValue)
  }
  deactivate() {
    this.container.off('keyup', this.steers.onChangeValue)
  }
  activate(callback) {
    this.proceed = callback
    this.steers.onChangeValue = this.onChangeValue.bind(this)
    this.container.on('keyup', this.steers.onChangeValue)
  }
  initialize() {
    console.log('InputField.initialize')
    this.render()
    this.container = $(this.parentRef + ' #lp_' + this.model.id)
    this.showValidationError(false)
  }
}
