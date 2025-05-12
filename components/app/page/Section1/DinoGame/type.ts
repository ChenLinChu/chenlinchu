import type { CSSProperties } from 'react';

export interface Obstacle {
    x: number;
    width: number;
    height: number;
}

export interface GameState {
    isPlaying: boolean;
    score: number;
    highScore: number;
    dinoY: number;
    dinoVelocity: number;
    obstacles: Obstacle[];
    gameSpeed: number;
}

export interface CSSPropertiesWithVars extends CSSProperties {
    '--dino-y'?: string;
    '--obstacle-x'?: string;
    width?: string;
    height?: string;
}
