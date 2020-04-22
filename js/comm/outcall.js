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

// @file outcall.js

import { Model } from '../comm/model.js'

/**
 * OutCall controls the aspects of outgoing call.
 */
export class OutCall {
  constructor() {
    if (this.instance instanceof OutCall) {
      throw Error('Singleton class restricts new instance creation')
    }
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new OutCall()
      this.instance.initialize()
    }
    return this.instance
  }
  initialize() {
    console.log('OutCall.initialize')
  }
  start() {
    console.log('OutCall.start, AccountToken:', Model.callCredentials.accountToken)
    this.callId = this.client.call.makeAnonymous(Model.callee, Model.callCredentials, Model.callOptions)
    console.log('OutCall.start, Call ID is', this.callId)
    this.callPanel.toast.info(Model.i18n.alertCallStarted, 1)
  }
  stop() {
    console.log('OutCall.stop ', this.callId)
    if (this.callId) {
      // Retrieve call state.
      let call = this.client.call.getById(this.callId)
      console.log('OutCall.stop, Ending call with', call.from)
      this.callPanel.toast.info(Model.i18n.alertCallStopped, 1)
      this.client.call.end(this.callId)
    }
  }
  hold() {
    console.log('OutCall.hold')
    if (this.callId) {
      this.client.call.hold(this.callId)
      this.callPanel.toast.info(Model.i18n.alertCallOnHold, 1)
    } else {
      this.callPanel.toast.warning(Model.i18n.alertUnableToHoldCall, 2)
    }
  }
  resume() {
    console.log('OutCall.resume')
    if (this.callId) {
      this.client.call.unhold(this.callId)
      this.callPanel.toast.info(Model.i18n.alertCallResumed, 1)
    } else {
      this.callPanel.toast.warning(Model.i18n.alertUnableToResumeCall, 2)
    }
  }
  micOff() {
    console.log('OutCall.micOff')
    if (this.callId) {
      const call = this.client.call.getById(this.callId)
      const localAudioTracks = this.getAudioTracks(call, true)
      if (localAudioTracks.length > 0) {
        const audioTrackIds = localAudioTracks.reduce((ts, t) => ts.concat(t.trackId), [])
        console.log('OutCall.micOff, Muting tracks: ', audioTrackIds)
        this.client.media.muteTracks(audioTrackIds)
        this.callPanel.toast.info(Model.i18n.alertCallMuted, 1)
      } else {
        this.callPanel.toast.warning(Model.i18n.alertNoLocalAudioTracksToMute, 2)
      }
    }
  }
  micOn() {
    console.log('OutCall.micOn')
    if (this.callId) {
      const call = this.client.call.getById(this.callId)
      const localAudioTracks = this.getAudioTracks(call, true)
      if (localAudioTracks.length > 0) {
        const audioTrackIds = localAudioTracks.reduce((ts, t) => ts.concat(t.trackId), [])
        console.log('OutCall.micOn, Unmuting tracks: ', audioTrackIds)
        this.client.media.unmuteTracks(audioTrackIds)
        this.callPanel.toast.info(Model.i18n.alertCallUnmuted, 1)
      } else {
        this.callPanel.toast.warning(Model.i18n.alertNoLocalAudioTracksToUnmute, 2)
      }
    }
  }
  cameraOff() {
    console.log('OutCall.cameraOff')
    if (this.callId) {
      const call = this.client.call.getById(this.callId)
      this.callPanel.localVideo.wasStreamed = false
      this.callPanel.localVideo.isStreaming = false
      this.callPanel.localVideo.willStream = false
      const localVideoTracks = this.getVideoTracks(call, true)
      if (localVideoTracks.length > 0) {
        this.client.call.removeMedia(this.callId, [localVideoTracks[0].trackId])
        this.callPanel.control.callCamera.setState(true)
        this.callPanel.toast.info(Model.i18n.alertCameraOff, 1)
      } else {
        this.callPanel.control.callCamera.setState(true)
        this.callPanel.toast.warning(Model.i18n.alertNoLocalVideoAvailableToRemove, 2)
      }
    }
  }
  cameraOn() {
    console.log('OutCall.cameraOn')
    if (this.callId) {
      const call = this.client.call.getById(this.callId)
      this.callPanel.localVideo.wasStreamed = false
      this.callPanel.localVideo.isStreaming = false
      this.callPanel.localVideo.willStream = true
      const localVideoTracks = this.getVideoTracks(call, true)
      if (localVideoTracks.length > 0) {
        this.callPanel.localScreen.wasShared = true
        this.callPanel.localScreen.isSharing = false
        this.client.call.removeMedia(this.callId, [localVideoTracks[0].trackId])
        this.callPanel.control.callScreenshare.setState(true)
      } else {
        this.callPanel.localVideo.isStreaming = true
        this.callPanel.localVideo.willStream = false
        this.client.call.addMedia(this.callId, {
          video: true,
          videoOptions: {
            deviceId: this.client.media.getDevices().camera.id
          }
        })
        this.callPanel.control.callCamera.setState(false)
        this.callPanel.toast.info(Model.i18n.alertCameraOn, 1)
      }
    }
  }
  screenshareOff() {
    console.log('OutCall.screenshareOff, Screen sharing stopped!')
    if (this.callId) {
      const call = this.client.call.getById(this.callId)
      this.callPanel.localScreen.wasShared = false
      this.callPanel.localScreen.isSharing = false
      this.callPanel.localScreen.willShare = false
      const localVideoTracks = this.getVideoTracks(call, true)
      if (localVideoTracks.length > 0) {
        if (this.callPanel.localVideo.wasStreamed) {
          this.callPanel.localScreen.wasShared = true
          this.callPanel.localVideo.willStream = true
        }
        this.client.call.removeMedia(this.callId, [localVideoTracks[0].trackId])
        this.callPanel.control.callScreenshare.setState(true)
        this.callPanel.toast.info(Model.i18n.alertScreensharingStopped, 1)
      } else {
        this.callPanel.control.callScreenshare.setState(true)
        this.callPanel.toast.warning(Model.i18n.alertNoLocalVideoAvailableToRemove, 2)
      }
    }
  }
  screenshareOn() {
    console.log('OutCall.screenshareOn, Screen sharing started!')
    if (this.callId) {
      const call = this.client.call.getById(this.callId)
      this.callPanel.localScreen.wasShared = false
      this.callPanel.localScreen.isSharing = false
      this.callPanel.localScreen.willShare = true
      const localVideoTracks = this.getVideoTracks(call, true)
      if (localVideoTracks.length > 0) {
        this.callPanel.localVideo.wasStreamed = true
        this.callPanel.localVideo.isStreaming = false
        this.client.call.removeMedia(this.callId, [localVideoTracks[0].trackId])
        this.callPanel.control.callCamera.setState(true)
      } else {
        this.callPanel.localScreen.isSharing = true
        this.callPanel.localScreen.willShare = false
        this.client.call.addMedia(this.callId, {
          // audio: !this.callPanel.control.callMic.state,
          video: false,
          screen: true
        })
        this.callPanel.control.callScreenshare.setState(false)
        this.callPanel.toast.info(Model.i18n.alertScreensharingStarted, 1)
      }
    }
  }
  sendDtmf(tone) {
    console.log('OutCall.sendDtmf', this.callId, tone)
    if (this.callId) {
      this.client.call.sendDTMF(this.callId, tone)
    }
  }
}
