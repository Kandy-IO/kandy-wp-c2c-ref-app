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

// @file splash.js

import { Model } from '../comm/model.js'
import { ACTGClient } from '../comm/actgclient.js'
import { Toast } from '../core/toast.js'
import { I18N } from '../core/i18n.js'
import { Utils } from '../core/utils.js'
import '../core/extendere.js'

/**
 * Splash loads & process the configuration to establish the call.
 */
export class Splash {
  /**
   * Constructor would instantiate the dependent modules.
   */
  constructor() {
    this.cid = 'splash'
    this.container = $('#' + this.cid)
    this.steers = {}
    this.toast = new Toast(this.cid)

    this.F__APP_CONFIG = 'app.config.json'
    this.F__I18N_CONFIG = 'i18n/[0].json'
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
  getConfigError(status, errMsg) {
    let msg = '[0] &rarr; [1]'.graft(status.capitalize(), '[0] &hellip; [[1]]'.graft(errMsg, this.F__APP_CONFIG))
    return msg
  }
  getAnonymousToken(uid) {
    ACTGClient.getToken(
      uid,
      res => {
        Model.callCredentials = {
          realm: res.tokenRealm,
          accountToken: res.accountToken,
          fromToken: res.fromToken,
          toToken: res.toToken
        }
        console.log('Splash.getAnonymousToken ACTGClient.getToken', Model.callee, Model.callOptions)
        this.proceed()
      },
      (status, errMsg) => {
        let msg = errMsg == 'Not Found' ? Model.i18n.alertActgServiceNotAvailable : errMsg.capitalize()
        this.toast.error(this.getConfigError(status, msg))
      }
    )
  }
  loadAppConfig(uid) {
    $.getJSON(this.F__APP_CONFIG, data => {
      Model.actgConfig = data.actg
      if (!!Model.queryParams.actgBaseUrl) {
        Model.actgConfig.baseUrl = Model.queryParams.actgBaseUrl
      }
      Model.brandConfig = I18N.translate(data.brand)

      if (!!uid && uid in data.identifier) {
        console.log('Splash.loadAppConfig Flow#1')
        let identifier = data.identifier[uid]

        Model.landingConfig = I18N.translate(identifier.landingPage)
        Model.kandyConfig = identifier.kandy || data.kandy

        Model.preference = {
          microphone: Utils.prioritize(
            Utils.chain(Model, 'queryParams.microphone'),
            Utils.chain(identifier, 'preference.microphone'),
            Utils.chain(data, 'preference.microphone'),
            Model.preference.microphone
          ),
          camera: Utils.prioritize(
            Utils.chain(Model, 'queryParams.camera'),
            Utils.chain(identifier, 'preference.camera'),
            Utils.chain(data, 'preference.camera'),
            Model.preference.camera
          ),
          screenshare: Utils.prioritize(
            Utils.chain(Model, 'queryParams.screenshare'),
            Utils.chain(identifier, 'preference.screenshare'),
            Utils.chain(data, 'preference.screenshare'),
            Model.preference.screenshare
          ),
          autoClose: Utils.prioritize(
            Utils.chain(Model, 'queryParams.autoClose'),
            Utils.chain(identifier, 'preference.autoClose'),
            Utils.chain(data, 'preference.autoClose'),
            Model.preference.autoClose
          ),
          autoDial: Utils.prioritize(
            Utils.chain(Model, 'queryParams.autoDial'),
            Utils.chain(identifier, 'preference.autoDial'),
            Utils.chain(data, 'preference.autoDial'),
            Model.preference.autoDial
          )
        }

        let connectConfig = data.identifier[uid].connect
        Model.callOptions = {
          from: Utils.prioritize(Utils.chain(connectConfig, 'callOptions.from'), Model.callOptions.from),
          audio: Utils.prioritize(
            Utils.chain(Model, 'queryParams.audio'),
            Utils.chain(connectConfig, 'callOptions.audio'),
            Model.callOptions.audio
          ),
          video: Utils.prioritize(
            Utils.chain(Model, 'queryParams.video'),
            Utils.chain(connectConfig, 'callOptions.video'),
            Model.callOptions.video
          ),
          videoOptions: {
            width: Utils.prioritize(
              Utils.chain(Model, 'queryParams.dimension.width'),
              Utils.chain(connectConfig, 'callOptions.videoOptions.width'),
              Model.callOptions.videoOptions.width
            ),
            height: Utils.prioritize(
              Utils.chain(Model, 'queryParams.dimension.height'),
              Utils.chain(connectConfig, 'callOptions.videoOptions.height'),
              Model.callOptions.videoOptions.height
            )
          },
          customParameters: Utils.prioritize(
            Utils.chain(Model, 'queryParams.customParams'),
            Utils.chain(connectConfig, 'callOptions.customParameters'),
            Model.callOptions.customParameters
          )
        }

        if (!!Model.callOptions.customParameters && Model.callOptions.customParameters.length == 0) {
          delete Model.callOptions.customParameters
        }
        if (connectConfig.tokenized) {
          Model.callee = null
          this.getAnonymousToken(connectConfig.actgId || uid)
        } else {
          Model.callee = connectConfig.callee
          Model.callCredentials = {}
          console.log('Splash.loadAppConfig', Model.callee, Model.callOptions)
          this.proceed()
        }
      } else if (!uid && Model.queryParams.tokenized && !!Model.queryParams.actgId) {
        console.log('Splash.loadAppConfig Flow#2')
        Model.landingConfig.enabled = false
        Model.kandyConfig = data.kandy
        Model.preference = {
          microphone: Utils.prioritize(Utils.chain(Model, 'queryParams.microphone'), Model.preference.microphone),
          camera: Utils.prioritize(Utils.chain(Model, 'queryParams.camera'), Model.preference.camera),
          screenshare: Utils.prioritize(Utils.chain(Model, 'queryParams.screenshare'), Model.preference.screenshare),
          autoClose: Utils.prioritize(Utils.chain(Model, 'queryParams.autoClose'), Model.preference.autoClose),
          autoDial: Utils.prioritize(Utils.chain(Model, 'queryParams.autoDial'), Model.preference.autoDial)
        }

        Model.callee = null
        Model.callOptions = {
          from: Model.callOptions.from,
          audio: Utils.prioritize(Utils.chain(Model, 'queryParams.audio'), Model.callOptions.audio),
          video: Utils.prioritize(Utils.chain(Model, 'queryParams.video'), Model.callOptions.video),
          videoOptions: {
            width: Utils.prioritize(
              Utils.chain(Model, 'queryParams.dimension.width'),
              Model.callOptions.videoOptions.width
            ),
            height: Utils.prioritize(
              Utils.chain(Model, 'queryParams.dimension.height'),
              Model.callOptions.videoOptions.height
            )
          },
          customParameters: Utils.prioritize(
            Utils.chain(Model, 'queryParams.customParams'),
            Model.callOptions.customParameters
          )
        }

        if (!!Model.callOptions.customParameters && Model.callOptions.customParameters.length == 0) {
          delete Model.callOptions.customParameters
        }
        this.getAnonymousToken(Model.queryParams.actgId)
      } else if (!uid && !Model.queryParams.tokenized && !!Model.queryParams.callee) {
        console.log('Splash.loadAppConfig Flow#3', Model)
        Model.landingConfig.enabled = false
        Model.kandyConfig = data.kandy
        Model.preference = {
          microphone: Utils.prioritize(Utils.chain(Model, 'queryParams.microphone'), Model.preference.microphone),
          camera: Utils.prioritize(Utils.chain(Model, 'queryParams.camera'), Model.preference.camera),
          screenshare: Utils.prioritize(Utils.chain(Model, 'queryParams.screenshare'), Model.preference.screenshare),
          autoClose: Utils.prioritize(Utils.chain(Model, 'queryParams.autoClose'), Model.preference.autoClose),
          autoDial: Utils.prioritize(Utils.chain(Model, 'queryParams.autoDial'), Model.preference.autoDial)
        }

        Model.callee = Model.queryParams.callee
        Model.callCredentials = {}
        Model.callOptions = {
          from: Model.callOptions.from,
          audio: Utils.prioritize(Utils.chain(Model, 'queryParams.audio'), Model.callOptions.audio),
          video: Utils.prioritize(Utils.chain(Model, 'queryParams.video'), Model.callOptions.video),
          videoOptions: {
            width: Utils.prioritize(
              Utils.chain(Model, 'queryParams.dimension.width'),
              Model.callOptions.videoOptions.width
            ),
            height: Utils.prioritize(
              Utils.chain(Model, 'queryParams.dimension.height'),
              Model.callOptions.videoOptions.height
            )
          },
          customParameters: Utils.prioritize(
            Utils.chain(Model, 'queryParams.customParams'),
            Model.callOptions.customParameters
          )
        }
        if (!!Model.callOptions.customParameters && Model.callOptions.customParameters.length == 0) {
          delete Model.callOptions.customParameters
        }
        console.log('Splash.loadAppConfig', Model.callee, Model.callOptions)
        this.proceed()
      } else {
        let msg = Model.i18n.alertConfigIdNotFound.graft(uid)
        this.toast.warning(this.getConfigError('Warning', msg))
      }
    }).fail((jqObj, status, errMsg) => {
      let msg = errMsg == 'Not Found' ? Model.i18n.alertConfigFileNotFound : String(errMsg).capitalize()
      this.toast.error(this.getConfigError(status, msg))
    })
  }
  loadLocale(uid) {
    let langFilepath = this.F__I18N_CONFIG.graft(Model.queryParams.languageCode)
    $.getJSON(langFilepath, data => {
      Model.i18n = data
      this.toast.info(Model.i18n.alertLanguageSetAs.graft(Model.queryParams.languageCode))
      I18N.realign()
      this.loadAppConfig(uid)
    }).fail((jqObj, status, errMsg) => {
      let msg = errMsg == 'Not Found' ? 'Language file not found' : String(errMsg).capitalize()
      this.toast.error(this.getConfigError(status, msg))
      Model.queryParams.languageCode = this.defaultLanguageCode
      this.loadLocale(uid)
    })
  }
  getVideoOptions(dimension) {
    let output = {
      width: null,
      height: null
    }
    if (!!dimension) {
      let pattern = /^[0-9]+x[0-9]+$/i
      if (pattern.test(dimension)) {
        let dimensions = dimension.split('x')
        output.width = dimensions[0]
        output.height = dimensions[1]
      }
    }
    return output
  }
  getCustomParams(usp) {
    let o = []
    usp.forEach((v, k) => {
      if (k.indexOf('x-') >= 0) {
        o.push({
          name: k,
          value: v
        })
      }
    })
    return o.length ? o : null
  }
  actOnQueryParams() {
    let usp = new URLSearchParams(window.location.search)
    Model.queryParams.identifier = usp.get('i') || null
    this.defaultLanguageCode = Model.queryParams.languageCode
    Model.queryParams.languageCode = usp.get('l') || I18N.getNavigatorLanguage() || this.defaultLanguageCode
    Model.queryParams.tokenized = String(usp.get('t')).toBool()
    Model.queryParams.actgId = usp.get('g') || null
    Model.queryParams.callee = usp.get('c') || null
    Model.queryParams.audio = !!usp.get('a') ? String(usp.get('a')).toBool() : null
    Model.queryParams.video = !!usp.get('v') ? String(usp.get('v')).toBool() : null
    let dimension = usp.get('d') || null
    Model.queryParams.dimension = this.getVideoOptions(dimension)
    Model.queryParams.customParams = this.getCustomParams(usp)
    Model.queryParams.actgBaseUrl = usp.get('u') || null
    Model.queryParams.microphone = !!usp.get('pm') ? String(usp.get('pm')).toBool() : null
    Model.queryParams.camera = !!usp.get('pc') ? String(usp.get('pc')).toBool() : null
    Model.queryParams.screenshare = !!usp.get('ps') ? String(usp.get('ps')).toBool() : null
    Model.queryParams.autoClose = !!usp.get('px') ? String(usp.get('px')).toBool() : null
    Model.queryParams.autoDial = !!usp.get('pd') ? String(usp.get('pd')).toBool() : null
    this.loadLocale(Model.queryParams.identifier)
  }
  deactivate() {
    this.toast.deactivate()
  }
  activate(callback) {
    this.proceed = callback
    this.actOnQueryParams()
  }
  initialize() {
    console.log('Splash.initialize')
    this.toast.initialize()
  }
}
