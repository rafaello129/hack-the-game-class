import Phaser from 'phaser';
import './style.css';
import { GameScene } from './game/scenes/GameScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  parent: 'game-container',
  backgroundColor: '#101827',
  scene: [GameScene]
};

new Phaser.Game(config);
