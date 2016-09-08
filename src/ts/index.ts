import {ExampleState} from './example-state';

class SimpleGame {

  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', this);
  }

  game: Phaser.Game;

  preload() {
    this.game.state.add('example', ExampleState);
  }

  create() {
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.refresh();
    this.game.state.start('example');
  }
}
let game = new SimpleGame();