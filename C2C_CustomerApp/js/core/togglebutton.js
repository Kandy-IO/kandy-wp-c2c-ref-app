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

// @file togglebutton.js

/**
 * ToggleButton manages the button.
 */
export class ToggleButton {
  /**
   * This function initializes the ToggleButton
   */
  constructor(containerRef) {
    this.container = containerRef
    this.alive = true
    this.state = false
    this.steers = {}
  }
  /**
   * This function hides the container.
   */
  hide() {
    this.btnOn.hide()
    this.btnOff.hide()
  }
  /**
   * This function shows the container.
   */
  show() {
    if (this.alive) {
      if (this.state) {
        this.btnOn.show()
        this.btnOff.hide()
      } else {
        this.btnOn.hide()
        this.btnOff.show()
      }
    }
  }
  /**
   * This function disables the container.
   */
  disable() {
    this.btnOn.attr('disabled', true)
    this.btnOff.attr('disabled', true)
  }
  /**
   * This function enables the container.
   */
  enable() {
    this.btnOn.attr('disabled', false)
    this.btnOff.attr('disabled', false)
  }
  /**
   * This function listens the on click event over the container.
   * @param {object} e   input the click-event
   */
  onClickOn(e) {
    console.log('ToggleButton.onClickOn')
    this.setState(false)
    this.proceed(false)
  }
  /**
   * This function unlistens the on click event over the container.
   * @param {object} e   input the click-event
   */
  onClickOff(e) {
    console.log('ToggleButton.onClickOff')
    this.setState(true)
    this.proceed(true)
  }
  /**
   * This function to set state of the container.
   */
  setState(state) {
    // console.log('ToggleButton.setState', state);
    this.state = state
    this.show()
  }
  /**
   * This function deactivate the container.
   */
  deactivate() {
    console.log('ToggleButton.deactivate')
    this.btnOn.off('click', this.steers.onClickOn)
    this.btnOff.off('click', this.steers.onClickOff)
  }
  /**
   * This function activates the container.
   * @param {function} callback   input listener
   */
  activate(callback) {
    console.log('ToggleButton.activate')
    this.proceed = callback

    this.steers.onClickOn = this.onClickOn.bind(this)
    this.steers.onClickOff = this.onClickOff.bind(this)

    this.btnOn.on('click', this.steers.onClickOn)
    this.btnOff.on('click', this.steers.onClickOff)
  }
  /**
   * This function initializes the container.
   * @param {element} btnOnRef   input DOM element reference
   * @param {element} btnOffRef   input DOM element reference
   * @param {element} alive   is in-use or not (default is true)
   */
  initialize(btnOnRef, btnOffRef, alive = true) {
    console.log('ToggleButton.initialize')
    this.btnOn = this.container.find(btnOnRef)
    this.btnOff = this.container.find(btnOffRef)
    this.alive = alive
  }
}
