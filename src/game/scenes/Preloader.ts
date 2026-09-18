import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        const background = this.add.image(512, 384, 'background');
        background.setTint(0x1e3a5f);
        background.setAlpha(0.72);

        this.add.rectangle(512, 384, 1024, 768, 0x020617, 0.42);

        this.add.text(512, 308, 'PREPARANDO LABORATORIO', {
            fontFamily: 'Arial Black',
            fontSize: 22,
            color: '#f8fafc',
            letterSpacing: 2
        }).setOrigin(0.5);

        this.add.text(512, 346, 'Cargando recursos del juego…', {
            fontFamily: 'Arial',
            fontSize: 17,
            color: '#94a3b8'
        }).setOrigin(0.5);

        this.add.rectangle(512, 404, 430, 14, 0x0f172a, 0.92)
            .setStrokeStyle(1, 0x64748b, 0.55);

        const bar = this.add.rectangle(299, 404, 4, 10, 0x38bdf8)
            .setOrigin(0, 0.5);

        this.load.on('progress', (progress: number) =>
        {
            bar.width = Math.max(4, 426 * progress);
        });
    }

    preload ()
    {
        this.load.setPath('assets');
        this.load.image('logo', 'logo.png');
    }

    create ()
    {
        this.scene.start('MainMenu');
    }
}
