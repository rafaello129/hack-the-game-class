import { GameObjects, Scene } from 'phaser';

export class MainMenu extends Scene
{
    private background!: GameObjects.Image;
    private logo!: GameObjects.Image;
    private starting = false;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.starting = false;

        this.background = this.add.image(512, 384, 'background');
        this.background.setTint(0x173b63);
        this.background.setAlpha(0.78);

        this.add.rectangle(512, 384, 1024, 768, 0x020617, 0.52);

        // Línea superior: da contexto sin competir con el título.
        this.add.text(512, 48, 'PHASER CLASSROOM  //  INTERACTIVE LAB', {
            fontFamily: 'Arial',
            fontSize: 14,
            color: '#7dd3fc',
            letterSpacing: 3
        }).setOrigin(0.5);

        this.logo = this.add.image(512, 142, 'logo');
        this.logo.setScale(0.58);
        this.logo.setAlpha(0.96);

        this.add.text(512, 262, 'HACK THE GAME', {
            fontFamily: 'Arial Black',
            fontSize: 54,
            color: '#f8fafc',
            stroke: '#07111f',
            strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 320, 'Aprende modificando un juego real', {
            fontFamily: 'Arial',
            fontSize: 22,
            color: '#cbd5e1',
            align: 'center'
        }).setOrigin(0.5);

        this.createInfoCard(278, 'MUEVE', 'WASD / Flechas', '#4ade80');
        this.createInfoCard(512, 'RECOGE', '+10 por moneda', '#facc15');
        this.createInfoCard(746, 'SOBREVIVE', '3 vidas', '#fb7185');

        const startButton = this.add.rectangle(
            512,
            596,
            370,
            72,
            0x028af8,
            0.88
        ).setStrokeStyle(2, 0x7dd3fc, 0.9);

        this.add.text(512, 586, 'JUGAR AHORA', {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 616, 'CLICK  ·  ESPACIO  ·  ENTER', {
            fontFamily: 'Arial',
            fontSize: 12,
            color: '#dbeafe',
            letterSpacing: 1
        }).setOrigin(0.5);

        this.tweens.add({
            targets: startButton,
            scaleX: 1.025,
            scaleY: 1.025,
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.add.text(512, 704, 'Después de jugar: abre  src/game/config.ts  y cambia las reglas.', {
            fontFamily: 'Arial',
            fontSize: 15,
            color: '#94a3b8',
            align: 'center'
        }).setOrigin(0.5);

        const startGame = () =>
        {
            if (this.starting)
            {
                return;
            }

            this.starting = true;
            this.cameras.main.fadeOut(180, 2, 6, 23);

            this.time.delayedCall(190, () =>
            {
                this.scene.start('Game');
            });
        };

        this.input.once('pointerdown', startGame);

        const keyboard = this.input.keyboard;

        if (keyboard)
        {
            keyboard.once('keydown-SPACE', startGame);
            keyboard.once('keydown-ENTER', startGame);
        }
    }

    private createInfoCard (
        x: number,
        title: string,
        detail: string,
        accent: string
    )
    {
        this.add.rectangle(x, 444, 210, 104, 0x07111f, 0.82)
            .setStrokeStyle(1, 0x475569, 0.7);

        this.add.text(x, 421, title, {
            fontFamily: 'Arial Black',
            fontSize: 14,
            color: accent,
            letterSpacing: 1
        }).setOrigin(0.5);

        this.add.text(x, 458, detail, {
            fontFamily: 'Arial',
            fontSize: 17,
            color: '#f8fafc'
        }).setOrigin(0.5);
    }
}
