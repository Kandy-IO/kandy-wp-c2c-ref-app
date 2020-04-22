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

import { Acoustic } from '../core/acoustic.js'
import { Dom } from '../core/dom.js'

/**
 * Dialpad can be opened when key-input is required on IVR, answering machine, etc.
 */
export class DialpadModal {
  /**
   * This function initializes the Dialpad
   */
  constructor() {
    this.cid = 'dialpad_modal'
    this.container = $('#' + this.cid)
    this.closeModal = this.container.find('.modal-close')
    this.dialKey = this.container.find('button.dialpad-key')
    this.displayTxt = this.container.find('.display-txt')
    this.steers = {}
    this.acoustic = new Acoustic()
  }
  /**
   * This function hides the container.
   */
  hide() {
    this.container.removeClass('active')
    this.deactivate()
  }
  /**
   * This function shows the container.
   */
  show() {
    this.container.addClass('active')
  }
  /**
   * This function listens the presed dial-key.
   * @param {object} e   input the click-event
   */
  onPressDialKey(e) {
    e.preventDefault()
    console.log('DialpadModal.onPressDialKey', e.currentTarget.value)
    DialpadModal.displayContent += e.currentTarget.value
    Dom.apply(this.displayTxt)
    this.acoustic.tone(e.currentTarget.value)
    this.proceed(e.currentTarget.value)
  }
  /**
   * This function resets the display.
   */
  defaultState() {
    DialpadModal.displayContent = ''
    Dom.apply(this.displayTxt)
  }
  /**
   * This function deactivate the container.
   */
  deactivate() {
    console.log('DialpadModal.deactivate')
    this.closeModal.off('click', this.steers.hide)
    this.dialKey.off('click', this.steers.onPressDialKey)
  }
  /**
   * This function activates the container.
   * @param {function} callback   input listener
   */
  activate(callback) {
    console.log('DialpadModal.activate')
    this.proceed = callback

    this.steers.hide = this.hide.bind(this)
    this.steers.onPressDialKey = this.onPressDialKey.bind(this)

    this.closeModal.on('click', this.steers.hide)
    this.dialKey.on('click', this.steers.onPressDialKey)
  }
  /**
   * This function initializes the container.
   * @param {element} parentRef   input DOM element reference
   */
  initialize(parentRef) {
    console.log('DialpadModal.initialize')
    this.parent = parentRef
    this.defaultState()
    Dom.bind(this.container)
  }
}
