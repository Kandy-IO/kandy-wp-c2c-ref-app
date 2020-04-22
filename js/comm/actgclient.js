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

// @file actgclient.js

import { Model } from '../comm/model.js'
import '../core/extendere.js'

/**
 * ACTGClient requests token from the ACTG server.
 */
export class ACTGClient {
  static getToken(destId, onSuccess, onFailure) {
    if (!!Model.actgConfig) {
      let cargo = {
        destId: destId
      }
      let settings = {
        async: true,
        crossDomain: true,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache'
        }
      }
      settings.url = String(Model.actgConfig.baseUrl + Model.actgConfig.api.token).graft(cargo)
      $.ajax(settings)
        .done(response => onSuccess(response))
        .fail((jqxhr, textStatus, error) => onFailure(textStatus, error))
    }
  }
}
