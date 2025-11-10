import confetti from 'canvas-confetti';
import type { CelebrationEventType } from '@shared/types/gameTypes';

export class CelebrationService {
  private static audioEnabled = false;
  private static reducedMotion = false;

  static setAudioEnabled(enabled: boolean) {
    this.audioEnabled = enabled;
  }

  static setReducedMotion(enabled: boolean) {
    this.reducedMotion = enabled;
  }

  static celebrate(eventType: CelebrationEventType) {
    if (!this.reducedMotion) {
      this.triggerConfetti(eventType);
    }
    
    if (this.audioEnabled) {
      this.playSound(eventType);
    }
  }

  private static triggerConfetti(eventType: CelebrationEventType) {
    const configs = {
      correct: {
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399']
      },
      complete: {
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#60a5fa', '#fbbf24']
      },
      'perfect-score': {
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#fbbf24', '#fcd34d']
      },
      streak: {
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#8b5cf6', '#a78bfa']
      }
    };

    const config = configs[eventType];
    if (config) {
      confetti(config);
    }
  }

  private static playSound(eventType: CelebrationEventType) {
    const frequencies = {
      correct: [523.25, 659.25, 783.99],
      complete: [523.25, 659.25, 783.99, 1046.50],
      'perfect-score': [1046.50, 1174.66, 1318.51, 1567.98],
      streak: [659.25, 783.99]
    };

    const freq = frequencies[eventType];
    if (!freq) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = freq[0];
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }
}
