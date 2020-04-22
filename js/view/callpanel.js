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

// @file callpanel.js

import { Model } from '../comm/model.js'
import { AVControl } from '../core/avcontrol.js'
import { Aver } from '../core/aver.js'
import { Toast } from '../core/toast.js'
import { Acoustic } from '../core/acoustic.js'
import { Communicator } from '../comm/communicator.js'
import { Dom } from '../core/dom.js'

/**
 * CallPanel controls the calling panel.
 */
export class CallPanel {
  /**
   * Constructor would instantiate the dependent modules.
   */
  constructor() {
    this.cid = 'call_panel'
    this.container = $('#' + this.cid)
    this.steers = {}

    this.guestAVBoxId = '#' + this.cid + ' #av_guest'
    this.guestAVBox = $(this.guestAVBoxId)

    this.agentAVBoxId = '#' + this.cid + ' #av_agent'
    this.agentAVBox = $(this.agentAVBoxId)

    this.title = this.container.find('.panel-title')
    this.control = new AVControl(this.cid)
    this.aver = new Aver(this.cid)
    this.toast = new Toast(this.cid)

    this.acoustic = new Acoustic()
    this.acoustic.enable(true)

    this.localVideo = {
      wasStreamed: false,
      isStreaming: false,
      willStream: false
    }
    this.localScreen = {
      wasShared: false,
      isSharing: false,
      willShare: false
    }

    this.isForcedWinClose = false
    this.isCallOnHold = false

    this.TELEPHONYSTATE_IDLE = 'Idle'
    this.TELEPHONYSTATE_RINGING = 'Ringing'
    this.TELEPHONYSTATE_OFFHOOK = 'OffHook'
    this.TELEPHONYSTATE_ONHOLD = 'OnHold'
    this.TELEPHONYSTATE_EARLYMEDIA = 'EarlyMedia'
  }
  /**
   * This function hides the container.
   */
  hide() {
    this.container.addClass('hide')
  }
  /**
   * This function hides the container.
   */
  show() {
    this.container.removeClass('hide')
  }
  onChangeTelephonyState(state) {
    console.log('CallPanel.onChangeTelephonyState', state)
    this.telephonyState = state
    switch (state) {
      case this.TELEPHONYSTATE_RINGING:
        this.aver.stateRingingCall()
        this.acoustic.ring()
        break
      case this.TELEPHONYSTATE_EARLYMEDIA:
        this.acoustic.stop()
        this.control.callDialpad.show()
        break
      case this.TELEPHONYSTATE_IDLE:
        this.defaultState()
        if (Model.preference.autoClose) {
          this.isForcedWinClose = true
          setTimeout(parent.window.close, 1000)
        }
        break
      case this.TELEPHONYSTATE_OFFHOOK:
        this.guestAVBox.show()
        this.acoustic.stop()
        this.control.callDialpad.show()
        if (!this.isCallOnHold) {
          this.control.callMic.setState(!Model.callOptions.audio)
        }
        this.control.callCamera.setState(!Model.callOptions.video)
        this.control.callScreenshare.setState(true)
        this.isCallOnHold = false
        break
      case this.TELEPHONYSTATE_ONHOLD:
        this.isCallOnHold = true
        this.aver.stateHoldCall()
        this.guestAVBox.hide()
        break
    }
  }
  onChangeControlState(state) {
    console.log('CallPanel.onChangeControlState', state)
    switch (state) {
      case 'CallStart':
        this.communicator.steers.outCallStart()
        break
      case 'CallStop':
        this.aver.stateTerminatedCall()
        if (this.telephonyState == this.TELEPHONYSTATE_RINGING) {
          this.toast.error(Model.i18n.alertCallAborted)
          if (Model.preference.autoClose) {
            this.isForcedWinClose = true
            setTimeout(parent.window.close, 1000)
          }
        } else {
          this.onChangeTelephonyState(this.TELEPHONYSTATE_IDLE)
        }
        this.communicator.steers.outCallStop()
        break
      case 'CallHold':
        this.communicator.steers.outCallHold()
        break
      case 'CallResume':
        this.communicator.steers.outCallResume()
        break
      case 'CallMicOff':
        this.communicator.steers.outCallMicOff()
        break
      case 'CallMicOn':
        this.communicator.steers.outCallMicOn()
        break
      case 'CallCameraOff':
        this.communicator.steers.outCallCameraOff()
        break
      case 'CallCameraOn':
        this.communicator.steers.outCallCameraOn()
        break
      case 'CallScreenshareOff':
        this.communicator.steers.outCallScreenshareOff()
        break
      case 'CallScreenshareOn':
        this.communicator.steers.outCallScreenshareOn()
        break
      case 'CallDialpadShow':
        this.parent.dialpadModal.defaultState()
        this.parent.dialpadModal.show()
        this.parent.dialpadModal.activate(this.communicator.steers.outCallSendDtmf)
        break
      case 'CallSpeakerOff':
        this.communicator.steers.inCallSpeakerOff()
        break
      case 'CallSpeakerOn':
        this.communicator.steers.inCallSpeakerOn()
        break
      case 'CallVideoOff':
        this.communicator.steers.inCallVideoOff()
        break
      case 'CallVideoOn':
        this.communicator.steers.inCallVideoOn()
        break
      default:
      // todo task in default state
    }
  }
  defaultState() {
    this.control.callPhase.setState(true)

    this.control.callMic.enable()
    this.control.callCamera.enable()
    this.control.callScreenshare.enable()
    this.control.callDialpad.enable()

    this.control.callFlow.hide()
    this.control.callMic.hide()
    this.control.callCamera.hide()
    this.control.callScreenshare.hide()
    this.control.callDialpad.hide()

    this.control.callSpeaker.hide()
    this.control.callVideo.hide()

    this.guestAVBox.hide()
    this.agentAVBox.hide()

    this.acoustic.stop()

    this.localVideo.wasStreamed = false
    this.localVideo.isStreaming = false
    this.localVideo.willStream = false

    this.localScreen.wasShared = false
    this.localScreen.isSharing = false
    this.localScreen.willShare = false

    this.isForcedWinClose = false
    this.isCallOnHold = false

    this.telephonyState = this.TELEPHONYSTATE_IDLE
  }
  deactivate() {
    this.control.deactivate(this.steers.onChangeControlState)
  }
  activate() {
    this.steers.onChangeControlState = this.onChangeControlState.bind(this)
    this.control.activate(this.steers.onChangeControlState)
  }
  initialize(parentRef) {
    console.log('CallPanel.initialize')
    this.parent = parentRef

    this.control.initialize()
    this.aver.initialize()
    this.toast.initialize()

    this.activate()
    this.defaultState()

    this.communicator = Communicator.getInstance()
    this.communicator.setCallPanel(this)

    let isCustomParamExist =
      !!Model.callOptions.customParameters &&
      Model.callOptions.customParameters.length > 0 &&
      !!Model.callOptions.customParameters[0].value
    let guestId = isCustomParamExist ? Model.callOptions.customParameters[0].value : Model.i18n.userAnonymous
    this.title.html(Model.i18n.panelTitleAVBox + ': ' + guestId)

    Dom.bind(this.container)

    if (!!Model.preference.autoDial) {
      this.onChangeControlState('CallStart')
      this.control.callPhase.setState(false)
    }

    $(window).on('beforeunload', e => {
      if (!this.isForcedWinClose) {
        e.preventDefault()
        this.communicator.steers.outCallStop()
        e.returnValue = ''
        return false
      }
    })
  }
}
