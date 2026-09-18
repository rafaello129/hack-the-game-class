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
    clamp,
    distanceBetween,
    hasReachedTarget,
    loseLife,
    normalizeDirection,
    randomIntBetween
} from '../logic';

type MovementKeys = {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
};

type Enemy = {
    shape: GameObjects.Container;
    velocityX: number;
    velocityY: number;
};

type Positionable = {
    x: number;
    y: number;
};

const PLAYFIELD_TOP = 146;
const PLAYFIELD_BOTTOM = 736;

export class Game extends Scene
{
    private player!: GameObjects.Container;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd!: MovementKeys;

    private coins: GameObjects.Container[] = [];
    private enemies: Enemy[] = [];

    private score = 0;
    private lives = STARTING_LIVES;
    private gameEnded = false;
    private canTakeDamage = true;

    private scoreText!: GameObjects.Text;
    private livesText!: GameObjects.Text;
    private progressFill!: GameObjects.Rectangle;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.coins = [];
        this.enemies = [];
        this.score = 0;
        this.lives = STARTING_LIVES;
        this.gameEnded = false;
        this.canTakeDamage = true;

        this.createBackdrop();
        this.createHud();
        this.createPlayer();
        this.createControls();
        this.createCoins();
        this.createEnemies();

        this.cameras.main.fadeIn(180, 2, 6, 23);
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

    private createBackdrop ()
    {
        const background = this.add.image(512, 384, 'background');
        background.setTint(0x173b63);
        background.setAlpha(0.52);

        this.add.rectangle(512, 384, 1024, 768, 0x020617, 0.58);

        this.add.rectangle(
            512,
            441,
            960,
            590,
            COLORS.panel,
            0.68
        ).setStrokeStyle(1, COLORS.panelBorder, 0.8);

        this.add.text(512, 716, 'VERDE = TÚ   ·   AMARILLO = MONEDA   ·   ROSA = ENEMIGO', {
            fontFamily: 'Arial',
            fontSize: 12,
            color: '#64748b',
            letterSpacing: 1
        }).setOrigin(0.5);
    }

    private createHud ()
    {
        this.add.rectangle(512, 70, 960, 104, 0x07111f, 0.88)
            .setStrokeStyle(1, 0x334155, 0.8);

        this.add.text(48, 35, 'HACK THE GAME', {
            fontFamily: 'Arial Black',
            fontSize: 20,
            color: '#f8fafc'
        });

        this.scoreText = this.add.text(48, 72, '', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#cbd5e1'
        });

        this.add.text(512, 34, 'PROGRESO', {
            fontFamily: 'Arial Black',
            fontSize: 12,
            color: '#7dd3fc',
            letterSpacing: 1
        }).setOrigin(0.5);

        this.add.rectangle(512, 72, 324, 12, 0x0f172a, 1)
            .setStrokeStyle(1, 0x475569, 0.8);

        this.progressFill = this.add.rectangle(
            352,
            72,
            4,
            8,
            COLORS.accent,
            1
        ).setOrigin(0, 0.5);

        this.add.text(512, 96, `META  ${TARGET_SCORE} PUNTOS`, {
            fontFamily: 'Arial',
            fontSize: 13,
            color: '#94a3b8'
        }).setOrigin(0.5);

        this.livesText = this.add.text(976, 36, '', {
            fontFamily: 'Arial Black',
            fontSize: 18,
            color: '#f8fafc',
            align: 'right'
        }).setOrigin(1, 0);

        this.add.text(976, 76, 'WASD / FLECHAS', {
            fontFamily: 'Arial',
            fontSize: 13,
            color: '#94a3b8',
            align: 'right'
        }).setOrigin(1, 0);

