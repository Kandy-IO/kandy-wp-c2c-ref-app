# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [Released]

## 1.0.5 - 2020-10-31

### Changed
- Rebased Web Page C2C Reference App to make it compatible to SDK v4.20    `AFC-189`

### Fixed
- Unable to stop video or screenshare after a video or screenshare call is resumed from Hold    `AFC-186`

## 1.0.4 - 2020-10-02

### Changed
- Rebased Web Page C2C Reference App to make it compatible to SDK v4.19    `AFC-184`

### Fixed
- When call goes on hold, the screen becomes scrollable with a vertical scroll bar visible.    `AFC-178`
- No Audio on C2C app after remote party performed some mid-call service.    `AFC-179`

## 1.0.3 - 2020-08-28

### Changed
- Updated the Developer Tutorial (UAE) to show the ways to remove specific H.264 codecs    `AFC-176`
- Rebased Web Page C2C Reference App to make it compatible to SDK v4.18    `AFC-177`

## 1.0.2 - 2020-06-26

### Changed
- Disable video button when screen sharing is going on    `AFC-159`
- Rebased Web Page C2C Reference App to make it compatible to SDK v4.16    `AFC-160`

### Fixed
- Fixed an issue where 2 remote videos    `AFC-143`
- Fixed an issue where incorrect message appear on Web Page C2C Reference App when remote party resumes call from held state    `AFC-149`

## 1.0.1 - 2020-05-29

### Changed
- Simplified the *Compatibility Matrix* in the `Readme` file and referred the reader to the *Kandy CallMe JavaScript SDK* for applicable SDK limitations for each browser
- Compatible with *Kandy CallMe JavaScript SDK* v4.15.0

### Fixed
- Fixed an issue where caller couldn't hear early media when calling to PSTN number    `AFC-137`
- Fixed an issue where caller was hearing his own voice while while making a call and when it is ringing at other end    `AFC-141`
- Fixed an issue where caller couldn't place a call via iOS Safari browser    `AFC-139`
- Fixed all the broken links in the content section of developer tutorials    `AFC-153`
- Fixed an issue where if video is streaming before starting screenshare then video stream wasn't restarting on *Stop Sharing* by browser button    `AFC-148`

## 1.0.0 - 2020-04-17

### Added
- Initial version