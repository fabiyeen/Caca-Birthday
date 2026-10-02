// Ambient Celestial Soundscape Generator using Web Audio API
// 100% offline, zero network dependencies, buttery smooth ambient harmonies

class CelestialSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private timer: number | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private volume = 0.4;

  // Celestial pentatonic frequencies: F#3, A#3, C#4, D#4, F#4, G#4, A#4, C#5
  private pentatonicNotes = [185.0, 233.08, 277.18, 311.13, 369.99, 415.3, 466.16, 554.37, 739.99];

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public async play() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) return;
    this.isPlaying = true;

    // Start soft cosmic pad drone
    this.startDrone();

    // Start periodic ethereal chimes
    this.scheduleNextChime();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    this.stopDrone();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume
    };
  }

  private startDrone() {
    if (!this.ctx || !this.masterGain) return;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.droneGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 3);

    // Warm lowpass filter for deep space warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    this.droneGain.connect(filter);
    filter.connect(this.masterGain);

    // Fundamental warm drone (92.5 Hz - F#2) and fifth (138.59 Hz - C#3)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(92.5, this.ctx.currentTime);

    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(138.59, this.ctx.currentTime);

    this.droneOsc1.connect(this.droneGain);
    this.droneOsc2.connect(this.droneGain);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  private stopDrone() {
    if (!this.ctx || !this.droneGain) return;
    try {
      this.droneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
      setTimeout(() => {
        try {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.disconnect();
        } catch {
          // ignore
        }
        this.droneOsc1 = null;
        this.droneOsc2 = null;
        this.droneGain = null;
      }, 600);
    } catch {
      // ignore
    }
  }

  private scheduleNextChime() {
    if (!this.isPlaying) return;

    // Trigger 1-3 gentle notes in harmony
    this.playChord();

    // Random interval between 2.8s and 5.5s
    const nextInterval = 2800 + Math.random() * 2700;
    this.timer = window.setTimeout(() => {
      this.scheduleNextChime();
    }, nextInterval);
  }

  private playChord() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const baseIdx = Math.floor(Math.random() * (this.pentatonicNotes.length - 2));
    const chordNotes = [
      this.pentatonicNotes[baseIdx],
      this.pentatonicNotes[baseIdx + 2]
    ];
    if (Math.random() > 0.4 && baseIdx + 4 < this.pentatonicNotes.length) {
      chordNotes.push(this.pentatonicNotes[baseIdx + 4]);
    }

    chordNotes.forEach((freq, i) => {
      const delay = i * 0.18; // Strum effect
      this.playNote(freq, delay);
    });
  }

  private playNote(freq: number, delaySec: number) {
    if (!this.ctx || !this.masterGain) return;

    const startTime = this.ctx.currentTime + delaySec;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Gentle celesta/vibraphone blend
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Envelope: Quick soft attack, long reverberant exponential decay
    const peakVolume = 0.07 + Math.random() * 0.04;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peakVolume, startTime + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.00001, startTime + 3.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 3.4);

    osc.onended = () => {
      try {
        osc.disconnect();
        gain.disconnect();
      } catch {
        // ignore
      }
    };
  }
}

export const celestialSoundscape = new CelestialSoundscape();
