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

// @file acoustic.js

/**
 * Acoustic controls the local audio.
 */
export class Acoustic {
  constructor() {
    this.audio = new Audio()
    this.enabled = true
  }
  /**
   * This function enables the audio.
   */
  enable(status) {
    this.enabled = status
  }
  /**
   * This function gets triggered on success.
   */
  onSuccess() {
    console.log('Acoustic.onSuccess')
  }
  /**
   * This function gets triggered on failure.
   */
  onFailure(error) {
    console.log('Acoustic.onFailure', error)
  }
  /**
   * This function plays the audio.
   */
  play() {
    if (this.enabled) {
      var vow = this.audio.play()
      if (vow !== undefined) {
        vow.then(this.onSuccess).catch(this.onFailure)
      }
    }
  }
  /**
   * This function stops the audio.
   */
  stop() {
    if (this.enabled) {
      this.audio.pause()
    }
  }
  /**
   * This function plays the key tone.
   */
  tone(aid) {
    if (this.enabled) {
      let fid = aid == '#' ? 'Hash' : aid == '*' ? 'Star' : is.number(+aid) ? aid : null
      if (fid != null) {
        this.audio.src = 'aud/dtmf' + fid + '.wav'
        this.audio.type = 'audio/wav'
        this.play()
      }
    }
  }
  /**
   * This function plays the ringtone.
   */
  ring() {
    if (this.enabled) {
      this.audio.src = 'aud/ringout.wav'
      this.audio.type = 'audio/wav'
      this.audio.loop = true
      this.play()
    }
  }
}
