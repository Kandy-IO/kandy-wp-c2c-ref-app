/**
 * Agent Call App Demo
 */
var modelConfig, client;

whenReady(loadConfig);

function loadConfig() {
}

function initClient() {
     let config;

      switch(document.getElementById('lab').value) {
       case 'KBS UAE':
          config = etisalatConfig
        break;
        case 'KBS EMEA':
          config = emeaConfig
        break;
        default:
         config = etisalatConfig
    }
    try {
        modelConfig = JSON.parse(config);
    } catch (error) {
        logError("Something went wrong");
    }

    client = Kandy.create(modelConfig.kandy);

    client.on("request:error", function () {
        logError("Error: Unable to subscribe");
    });

    // Listen for subscription changes.
    client.on('subscription:change', function (params) {
        const services = client.services.getSubscriptions()
        const isSubscribed = services.subscribed.length > 0
        if (isSubscribed) {
            log("Successfully subscribed");
        }

    })

    // Set listener for changes in a call's state.
    client.on("call:stateChange", function (params) {
        // Retrieve call state.
        const call = client.call.getById(params.callId);

        if (params.error && params.error.message) {
            logError("Error: " + params.error.message);
        }
        log("Call state changed from " + params.previous.state + " to " + call.state);

        renderMedia(params.callId);

        if (call.state == "Ringing") {
          log(`call coming from: ${call.remoteParticipant.displayName}(${call.remoteParticipant.displayNumber})`)
        }

        // If the call ended, stop tracking the callId.
        if (call.state === "Ended") {
            callId = null;
      
        }

        if (call.state === "Connected") {
            
        }
    });


    // Set listener for successful call starts.
    client.on("call:start", function (params) {
        log("Call successfully started. Waiting for response.");
    });

    // Set listener for generic call errors.
    client.on("call:error", function (params) {
        logError("Encountered error on call: " + params.error.message);
    });


    // Set listener for incoming calls.
    client.on("call:receive", function (params) {
        // Keep track of the callId.
        callId = params.callId;

        // Retrieve call information.
        call = client.call.getById(params.callId);
       // log("Received incoming call");
    });


    // Set listener for new tracks.
    client.on("call:newTrack", function (params) {
        // Check whether the new track was a local track or not.
        if (params.local) {
            // Only render local visual media into the local container.
            const localTrack = client.media.getTrackById(params.trackId);
            if (localTrack.kind === "video") {
                client.media.renderTracks([params.trackId], "#local-container");
            }
        } else {
            // Render the remote media into the remote container.
            client.media.renderTracks([params.trackId], "#remote-container");
        }
    });

    // Set listener for ended tracks.
    client.on("call:trackEnded", function (params) {
        // Check whether the ended track was a local track or not.
        if (params.local) {
            // Remove the track from the local container.
            client.media.removeTracks([params.trackId], "#local-container");
        } else {
            // Remove the track from the remote container.
            client.media.removeTracks([params.trackId], "#remote-container");
        }
    });

    // Set listener for call media errors.
    client.on('media:error', function (params) {
        logError('Error: Call encountered media error: ' + params.error.message)
    })

    // Set listener for new tracks.
    client.on("media:sourceUnmuted", function (params) {
        // Render the remote media into the remote container.
        // Retrieve call and track state.
        let call = client.call.getById(callId);
        let track = client.media.getTrackById(params.trackId);

        // Re-render the media into the correct container.
        if (call.remoteTracks.includes(params.trackId)) {
            client.media.renderTracks([params.trackId], "#remote-container");
        } else if (
            call.localTracks.includes(params.trackId) &&
            track.kind === "video"
        ) {
            // We only want to render local video because local audio would cause an echo.
            client.media.renderTracks([params.trackId], "#local-container");
        }
    });

    // Set listener for ended tracks.
    client.on("media:sourceMuted", function (params) {
        // Remove the track from the remote container.
        // Retrieve call state.
        let call = client.call.getById(callId);

        // Unrender the media from the correct container.
        if (call.remoteTracks.includes(params.trackId)) {
            client.media.removeTracks([params.trackId], "#remote-container");
        } else if (call.localTracks.includes(params.trackId)) {
            client.media.removeTracks([params.trackId], "#local-container");
        }
    });
}

