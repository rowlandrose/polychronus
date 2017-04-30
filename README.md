# Polychronus
Generative Music Sequencer

The origins of Polychronus began with a proof-of-concept MIDI looper on an
Arduino Uno. Not happy with the limitations of Arduino, my next project was a
MIDI sequencer running on a Raspberry PI 2, using Node, controlled by my Korg
Taktile MIDI keyboard. I then created a chord progression generator in
Javascript (http://www.rowlandrose.com/experiments/chord_progression_experiment/).
I then returned to the MIDI sequencer on the PI, upgrading it to run several
auto-generated tracks of melody, and a few percussion tracks, all following a
chosen chord progression (ones generated with my JS experiment). See MIDIREN.

Polychronus takes all I've learned about MIDI sequencing, recording, and playback,
and combines it with the experiments I've done with chord progression and
random generation of rhythms and melodies, plus a few other popular methods.

Polychronus allows you to generate a complete track of music with the click of
a button. You can re-generate again and again as you tweak the many parameters
available, either song-wide or per-section.

Polychronus also allows you to save and load songs, do live playback to any MIDI
instrument connected to your computer, and export to MIDI.

Available on Windows 8/10, Mac OSX and Linux.