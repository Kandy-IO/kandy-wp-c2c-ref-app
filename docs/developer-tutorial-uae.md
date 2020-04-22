# Developer Tutorial

<!-- TOC -->

- [1. Developer Tutorial](#1-developer-tutorial)
    - [1.1. C2C webapp](#11-c2c-webapp)
        - [1.1.1. Application overview](#111-application-overview)
        - [1.1.2. Getting started](#112-getting-started)
            - [1.1.2.1. Development environment](#1121-development-environment)
            - [1.1.2.2. Third party libraries](#1122-third-party-libraries)
            - [1.1.2.3. Resolving dependency](#1123-resolving-dependency)
            - [1.1.2.4. Add in `<head>` of HTML file](#1124-add-in-head-of-html-file)
            - [1.1.2.5. Add in `<body>` of HTML file](#1125-add-in-body-of-html-file)
            - [1.1.2.6. Installation of SDK](#1126-installation-of-sdk)
            - [1.1.2.7. Prerequisite](#1127-prerequisite)
            - [1.1.2.8. Build](#1128-build)
            - [1.1.2.9. Deploy](#1129-deploy)
            - [1.1.2.10. Usage](#11210-usage)
        - [1.1.3. Configurations](#113-configurations)
            - [1.1.3.1. ACTG](#1131-actg)
            - [1.1.3.2. Brand](#1132-brand)
                - [1.1.3.2.1. Localization](#11321-localization)
            - [1.1.3.3. Kandy](#1133-kandy)
                - [1.1.3.3.1. Remove unsupported codecs](#11331-remove-unsupported-codecs)
            - [1.1.3.4. Preference](#1134-preference)
            - [1.1.3.5. Identifier](#1135-identifier)
                - [1.1.3.5.1. Custom parameters](#11351-custom-parameters)
                    - [1.1.3.5.1.1. Statically Configured](#113511-statically-configured)
                    - [1.1.3.5.1.2. Dynamically Programmed](#113512-dynamically-programmed)
                - [1.1.3.5.2. Landing Page](#11352-landing-page)
            - [1.1.3.6. Direct-link](#1136-direct-link)
            - [1.1.3.7. Generic](#1137-generic)
            - [1.1.3.8. Preferences](#1138-preferences)
            - [1.1.3.9. Custom parameters](#1139-custom-parameters)
        - [1.1.4. Core features](#114-core-features)
            - [1.1.4.1. Getting token](#1141-getting-token)
            - [1.1.4.2. Originating non-tokenized call](#1142-originating-non-tokenized-call)
            - [1.1.4.3. Originating tokenized call](#1143-originating-tokenized-call)
            - [1.1.4.4. Other](#1144-other)
        - [1.1.5. Optional features](#115-optional-features)
            - [1.1.5.1. Escalate audio call to video/screenshare](#1151-escalate-audio-call-to-videoscreenshare)
            - [1.1.5.2. Other](#1152-other)
        - [1.1.6. Source File Content](#116-source-file-content)
            - [1.1.6.1. Known Limitation and Restriction](#1161-known-limitation-and-restriction)
            - [1.1.6.2. Why we implemented the function the way we did in our reference app?](#1162-why-we-implemented-the-function-the-way-we-did-in-our-reference-app)
        - [1.1.7. FAQ and Debugging](#117-faq-and-debugging)
            - [1.1.7.1. How to debug a session if call does not work?](#1171-how-to-debug-a-session-if-call-does-not-work)

<!-- /TOC -->

## 1.1. C2C webapp

Click-to-Call a.k.a. C2C is a client-side web based reference app. 

### 1.1.1. Application overview

The Web Page Click-to-Call (C2C) application is a JavaScript based open source reference application that uses the Kandy Anonymous CallMe JavaScript SDK that developers can adapt and productize for integration into a customer's web site for anonymous click-to-calls. The Web Page Click-to-Call Reference Application supports token-based anonymous calls, and non-tokenized anonymous calls.

Token-based anonymous calls require the customer to deploy an Anonymous Call Token Generator (ACTG) reference application to provide tokens to the Web Page C2C reference application to send with an anonymous call origination into the Kandy Link.

### 1.1.2. Getting started

#### 1.1.2.1. Development environment

We would recommend to use [Visual Studio Code](https://code.visualstudio.com/) for development. [Visual Studio Code](https://code.visualstudio.com/) is a code editor redefined and optimized for building and debugging modern web and cloud applications. 

#### 1.1.2.2. Third party libraries

These modules are required with distributables

| Library               | Version   | State    |
|-----------------------|-----------|----------|
| @kandy-io/callme-sdk  | `^4.14.0` | Excluded |
| is_js                 | `^0.9.0`  | Included |
| jquery                | `^3.4.1`  | Included |
| material-design-icons | `^3.0.0`  | Included |
| spectre.css           | `^0.5.8`  | Included |

Here, tilde/caret symbol prefixed in the version means
- `~version` ⟶ can be updated to the next patch version
- `^version` ⟶ can be updated to the next minor version

For more detail, please refer [Semantic Versioning Cheatsheet](https://bytearcher.com/goodies/semantic-versioning-cheatsheet/).

#### 1.1.2.2.1. Resolving dependency

The dependencies of third party libraries can be resolved in HTML file by using the `<link>` & `<script>` tags.

#### 1.1.2.2.1.1. Add in `<head>` of HTML file

Add below statements in the `<head>` of `index.html` of webapp to resolve dependencies of `material-design-icons` & `spectre.css` libraries.

**Material Icons** font

```html
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

**Spectre** CSS framework

```html
<link rel="stylesheet" type="text/css" href="https://unpkg.com/spectre.css/dist/spectre.min.css">
<link rel="stylesheet" type="text/css" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css">
<link rel="stylesheet" type="text/css" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css">
```

#### 1.1.2.2.1.2. Add in `<body>` of HTML file

Add below statements in the `<body>` of `index.html` of webapp to resolve dependencies of `jquery` & `is_js` libraries.

**jQuery** JavaScript library

```html
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
```

**is_js** micro check library

```html
<script src="https://unpkg.com/is_js/is.min.js"></script>
```

#### 1.1.2.3. Installation of SDK

The SDK can be accessed at this link,

- [https://unpkg.com/@kandy-io/callme-sdk@4.x.x/dist/kandy.js](https://unpkg.com/@kandy-io/callme-sdk@4.x.x/dist/kandy.js)

Where, you need to replace the `@4.x.x` with the latest version available for [@kandy-io/callme-sdk](https://github.com/Kandy-IO/kandy-callMe-js-sdk).

You need to add (or uncomment) below given code in the `index.html` page of the Web Page C2C reference app

```html
<script src="https://unpkg.com/@kandy-io/callme-sdk@4.x.x/dist/kandy.js"></script>
```

To ensure subresource integrity, you may define `integrity` & `crossorigin` attributes in the `script` tag as described at [@kandy-io/callme-sdk](https://github.com/Kandy-IO/kandy-callMe-js-sdk).

#### 1.1.2.4. Prerequisite

You can use any server which is capable of serving static web pages or which can host a website. 

Note: This webapp do not require any support of server-side scripting language.

#### 1.1.2.5. Build

> **Note**: The repository is already in ready to deploy state. So no need to build it.

1. Configure the `app.config.json` with relevant details with respect to your infrastructure. 
2. Set the required access path of Web Page C2C reference app in the webpage from where it would get launched. For this, you may refer `sample.html` page.

#### 1.1.2.6. Deploy

The app can be deployed on any webserver which can host a HTML5 website by following the below steps:

1. Just copy the content of the directory to the relevant path on the deployment web server. 
2. Launch the app from sample page or actual launch page. A pop up will open and Web Page C2C reference app gets loaded inside it.

> **Tip**: You can deploy this webapp on a Java server like *Tomcat* or *WildFly*; by creating a `zip` file of whole repository, renaming the extension as `war` and deploying that `war` file on the server. It would be useful when you want to host C2C reference app on the same server where ACTG reference app is hosted.

#### 1.1.2.7. Usage

Add the below line in the webpage from where you need to launch Web Page C2C reference app as it is declared in `sample.html` file.

```html
<a href="javascript:window.open('http://c2c.domain.com/?i=identifier-name', '_blank', 'width=480,height=640')">Contact us</a>
```

Replace the `identifier-name` with the one that is configured in your `app.config.json` file. 

Set the dimension as **800x600** if screenshare feature is enabled for particular identifier otherwise leave it as it is, i.e., **480x640**.

Now open the launching webpage in browser and click on the **Contact us** link to launch the C2C reference app in a browser popup. 

### 1.1.3. Configurations

The `app.config.json` file is used to configure Web Page C2C reference app client. It can be loaded as

```javascript
$.getJSON('app.config.json', data => {
    // Load json data into Model
})
```

Once loaded, the content of this file is mapped into the `Model`. Consider `Splash.loadAppConfig` method in `js/view/splash.js` file for further reference regarding the mapping.

The parent level mapping is shown below.

    identifier ⟵ json.identifier[Model.queryParams.identifier]
    connectConfig ⟵ json.identifier[uid].connect
    
    Model.actgConfig ⟵ json.actg
    Model.brandConfig ⟵ json.brand
    Model.landingConfig ⟵ identifier.landingPage
    Model.kandyConfig ⟵ identifier.kandy > json.kandy
    Model.callee ⟵ identifier.connect.callee
    Model.callOptions ⟵ Model.queryParams > connectConfig.callOptions > Model.callOptions (default)
    Model.preference ⟵ Model.queryParams > identifier.preference > json.preference > Model.preference (default)

To acces the model, import it in the file wherever required as 

```javascript
import { Model } from '../comm/model.js'
```

#### 1.1.3.1. ACTG

Sample configuration:

```javascript
"actg": {
    "baseUrl": "http://webserver.domain.com", // hint: actual ACTG server URL should be passed
    "api": {
        "token": "/actg/token?identifier=[destId]"
    }
},
```

This section is used to generate complete URL of API for ACTG reference webserver that will be used to fetch tokens in case of tokenized calls. So this section is mandatory only in case of tokenized calls.

It is mapped to model as shown below, so stick to the object structure.

```javascript
$.getJSON('app.config.json', data => { 
    Model.actgConfig = data.actg
})
```

Now here is the basic code snippet that shows how the Web Page C2C reference app interacts with ACTG reference webserver.

```javascript
$.ajax({
    url: String(Model.actgConfig.baseUrl + Model.actgConfig.api.token).graft({destId: actgId}), // tip: actgId is a destination identifier name used in 'actg.config.json'
    async: true,
    crossDomain: true,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-cache'
    }
  })
  .done(response => onSuccess(response))
  .fail((jqxhr, textStatus, error) => onFailure(textStatus, error))
```

Whereas a wrapper class `ACTGClient` can be used in place of above code to do the same.

```javascript
ACTGClient.getToken(
    actgId, // tip: actgId is a destination identifier name used in 'actg.config.json'
    result => {
        console.log('Success', result)
    },
    (status, errMsg) => {
        console.log('Failure', status, errMsg)
    }
)
```

#### 1.1.3.2. Brand

Sample configuration:

```javascript
"brand": {
    "header": {
        "logoUrl": "img/icon.png", // hint: relative or absolute URL of logo image could be passed
        "appTitle": "i18n|headerAppTitle" // hint: text or locale-id could be passed
    },
    "footer": {
        "note": "i18n|footerNote" // hint: text or locale-id could be passed
    }
},
```

Here, the logo image could be of any size that will be molded to 36px width by default when rendered. So if the size of the image would be larger than 36px, it will be reduced to 36px. Thus it is recomended to use logo image size of 256px that looks fair enough when rendered.

Although it could support any image file format but .png file format is recomended to avoid complexity.

Here, `i18n|…` means it is a localization string where `i18n|localeId` refers to the *localeId* in localization file.

It is mapped to model as shown below, so stick to the object structure.

```javascript
$.getJSON('app.config.json', data => { 
    Model.brandConfig = I18N.translate(data.brand)
})
```

##### 1.1.3.2.1. Localization

Sample localization (i18n):

```javascript
{
    "headerAppTitle": "Contact Us App",
    "footerNote": "Powered by CustomerName", // hint: CustomerName should be replaced with relevant text
    ⋮
}
```

Here each locale item is represented as a *key-value pair*, where at left-side of colon is *key* (a.k.a. *localeId*) while at right-side it's *value*. The *key* should be in *camelCase* format while it's value could be a statement in the localized language like in english, arabic, etc. but *key* should remain consistent in all the languages' localized file.

It is mapped to model as shown below:

```javascript
// Determine the applicable language
let defaultLanguageCode = Model.queryParams.languageCode
Model.queryParams.languageCode = usp.get('l') || I18N.getNavigatorLanguage() || defaultLanguageCode

// Load the localzed file of applicable language
$.getJSON(`i18n/${Model.queryParams.languageCode}.json`, data => { 
    Model.i18n = data
}
```

Now here is the basic code snippet that shows how to get the localized string for particular *localeId*.

```javascript
this.toast.warning(Model.i18n.alertCallAborted) // hint: notifies warning in localized text
```

Here `Model.i18n.alertEnterValidInput` is a *localeId* or the property name used in localization file. So it would show an alert with the value of `alertEnterValidInput` key in localization file of applicable language.

#### 1.1.3.3. Kandy

Sample configuration:

```javascript
"kandy": {
    "authentication": {
        "subscription": {
            "server": "ct-webrtc.etisalat.ae",
            "port": 443
        },
        "websocket": {
            "server": "ct-webrtc.etisalat.ae",
            "port": 443
        }
    },
    "call": {
        "removeCodecs": […], // hint: optional; pass only when required otherwise skip
        "removeH264Codecs": false,
        "earlyMedia": true,
        "serverTurnCredentials": true,
        "iceServers": [
            {
                "url": "turns:ct-turn1.etisalat.ae:443?transport=tcp",
                "credential": ""
            },
            {
                "url": "turns:ct-turn2.etisalat.ae:443?transport=tcp",
                "credential": ""
            },
            {
                "url": "stun:ct-turn1.etisalat.ae:3478?transport=udp",
                "credential": ""
            },
            {
                "url": "stun:ct-turn2.etisalat.ae:3478?transport=udp",
                "credential": ""
            }
        ]
    },
    "logs": {
        "logLevel": "debug",
        "enableFcsLogs": true,
        "enableGrouping": true,
        "logActions": {
            "exposePayloads": true
        }
    }
},
```

For further information about Kandy configuration, please refer [kandy-callMe-js-sdk/docs](https://kandy-io.github.io/kandy-callMe-js-sdk/docs/#config).

It is mapped to model as shown below.

```javascript
$.getJSON('app.config.json', data => { 
    let identifier = data.identifier[Model.queryParams.identifier]
    Model.kandyConfig = identifier.kandy || data.kandy
})
```

Below is a sample code to initialize Kandy using the above configuration.

```javascript
let kandyConfig = JSON.parse(JSON.stringify(Model.kandyConfig)) || {}
delete kandyConfig.call.removeCodecs
kandyConfig.call.sdpHandlers = []

let codecRemover = Kandy.sdpHandlers.createCodecRemover(Model.kandyConfig.call.removeCodecs || [])
kandyConfig.call.sdpHandlers.push(codecRemover)

this.client = Kandy.create(kandyConfig)
```

##### 1.1.3.3.1 Remove unsupported codecs

Using `removeCodecs` property under `kandy.call`, you can configure to remove specific unsupported codecs while making a call otherwise all the codecs would be used

Sample configuration:

```javascript
"kandy": {
    ⋮
    "call": {
        "removeCodecs": ["VP8", "opus", "G722", "VP9", "ISAC"],
        ⋮
    },
    ⋮
},
```

So you can remove codecs those are not supported by the platform as shown below

```javascript
let kandyConfig = JSON.parse(JSON.stringify(Model.kandyConfig)) || {}
delete kandyConfig.call.removeCodecs
kandyConfig.call.sdpHandlers = []

let codecRemover = Kandy.sdpHandlers.createCodecRemover(Model.kandyConfig.call.removeCodecs || [])
kandyConfig.call.sdpHandlers.push(codecRemover)

this.client = Kandy.create(kandyConfig)
```

#### 1.1.3.4. Preference

Based on these preferences, feature would be available or unavailable in call.

Sample configuration:

```javascript
"preference": {
    "microphone": true, // hint: hide or show control button on the GUI [default=true]
    "camera": true, // hint: hide or show control button on the GUI [default=true]
    "screenshare": false, // hint: hide or show control button on the GUI [default=false]
    "autoClose": true, // hint: automatically close window on call end [default=true]
    "autoDial": true // hint: automatically initiate call on load [default=true]
},
```

Here, feature availability is represented by boolean value where

- `true` → _available_
- `false` → _unavailable_

It is mapped to model as shown below.

```javascript
$.getJSON('app.config.json', data => { 
    let identifier = data.identifier[Model.queryParams.identifier]    
    Model.preference = {
      microphone: Utils.prioritize(
        Utils.chain(Model, 'queryParams.microphone'), // External
        Utils.chain(identifier, 'preference.microphone'), // Local
        Utils.chain(data, 'preference.microphone'), // Global
        Model.preference.microphone // Default
      ),
      camera: Utils.prioritize(
        Utils.chain(Model, 'queryParams.camera'), // External
        Utils.chain(identifier, 'preference.camera'), // Local
        Utils.chain(data, 'preference.camera'), // Global
        Model.preference.camera // Default
      ),
      screenshare: Utils.prioritize(
        Utils.chain(Model, 'queryParams.screenshare'), // External
        Utils.chain(identifier, 'preference.screenshare'), // Local
        Utils.chain(data, 'preference.screenshare'), // Global
        Model.preference.screenshare // Default
      ),
      autoClose: Utils.prioritize(
        Utils.chain(Model, 'queryParams.autoClose'), // External
        Utils.chain(identifier, 'preference.autoClose'), // Local
        Utils.chain(data, 'preference.autoClose'), // Global
        Model.preference.autoClose // Default
      ),
      autoDial: Utils.prioritize(
        Utils.chain(Model, 'queryParams.autoDial'), // External
        Utils.chain(identifier, 'preference.autoDial'), // Local
        Utils.chain(data, 'preference.autoDial'), // Global
        Model.preference.autoDial // Default
      )
    }
})
```

Here `Utils.chain` is a method to fetch the value from object property chain and `Utils.prioritize` is a method to return non-empty value based on priority list.

Classification of input values in 4 types are:

1. **External** ⟶ Refers to URL query parameters
2. **Local** ⟶ Refers to property values inside identifier
3. **Global** ⟶ Refers to property values outside identifier
4. **Default** ⟶ Refers to hard-coded default values inside application

The priority order based on above classification 

    External > Local > Global > Default

A mapping chart for this code is given below.

+ Model.preference
  - microphone ⟵ Model.queryParams.microphone | identifier.preference.microphone | data.preference.microphone | Model.preference.microphone
  - camera ⟵ Model.queryParams.camera | identifier.preference.camera | data.preference.camera | Model.preference.camera
  - screenshare ⟵ Model.queryParams.screenshare | identifier.preference.screenshare | data.preference.screenshare | Model.preference.screenshare
  - autoClose ⟵ Model.queryParams.autoClose | identifier.preference.autoClose | data.preference.autoClose | Model.preference.autoClose
  - autoDial ⟵ Model.queryParams.autoDial | identifier.preference.autoDial | data.preference.autoDial | Model.preference.autoDial

So the priority order for setting the properties of `Model.preference` would be

    Model.preference ⟵ Model.queryParams (external) > identifier.preference (local) > data.preference (global) > Model.preference (default)

#### 1.1.3.5. Identifier

```javascript
"identifier": {
    "non-tokenized-without-landingpage": { // hint: key could have any valid string
        "landingPage": {
            "enabled": false
        },
        "connect": {
            "actgId": "sales", // hint: optional, by default same as identifier but can be customized
            "callee": "user@domain.com", // hint: required for non-tokenized calls
            "tokenized": false, // hint: decides if ACTG server is required or not
            "callOptions": {
                "from": "sip:anonymous@invalid.com",
                "audio": true, // hint: default state when call start
                "video": false, // hint: default state when call start
                "videoOptions": { // hint: customize video resolution
                    "width": 1280,
                    "height": 720
                },
                "customParameters": [] // hint: optional, don't pass it if empty
            }
        },
        "kandy": …, // hint: optional
        "preference": … // hint: optional
    },
    ⋮
    // hint: multiple identifiers could be registered
}
```

Here `hint: optional` comment refers to

- if local param is _missing_, it will pick up global param
- if local param is _present_, it will override global param

Where in the configuration,

- the _local param_ refers to params inside identifier
- the _global param_ refers to params outside identifier

Sample configuration as skeleton to show *global* and *local* settings:

```javascript
"kandy": {
    ⋮ // Global setting
},
"preference": {
    ⋮ // Global setting
},
"identifier": {
    "id-with-local-setting": { 
        ⋮
        "kandy": {
            ⋮ // Local setting
        },
        "preference": {
            ⋮ // Local setting
        }
    },
    ⋮
}
```

> **Note**: The identifier name could be any string that consist of alphanumeric characters and may be separated by hyphen or underscore. Avoid using any other special characters in between.

Let's determine the value of `Model.preference.screenshare` in the given configuration.

```javascript
⋮
"preference": {
    microphone: true,
    camera: true,
    screenshare: false // Global setting
},
"identifier": {
    "sample-id": { 
        ⋮
        "preference": {
            screenshare: true // Local setting
        }
    },
    ⋮
}
```

Now as descibed above that priority of `Local > Global`, thus the value of `Model.preference.screenshare` would be ***true*** as shown below.

```javascript
$.getJSON('app.config.json', data => { 
    let identifier = data.identifier[Model.queryParams.identifier]
    ⋮
    Model.preference.screenshare = Utils.prioritize(
        Utils.chain(Model, 'queryParams.screenshare'), // External
        Utils.chain(identifier, 'preference.screenshare'), // Local
        Utils.chain(data, 'preference.screenshare'), // Global
        Model.preference.screenshare // Default
    )
    console.log(Model.preference.screenshare) // output: true
})
```

##### 1.1.3.5.1. Custom parameters

When Web Page C2C reference app needs to send `customParameters` to the server before establishing the call, it can pass array of objects with name & value properties.

```javascript
"customParameters": [
  {
    name: …,
    value: …
  }
],
```

It can be categorised in 3 types based on ways of usage:

 1. **Statically Configured** ⟶ When `customParameters` is passed as configured in `app.config.json`, i.e., hard-coded
 2. **Dynamically Programmed** ⟶ When `customParameters` is derived from pre-programmed logic
 3. **Dynamically Propmted** ⟶ When `customParameters` is grabbed from user-input, e.g., [Landing Page](#11352-landing-page)

> **Note**: The custom parameters should be pre-configured in the Kandy link server. So these values can not be arbitrary but must be pre-configured on server to accept them.

###### 1.1.3.5.1.1. Statically Configured

When Web Page C2C reference app needs to send `customParameters` to the server before establishing the call, it can pass array of objects with name & value properties as configured in `app.config.json`, e.g., application name can be defined in `app.config.json` that would get passed into the `customParameters`.

```javascript
"customParameters": [
  {
    name: "x-appName",
    value: "Web Page Click-to-Call (C2C) application"
  }
],
```

Here note that `x-appName` have `x-` prefixes that signifies the custom parameters.

Now when these values would get stored in the Model, then it could be accessed or modified as 

```javascript
Model.callOptions.customParameters[0].name // returns → "x-appName"
Model.callOptions.customParameters[0].value // returns → "Web Page Click-to-Call (C2C) application"
```

###### 1.1.3.5.1.2. Dynamically Programmed

When Web Page C2C reference app needs to send `customParameters` to the server before establishing the call, it could add or modify the array of objects with name & value properties and set it based on pre-programmed logic, e.g., the location can be determined from browser properties and passed into the `customParameters`.

```javascript
if (!Array.isArray(Model.callOptions.customParameters)) {
  Model.callOptions.customParameters = [];
}
Model.callOptions.customParameters.push({
  name: "x-GPS",
  value: position.coords.latitude + ',' + position.coords.longitude
})
```

Here note that `x-GPS` have `x-` prefixes that signifies the custom parameters.

##### 1.1.3.5.2. Landing Page

When the identifier don't have the landing page then set `enabled` as *false*, as shown below

```javascript
"identifier": {
    "id-without-landingpage": {
        "landingPage": {
            "enabled": false
        },
        ⋮
    },
    ⋮
}
```

When the identifier consists the landing page then set `enabled` as *true*, as shown below

```javascript
"identifier": {
    "id-with-landingpage": {
        "landingPage": {
            "enabled": true,
            "content": {
                "title": "i18n|titleWelcome",
                "description": "i18n|descriptionFillUpForm",
                "inputField": [
                    {
                        "id": "x-fullname",
                        "label": "i18n|labelFullname",
                        "hint": "i18n|hintFullname",
                        "match": "^[a-zA-Z0-9 ._-]{3,30}$",
                        "tip": "i18n|tipFullname",
                        "errmsg": "i18n|errmsgFullname"
                    },
                    {
                        "id": "x-baggage",
                        "label": "i18n|labelBaggage",
                        "hint": "i18n|hintBaggage",
                        "match": "^[a-zA-Z0-9]{8,10}$",
                        "tip": "i18n|tipBaggage",
                        "errmsg": "i18n|errmsgBaggage"
                    }
                ],
                "buttonLabel": "i18n|buttonLabelCall"
            }
        },
        ⋮
    },
    ⋮
}
```

Here the `title` and `description` would set the title and description of the form while `buttonLabel` would set the label of the submit button.

In the `inputField` configuration, a list of input fields can be configured using 6 key-value pairs wherein the values having `i18n|` prefix could be replaced with regular statement, if localization is not required.

Each set of `id`, `label`, `hint`, `match`, `tip`, `errmsg` would create an input field with these properties. 

- `id` ⟶ Used as key to set the key-value pair in custom property
- `label` ⟶ Appears as label of the input field
- `hint` ⟶ Appears inside input field as placeholder
- `match` ⟶ Matches the filled in value with provided pattern
- `tip` ⟶ Appears on mouse rollover at input field
- `errmsg`⟶ Appears when error occur

Here is a sample code to render the form based on above configurations.

```javascript
class InputField {
  constructor(formRef, model) {
    this.model = model
    this.parentRef = formRef
    this.steers = {}
  }
  ⋮
  render() {
    let tmpl = `
        <div class="form-group">
            <label class="form-label" for="lp_[id]">[label]</label>
            <input class="form-input" type="text" id="lp_[id]" placeholder="[hint]" maxlength="30" pattern="[valid]" title="[tip]">
            <div class="form-input-hint hide">[errmsg]</div>
        </div>`
    $(this.parentRef).append(tmpl.graft(this.model))
  }
  showValidationError(bool) {
    if (bool) {
      this.container.addClass('is-error')
      this.container.siblings('.form-input-hint').removeClass('hide')
    } else {
      this.container.removeClass('is-error')
      this.container.siblings('.form-input-hint').addClass('hide')
    }
  }
  data() {
    return {
      name: this.model.id,
      value: this.container.val()
    }
  }
  validate() {
    var validity = new RegExp(this.model.match)
    if (!!this.container.val()) {
      if (validity.test(this.container.val())) {
        return true
      } else {
        this.showValidationError(true)
        this.container.on('keyup', this.steers.onChangeValue)
        return false
      }
    } else {
      return true
    }
  }
  ⋮
  initialize() {
    console.log('InputField.initialize')
    this.render()
    this.container = $(this.parentRef + ' #lp_' + this.model.id)
    this.showValidationError(false)
  }
}
class LandingPage {
  constructor() {
    this.cid = 'landingpage'
    this.container = $('#' + this.cid)
    this.steers = {}
    this.toast = new Toast('landingpage_panel')
    this.formRef = '#' + this.cid + ' #lp_form'
    this.fields = {}
  }
  ⋮
  onSubmitForm(e) {
    e.preventDefault()
    let customParams = []
    let isValid = true
    for (let i = 0; i < Model.landingConfig.content.inputField.length; i++) {
      let isFieldValid = this.fields[i].validate()
      if (isFieldValid) {
        customParams.push(this.fields[i].data())
      }
      isValid = isValid && isFieldValid
    }
    if (isValid) {
      if (customParams.length > 0) {
        if (!!Model.callOptions.customParameters) {
          Model.callOptions.customParameters = [...Model.callOptions.customParameters, ...customParams]
        } else {
          Model.callOptions.customParameters = customParams
        }
      }
      this.proceed()
    } else {
      this.toast.warning(Model.i18n.alertEnterValidInput)
    }
  }
  ⋮
  initialize() {
    console.log('LandingPage.initialize')
    Dom.bind(this.container)
    this.toast.initialize()
    this.submit = this.container.find('button#lp_submit')
    for (let i = 0; i < Model.landingConfig.content.inputField.length; i++) {
      this.fields[i] = new InputField(this.formRef, Model.landingConfig.content.inputField[i])
      this.fields[i].initialize()
    }
  }
}
```

#### 1.1.3.6. Direct-link
The C2C webapp can also be launched via direct-link where minimal configuration is required in the `app.config.json` file while remaining configurations were passed via query parameters.

The direct-link could be generated by appending the query parameters in the host URL of C2C reference app, e.g.,

    https://c2c.domain.com/?i=identifier&l=en-US

where, `https://c2c.domain.com/` could be replaced with host URL of C2C reference app and `i=identifier&l=en-US` could be replaced with required set of query parameters.

Note that the direct link shall be URL enabled where query parameters should be URL encoded, e.g.,

    https://c2c.domain.com?i=myIdentifier&u=https%3A%2F%2Fsomeactg.domain.com%2Fmyactg&t=true&g=myIdentifier&a=true&v=true&d=640*480&pm=true&pc=false&ps=false&px=true&pd=true

Below is the list of all the supported query parameters.

#### 1.1.3.7. Generic

+ **i** 
    - Accepted values would be any defined identifier in `app.config.json` file.
    - Equivalent to `identifiers.ID` property where `ID` refers to any defined **identifier** in `app.config.json` file.
    - Not required if `callee` is passed.
    - Helps to retrieve required configuration for making a call.
    - e.g., `https://c2c.domain.com/?i=identifier`
+ **l** 
    - Accepted values could be any language code, e.g., *en-US*, *ar-AE*, etc.
    - Would override the default language set by browser.
    - e.g., `https://c2c.domain.com/?i=identifier&l=en-US`
+ **t** 
    - Accepted values could be either `true` or `false`.
    - Equivalent to `identifiers.ID.connect.tokenized` property where `ID` refers to any defined **identifier** in `app.config.json` file.
    - Would make the call either **tokenized** or **non-tokenized**.
    - e.g., `https://c2c.domain.com/?i=identifier&t=true`
+ **g** 
    - Accepted values would be any defined identifier in `actg.config.json` file.
    - Equivalent to `identifiers.ID.connect.actgId` property where `ID` refers to any defined **identifier** in `app.config.json` file.
    - Must required in case of **tokenized** call.
    - Helps to retrieve token for particular configuration from ACTG server.
    - e.g., `https://c2c.domain.com/?i=identifier&t=true&g=destinationidentifier`
+ **c** 
    - Accepted values could be either `true` or `false`.
    - Equivalent to `identifiers.ID.connect.callee` property where `ID` refers to any defined **identifier** in `app.config.json` file.
    - Not required if `identifier` is passed.
    - Used to make a call to the provided callee.
    - e.g., `https://c2c.domain.com/?c=user@domain.com`
+ **a** 
    - Accepted values could be either `true` or `false`.
    - Equivalent to `identifiers.ID.connect.callOptions.audio` property where `ID` refers to any defined **identifier** in `app.config.json` file.
    - Would enable/disable the **audio** stream from microphone by default on call start.
    - e.g., `https://c2c.domain.com/?i=identifier&a=true`
+ **v** 
    - Accepted values could be either `true` or `false`.
    - Equivalent to `identifiers.ID.connect.callOptions.video` property where `ID` refers to any defined **identifier** in `app.config.json` file.
    - Would enable/disable the **video** stream from camera by default on call start.
    - e.g., `https://c2c.domain.com/?i=identifier&v=true`
+ **d** 
    - Accepted values should be in `width`x`height` format, e.g., 1280x720.
    - Equivalent to `identifiers.ID.connect.callOptions.videoOptions` property where `ID` refers to any defined **identifier** in `app.config.json` file.
    - Would set the dimension of streaming video.
    - e.g., `https://c2c.domain.com/?i=identifier&d=1280x720`
+ **u** 
    - Accepted values would be host URL of ACTG server.
    - Equivalent to `actg.baseUrl` property in `app.config.json` file.
    - Would be used to make URL for requesting a token via API on ACTG server.
    - e.g., `https://c2c.domain.com/?i=identifier&u=actg.domain.com`

> **Note**: The ACTG server address can be changed but relative path of service defined by `actg.api.token` property can't be changed by this parameter, so that would remain as configured in `app.config.json` file.

#### 1.1.3.8. Preferences

+ **pm** 
    - Accepted values could be either `true` or `false`.
    - Equivalent to `preference.microphone` property in `app.config.json` file.
    - Would enable/disable the **microphone** feature.
    - e.g., `https://c2c.domain.com/?i=identifier&pm=true`

+ **pc** 
    - Accepted values could be either `true` or `false`.
    - Equivalent to `preference.camera` property in `app.config.json` file.
    - Would enable/disable the **camera** feature.
    - e.g., `https://c2c.domain.com/?i=identifier&pc=true`
    
+ **ps** 
    - Accepted values could be either `true` or `false`.
    - Equivalent to `preference.screenshare` property in `app.config.json` file.
    - Would enable/disable the **screenshare** feature.
    - e.g., `https://c2c.domain.com/?i=identifier&ps=true`
    
+ **px** 
    - Accepted values could be either `true` or `false`.
    - Equivalent to `preference.autoClose` property in `app.config.json` file.
    - Would enable/disable the **autoClose** feature.
    - e.g., `https://c2c.domain.com/?i=identifier&px=true`
    
+ **pd** 
    - Accepted values could be either `true` or `false`.
    - Equivalent to `preference.autoDial` property in `app.config.json` file.
    - Would enable/disable the **autoDial** feature.
    - e.g., `https://c2c.domain.com/?i=identifier&pd=true`

#### 1.1.3.9. Custom parameters

+ **x-key** 
    - Query parameters those prefixed with `x-` would be considered as custom parameter.
    - Accepted values could be any *string*, *number*, *boolean* values.
    - Equivalent to `identifiers.ID.connect.callOptions.customParameters` property where `ID` refers to any defined **identifier** in `app.config.json` file.
    - Would be passed as it is to Kandy SDK.
    - e.g., `https://c2c.domain.com/?i=identifier&x-GPS=42.686032,23.344565`

### 1.1.4. Core features

The application can support 2 types of calls, those are

- non-tokenized calls ⟶ where calls can be initiated by directly supplying the callee address and no token is required
- tokenized calls ⟶ where calls can be initiated by supplying the encrypted token and no callee address is required

> **Note**: These encrypted tokens are not only encrypted but also time limited.

#### 1.1.4.1. Getting token

To get a token C2C will request ACTG (Anonymous Call Token Generator) with  

- identifier ⟶ actgId a.k.a. destination identifier

ACTG will map it with available configuration and returns a token set consisting of 4 entities, those are

- accountToken ⟶ hexadecimal code
- fromToken ⟶ hexadecimal code
- toToken ⟶ hexadecimal code
- tokenRealm ⟶ host.dom

Here, 3 entities are tokens while 1 entity is realm.

For example, when we requested ACTG as

    http://your.actg-server.url/actg/token?identifier=tokenized-with-landingpage

We got a successful response like this

```json
{
  "accountToken": "A76A24DA4EFE5DE4C93BD024BC7C8688047106354A854A4DE4B947A0810B95CBF22C14265F1BD9F3128A86FE4D7F4DCA",
  "fromToken": "61BF0D61BA470941952BC89B8EE7413AAA16F95936FD5BD01953158AC095F9FB3A6CF32EFB1C5FD8935742A3DC8C7FFB",
  "toToken": "F7FE1788BE74891834F5C62BC7B08A8CC280471ED702247C335A5D93A741C4023A6CF32EFB1C5FD8935742A3DC8C7FFB",
  "tokenRealm": "realm.com"
}
```

Now here is the basic code snippet that shows how the Web Page C2C reference app fetches token from ACTG reference webserver.

```javascript
$.ajax({
    url: String(Model.actgConfig.baseUrl + Model.actgConfig.api.token).graft({destId: actgId}), // tip: actgId is a destination identifier name used in 'actg.config.json'
    async: true,
    crossDomain: true,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-cache'
    }
  })
  .done(response => onSuccess(response))
  .fail((jqxhr, textStatus, error) => onFailure(textStatus, error))
```

#### 1.1.4.2. Originating non-tokenized call

You need to provide `callee` details in the configuration 

```javascript
"connect": {
    "callee": "user@host.dom",
    "tokenized": false,
    ⋮
}
```

#### 1.1.4.3. Originating tokenized call

You need to provide `actgId` details in the configuration 

```javascript
"connect": {
    "actgId": "DestinationIndentifierName",
    "tokenized": true,
    ⋮
}
```

Here, `DestinationIndentifierName` is the name of preconfigured settings available at ACTG which is required to generate token set.

#### 1.1.4.4. Other

If the ACTG and C2C reference apps are hosted on different servers then make sure to allow C2C requests on ACTG otherwise C2C won't be able to get tokens.

### 1.1.5. Optional features

#### 1.1.5.1. Escalate audio call to video/screenshare

To escalate an audio call to video or to screen share, first you need to make the feature available via `preference` property like

```javascript
"preference": {
    ⋮
    "camera": true,
    "screenshare": true,
    ⋮
}
```

This will make the camera & screenshare control button available in the C2C reference app.

So whenever required, just click on the button to start the video or share the screen.

```javascript
cameraOn() {
  if (this.callId) {
    const call = this.client.call.getById(this.callId)
    const localVideoTracks = this.getVideoTracks(call, true)
    if (localVideoTracks.length > 0) {
      this.client.call.removeMedia(this.callId, [localVideoTracks[0].trackId])
      this.callPanel.control.callScreenshare.setState(true)
    } else {
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
screenshareOn() {
  if (this.callId) {
    const call = this.client.call.getById(this.callId)
    const localVideoTracks = this.getVideoTracks(call, true)
    if (localVideoTracks.length > 0) {
      this.client.call.removeMedia(this.callId, [localVideoTracks[0].trackId])
      this.callPanel.control.callCamera.setState(true)
    } else {
      this.client.call.addMedia(this.callId, {
        video: false,
        screen: true
      })
      this.callPanel.control.callScreenshare.setState(false)
      this.callPanel.toast.info(Model.i18n.alertScreensharingStarted, 1)
    }
  }
}
```

#### 1.1.5.2. Other

You can enable/disable the feature 

- `autoClose` ⟶ closes the popup window on call end
- `autoDial` ⟶ automatically initiates the call on opening of popup window

```javascript
"preference": {
    ⋮
    "autoClose": true,
    "autoDial": true
}
```

Let's determine the value of `Model.preference.autoClose` in the given configuration.

```javascript
⋮
"preference": {
    autoClose: false, // Global setting
    autoDial: true 
},
"identifier": {
    "sample-id": { 
        ⋮
        "preference": {
            autoClose: true // Local setting
        }
    },
    ⋮
}
```

Now as descibed above that priority of `Local > Global`, thus the value of `Model.preference.autoClose` would be ***true*** as shown below.

```javascript
$.getJSON('app.config.json', data => { 
    let identifier = data.identifier[Model.queryParams.identifier]
    ⋮
    Model.preference.autoClose = Utils.prioritize(
        Utils.chain(Model, 'queryParams.autoClose'), // External
        Utils.chain(identifier, 'preference.autoClose'), // Local
        Utils.chain(data, 'preference.autoClose'), // Global
        Model.preference.autoClose // Default
    )
    console.log(Model.preference.autoClose) // output: true
})
onChangeTelephonyState(state) {
  this.telephonyState = state
  switch (state) {
    ⋮
    case this.TELEPHONYSTATE_IDLE:
      this.defaultState()
      if (Model.preference.autoClose) {
        this.isForcedWinClose = true
        setTimeout(parent.window.close, 1000)
      }
      break
    ⋮
}
onChangeControlState(state) {
  switch (state) {
    ⋮
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
    ⋮
}
```

### 1.1.6. Source File Content

#### 1.1.6.1. Known Limitation and Restriction

Usually different environment supports different sets of codecs. So the size of the SDP should be taken care of by removing the incompatible codecs. 

By default SDK will use all the available codecs as required but that would bloat the size of SDP. 

The following 5 codecs shall be configured in the `app.config.json` to be removed from SDP.

```javascript
"call": {
    "removeCodecs": ["VP8", "opus", "G722", "VP9", "ISAC"],
    ⋮
}
```

Note that removing the codecs will decrease size of SDP that is necessary for those environment where SDP size matters.

#### 1.1.6.2. Why we implemented the function the way we did in our reference app?

We have grouped methods in a class to segregate the logic in an object oriented way. Further on, all the codes related to particular task are grouped together in the functions. 

So by refering the class name and function name will define the purpose of the method and task it would perform.

### 1.1.7. FAQ and Debugging

#### 1.1.7.1. How to debug a session if call does not work?

In case, when the call doesn't work; then first of all check if the callee is logged in. If yes then,

- Look for the error in the console & network log of the browser. 
- Notice and review the different states of the call when call progresses. 
- See the responses of API calls and look for the failures. 
- Check in `app.config.json` file, under `kandy.logs`, set `logLevel` value as *debug* to log SDK issues.
