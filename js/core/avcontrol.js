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

// @file avcontrol.js

import { Model } from '../comm/model.js'
import { ToggleButton } from './togglebutton.js'

/**
 * AVControl manages the button bar of a control panel.
 */
export class AVControl {
  constructor(cid) {
    this.container = $('#' + cid)
    this.steers = {}

    this.callPhase = new ToggleButton(this.container)
    this.callFlow = new ToggleButton(this.container)
    this.callMic = new ToggleButton(this.container)
    this.callCamera = new ToggleButton(this.container)
    this.callScreenshare = new ToggleButton(this.container)

    this.callSpeaker = new ToggleButton(this.container)
    this.callVideo = new ToggleButton(this.container)
  }
  onClickCallPhase(state) {
    console.log('AVControl.onClickCallPhase', state)
    let event = state ? 'CallStop' : 'CallStart'
    this.proceed(event)
  }
  onClickCallFlow(state) {
    console.log('AVControl.onClickCallFlow', state)
    let event = state ? 'CallResume' : 'CallHold'
    this.proceed(event)
  }
  onClickCallMic(state) {
    console.log('AVControl.onClickCallMic', state)
    let event = state ? 'CallMicOff' : 'CallMicOn'
    this.proceed(event)
  }
  onClickCallCamera(state) {
    console.log('AVControl.onClickCallCamera', state)
    let event = state ? 'CallCameraOff' : 'CallCameraOn'
    this.proceed(event)
  }
  onClickCallSpeaker(state) {
    console.log('AVControl.onClickCallSpeaker', state)
    let event = state ? 'CallSpeakerOff' : 'CallSpeakerOn'
    this.proceed(event)
  }
  onClickCallVideo(state) {
    console.log('AVControl.onClickCallVideo', state)
    let event = state ? 'CallVideoOff' : 'CallVideoOn'
    this.proceed(event)
  }
  onClickCallScreenshare(state) {
    console.log('AVControl.onClickCallScreenshare', state)
    let event = state ? 'CallScreenshareOff' : 'CallScreenshareOn'
    this.proceed(event)
  }
  onClickCallDialpad() {
    console.log('AVControl.onClickCallDialpad')
    this.proceed('CallDialpadShow')
  }
  defaultState() {
    this.callPhase.setState(true)
    this.callFlow.setState(false)
    this.callMic.setState(true)
    this.callCamera.setState(false)
    this.callScreenshare.setState(true)

    this.callSpeaker.setState(true)
    this.callVideo.setState(true)
  }
  deactivate() {
    console.log('AVControl.deactivate')

    this.callPhase.deactivate(this.steers.onClickCallPhase)
    this.callFlow.deactivate(this.steers.onClickCallFlow)
    this.callMic.deactivate(this.steers.onClickCallMic)
    this.callCamera.deactivate(this.steers.onClickCallCamera)
    this.callScreenshare.deactivate(this.steers.onClickCallScreenshare)
    this.callDialpad.deactivate(this.steers.onClickCallDialpad)

    this.callSpeaker.deactivate(this.steers.onClickCallSpeaker)
    this.callVideo.deactivate(this.steers.onClickCallVideo)
  }
  activate(callback) {
    console.log('AVControl.activate')
    this.proceed = callback

    this.steers.onClickCallPhase = this.onClickCallPhase.bind(this)
    this.steers.onClickCallFlow = this.onClickCallFlow.bind(this)
    this.steers.onClickCallMic = this.onClickCallMic.bind(this)
    this.steers.onClickCallCamera = this.onClickCallCamera.bind(this)
    this.steers.onClickCallSpeaker = this.onClickCallSpeaker.bind(this)
    this.steers.onClickCallVideo = this.onClickCallVideo.bind(this)
    this.steers.onClickCallScreenshare = this.onClickCallScreenshare.bind(this)
    this.steers.onClickCallDialpad = this.onClickCallDialpad.bind(this)

    this.callPhase.activate(this.steers.onClickCallPhase)
    this.callFlow.activate(this.steers.onClickCallFlow)
    this.callMic.activate(this.steers.onClickCallMic)
    this.callCamera.activate(this.steers.onClickCallCamera)
    this.callScreenshare.activate(this.steers.onClickCallScreenshare)
    this.callDialpad.activate(this.steers.onClickCallDialpad)

    this.callSpeaker.activate(this.steers.onClickCallSpeaker)
    this.callVideo.activate(this.steers.onClickCallVideo)
  }
  initialize() {
    console.log('AVControl.initialize')

    this.callPhase.initialize('.call_start', '.call_stop')
    this.callFlow.initialize('.call_resume', '.call_hold')
    this.callMic.initialize('.call_mic_on', '.call_mic_off', Model.preference.microphone)
    this.callCamera.initialize('.call_camera_on', '.call_camera_off', Model.preference.camera)
    this.callScreenshare.initialize('.call_screen_share_on', '.call_screen_share_off', Model.preference.screenshare)

    this.callDialpad = this.container.find('.call_dialpad_show')
    this.callDialpad.enable = () => this.callDialpad.attr('disabled', false)
    this.callDialpad.disable = () => this.callDialpad.attr('disabled', true)
    this.callDialpad.activate = callback => this.callDialpad.on('click', callback)
    this.callDialpad.deactivate = callback => this.callDialpad.off('click', callback)

    this.callSpeaker.initialize('.call_audio_on', '.call_audio_off')
    this.callVideo.initialize('.call_video_on', '.call_video_off')

    this.defaultState()
  }
}
