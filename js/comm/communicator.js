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

// @file communicator.js

import '../core/extendere.js'
import { Model } from '../comm/model.js'
import { InCall } from './incall.js'
import { OutCall } from './outcall.js'

/**
 * Communicator manages all aspects of the call & reacts on related events.
 */
export class Communicator {
  // static instance
  constructor() {
    if (this.instance instanceof Communicator) {
      throw Error('Singleton class restricts new instance creation')
    }
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new Communicator()
      this.instance.initialize()
    }
    return this.instance
  }
  initialize() {
    console.log('Communicator.initialize')

    this.callStateHistory = []
    this.callOperationLog = []

    this.inCall = InCall.getInstance()
    this.outCall = OutCall.getInstance()

    let kandyConfig = JSON.parse(JSON.stringify(Model.kandyConfig)) || {}
    delete kandyConfig.call.removeCodecs
    kandyConfig.call.sdpHandlers = []

    let codecRemover = Kandy.sdpHandlers.createCodecRemover(Model.kandyConfig.call.removeCodecs || [])
    kandyConfig.call.sdpHandlers.push(codecRemover)

    this.client = Kandy.create(kandyConfig)
    console.log('Communicator.initialize, Kandy client:', this.client)

    this.steers = {}
    this.steers.onCallStart = this.onCallStart.bind(this)
    this.steers.onMediaMuted = this.onMediaMuted.bind(this)
    this.steers.onMediaUnmuted = this.onMediaUnmuted.bind(this)
    this.steers.onCallOperation = this.onCallOperation.bind(this)
    this.steers.onCallStatsReceived = this.onCallStatsReceived.bind(this)
    this.steers.onCallRemoveMedia = this.onCallRemoveMedia.bind(this)
    this.steers.onCallNewMedia = this.onCallNewMedia.bind(this)
    this.steers.onCallTrackEnded = this.onCallTrackEnded.bind(this)
    this.steers.onCallNewTrack = this.onCallNewTrack.bind(this)
    this.steers.onCallTrackReplaced = this.onCallTrackReplaced.bind(this)
    this.steers.onCallStateChange = this.onCallStateChange.bind(this)

    this.steers.outCallStart = this.outCall.start.bind(this)
    this.steers.outCallStop = this.outCall.stop.bind(this)
    this.steers.outCallHold = this.outCall.hold.bind(this)
    this.steers.outCallResume = this.outCall.resume.bind(this)
    this.steers.outCallMicOff = this.outCall.micOff.bind(this)
    this.steers.outCallMicOn = this.outCall.micOn.bind(this)
    this.steers.outCallCameraOff = this.outCall.cameraOff.bind(this)
    this.steers.outCallCameraOn = this.outCall.cameraOn.bind(this)
    this.steers.outCallSendDtmf = this.outCall.sendDtmf.bind(this)
    this.steers.outCallScreenshareOn = this.outCall.screenshareOn.bind(this)
    this.steers.outCallScreenshareOff = this.outCall.screenshareOff.bind(this)

    // For initiating call
    this.client.on('call:start', this.steers.onCallStart)
    this.client.on('media:muted', this.steers.onMediaMuted)
    this.client.on('media:unmuted', this.steers.onMediaUnmuted)
    this.client.on('call:operation', this.steers.onCallOperation)
    this.client.on('call:statsReceived', this.steers.onCallStatsReceived)
    this.client.on('call:removeMedia', this.steers.onCallRemoveMedia)
    this.client.on('call:newMedia', this.steers.onCallNewMedia)
    this.client.on('call:trackEnded', this.steers.onCallTrackEnded)
    this.client.on('call:newTrack', this.steers.onCallNewTrack)
    this.client.on('call:trackReplaced', this.steers.onCallTrackReplaced)
    this.client.on('call:stateChange', this.steers.onCallStateChange)
  }

  setCallPanel(callPanelRef) {
    this.callPanel = callPanelRef
  }

  // Events
  onCallStart(params) {
    console.log('Communicator.onCallStart, callId:', params.callId)
    this.callStateHistory = []
    this.callOperationLog = []
  }
  onMediaMuted(params) {
    console.log('Communicator.onMediaMuted, params:', params)
    this.callPanel.control.callMic.setState(true)
  }
  onMediaUnmuted(params) {
    console.log('Communicator.onMediaUnmuted, params:', params)
    this.callPanel.control.callMic.setState(false)
  }
  onCallOperation(params) {
    console.log('Communicator.onCallOperation, params:', params)
    this.callOperationLog.push([params.operation || this.callOperationLog.last()[0], params.transition])
    if (params.callId == this.callId) {
      // const call = this.client.call.getById(params.callId)
      if (params.isLocal) {
        if (params.transition == 'START') {
          switch (params.operation) {
            case 'ADD_MEDIA':
              this.callPanel.control.callCamera.disable()
              this.callPanel.control.callScreenshare.disable()
              break
            case 'REMOVE_MEDIA':
              this.callPanel.control.callCamera.disable()
              this.callPanel.control.callScreenshare.disable()
              break
            case 'RENEGOTIATE':
              if (this.callPanel.localScreen.isSharing) {
                this.callPanel.control.callCamera.disable()
                this.callPanel.control.callScreenshare.disable()
              }
              break
            case 'MAKE':
              this.callPanel.aver.stateRingingCall()
              this.callPanel.control.callCamera.disable()
              this.callPanel.control.callScreenshare.disable()
              this.callPanel.control.callDialpad.disable()
              break
            case 'END':
              this.callPanel.control.callMic.disable()
              this.callPanel.control.callCamera.disable()
              this.callPanel.control.callScreenshare.disable()
              this.callPanel.control.callDialpad.disable()
              break
          }
        }
        if (params.transition == 'FINISH') {
          switch (params.operation) {
            case 'ADD_MEDIA':
              this.callPanel.control.callCamera.enable()
              this.callPanel.control.callScreenshare.enable()
              break
            case 'REMOVE_MEDIA':
              this.callPanel.control.callCamera.enable()
              this.callPanel.control.callScreenshare.enable()
              if (this.callPanel.localVideo.willStream && this.callPanel.localScreen.wasShared) {
                this.client.call.addMedia(this.callId, {
                  video: true,
                  videoOptions: {
                    deviceId: this.client.media.getDevices().camera.id
                  }
                })
                this.callPanel.localVideo.willStream = false
                this.callPanel.localVideo.isStreaming = true
                this.callPanel.control.callCamera.setState(false)
                this.callPanel.toast.info(Model.i18n.alertCameraOn, 1)
              }
              if (this.callPanel.localScreen.willShare && this.callPanel.localVideo.wasStreamed) {
                this.client.call.addMedia(this.callId, {
                  video: false,
                  screen: true
                })
                this.callPanel.localScreen.willShare = false
                this.callPanel.localScreen.isSharing = true
                this.callPanel.control.callScreenshare.setState(false)
                this.callPanel.toast.info(Model.i18n.alertScreensharingStarted, 1)
              }
              break
            case 'RENEGOTIATE':
              if (this.callPanel.localScreen.isSharing) {
                this.callPanel.localScreen.isSharing = false
                this.callPanel.control.callCamera.enable()
                this.callPanel.control.callScreenshare.enable()
                this.callPanel.control.callScreenshare.setState(true)
                this.callPanel.toast.info(Model.i18n.alertScreensharingStopped, 1)
              }
              break
            case 'MAKE':
              this.callPanel.control.callCamera.enable()
              this.callPanel.control.callScreenshare.enable()
              this.callPanel.control.callDialpad.enable()
              break
            case 'END':
              this.callPanel.control.callMic.enable()
              this.callPanel.control.callCamera.enable()
              this.callPanel.control.callScreenshare.enable()
              this.callPanel.control.callDialpad.enable()
              break
          }
        }
      } else {
        if (params.transition == 'FINISH') {
          switch (params.operation) {
            case 'HOLD':
              this.callPanel.control.callCamera.disable()
              this.callPanel.control.callScreenshare.disable()
              this.callPanel.control.callDialpad.disable()
              break
            case 'UNHOLD':
              this.callPanel.control.callCamera.enable()
              this.callPanel.control.callScreenshare.enable()
              this.callPanel.control.callDialpad.enable()
              break
          }
        }
      }
    }
  }
  onCallStatsReceived(params) {
    console.log('Communicator.onCallStatsReceived, params:', params)
  }
  onCallRemoveMedia(params) {
    console.log('Communicator.onCallRemoveMedia, params:', params)
  }
  onCallNewMedia(params) {
    console.log('Communicator.onCallNewMedia, params:', params)
    // check if this is our [one and only] active call
    if (params.callId == this.callId) {
      // look to see if local media has video and disable/enable buttons accordingly
      if (!!params.error) {
        // let err = this.parseError(params.error);
        this.callPanel.toast.warning(Model.i18n['errorCode_' + params.error.code], 2)
        if (params.error.name == 'BasicError' && !!params.local) {
          this.callPanel.control.callCamera.setState(true)
          this.callPanel.control.callScreenshare.setState(true)
        }
      }
    }
  }
  onCallTrackEnded(params) {
    console.log('Communicator.onCallTrackEnded, params:', params)
    if (params.callId == this.callId) {
      const call = this.client.call.getById(params.callId)
      const avBox = params.local ? this.callPanel.guestAVBoxId : this.callPanel.agentAVBoxId
      this.client.media.removeTracks([params.trackId], avBox)
    }
  }
  onCallNewTrack(params) {
    console.log('Communicator.onCallNewTrack, params:', params)
    if (params.callId == this.callId) {
      const call = this.client.call.getById(params.callId)
      const avBox = params.local ? this.callPanel.guestAVBoxId : this.callPanel.agentAVBoxId
      this.client.media.renderTracks([params.trackId], avBox)
    }
  }
  onCallTrackReplaced(params) {
    console.log('Communicator.onCallTrackReplaced, params:', params)
    if (params.callId == this.callId) {
      const call = this.client.call.getById(params.callId)
      const avBox = params.local ? this.callPanel.guestAVBoxId : this.callPanel.agentAVBoxId
      this.client.media.renderTracks([params.trackId], avBox)
    }
  }
  onCallStateChange(params) {
    console.log('Communicator.onCallStateChange, params:', params)
    // If the call ended, stop tracking the callId.
    if (params.callId == this.callId) {
      const call = this.client.call.getById(params.callId)
      switch (call.state) {
        case this.client.call.states.INITIATING:
          console.log('Communicator.onCallStateChange, INITIATING')
          this.callStateHistory.push(call.state)
          this.callPanel.toast.info(Model.i18n.alertCallInitiating, 1)
          break
        case this.client.call.states.INITIATED:
          console.log('Communicator.onCallStateChange, INITIATED')
          this.callStateHistory.push(call.state)
          this.callPanel.toast.info(Model.i18n.alertCallInitiated, 1)
          break
        case this.client.call.states.RINGING:
          console.log('Communicator.onCallStateChange, RINGING')
          this.callStateHistory.push(call.state)
          this.callPanel.toast.info(Model.i18n.alertCallRinging, 1)
          this.callPanel.onChangeTelephonyState(this.callPanel.TELEPHONYSTATE_RINGING)
          break
        case this.client.call.states.EARLY_MEDIA:
          console.log('Communicator.onCallStateChange, EARLY_MEDIA')
          this.callStateHistory.push(call.state)
          this.callPanel.toast.info(Model.i18n.alertCallEarlyMedia, 1)
          this.callPanel.onChangeTelephonyState(this.callPanel.TELEPHONYSTATE_EARLYMEDIA)
          this.callPanel.aver.reset()
          break
        case this.client.call.states.CANCELLED:
          console.log('Communicator.onCallStateChange, CANCELLED')
          this.callStateHistory.push(call.state)
          this.callPanel.toast.error(Model.i18n.alertCallCancelled, 2)
          break
        case this.client.call.states.CONNECTED:
          console.log('Communicator.onCallStateChange, CONNECTED')
          this.callStateHistory.push(call.state)
          this.callPanel.toast.success(Model.i18n.alertCallConnected, 2)
          if (call.localTracks) {
            call.localTracks.forEach(t => {
              let track = this.client.media.getTrackById(t)
              console.log('Communicator.onCallStateChange, Connected, localTrack:', track, 'trackId:', t)
              if (track.kind == 'audio') {
                this.client.media.removeTracks([t], this.callPanel.guestAVBoxId)
              } else {
                this.client.media.renderTracks([t], this.callPanel.guestAVBoxId)
              }
              // this.callPanel.toast.info(Model.i18n.alertCallConnectedLocal, 1);
            })
          }
          if (call.remoteTracks) {
            call.remoteTracks.forEach(t => {
              let track = this.client.media.getTrackById(t)
              console.log('Communicator.onCallStateChange, Connected, remoteTrack:', track, 'trackId:', t)
              this.client.media.renderTracks([t], this.callPanel.agentAVBoxId)
              // this.callPanel.toast.info(Model.i18n.alertCallConnectedRemote, 1);
            })
          }
          this.callPanel.aver.reset()
          this.callPanel.agentAVBox.show()
          this.callPanel.guestAVBox.show()
          if (~['MAKE.FINISH'].indexOf(this.callOperationLog.last().join('.'))) {
            this.callPanel.onChangeTelephonyState(this.callPanel.TELEPHONYSTATE_OFFHOOK)
          }
          break
        case this.client.call.states.ON_HOLD:
          console.log('Communicator.onCallStateChange, ON_HOLD')
          this.callStateHistory.push(call.state)
          this.callPanel.toast.warning(Model.i18n.alertCallOnHold, 2)
          this.callPanel.onChangeTelephonyState(this.callPanel.TELEPHONYSTATE_ONHOLD)
          break
        case this.client.call.states.ENDED:
          console.log('Communicator.onCallStateChange, ENDED')
          this.callStateHistory.push(call.state)
          this.callPanel.aver.reset()
          this.callPanel.toast.error(Model.i18n.alertCallDisconnected, 2)
          this.callPanel.onChangeTelephonyState(this.callPanel.TELEPHONYSTATE_IDLE)
          break
      }
    }
  }

  // Other
  getAudioTracks(call, localAudio) {
    console.log('Communicator.getAudioTracks')
    let tracks = []
    const allTracks = localAudio ? call.localTracks : call.remoteTracks
    if (allTracks == call.localTracks) {
      allTracks.forEach(t => {
        const thisTrack = this.client.media.getTrackById(t)
        if (thisTrack.kind == 'audio') {
          tracks.push(thisTrack)
        }
      })
    }
    return tracks
  }
  getVideoTracks(call, localVideo) {
    console.log('Communicator.getVideoTracks')
    let tracks = []
    const allTracks = localVideo ? call.localTracks : call.remoteTracks
    if (allTracks) {
      allTracks.forEach(t => {
        const thisTrack = this.client.media.getTrackById(t)
        if (thisTrack.kind == 'video') {
          tracks.push(thisTrack)
        }
      })
    }
    return tracks
  }
  dumpTracks(callId) {
    console.log('Communicator.dumpTracks, -[ begin ]-')

    console.log('Communicator.dumpTracks, callId:', callId, 'client:', this.client)
    const call = this.client.call.getById(callId)
    console.log('Communicator.dumpTracks, call:', call)

    let localTracks = call.localTracks
    console.log('Communicator.dumpTracks, localTracks:', localTracks)
    localTracks.forEach(t => {
      const thisTrack = this.client.media.getTrackById(t)
      console.log('Communicator.dumpTracks, localTrack:', t, thisTrack.kind)
    })

    let remoteTracks = call.remoteTracks
    console.log('Communicator.dumpTracks, remoteTracks:', remoteTracks)
    remoteTracks.forEach(t => {
      const thisTrack = this.client.media.getTrackById(t)
      console.log('Communicator.dumpTracks, remoteTrack:', t, thisTrack.kind)
    })

    console.log('Communicator.dumpTracks, -[ end ]-')
  }
  parseError(errObj) {
    const pattern = /^([\s\w\s]+\=\>)([\w\s]+\:[\w\s\.]+[\;]*)+$/g
    if (!!errObj && !!errObj.message && pattern.test(errObj.message)) {
      let err = {}
      let ta = errObj.message.split('=>')
      err.k = ta[0].trim()
      let tb = ta[1].split(';')
      err.v = {}
      for (let i in tb) {
        let tc = tb[i].split(':')
        err.v[tc[0].trim()] = tc[1].trim()
      }
      errObj.message = err
    } else {
      errObj = JSON.stringify(errObj)
    }
    return errObj
  }
}
