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
    private leaving = false;

    constructor ()
    {
        super('GameOver');
    }

    init (data: ResultData)
    {
        this.result = data;
        this.leaving = false;
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');
        this.background.setTint(0x173b63);
        this.background.setAlpha(0.72);

        this.add.rectangle(512, 384, 1024, 768, 0x020617, 0.6);

        const won = this.result.won === true;
        const title = won ? 'MISIÓN COMPLETADA' : 'FIN DE LA PARTIDA';
        const accent = won ? '#4ade80' : '#fb7185';

        this.add.text(512, 112, 'RESULTADO', {
            fontFamily: 'Arial',
            fontSize: 14,
            color: '#7dd3fc',
            letterSpacing: 3
        }).setOrigin(0.5);

        this.add.text(512, 190, title, {
            fontFamily: 'Arial Black',
            fontSize: 48,
            color: '#f8fafc',
            stroke: '#07111f',
            strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5);

        this.add.rectangle(512, 390, 600, 270, 0x07111f, 0.86)
            .setStrokeStyle(1, 0x475569, 0.8);

        this.add.text(512, 318, won ? 'OBJETIVO ALCANZADO' : 'INTÉNTALO DE NUEVO', {
            fontFamily: 'Arial Black',
            fontSize: 15,
            color: accent,
            letterSpacing: 1
        }).setOrigin(0.5);

        this.add.text(512, 382, `${this.result.score ?? 0}`, {
            fontFamily: 'Arial Black',
            fontSize: 58,
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(512, 430, 'PUNTOS', {
            fontFamily: 'Arial',
            fontSize: 14,
            color: '#94a3b8',
            letterSpacing: 2
        }).setOrigin(0.5);

        this.add.text(512, 488, won
            ? 'Ya conoces el resultado. Ahora abre el código y cambia las reglas.'
            : 'El error también enseña: identifica qué valor cambiarías primero.', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#cbd5e1',
            align: 'center',
            wordWrap: { width: 500 }
        }).setOrigin(0.5);

        const button = this.add.rectangle(512, 622, 330, 68, 0x028af8, 0.88)
            .setStrokeStyle(2, 0x7dd3fc, 0.9);

        this.add.text(512, 613, 'VOLVER AL MENÚ', {
            fontFamily: 'Arial Black',
            fontSize: 20,
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(512, 642, 'CLICK  ·  ESPACIO  ·  ENTER', {
            fontFamily: 'Arial',
            fontSize: 11,
            color: '#dbeafe',
            letterSpacing: 1
        }).setOrigin(0.5);

        this.tweens.add({
            targets: button,
            scaleX: 1.025,
            scaleY: 1.025,
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        const leave = () =>
        {
            if (this.leaving)
            {
                return;
            }

            this.leaving = true;
            this.cameras.main.fadeOut(180, 2, 6, 23);

            this.time.delayedCall(190, () =>
            {
                this.scene.start('MainMenu');
            });
        };

        this.input.once('pointerdown', leave);

        const keyboard = this.input.keyboard;

        if (keyboard)
        {
            keyboard.once('keydown-SPACE', leave);
            keyboard.once('keydown-ENTER', leave);
        }

        this.cameras.main.fadeIn(180, 2, 6, 23);
    }
}
