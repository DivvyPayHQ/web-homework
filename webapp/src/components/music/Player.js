import React, { Component } from 'react'

// import MidiParser from 'midi-parser-js'

import song from 'src/music/i_want_it_that_way.mid'

import WebAudioFontPlayer from 'webaudiofont'

export class Player extends Component {
  constructor (props) {
    super(props)
    this.player = null
    this.audioContext = null
    this.equalizer = null
    this.reverberator = null
    this.input = null
    this.currentSongTime = 0
    this.nextStepTime = 0
    this.nextPositionTime = 0
    this.songStart = 0
  }

  componentDidMount () {
  }

  handleLoadSong = () => {
    // Parse to a format MIDIFile understands
    const happySong = Uint8Array.from(window.atob(song), c => c.charCodeAt(0))
    const midiFile = new window.MIDIFile(happySong)
    const parsed = midiFile.parseSong()

    this.startLoad(parsed)
  }

  startLoad = song => {
    const AudioContextFunc = window.AudioContext || window.webkitAudioContext

    this.audioContext = new AudioContextFunc()
    this.player = new WebAudioFontPlayer()

    this.equalizer = this.player.createChannel(this.audioContext)
    this.reverberator = this.player.createReverberator(this.audioContext)
    this.input = this.equalizer.input
    this.equalizer.output.connect(this.reverberator.input)
    this.reverberator.output.connect(this.audioContext.destination)

    for (let i = 0; i < song.tracks.length; i++) {
      const nn = this.player.loader.findInstrument(song.tracks[i].program)
      const info = this.player.loader.instrumentInfo(nn)
      song.tracks[i].info = info
      song.tracks[i].id = nn
      this.player.loader.startLoad(this.audioContext, info.url, info.variable)
    }
    for (let i = 0; i < song.beats.length; i++) {
      const nn = this.player.loader.findDrum(song.beats[i].n)
      const info = this.player.loader.drumInfo(nn)
      song.beats[i].info = info
      song.beats[i].id = nn
      this.player.loader.startLoad(this.audioContext, info.url, info.variable)
    }

    this.startPlay(song)
  }

  startPlay = (song) => {
    this.currentSongTime = 0
    this.songStart = this.audioContext.currentTime
    this.nextStepTime = this.audioContext.currentTime
    var stepDuration = 44 / 1000

    this.tick(song, stepDuration)
  }

  tick = (song, stepDuration) => {
    if (this.audioContext.currentTime > this.nextStepTime - stepDuration) {
      this.sendNotes(song, this.songStart, this.currentSongTime, this.currentSongTime + stepDuration, this.audioContext, this.input, this.player)
      this.currentSongTime = this.currentSongTime + stepDuration
      this.nextStepTime = this.nextStepTime + stepDuration
      if (this.currentSongTime > song.duration) {
        this.currentSongTime = this.currentSongTime - song.duration
        this.sendNotes(song, this.songStart, 0, this.currentSongTime, this.audioContext, this.input, this.player)
        this.songStart = this.songStart + song.duration
      }
    }

    if (this.nextPositionTime < this.audioContext.currentTime) {
      // var o = document.getElementById('position');
      // o.value = 100 * currentSongTime / song.duration;
      // document.getElementById('tmr').innerHTML = '' + Math.round(100 * currentSongTime / song.duration) + '%';
      this.nextPositionTime = this.audioContext.currentTime + 3
    }
    window.requestAnimationFrame(() => {
      this.tick(song, stepDuration)
    })
  }

  sendNotes = (song, songStart, start, end, audioContext, input, player) => {
    for (var t = 0; t < song.tracks.length; t++) {
      var track = song.tracks[t]
      for (let i = 0; i < track.notes.length; i++) {
        if (track.notes[i].when >= start && track.notes[i].when < end) {
          const when = songStart + track.notes[i].when
          let duration = track.notes[i].duration
          if (duration > 3) {
            duration = 3
          }
          const instr = track.info.variable
          const v = track.volume / 7
          player.queueWaveTable(audioContext, input, window[instr], when, track.notes[i].pitch, duration, v, track.notes[i].slides)
        }
      }
    }
    for (let b = 0; b < song.beats.length; b++) {
      var beat = song.beats[b]
      for (let i = 0; i < beat.notes.length; i++) {
        if (beat.notes[i].when >= start && beat.notes[i].when < end) {
          const when = songStart + beat.notes[i].when
          const duration = 1.5
          const instr = beat.info.variable
          const v = beat.volume / 2
          player.queueWaveTable(audioContext, input, window[instr], when, beat.n, duration, v)
        }
      }
    }
  }

  render () {
    return (
      <div>
        <button onClick={this.handleLoadSong}>DJ, Spin that shit!</button>
      </div>
    )
  }
}
