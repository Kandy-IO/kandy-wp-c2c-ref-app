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

// @file dashboard.js

import { CallPanel } from './callpanel.js'
import { DialpadModal } from './dialpadmodal.js'
import { Dom } from '../core/dom.js'

/**
 * Dashboard initiates the call establishment process.
 */
export class Dashboard {
  /**
   * Constructor would instantiate the dependent modules.
   */
  constructor() {
    this.cid = 'dashboard'
    this.container = $('#' + this.cid)

    this.callPanel = new CallPanel()
    this.dialpadModal = new DialpadModal()
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
   * This function deactivates the container.
   */
  deactivate() {
    console.log('Dashboard.deactivate')
  }
  /**
   * This function activates the container.
   * @param {function} callback   input a listener
   */
  activate(callback) {
    console.log('Dashboard.activate')
    this.proceed = callback
  }
  /**
   * This function initializes the dashboard.
   */
  initialize() {
    console.log('Dashboard.initialize')

    this.callPanel.initialize(this)
    this.callPanel.show()

    this.dialpadModal.initialize(this)
    this.dialpadModal.hide()

    Dom.bind(this.container)
  }
}
