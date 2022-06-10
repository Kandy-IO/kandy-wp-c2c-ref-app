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

// @file model.js

/**
 * Model holds all the configuration which is relevant in the lifecycle of a call.
 */
export const Model = {
  i18n: null,

  queryParams: {
    languageCode: 'en-US',
    identifier: null,
    tokenized: null,
    callee: null,
    audio: null,
    video: null,
    dimension: null, // 480x640
    customParams: [],
    microphone: null,
    camera: null,
    screenshare: null,
    actgBaseUrl: null,
    autoClose: null,
    autoDial: null
  },

  brandConfig: {
    header: {
      logoUrl: 'img/icon.png',
      appTitle: 'Contact Us'
    },
    footer: {
      note: 'Powered by Kandy'
    }
  },

  landingConfig: {
    enabled: true,
    content: {
      title: 'Welcome!',
      description: 'Before proceeding further, please fill up this form.',
      inputField: [
        {
          id: 'fullname',
          label: 'Fullname',
          hint: 'e.g., Tony Stark',
          match: '^[a-zA-Z0-9 ._-]{3,30}$',
          tip: 'Only alphanumeric characters along with space, hyphen, dot & dash are accepted.',
          errmsg: 'Valid characters are A-Z a-z 0-9 . _ -'
        }
      ],
      buttonLabel: 'Call'
    }
  },

  actgConfig: {
    baseUrl: 'http://localhost:8080',
    api: {
      token: '/actg/token?destinationIdentifier=[0]'
    }
  },

  kandyConfig: {
    authentication: {
      subscription: {
        service: ['call'],
        protocol: 'https',
        server: 'spidr-ucc.genband.com',
        port: 443,
        version: '1'
      },
      websocket: {
        protocol: 'wss',
        server: 'spidr-ucc.genband.com',
        port: 443
      }
    },
    call: {
      removeCodecs: []
    },
    logs: {
      logLevel: 'debug',
      enableFcsLogs: true,
      enableGrouping: true,
      logActions: {
        diff: true,
        exposePayloads: true
      }
    }
  },

  preference: {
    microphone: true,
    camera: true,
    screenshare: false,
    autoClose: true,
    autoDial: true
  },

  callee: null,
  callCredentials: {
    accountToken: null,
    fromToken: null,
    toToken: null,
    tokenRealm: null
  },
  callOptions: {
    from: 'sip:anonymous@invalid.com',
    audio: true,
    video: false,
    videoOptions: {
      height: 640,
      width: 480
    },
    customParameters: []
  }
}
