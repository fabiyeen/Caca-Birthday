// Background Music Engine - Yiruma: Reminiscent
// High-fidelity streaming audio with loop, volume control, instant mute, and subscription state

export interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
}

class CelestialAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private audioSrc = encodeURI('/Yiruma Reminiscent.mp3');
  private isPlaying = false;
  private isMuted = false;
  private volume = 0.45;
  private listeners: Set<(state: AudioState) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.audio) return;
    try {
      this.audio = new Audio();
      this.audio.src = this.audioSrc;
      this.audio.loop = true;
      this.audio.preload = 'metadata';
      this.audio.volume = this.volume;
      this.audio.muted = this.isMuted;

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('volumechange', () => {
        if (this.audio) {
          this.volume = this.audio.volume;
          this.isMuted = this.audio.muted;
          this.notify();
        }
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Audio playback error:', e);
        this.isPlaying = false;
        this.notify();
      });
    } catch (err) {
      console.warn('Failed to initialize Audio element:', err);
    }
  }

  public async play(): Promise<boolean> {
    this.initAudio();
    if (!this.audio) return false;

    try {
      this.audio.muted = this.isMuted;
      this.audio.volume = this.volume;
      await this.audio.play();
      this.isPlaying = true;
      this.notify();
      return true;
    } catch (err) {
      // Browser autoplay policy prevented or interrupted playback
      console.warn('Audio play was prevented or aborted:', err);
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  public pause(): void {
    if (!this.audio) return;
    try {
      this.audio.pause();
    } catch (err) {
      console.warn('Error pausing audio:', err);
    }
    this.isPlaying = false;
    this.notify();
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      return await this.play();
    }
  }

  public setVolume(val: number): void {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audio) {
      this.audio.volume = this.volume;
      if (this.volume > 0 && this.isMuted) {
        this.isMuted = false;
        this.audio.muted = false;
      }
    }
    this.notify();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.muted = this.isMuted;
    }
    this.notify();
    return this.isMuted;
  }

  public getStatus(): AudioState {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume
    };
  }

  public subscribe(listener: (state: AudioState) => void): () => void {
    this.listeners.add(listener);
    listener(this.getStatus());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const status = this.getStatus();
    this.listeners.forEach((listener) => {
      try {
        listener(status);
      } catch {
        // ignore listener error
      }
    });
  }
}

export const celestialSoundscape = new CelestialAudioEngine();
