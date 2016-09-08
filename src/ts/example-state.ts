export class ExampleState extends Phaser.State {
  preload() {
    this.game.load.image('logo', 'assets/phaser2.png');
  }

  create() {
    let logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
    logo.inputEnabled = true;
    logo.events.onInputOver.add(() => {
      this.game.add.tween(logo.scale).to({x: 1.2, y: 1.2}, 100, Phaser.Easing.Linear.None, true);
    });
    logo.events.onInputOut.add(() => {
      this.game.add.tween(logo.scale).to({x: 1, y: 1}, 100, Phaser.Easing.Linear.None, true);
    });
    logo.events.onInputDown.add(() => {
      this.game.add.tween(logo).to({angle: 360}, 500, Phaser.Easing.Cubic.Out, true);
    });
  }
}