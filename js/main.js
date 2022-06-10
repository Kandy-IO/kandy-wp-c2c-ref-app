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

// @file main.js

import { Model } from './comm/model.js'
import { Splash } from './view/splash.js'
import { LandingPage } from './view/landingpage.js'
import { Dashboard } from './view/dashboard.js'

/**
 * Initializes the app, when ready.
 */
$(document).ready(function() {
  console.log('Main')

  var splash = new Splash()
  splash.show()

  var landingPage = new LandingPage()
  landingPage.hide()

  var dashboard = new Dashboard()
  dashboard.hide()

  splash.initialize()
  splash.activate(() => {
    splash.hide()
    splash.deactivate()

    if (Model.landingConfig.enabled) {
      landingPage.initialize()
      landingPage.activate(() => {
        landingPage.hide()
        landingPage.deactivate()

        dashboard.show()
        dashboard.initialize()
      })
      landingPage.show()
    } else {
      dashboard.show()
      dashboard.initialize()
    }
  })
})