        this.updateHud();
    }

    private createPlayer ()
    {
        const glow = this.add.circle(0, 0, PLAYER_SIZE * 0.78, COLORS.player, 0.16);
        const body = this.add.circle(0, 0, PLAYER_SIZE / 2, COLORS.player, 1)
            .setStrokeStyle(3, 0xffffff, 0.92);
        const core = this.add.circle(0, 0, 5, 0xffffff, 0.95);

        this.player = this.add.container(
            GAME_WIDTH / 2,
            GAME_HEIGHT / 2,
            [glow, body, core]
        );

        this.tweens.add({
            targets: glow,
            scaleX: 1.18,
            scaleY: 1.18,
            alpha: 0.06,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
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
            const outer = this.add.circle(0, 0, 13, COLORS.coin, 1)
                .setStrokeStyle(2, 0xffffff, 0.82);
            const core = this.add.circle(0, 0, 6, COLORS.coinCore, 1);
            const shine = this.add.circle(-4, -5, 2.5, 0xffffff, 0.85);

            const coin = this.add.container(0, 0, [outer, core, shine]);
            this.placeRandomly(coin, PLAYFIELD_TOP + 26);
            this.coins.push(coin);
        }
    }

    private createEnemies ()
    {
        for (let index = 0; index < ENEMY_COUNT; index += 1)
        {
            const glow = this.add.rectangle(0, 0, 40, 40, COLORS.enemy, 0.12);
            const body = this.add.rectangle(0, 0, 28, 28, COLORS.enemy, 1)
                .setStrokeStyle(2, 0xffffff, 0.78);
            const core = this.add.rectangle(0, 0, 8, 8, COLORS.enemyCore, 1);

            const enemy = this.add.container(0, 0, [glow, body, core]);
            enemy.setAngle(45);
            this.placeRandomly(enemy, PLAYFIELD_TOP + 40);

            const horizontalDirection = Math.random() > 0.5 ? 1 : -1;
            const verticalDirection = Math.random() > 0.5 ? 1 : -1;

            this.enemies.push({
                shape: enemy,
                velocityX: randomIntBetween(90, 155) * horizontalDirection,
                velocityY: randomIntBetween(70, 125) * verticalDirection
            });

            this.tweens.add({
                targets: enemy,
                angle: 405,
                duration: randomIntBetween(2800, 4200),
                repeat: -1
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
        const halfPlayer = PLAYER_SIZE / 2;

        this.player.x = clamp(
            this.player.x + direction.x * PLAYER_SPEED * seconds,
            42 + halfPlayer,
            GAME_WIDTH - 42 - halfPlayer
        );

        this.player.y = clamp(
            this.player.y + direction.y * PLAYER_SPEED * seconds,
            PLAYFIELD_TOP + halfPlayer,
            PLAYFIELD_BOTTOM - halfPlayer
        );
    }

    private moveEnemies (delta: number)
    {
        const seconds = delta / 1000;

        for (const enemy of this.enemies)
        {
            enemy.shape.x += enemy.velocityX * seconds;
            enemy.shape.y += enemy.velocityY * seconds;

            if (enemy.shape.x <= 50 || enemy.shape.x >= GAME_WIDTH - 50)
            {
                enemy.velocityX *= -1;
            }

            if (
                enemy.shape.y <= PLAYFIELD_TOP + 18 ||
                enemy.shape.y >= PLAYFIELD_BOTTOM - 18
            )
            {
                enemy.velocityY *= -1;
            }
        }
    }

    private checkCoinCollection ()
    {
        for (const coin of this.coins)
        {
            const distance = distanceBetween(
                this.player.x,
                this.player.y,
                coin.x,
                coin.y
            );

            if (distance < PLAYER_SIZE / 2 + 15)
            {
                const oldX = coin.x;
                const oldY = coin.y;

                this.score = addCoinPoints(this.score, COIN_POINTS);
                this.placeRandomly(coin, PLAYFIELD_TOP + 26);
                this.updateHud();
                this.showScorePopup(oldX, oldY);

                this.tweens.add({
                    targets: coin,
                    scaleX: 1.45,
                    scaleY: 1.45,
                    duration: 80,
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
            const distance = distanceBetween(
                this.player.x,
                this.player.y,
                enemy.shape.x,
                enemy.shape.y
            );

            if (distance < PLAYER_SIZE / 2 + 20)
            {
                this.lives = loseLife(this.lives);
                this.canTakeDamage = false;

                this.cameras.main.shake(110, 0.006);
                this.cameras.main.flash(100, 190, 18, 60, false);

                this.player.setAlpha(0.25);
                this.player.setPosition(GAME_WIDTH / 2, 430);
                this.updateHud();

                this.time.delayedCall(850, () =>
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

    private showScorePopup (x: number, y: number)
    {
        const popup = this.add.text(x, y - 18, `+${COIN_POINTS}`, {
            fontFamily: 'Arial Black',
            fontSize: 16,
            color: '#fde047',
            stroke: '#07111f',
            strokeThickness: 3
        }).setOrigin(0.5);

        this.tweens.add({
            targets: popup,
            y: popup.y - 34,
            alpha: 0,
            duration: 480,
            onComplete: () => popup.destroy()
        });
    }

    private finishGame (won: boolean)
    {
        if (this.gameEnded)
        {
            return;
        }

        this.gameEnded = true;
        this.cameras.main.fadeOut(220, 2, 6, 23);

        this.time.delayedCall(230, () =>
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
        this.scoreText.setText(`PUNTOS  ${this.score}`);

        const hearts = '♥'.repeat(Math.max(this.lives, 0));
        this.livesText.setText(`VIDAS  ${hearts || '—'}`);

        const progress = Math.min(1, this.score / TARGET_SCORE);
        this.progressFill.displayWidth = Math.max(4, 320 * progress);
    }

    private placeRandomly (object: Positionable, topMargin: number)
    {
        object.x = randomIntBetween(62, GAME_WIDTH - 62);
        object.y = randomIntBetween(topMargin, PLAYFIELD_BOTTOM - 34);
    }
}
