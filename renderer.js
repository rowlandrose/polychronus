// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

navigator.requestMIDIAccess().then(function() {
    // Success
    document.querySelector("#output").innerHTML = 'success!';
}, function() {
    // Fail
    document.querySelector("#output").innerHTML = 'fail...';
});
