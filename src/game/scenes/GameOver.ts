import { GameObjects, Scene } from 'phaser';

type ResultData = {
    won?: boolean;
    score?: number;
    lives?: number;
};

export class GameOver extends Scene
{
    private result: ResultData = {};
    private background!: GameObjects.Image;

    constructor ()
    {
        super('GameOver');
    }

    init (data: ResultData)
    {
        this.result = data;
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.68);

        const won = this.result.won === true;
        const title = won ? '¡MISIÓN COMPLETADA!' : 'GAME OVER';
        const titleColor = won ? '#4ade80' : '#fb7185';

        this.add.text(512, 235, title, {
            fontFamily: 'Arial Black',
            fontSize: 58,
            color: titleColor,
            stroke: '#000000',
            strokeThickness: 9,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 348, `Puntuación: ${this.result.score ?? 0}`, {
            fontFamily: 'Arial Black',
            fontSize: 30,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(512, 405, won
            ? 'Ya viste el juego. Ahora toca abrir el código.'
            : 'Perder también sirve: ahora sabemos qué regla modificar.', {
            fontFamily: 'Arial',
            fontSize: 22,
            color: '#dbeafe',
            stroke: '#000000',
            strokeThickness: 5,
            align: 'center'
        }).setOrigin(0.5);

        const continueText = this.add.text(512, 560, 'CLICK para volver al menú', {
            fontFamily: 'Arial Black',
            fontSize: 25,
            color: '#facc15',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.tweens.add({
            targets: continueText,
            alpha: 0.45,
            duration: 700,
            yoyo: true,
            repeat: -1
        });

        this.input.once('pointerdown', () =>
        {
            this.scene.start('MainMenu');
        });
    }
}
