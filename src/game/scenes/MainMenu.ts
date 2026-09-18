import { GameObjects, Input, Scene } from 'phaser';

export class MainMenu extends Scene
{
    private background!: GameObjects.Image;
    private logo!: GameObjects.Image;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.82);

        this.logo = this.add.image(512, 220, 'logo');
        this.logo.setScale(0.9);

        this.add.text(512, 390, 'HACK THE GAME', {
            fontFamily: 'Arial Black',
            fontSize: 58,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 9,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 458, 'Programación · Videojuegos · Ciberseguridad', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#dbeafe',
            stroke: '#000000',
            strokeThickness: 5,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 555, 'Recoge monedas · Evita enemigos · Llega a la meta', {
            fontFamily: 'Arial',
            fontSize: 21,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        const startText = this.add.text(512, 640, 'CLICK o ESPACIO para comenzar', {
            fontFamily: 'Arial Black',
            fontSize: 25,
            color: '#facc15',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: startText,
            alpha: 0.45,
            duration: 700,
            yoyo: true,
            repeat: -1
        });

        this.input.once('pointerdown', () =>
        {
            this.scene.start('Game');
        });

        const keyboard = this.input.keyboard;

        if (keyboard)
        {
            keyboard.once(Input.Keyboard.Events.ANY_KEY_DOWN, (event: KeyboardEvent) =>
            {
                if (event.code === 'Space' || event.code === 'Enter')
                {
                    this.scene.start('Game');
                }
            });
        }
    }
}
