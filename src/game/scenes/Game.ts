import { GameObjects, Scene } from 'phaser';
import {
    COIN_COUNT,
    COIN_POINTS,
    COLORS,
    ENEMY_COUNT,
    GAME_HEIGHT,
    GAME_WIDTH,
    PLAYER_SIZE,
    PLAYER_SPEED,
    STARTING_LIVES,
    TARGET_SCORE
} from '../config';
import {
    addCoinPoints,
    hasReachedTarget,
    loseLife,
    normalizeDirection
} from '../logic';

type MovementKeys = {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
};

type Enemy = {
    shape: GameObjects.Rectangle;
    velocityX: number;
    velocityY: number;
};

type Positionable = {
    x: number;
    y: number;
};

export class Game extends Scene
{
    private player!: GameObjects.Rectangle;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd!: MovementKeys;

    private coins: GameObjects.Arc[] = [];
    private enemies: Enemy[] = [];

    private score = 0;
    private lives = STARTING_LIVES;
    private gameEnded = false;
    private canTakeDamage = true;

    private scoreText!: GameObjects.Text;
    private livesText!: GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.coins = [];
        this.enemies = [];
        // Estado de la partida local. No se recupera desde datos manipulables
        // del navegador como si fueran una fuente autoritativa.
        this.score = 0;
        this.lives = STARTING_LIVES;
        this.gameEnded = false;
        this.canTakeDamage = true;

        const background = this.add.image(512, 384, 'background');
        background.setAlpha(0.32);

        this.add.rectangle(512, 66, 968, 96, 0x020617, 0.72)
            .setStrokeStyle(1, 0xffffff, 0.18);

