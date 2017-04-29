// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

///////////////////////
// UTILITY FUNCTIONS //
///////////////////////

function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
}

//////////////
// MAIN APP //
//////////////

let log_el = document.querySelector("#log_output .body");

let midi_info;

function log(str, type) {
    if(typeof type === 'undefined') {
        type = 'info';
    }
    log_el.innerHTML += '<p class="'+type+'">'+str+'</p>';
    log_el.scrollTop = log_el.scrollHeight;
}

log('Requesting MIDI Access...');

navigator.requestMIDIAccess().then(function(midi) {
    // Success
    log('Successfully achieved MIDI access.', 'success');
    midi_info = midi;
    choose_device();
}, function() {
    // Fail
    log('Failed to get MIDI access.', 'fail');
});

function choose_device() {

    let inputs = midi_info.inputs.values();
    let cd = document.querySelector("#choose_device .body");
    let html = '';

    html += '<select>';
    html += '<option value="0">Please Choose a MIDI Device for Playback</option>';

    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        
        console.log(input.value.type+', '+input.value.state);
        if(input.value.type == 'input' && input.value.state == 'connected') {
            html += '<option value="'+input.value.id+'">'+input.value.manufacturer+' : '+input.value.name+'</option>';
        }
        // each time there is a midi message call the onMIDIMessage function
        //input.value.onmidimessage = onMIDIMessage;
    }

    html += '</select>';

    cd.innerHTML = html;
    removeClass(document.querySelector('#choose_device'), 'hide');
}