/**
* Subscribes to the call service on the websocket channel for notifications.
* Do this after logging in.
*/
function subscribe() {
  const services = ["call"];
  const subscriptionType = "websocket";
  client.services.subscribe(services, subscriptionType);
  log("Subscribing to call service (websocket channel)");
}

async function loginSubscribe() {

  const userEmail = document.getElementById('userEmail').value
  const password = document.getElementById('password').value
  if(password && userEmail) {
      initClient();
      client.setCredentials({
          username: userEmail,
          password: password,
          authname: "",
          bearerAccessToken: ""
      });

    subscribe();
  }

}

// Utility function for appending messages to the message div.
function log(...message) {
  let msg = message.join(' ');
  console.log(msg);
//   logInfo(msg);
  document.getElementById("terminal").innerHTML += "<p>" + msg + "</p>";
}

// Utility function for appending messages to the message div.
function logError(...message) {
  let msg = message.join(' ');
  console.log(msg);
//   logInfoError(msg);
  document.getElementById("terminal").innerHTML += "<p>" + msg + "</p>";
}
  
function clearLog() {
  document.getElementById("terminal").innerHTML = ''
}

//=====

function renderMedia(callId) {
  // Retrieve call state.
  const call = client.call.getById(callId);

  // Retrieve the local track that belongs to video
  const videoTrack = call.localTracks.find(trackId => {
    return client.media.getTrackById(trackId).kind === "video";
  });

  // Render local visual media.
  client.media.renderTracks([videoTrack], "#local-container");

  // Render the remote audio/visual media.
  client.media.renderTracks(call.remoteTracks, "#remote-container");
}

// End an ongoing call.
function endCall() {
  // Retrieve call state.
  let call = client.call.getById(callId)
  log('Ending call')

  client.call.end(callId)
}

// Reject an incoming call.
function rejectCall() {
  // Retrieve call state.
  let call = client.call.getById(callId)
  log('Rejecting call')

  client.call.reject(callId)
}

// Answer an incoming call.
function answerCall() {
  // Gather call options.
  let withVideo = document.getElementById('answer-with-video').checked

  // Retrieve call state.
  let call = client.call.getById(callId)
  log('Answering call')

  const mediaConstraints = {
      audio: true,
      video: withVideo
  }
  client.call.answer(callId, mediaConstraints)
}

function HoldCall(){
    let call = client.call.getById(callId)
    log('HoldCall')
    client.call.hold(callId);
  
}

function UnholdCall(){
    let call = client.call.getById(callId)
    log('UnholdCall')
    client.call.unhold(callId);
  
}

function UnmuteCall(){
    const call = client.call.getById(callId)
    const localAudioTracks = this.getAudioTracks(call, true)
    if (localAudioTracks.length > 0) {
        const audioTrackIds = localAudioTracks.reduce((ts, t) => ts.concat(t.trackId), [])
        console.log('micOff, unmuting tracks: ', audioTrackIds)
        client.media.unmuteTracks(audioTrackIds)
      }
}

function MuteCall(){
    const call = client.call.getById(callId)
    const localAudioTracks = this.getAudioTracks(call, true)
      if (localAudioTracks.length > 0) {
        const audioTrackIds = localAudioTracks.reduce((ts, t) => ts.concat(t.trackId), [])
        console.log('micOn, muting tracks: ', audioTrackIds)
        client.media.muteTracks(audioTrackIds)
      }
}

 function getAudioTracks(call, localAudio) {
    console.log('Communicator.getAudioTracks')
    let tracks = []
    const allTracks = localAudio ? call.localTracks : call.remoteTracks
    if (allTracks == call.localTracks) {
      allTracks.forEach(t => {
        const thisTrack = this.client.media.getTrackById(t)
        if (!!thisTrack && thisTrack.kind == 'audio') {
          tracks.push(thisTrack)
        }
      })
    }
    return tracks
  }