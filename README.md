# kandy-wp-c2c-ref-app
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

| Browsers      | Versions              | Operating Systems       |
|---------------|-----------------------|-------------------------|
| Chrome        | Last 3 Major Versions | Windows, MacOS, Android |
| Firefox       | Last 3 Major Versions | Windows, MacOS          |
| Edge Chromium | Latest Major Version  | Windows, MacOS          |
| Safari        | Latest Major Version  | MacOS, iOS              |
| Opera         | Last 3 Major Version  | Windows, MacOS          |
