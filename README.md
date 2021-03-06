# kandy-wp-c2c-ref-app

[![Compatible Kandy SDK version][]](https://github.com/Kandy-IO/kandy-callMe-js-sdk)

The Web Page Click-to-Call (C2C) application is a JavaScript based open source reference application that uses the Kandy Anonymous CallMe JavaScript SDK that developers can adapt and productize for integration into a customer's web site for anonymous click-to-calls. The Web Page Click-to-Call Reference Application supports token-based anonymous calls, and non-tokenized anonymous calls.

Token-based anonymous calls require the customer to deploy an Anonymous Call Token Generator (ACTG) application to provide tokens to the Web Page C2C application to send with an anonymous call origination into a Kandy Link WebRTC Gateway.

## Install
You need to add (or uncomment) below given code in the `index.html` page of the C2C app

```html
<script src="https://unpkg.com/@kandy-io/callme-sdk@4.x.x/dist/kandy.js"></script>
```

Here you need to modify the `@4.x.x` with the latest version available for [@kandy-io/callme-sdk](https://github.com/Kandy-IO/kandy-callMe-js-sdk).

After this, configure the `app.config.json` with relevant settings.

At last, if using the anonymous call token genenrator then configure the `actg.config.json` of ACTG server with relevant details as well and restart the ACTG server or reload it's service to load the updated config file.

## Documentation
For more information, please refer

 - Developer Tutorial: *Choose your configuration* ( [Kandy-US](docs/developer-tutorial-us.md) | [Kandy-UAE](docs/developer-tutorial-uae.md) )

## Compatibility

| Browsers      | Operating Systems        |
|---------------|--------------------------|
| Chrome        | Windows, MacOS, Android¹ |
| Firefox       | Windows, MacOS           |
| Edge Chromium | Windows, MacOS           |
| Safari        | MacOS, iOS               |
| Opera         | Windows, MacOS           |

¹ *Partially supported*

Subject to the capabilities and limitations of the browser, Operating System, Kandy Anonymous CallMe JavaScript SDK, and destination to which an anonymous call is connected. Please refer to the Kandy Anonymous CallMe JavaScript SDK for applicable SDK limitations for each browser.

[Compatible Kandy SDK version]: https://img.shields.io/badge/Kandy%20SDK-v4.21.0-green
