import {GameState} from './game-state';
import {Explosion} from './explosion';

export class Bomb extends Phaser.Sprite {
  mapPosition: Phaser.Point = new Phaser.Point();
  exploded: boolean = false;
  power: number = 1;
  timeEvent: Phaser.TimerEvent;

  constructor(private gamestate: GameState, mapX: number, mapY: number, parent?: Phaser.Group) {
    super(gamestate.game, (mapX * 48) + 24, (mapY * 48) + 24, 'tiles', 10);
    if (parent) {
      parent.add(this);
    }
    this.anchor.set(0.5);
    this.power = this.gamestate.explosionPower;
    this.game.physics.arcade.enableBody(this);
    (<Phaser.Physics.Arcade.Body>this.body).immovable = true;
    this.mapPosition.set(mapX, mapY);
    if (this.gamestate.checkForExplosions(mapX, mapY)) {
      // Explode prematuramente
      this.explode();
    } else {
      this.arm();
    }
  }

  arm() {
    this.timeEvent = this.game.time.events.add(this.gamestate.armTime, function() {
      this.explode();
    }, this);
  }

  explode(byExplosion?: string) {
    this.exploded = true;
    if (byExplosion) {
      this.timeEvent.timer.remove(this.timeEvent);
    }
    new Explosion(this.gamestate, this.mapPosition.x, this.mapPosition.y, this.power, byExplosion);
    this.destroy();
  }

  update() {
    this.mapPosition.set(Math.floor(this.x / 48), Math.floor(this.y / 48));
  }
}