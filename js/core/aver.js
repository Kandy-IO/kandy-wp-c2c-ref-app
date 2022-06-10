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

// @file aver.js

/**
 * Aver handles the call state animations.
 */
export class Aver {
  constructor(cid) {
    this.container = $('#' + cid)
  }
  stateRingingCall() {
    this.reset()
    this.phoneRing.show()
  }
  stateTerminatedCall() {
    this.reset()
    this.phoneCut.show()
  }
  stateIncomingCall() {
    this.reset()
    this.phoneCall.show()
  }
  stateMissedCall() {
    this.reset()
    this.phoneMiss.show()
  }
  stateHoldCall() {
    this.reset()
    this.phoneHold.show()
  }
  reset() {
    this.phoneRing.hide()
    this.phoneCut.hide()
    this.phoneCall.hide()
    this.phoneMiss.hide()
    this.phoneHold.hide()
  }
  defaultState() {
    this.reset()
  }
  initialize() {
    console.log('Aver.initialize')
    this.phoneRing = this.container.find('.phone_ring')
    this.phoneCut = this.container.find('.phone_cut')
    this.phoneCall = this.container.find('.phone_call')
    this.phoneMiss = this.container.find('.phone_miss')
    this.phoneHold = this.container.find('.phone_hold')
    this.defaultState()
  }
}
