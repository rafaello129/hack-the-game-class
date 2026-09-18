import * as Phaser from 'phaser';
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
  isClientSideAdmin,
  loadClientProgress,
  saveClientProgress
} from '../../security/vulnerableClient';

type MovementKeys = {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
};

type Enemy = {
  shape: Phaser.GameObjects.Rectangle;
  velocityX: number;
  velocityY: number;
};

type Positionable = {
  x: number;
  y: number;
};

export class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: MovementKeys;

  private coins: Phaser.GameObjects.Arc[] = [];
  private enemies: Enemy[] = [];

  private score = 0;
  private lives = STARTING_LIVES;
  private gameEnded = false;
  private canTakeDamage = true;

  private scoreText!: Phaser.GameObjects.Text;
  private livesText!: Phaser.GameObjects.Text;
  private messageText!: Phaser.GameObjects.Text;

  constructor() {
    super('GameScene');
  }

  create(): void {
    this.coins = [];
    this.enemies = [];
    this.gameEnded = false;
    this.canTakeDamage = true;

    // ⚠️ INTENCIONALMENTE VULNERABLE:
    // confiamos en datos que vienen de localStorage.
    const clientProgress = loadClientProgress();
    this.score = clientProgress.score;
    this.lives = clientProgress.lives;

    this.cameras.main.setBackgroundColor(COLORS.background);

    this.createHud();
    this.createPlayer();
    this.createControls();
    this.createCoins();
    this.createEnemies();

    this.messageText = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2, '', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '34px',
        color: COLORS.text,
        align: 'center',
        backgroundColor: '#0f172acc',
        padding: { x: 24, y: 18 }
      })
      .setOrigin(0.5)
      .setDepth(10)
      .setVisible(false);

    if (isClientSideAdmin()) {
      this.add
        .text(GAME_WIDTH / 2, 24, '⚠ MODO ADMIN DEL CLIENTE ACTIVADO', {
          fontFamily: 'Arial, sans-serif',
          fontSize: '15px',
          color: '#fca5a5',
          backgroundColor: '#450a0acc',
          padding: { x: 12, y: 7 }
        })
        .setOrigin(0.5, 0);
    }

    this.updateHud();
  }

  update(_time: number, delta: number): void {
    if (this.gameEnded) {
      return;
    }

    this.movePlayer(delta);
    this.moveEnemies(delta);
    this.checkCoinCollection();
    this.checkEnemyCollisions();
  }

  private createHud(): void {
    this.add.text(24, 18, 'HACK THE GAME — VULNERABLE', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      color: COLORS.text,
      fontStyle: 'bold'
    });

    this.scoreText = this.add.text(24, 52, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: COLORS.text
    });

    this.livesText = this.add.text(24, 80, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: COLORS.text
    });

    this.add
      .text(GAME_WIDTH - 24, 22, 'WASD / FLECHAS', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '15px',
        color: COLORS.mutedText
      })
      .setOrigin(1, 0);
  }

  private createPlayer(): void {
    this.player = this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      PLAYER_SIZE,
      PLAYER_SIZE,
      COLORS.player
    );
  }

  private createControls(): void {
    const keyboard = this.input.keyboard;

    if (!keyboard) {
      throw new Error('No se pudo inicializar el teclado.');
    }

    this.cursors = keyboard.createCursorKeys();
    this.wasd = keyboard.addKeys('W,A,S,D') as MovementKeys;
  }

  private createCoins(): void {
    for (let index = 0; index < COIN_COUNT; index += 1) {
      const coin = this.add.circle(0, 0, 10, COLORS.coin);
      this.placeRandomly(coin, 70);
      this.coins.push(coin);
    }
  }

  private createEnemies(): void {
    for (let index = 0; index < ENEMY_COUNT; index += 1) {
      const enemy = this.add.rectangle(0, 0, 30, 30, COLORS.enemy);
      this.placeRandomly(enemy, 90);

      const horizontalDirection = Math.random() > 0.5 ? 1 : -1;
      const verticalDirection = Math.random() > 0.5 ? 1 : -1;

      this.enemies.push({
        shape: enemy,
        velocityX: Phaser.Math.Between(85, 145) * horizontalDirection,
        velocityY: Phaser.Math.Between(65, 115) * verticalDirection
      });
    }
  }

  private movePlayer(delta: number): void {
    let directionX = 0;
    let directionY = 0;

    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      directionX -= 1;
    }

    if (this.cursors.right.isDown || this.wasd.D.isDown) {
      directionX += 1;
    }

    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      directionY -= 1;
    }

    if (this.cursors.down.isDown || this.wasd.S.isDown) {
      directionY += 1;
    }

    if (directionX !== 0 && directionY !== 0) {
      const diagonalCorrection = Math.SQRT1_2;
      directionX *= diagonalCorrection;
      directionY *= diagonalCorrection;
    }

    const seconds = delta / 1000;

    this.player.x += directionX * PLAYER_SPEED * seconds;
    this.player.y += directionY * PLAYER_SPEED * seconds;

    const halfPlayer = PLAYER_SIZE / 2;

    this.player.x = Phaser.Math.Clamp(
      this.player.x,
      halfPlayer,
      GAME_WIDTH - halfPlayer
    );
    this.player.y = Phaser.Math.Clamp(
      this.player.y,
      halfPlayer,
      GAME_HEIGHT - halfPlayer
    );
  }

  private moveEnemies(delta: number): void {
    const seconds = delta / 1000;

    for (const enemy of this.enemies) {
      enemy.shape.x += enemy.velocityX * seconds;
      enemy.shape.y += enemy.velocityY * seconds;

      if (enemy.shape.x <= 15 || enemy.shape.x >= GAME_WIDTH - 15) {
        enemy.velocityX *= -1;
      }

      if (enemy.shape.y <= 115 || enemy.shape.y >= GAME_HEIGHT - 15) {
        enemy.velocityY *= -1;
      }
    }
  }

  private checkCoinCollection(): void {
    for (const coin of this.coins) {
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        coin.x,
        coin.y
      );

      if (distance < PLAYER_SIZE / 2 + 12) {
        this.score += COIN_POINTS;
        this.placeRandomly(coin, 70);

        // ⚠️ El navegador puede modificar este valor por su cuenta.
        saveClientProgress(this.score, this.lives);
        this.updateHud();

        if (this.score >= TARGET_SCORE) {
          this.finishGame('¡GANASTE! 🎉\nPresiona R para reiniciar');
        }
      }
    }
  }

  private checkEnemyCollisions(): void {
    if (!this.canTakeDamage) {
      return;
    }

    for (const enemy of this.enemies) {
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        enemy.shape.x,
        enemy.shape.y
      );

      if (distance < PLAYER_SIZE / 2 + 18) {
        this.lives -= 1;
        this.canTakeDamage = false;
        this.player.setAlpha(0.35);
        this.player.setPosition(GAME_WIDTH / 2, GAME_HEIGHT / 2);

        // ⚠️ También persistimos vidas como dato "confiable" del cliente.
        saveClientProgress(this.score, this.lives);
        this.updateHud();

        this.time.delayedCall(900, () => {
          this.canTakeDamage = true;
          this.player.setAlpha(1);
        });

        if (this.lives <= 0) {
          this.finishGame('GAME OVER\nPresiona R para reiniciar');
        }

        break;
      }
    }
  }

  private finishGame(message: string): void {
    this.gameEnded = true;
    this.messageText.setText(message).setVisible(true);

    const keyboard = this.input.keyboard;

    if (keyboard) {
      keyboard.once('keydown-R', () => {
        this.scene.restart();
      });
    }
  }

  private updateHud(): void {
    this.scoreText.setText(`Puntos: ${this.score} / ${TARGET_SCORE}`);
    this.livesText.setText(`Vidas: ${'♥'.repeat(Math.max(this.lives, 0))}`);
  }

  private placeRandomly(object: Positionable, topMargin: number): void {
    object.x = Phaser.Math.Between(40, GAME_WIDTH - 40);
    object.y = Phaser.Math.Between(topMargin, GAME_HEIGHT - 40);
  }
}
