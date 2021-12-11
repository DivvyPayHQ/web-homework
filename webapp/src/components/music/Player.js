import React, { Component } from 'react'
import WebAudioFontPlayer from 'webaudiofont'
import { css } from '@emotion/core'
import { Button } from '@kyper/button'
import { TokenContext } from '@kyper/tokenprovider'

import BoomBox from 'src/images/boombox.png'

const songPaths = ['kc-jojo.mid', 'i_want_it_that_way.mid', 'as-long-as-you-love-me.mid']

export class Player extends Component {
  constructor (props) {
    super(props)

    this.resetPlayer()

    this.state = {
      currentSong: 0,
      paused: true,
      loading: false
    }
  }

  componentDidMount () {
    this.loadMidi(this.state.currentSong)
  }

  componentDidUpdate (_, prevState) {
    const { currentSong, loading, paused } = this.state

    if (!paused && prevState.paused) {
      this.play()
    }

    if (!paused && !loading && prevState.loading) {
      this.play()
    }

    if (paused && !prevState.paused) {
      // Too much work to actually pause it.
      this.resetPlayer()
    }

    if (currentSong !== prevState.currentSong) {
      this.loadMidi(currentSong)
    }
  }

  static contextType = TokenContext

  loadMidi = (index = 0) => {
    (async () => {
      this.setState({ loading: true })
      const { default: midi } = await import(`src/music/${songPaths[index]}`)
      this.resetPlayer()
      this.parseMidi(midi)
    })()
  }

  parseMidi = (midi) => {
    const happyMidi = Uint8Array.from(window.atob(midi), c => c.charCodeAt(0))
    const midiFile = new window.MIDIFile(happyMidi)
    const song = midiFile.parseSong()

    this.setState({ song, loading: false })
  }

  resetPlayer = () => {
    // Instance state that we don't want to tie to renders
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

  buildPlayer = () => {
    const { song } = this.state
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
  }

  play = () => {
    if (!this.currentSongTime) {
      this.buildPlayer()
      this.songStart = this.audioContext.currentTime
      this.nextStepTime = this.audioContext.currentTime
    }

    var stepDuration = 44 / 1000

    this.tick(this.state.song, stepDuration)
  }

  next = () => {
    this.setState(state => {
      const lastIndex = songPaths.length - 1

      return {
        currentSong: state.currentSong === lastIndex ? 0 : state.currentSong + 1
      }
    })
  }

  tick = (song, stepDuration) => {
    if (!this.state.paused && !this.state.loading) {
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

      window.requestAnimationFrame(() => {
        this.tick(song, stepDuration)
      }, 100)
    }
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
    const tokens = this.context

    return (
      <div css={containerStyle}>
        <div css={buttonContainerStyle(tokens)}>
          <Button onClick={() => this.setState({ paused: !this.state.paused })}>
            {this.state.paused ? 'PLAY' : 'RESET' }</Button>
          <Button onClick={this.next}>NEXT</Button>
        </div>
      </div>
    )
  }
}

const containerStyle = css`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 500px;
  height: 300px;
  background-image: url(${BoomBox});
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const buttonContainerStyle = tokens => css`
  position: relative;
  top: 72px;

  & > button {
    color: ${tokens.Color.Brand300} !important;
    width: 150px;
    background-color: black !important;
    margin-bottom: 4px;
  }
`
