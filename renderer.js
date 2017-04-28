// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let log_el = document.querySelector("#log_output");

function log(str, type) {
    if(typeof type === 'undefined') {
        type = 'info';
    }
    log_el.innerHTML += '<p class="'+type+'">'+str+'</p>';
}

log('Requesting MIDI Access...')

navigator.requestMIDIAccess().then(function() {
    // Success
    log('Successfully achieved MIDI access.', 'success');
}, function() {
    // Fail
    log('Failed to get MIDI access.', 'fail');
});
