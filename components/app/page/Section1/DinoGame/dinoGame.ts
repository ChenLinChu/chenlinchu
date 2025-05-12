import type { GameState, Obstacle } from './type';

const GRAVITY = 0.95;
const JUMP_FORCE = -13;
const INITIAL_GAME_SPEED = 5;
const OBSTACLE_MIN_DISTANCE = 300;
const OBSTACLE_MAX_DISTANCE = 500;
const SCORE_INCREMENT = 0.2; // 每幀增加的分數

export class DinoGame {
    private state: GameState;
    private lastTime = 0;
    private containerWidth: number;
    private containerHeight: number;

    constructor(containerWidth: number, containerHeight: number) {
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
        this.state = {
            isPlaying: false,
            score: 0,
            highScore: 0,
            dinoY: 0,
            dinoVelocity: 0,
            obstacles: [],
            gameSpeed: INITIAL_GAME_SPEED
        };
    }

    public start(): GameState {
        this.state = {
            isPlaying: true,
            score: 0,
            highScore: this.state.highScore,
            dinoY: 0,
            dinoVelocity: 0,
            obstacles: [],
            gameSpeed: INITIAL_GAME_SPEED
        };
        this.lastTime = performance.now();
        return { ...this.state };
    }

    public jump(): void {
        if (!this.state.isPlaying) return;
        if (this.state.dinoY === 0) {
            this.state.dinoVelocity = JUMP_FORCE;
        }
    }

    public update(currentTime: number): GameState {
        if (!this.state.isPlaying) {
            return { ...this.state };
        }

        const deltaTime = Math.min(currentTime - this.lastTime, 32);
        this.lastTime = currentTime;

        // 更新恐龍位置
        this.state.dinoY += this.state.dinoVelocity;
        this.state.dinoVelocity += GRAVITY;

        // 確保恐龍不會掉到地面以下
        if (this.state.dinoY > 0) {
            this.state.dinoY = 0;
            this.state.dinoVelocity = 0;
        }

        // 更新障礙物
        this.updateObstacles(deltaTime);

        // 檢查碰撞
        if (this.checkCollision()) {
            this.state.isPlaying = false;
            if (this.state.score > this.state.highScore) {
                this.state.highScore = Math.floor(this.state.score);
            }
        }

        // 更新分數
        this.state.score += SCORE_INCREMENT;

        // 增加遊戲速度
        const speedIncrease = Math.floor(this.state.score / 100);
        this.state.gameSpeed = INITIAL_GAME_SPEED + speedIncrease;

        return { ...this.state };
    }

    private updateObstacles(deltaTime: number): void {
        // 移動現有障礙物
        this.state.obstacles = this.state.obstacles
            .map((obstacle: Obstacle) => ({
                ...obstacle,
                x: obstacle.x - (this.state.gameSpeed * deltaTime) / 16
            }))
            .filter((obstacle: Obstacle) => obstacle.x > -obstacle.width);

        // 生成新障礙物
        const lastObstacle = this.state.obstacles[
            this.state.obstacles.length - 1
        ];
        const minDistance = OBSTACLE_MIN_DISTANCE;
        const maxDistance = OBSTACLE_MAX_DISTANCE;
        const randomDistance = Math.random() * (maxDistance - minDistance);
        const shouldAddObstacle =
            !lastObstacle ||
            this.containerWidth - (lastObstacle.x + lastObstacle.width) >
            minDistance + randomDistance;

        if (shouldAddObstacle) {
            this.state.obstacles.push({
                x: this.containerWidth,
                width: 20,
                height: 40
            });
        }
    }

    private checkCollision(): boolean {
        const dinoHeight = 40;
        const dinoWidth = 40;

        return this.state.obstacles.some(
            obstacle =>
                obstacle.x < dinoWidth &&
                obstacle.x + obstacle.width > 0 &&
                this.state.dinoY < obstacle.height &&
                this.state.dinoY + dinoHeight > 0
        );
    }

    public getState(): GameState {
        return { ...this.state };
    }
}
