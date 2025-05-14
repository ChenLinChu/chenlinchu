'use client';

import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { DinoGame } from './dinoGame';
import styles from './index.module.scss';
import type { CSSPropertiesWithVars, GameState, Obstacle } from './type';

export default function DinoGameComponent(): React.ReactNode {
    const containerRef = useRef<HTMLDivElement>(null);
    const gameRef = useRef<DinoGame | null>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const t = useTranslations('main.page.block.dinoGame');
    const initializeGame = useCallback(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const game = new DinoGame(
            container.clientWidth || 600,
            container.clientHeight || 200
        );
        gameRef.current = game;
        setGameState(game.getState());
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        initializeGame();

        const handleResize = (): void => {
            if (containerRef.current && gameRef.current) {
                gameRef.current = new DinoGame(
                    containerRef.current.clientWidth || 600,
                    containerRef.current.clientHeight || 200
                );
                setGameState(gameRef.current.getState());
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [initializeGame]);

    const gameLoop = useCallback((currentTime: number): void => {
        if (!gameRef.current) return;

        const newState = gameRef.current.update(currentTime);
        setGameState(newState);

        if (newState.isPlaying) {
            animationFrameRef.current = requestAnimationFrame(gameLoop);
        }
    }, []);

    const handleStart = useCallback((): void => {
        if (!gameRef.current) return;

        // 停止現有的遊戲循環
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        // 開始新遊戲
        const newState = gameRef.current.start();
        setGameState(newState);

        // 確保狀態更新後再啟動遊戲循環
        requestAnimationFrame((time) => {
            gameLoop(time);
        });
    }, [gameLoop]);

    const handleJump = useCallback((): void => {
        if (!gameRef.current || !gameState?.isPlaying) return;
        gameRef.current.jump();
    }, [gameState]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            if (e.code === 'Space') {
                e.preventDefault();
                handleJump();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleJump]);

    if (!isInitialized) {
        return (
            <div
                ref={containerRef}
                className={styles.gameContainer}
                style={{ width: '100%', height: '100%' }}
            >
                <div>Loading...</div>
            </div>
        );
    }

    const isGameOver = gameState?.score && gameState.score > 0;
    const gameOverClass = `${styles.gameOver}
    ${(!gameState?.isPlaying || !gameState) ? styles.visible : ''}`;

    return (
        <div
            ref={containerRef}
            className={styles.gameContainer}
            onClick={handleJump}
            onKeyDown={(e) => e.code === 'Space' && handleJump()}
            role="button"
            tabIndex={0}
            style={{
                '--dino-y': `${gameState?.dinoY ?? 0}px`,
                width: '100%',
                height: '100%'
            } as CSSPropertiesWithVars}
        >
            <div className={styles.dino} />
            <div className={styles.ground} />
            {gameState?.obstacles.map((obstacle: Obstacle, index: number) => (
                <div
                    key={index}
                    className={styles.obstacle}
                    style={{
                        '--obstacle-x': `${obstacle.x}px`
                    } as CSSPropertiesWithVars
                    }
                />
            ))}
            <div className={styles.score}>
                {isGameOver
                    ? `${t('score')}: ${Math.floor(gameState?.score ?? 0)}`
                    : ''}
                <br />
                {isGameOver
                    ? `${t('highScore')}: ${gameState?.highScore ?? 0}`
                    : ''}
            </div>
            <div className={gameOverClass}>
                {isGameOver
                    ? `${t('gameOver')} - ${t('score')}: ${Math.floor(gameState.score)}`
                    : ''}

                <button
                    className={styles.startButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleStart();
                    }}
                >
                    {isGameOver ? t('restart') : t('start')}
                </button>
            </div>
        </div>
    );
}
