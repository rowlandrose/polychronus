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

function copy_obj(obj) {
    return JSON.parse(JSON.stringify(obj));
}

//////////
// DATA //
//////////

let chord_notes = {
  'i'    :[0,3,7],
  'I'    :[0,4,7],
  'ii'   :[0,3,7],
  'ii_d' :[0,3,6],
  'III'  :[0,4,7],
  'iii'  :[0,3,7],
  'iv'   :[0,3,7],
  'IV'   :[0,4,7],
  'V'    :[0,4,7],
  'VI'   :[0,4,7],
  'vi'   :[0,3,7],
  'bVII' :[0,4,7],
  'vii_d':[0,3,6]
};

let chord_positions = {
  'i'    : 0,
  'I'    : 0,
  'ii'   : 2,
  'ii_d' : 2,
  'III'  : 3,
  'iii'  : 4,
  'iv'   : 5,
  'IV'   : 5,
  'V'    : 7,
  'VI'   : 8,
  'vi'   : 9,
  'bVII' :10,
  'vii_d':11
};
let relative_notes = {
	'I' : 0,
	'i' : 0,
	'bII' : 1,
	'bii' : 1,
	'II' : 2,
	'ii' : 2,
	'bIII' : 3,
	'biii' : 3,
	'III' : 4,
	'iii' : 4,
	'IV' : 5,
	'iv' : 5,
	'bV' : 6,
	'bv' : 6,
	'V' : 7,
	'v' : 7,
	'bVI' : 8,
	'bvi' : 8,
	'VI' : 9,
	'vi' : 9,
	'bVII' : 10,
	'bvii' : 10,
	'VII' : 11,
	'vii' : 11,
};
let note_letters = ['C', 'bD', 'D', 'bE', 'E', 'F', 'bG', 'G', 'bA', 'A', 'bB', 'B'];

let chords = {
	"Major" : {
		"I" : [
			"ii",
			"iii",
			"IV",
			"V",
			"vi",
			"vii_d"
		],
		"ii" : [
			"I",
			"V",
			"vii_d"
		],
		"iii" : [
			"ii",
			"IV",
			"vi"
		],
		"IV" : [
			"I",
			"ii",
			"V",
			"vii_d"
		],
		"V" : [
			"I",
			"vi",
			"vii_d"
		],
		"vi" : [
			"ii",
			"IV"
		],
		"vii_d" : [
			"V",
			"I"
		]
	},
	"Minor" : {
		"i" : [
			"ii_d",
			"III",
			"iv",
			"V",
			"VI",
			"vii_d",
			"bVII"
		],
		"ii_d" : [
			"i",
			"V",
			"vii_d"
		],
		"III" : [
			"ii_d",
			"iv",
			"VI"
		],
		"iv" : [
			"i",
			"ii_d",
			"V",
			"vii_d"
		],
		"V" : [
			"i",
			"VI",
			"vii_d"
		],
		"VI" : [
			"ii_d",
			"iv"
		],
		"vii_d" : [
			"i",
			"V",
			"VI"
		],
		"bVII" : [
			"ii_d",
			"III",
			"iv"
		]
	}
};

// Drum Map Patterns
let drum_map_bd = [
  'x---x---x---x---',
  'x--x---x-x-x----',
  'x--x--x--x--x-x-',
  'x------x-x------',
  'x---x--x--x-----',
  'x--x--x-----x---',
  'x---x----x--x---',
  'x----x--x----x--'
];
let drum_map_sn = [
  '----x-------x---',
  '----x-------x---',
  '----x--x--x-----',
  '---x--------x---',
  '----x---x---x---',
  '----x--x---x----',
  '-----x-------x--',
  '----x---x-------'
];
let drum_map_hh = [
  '---x--xx-x-x----',
  '---x-x-----x-x--',
  '--x-----x--x-x-x',
  '--------xxxxxxxx',
  'x-x-x-x-x-x-x-x-',
  '--x--xxx--x--x-x',
  'x---x---x---x---',
  '--xx--x---x--x-x',
];

// Mono Melody Map
let mono_rhythm_map = [
  'x==>-xxxx==>-xxx',
  'x--xx--xxxxx-xxx',
  'x>-xx>-xx>-xx>-x',
  'x==>-x=>x==>-x=>',
  '--xxx>-xx>-xx>--',
  'xxxx----xxxx----',
  'x-x-x-x-x-x-x-x-',
  'xx--xx--xx--xx--'
];

