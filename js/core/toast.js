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

// @file toast.js

/**
 * Toast controls the notifications
 */
export class Toast {
  constructor(cid) {
    this.container = $('#' + cid)
    this.steers = {}
  }
  /**
   * This function shows the container.
   */
  show(content, duration) {
    this.message.html(content)
    this.toast.show()
    this.activate()
    if (!!duration) {
      setTimeout(() => {
        this.hide()
      }, duration * 1000)
    }
  }
  /**
   * This function hides the container.
   */
  hide() {
    this.message.html()
    this.toast.hide()
    this.deactivate()
  }
  defaultTheme() {
    this.toast.removeClass('toast-primary toast-success toast-warning toast-error')
  }
  info(content, duration) {
    this.defaultTheme()
    this.toast.addClass('toast-primary')
    this.show(content, duration)
  }
  success(content, duration) {
    this.defaultTheme()
    this.toast.addClass('toast-success')
    this.show(content, duration)
  }
  warning(content, duration) {
    this.defaultTheme()
    this.toast.addClass('toast-warning')
    this.show(content, duration)
  }
  error(content, duration) {
    this.defaultTheme()
    this.toast.addClass('toast-error')
    this.show(content, duration)
  }
  onClickClose(e) {
    this.hide()
  }
  defaultState() {
    this.hide()
  }
  deactivate() {
    this.close.off('click', this.steers.onClickClose)
  }
  activate() {
    this.steers.onClickClose = this.onClickClose.bind(this)
    this.close.on('click', this.steers.onClickClose)
  }
  initialize() {
    console.log('Toast.initialize')
    this.toast = this.container.find('.toast')
    this.message = this.container.find('.toast_message')
    this.close = this.container.find('.toast_close')
    this.defaultState()
  }
}
