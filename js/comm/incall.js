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

// @file incall.js

/**
 * InCall controls the aspects of incoming call.
 */
export class InCall {
  constructor() {
    if (this.instance instanceof InCall) {
      throw Error('Singleton class restricts new instance creation')
    }
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new InCall()
      this.instance.initialize()
    }
    return this.instance
  }
  initialize() {
    console.log('InCall.initialize')
  }
  // Incoming call
  start() {
    console.log('InCall.start')
  }
  stop() {
    console.log('InCall.stop')
  }
  speakerOff() {
    console.log('InCall.speakerOf')
  }
  speakerOn() {
    console.log('InCall.speakerOn')
  }
  videoOff() {
    console.log('InCall.videoOff')
  }
  videoOn() {
    console.log('InCall.videoOn')
  }
}