        this.createHud();
        this.createPlayer();
        this.createControls();
        this.createCoins();
        this.createEnemies();
    }

    update (_time: number, delta: number)
    {
        if (this.gameEnded)
        {
            return;
        }

        this.movePlayer(delta);
        this.moveEnemies(delta);
        this.checkCoinCollection();
        this.checkEnemyCollisions();
    }

    private createHud ()
    {
        this.add.text(42, 28, 'HACK THE GAME · SEGURO', {
            fontFamily: 'Arial Black',
            fontSize: 22,
            color: COLORS.hud,
            stroke: '#000000',
            strokeThickness: 5
        });

        this.scoreText = this.add.text(42, 62, '', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: COLORS.hud,
            stroke: '#000000',
            strokeThickness: 4
        });

        this.livesText = this.add.text(982, 31, '', {
            fontFamily: 'Arial Black',
            fontSize: 20,
            color: COLORS.hud,
            stroke: '#000000',
            strokeThickness: 5,
            align: 'right'
        }).setOrigin(1, 0);

        this.add.text(982, 68, 'WASD / FLECHAS', {
            fontFamily: 'Arial',
            fontSize: 17,
            color: COLORS.muted,
            stroke: '#000000',
            strokeThickness: 4,
            align: 'right'
        }).setOrigin(1, 0);

        this.updateHud();
    }

    private createPlayer ()
    {
        this.player = this.add.rectangle(
            GAME_WIDTH / 2,
            GAME_HEIGHT / 2,
            PLAYER_SIZE,
            PLAYER_SIZE,
            COLORS.player
        );

        this.player.setStrokeStyle(3, 0xffffff, 0.85);
    }

    private createControls ()
    {
        const keyboard = this.input.keyboard;

        if (!keyboard)
        {
            throw new Error('No se pudo inicializar el teclado.');
        }

        this.cursors = keyboard.createCursorKeys();
        this.wasd = keyboard.addKeys('W,A,S,D') as MovementKeys;
    }

    private createCoins ()
    {
        for (let index = 0; index < COIN_COUNT; index += 1)
        {
            const coin = this.add.circle(0, 0, 12, COLORS.coin);
            coin.setStrokeStyle(3, 0xffffff, 0.8);
            this.placeRandomly(coin, 145);
            this.coins.push(coin);
        }
    }

    private createEnemies ()
    {
        for (let index = 0; index < ENEMY_COUNT; index += 1)
        {
            const enemy = this.add.rectangle(0, 0, 32, 32, COLORS.enemy);
            enemy.setStrokeStyle(2, 0xffffff, 0.75);
            this.placeRandomly(enemy, 165);

            const horizontalDirection = Math.random() > 0.5 ? 1 : -1;
            const verticalDirection = Math.random() > 0.5 ? 1 : -1;

            this.enemies.push({
                shape: enemy,
                velocityX: Phaser.Math.Between(90, 155) * horizontalDirection,
                velocityY: Phaser.Math.Between(70, 125) * verticalDirection
            });
        }
    }

    private movePlayer (delta: number)
    {
        let directionX = 0;
        let directionY = 0;

        if (this.cursors.left.isDown || this.wasd.A.isDown)
        {
            directionX -= 1;
        }

        if (this.cursors.right.isDown || this.wasd.D.isDown)
        {
            directionX += 1;
        }

        if (this.cursors.up.isDown || this.wasd.W.isDown)
        {
            directionY -= 1;
        }

        if (this.cursors.down.isDown || this.wasd.S.isDown)
        {
            directionY += 1;
        }

        const direction = normalizeDirection(directionX, directionY);
        const seconds = delta / 1000;

        this.player.x += direction.x * PLAYER_SPEED * seconds;
        this.player.y += direction.y * PLAYER_SPEED * seconds;

        const halfPlayer = PLAYER_SIZE / 2;

        this.player.x = Phaser.Math.Clamp(
            this.player.x,
            halfPlayer,
            GAME_WIDTH - halfPlayer
        );

        this.player.y = Phaser.Math.Clamp(
            this.player.y,
            132 + halfPlayer,
            GAME_HEIGHT - halfPlayer
        );
    }

    private moveEnemies (delta: number)
    {
        const seconds = delta / 1000;

        for (const enemy of this.enemies)
        {
            enemy.shape.x += enemy.velocityX * seconds;
            enemy.shape.y += enemy.velocityY * seconds;

            if (enemy.shape.x <= 16 || enemy.shape.x >= GAME_WIDTH - 16)
            {
                enemy.velocityX *= -1;
            }

            if (enemy.shape.y <= 148 || enemy.shape.y >= GAME_HEIGHT - 16)
            {
                enemy.velocityY *= -1;
            }
        }
    }

    private checkCoinCollection ()
    {
        for (const coin of this.coins)
        {
            const distance = Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                coin.x,
                coin.y
            );

            if (distance < PLAYER_SIZE / 2 + 14)
            {
                this.score = addCoinPoints(this.score, COIN_POINTS);
                this.placeRandomly(coin, 145);
                this.updateHud();

                this.tweens.add({
                    targets: coin,
                    scale: 1.45,
                    duration: 90,
                    yoyo: true
                });

                if (hasReachedTarget(this.score, TARGET_SCORE))
                {
                    this.finishGame(true);
                }
            }
        }
    }

    private checkEnemyCollisions ()
    {
        if (!this.canTakeDamage)
        {
            return;
        }

        for (const enemy of this.enemies)
        {
            const distance = Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                enemy.shape.x,
                enemy.shape.y
            );

            if (distance < PLAYER_SIZE / 2 + 18)
            {
                this.lives = loseLife(this.lives);
                this.canTakeDamage = false;

                this.player.setAlpha(0.3);
                this.player.setPosition(GAME_WIDTH / 2, GAME_HEIGHT / 2);
                this.updateHud();

                this.time.delayedCall(900, () =>
                {
                    this.canTakeDamage = true;
                    this.player.setAlpha(1);
                });

                if (this.lives <= 0)
                {
                    this.finishGame(false);
                }

                break;
            }
        }
    }

    private finishGame (won: boolean)
    {
        this.gameEnded = true;

        this.time.delayedCall(180, () =>
        {
            this.scene.start('GameOver', {
                won,
                score: this.score,
                lives: this.lives
            });
        });
    }

    private updateHud ()
    {
        this.scoreText.setText(`PUNTOS  ${this.score} / ${TARGET_SCORE}`);
        this.livesText.setText(`VIDAS  ${'♥'.repeat(Math.max(this.lives, 0))}`);
    }

    private placeRandomly (object: Positionable, topMargin: number)
    {
        object.x = Phaser.Math.Between(48, GAME_WIDTH - 48);
        object.y = Phaser.Math.Between(topMargin, GAME_HEIGHT - 48);
    }
}
