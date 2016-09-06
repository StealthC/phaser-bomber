export class ExampleState extends Phaser.State {
  preload() {
    this.game.load.image('logo', 'assets/phaser2.png');
  }
  
  create() {
    let logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
  }
}