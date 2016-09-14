import {GameState} from './game-state';

export class Bomb extends Phaser.Sprite {
  mapPosition: Phaser.Point = new Phaser.Point();
  exploded: boolean = false;
  power: number = 1;
  timeEvent: Phaser.TimerEvent;

  constructor(private gamestate: GameState, x: number, y: number, parent?: Phaser.Group) {
    super(gamestate.game, x * 48, y * 48, 'tiles', 10);
    if (parent) {
      parent.add(this);
    }
    this.power = this.gamestate.explosionPower;
    this.game.physics.arcade.enableBody(this);
    (<Phaser.Physics.Arcade.Body>this.body).immovable = true;
    this.mapPosition.set(x, y);
    this.arm();
  }

  arm() {
    this.timeEvent = this.game.time.events.add(this.gamestate.armTime, () => {
      this.explode();
    }, this);
  }

  explode(byExplosion?: string) {
    this.exploded = true;
    if (byExplosion) {
      this.timeEvent.timer.remove(this.timeEvent);
    }
    this.gamestate.makeExplosion(this.mapPosition.x, this.mapPosition.y, this.power, byExplosion);
    this.destroy();
  }
}