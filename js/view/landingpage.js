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

// @file landingpage.js

import { Model } from '../comm/model.js'
import { Toast } from '../core/toast.js'
import { Dom } from '../core/dom.js'
import { InputField } from '../core/inputfield.js'

/**
 * LandingPage asks for more information before proceeding forward
 */
export class LandingPage {
  /**
   * This function initializes the LandingPage
   */
  constructor() {
    this.cid = 'landingpage'
    this.container = $('#' + this.cid)
    this.steers = {}
    this.toast = new Toast('landingpage_panel')
    this.formRef = '#' + this.cid + ' #lp_form'
    this.fields = {}
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
  /**
   * This function listens the submit event.
   * @param {object} e   input the click-event
   */
  onSubmitForm(e) {
    e.preventDefault()
    let customParams = []
    let isValid = true
    for (let i = 0; i < Model.landingConfig.content.inputField.length; i++) {
      let isFieldValid = this.fields[i].validate()
      if (isFieldValid) {
        customParams.push(this.fields[i].data())
      }
      isValid = isValid && isFieldValid
    }
    if (isValid) {
      if (customParams.length > 0) {
        if (!!Model.callOptions.customParameters) {
          Model.callOptions.customParameters = [...Model.callOptions.customParameters, ...customParams]
        } else {
          Model.callOptions.customParameters = customParams
        }
      }
      this.proceed()
    } else {
      this.toast.warning(Model.i18n.alertEnterValidInput)
    }
  }
  /**
   * This function deactivate the container.
   */
  deactivate() {
    for (let i = 0; i < Model.landingConfig.content.inputField.length; i++) {
      this.fields[i].deactivate()
    }
    this.submit.off('click', this.steers.onSubmitForm)
  }
  /**
   * This function activates the container.
   * @param {function} callback   input listener
   */
  activate(callback) {
    this.proceed = callback
    this.steers.onSubmitForm = this.onSubmitForm.bind(this)
    for (let i = 0; i < Model.landingConfig.content.inputField.length; i++) {
      this.fields[i].activate()
    }
    this.submit.on('click', this.steers.onSubmitForm)
  }
  /**
   * This function initializes the container.
   */
  initialize() {
    console.log('LandingPage.initialize')
    Dom.bind(this.container)
    this.toast.initialize()
    this.submit = this.container.find('button#lp_submit')
    for (let i = 0; i < Model.landingConfig.content.inputField.length; i++) {
      this.fields[i] = new InputField(this.formRef, Model.landingConfig.content.inputField[i])
      this.fields[i].initialize()
    }
  }
}