let note_map_1 = [
  '1111111111111111',
  '111r111r111r111r',
  '1124117111rr1111',
  '1113311113161711',
  '5115113112115181',
  '11rr11rr11rr11rr',
  '1r1r1r1r1r1r1r1r',
  'rrrrrrrrrrrrrrrr'
];
let note_map_2 = [
  '1111322241113232',
  '2233344455422334',
  '6655655333444466',
  '7776666rr6377r88',
  '2377777662rr16rr',
  '9997888677756664',
  '1113222433354446',
  'rrrrrrrrrrrrrrrr'
];
let note_map_3 = [
  '1123112346546542',
  '6767545565234354',
  '8985887767877566',
  '564r564r5687rr35',
  '11rr44rr11rr44rr',
  '9876543219876543',
  '1234566789123456',
  'rrrrrrrrrrrrrrrr'
];
let note_map_4 = [
  '1234123412341234',
  '1234561234561234',
  '9876987698769876',
  '7654765476547654',
  '7654327654327654',
  '7733773388266444',
  '1r1r1r1r1r1r1r1r',
  'rrrrrrrrrrrrrrrr'
];

let instruments = [
    {
        "name" : "Poly"
    },
    {
        "name" : "Mono"
    },
    {
        "name" : "Drums"
    }
];

let note_gen_methods = [
    {
        "name" : "Eucilidian"
    },
    {
        "name" : "Chords"
    },
    {
        "name" : "Arp"
    },
    {
        "name" : "Mono Melody"
    },
    {
        "name" : "Poly Melody"
    },
    {
        "name" : "Drum Map"
    },
    {
        "name" : "Mono Melody Map"
    }
];

let arp_types = ["up", "down", "up_down", "down_up", "random"];

let default_song = {
    "root_note" : 48, // Or "G" ?
    "bpm" : 120,
    "scale" : "major", // Changing this should clear or regen all section chord progs
    "seconds" : 180,
    "sections" : [
        {
            "name" : "verse",
            "active" : true,
            "chord_prog" : ['I','vii_d','V','vii_d','I','V']
        },
        {
            "name" : "verse_alt",
            "active" : true,
            "chord_prog" : ['I','vii_d','V','vii_d','I','V']
        },
        {
            "name" : "chorus",
            "active" : true,
            "chord_prog" : ['I','iii','vi','ii']
        },
        {
            "name" : "chorus_alt",
            "active" : true,
            "chord_prog" : ['I','iii','vi','ii']
        },
        {
            "name" : "intro",
            "active" : false,
            "chord_prog" : ['I','I','V','V']
        },
        {
            "name" : "outro",
            "active" : false,
            "chord_prog" : ['I','I','V','V']
        },
        {
            "name" : "breakdown",
            "active" : true,
            "chord_prog" : ['IV','V','vii_d','V','vii_d']
        },
        {
            "name" : "pre_chorus",
            "active" : false,
            "chord_prog" : ['iii','ii']
        }
    ],
    "tracks" : [
        {
            "midi_id" : 0,
            "midi_channel" : 1,
            "instrument" : 1,
            "chord_or_scale" : 100,
            "note_amount" : 25,
            "note_hold" : 60,
            "note_gen_method" : 1,
            "velocity" : 127,
            "velocity_variation" : 30,
            "note_length" : 3, // 1 to 16
            "note_length_variation" : 1, // 0.1 to 16
        },
        {
            "midi_id" : 0,
            "midi_channel" : 1,
            "instrument" : 2,
            "chord_or_scale" : 50,
            "note_amount" : 50,
            "note_hold" : 10,
            "note_gen_method" : 4,
            "arp_type" : 2,
            "arp_octaves" : 1,
            "velocity" : 100,
            "velocity_variation" : 50,
            "note_length" : 2, // 1 to 16
            "note_length_variation" : 1, // 0.1 to 16
        },
        {
            "midi_id" : 0,
            "midi_channel" : 10,
            "instrument" : 3,
            "note_gen_method" : 5,
            "drum_map_type" : 3, // 1 to 16
            "drum_map_fill_amount" : 50, // 1 to 100, 50 matches map
            "velocity" : 127,
            "velocity_variation" : 50,
            "note_length" : 2, // 1 to 16
            "note_length_variation" : 1, // 0.1 to 16
        }
    ]
};
let song = copy_obj(default_song);

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
    load_song(default_song);
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

function load_song(song) {

    for(let i = 0; i < song.sections.length; i++) {

        let name = song.sections[i].name;
        let html = '';
        for(let j = 0; j < song.sections[i].chord_prog.length; j++) {

            if(j > 0) {
                html += ' => ';
            }
            html += song.sections[i].chord_prog[j];
        }
        document.querySelector('#sections .section.'+name+' .chord_prog').innerHTML = html;
    }
}