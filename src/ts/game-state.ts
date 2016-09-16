import {Bomb} from './bomb';
import {Explosion} from './explosion';

export class GameState extends Phaser.State {
  player: Phaser.Sprite;
  cursors: Phaser.CursorKeys;
  ground: Phaser.TilemapLayer;
  walls: Phaser.TilemapLayer;
  explosions: Phaser.Group;
  bricks: Phaser.TilemapLayer;
  map: Phaser.Tilemap;
  explosionThroughBricks = false;
  bombs: Phaser.Group;
  armTime: number = Phaser.Timer.SECOND * 2;
  explosionPower = 5;
  maxBombs = 1;

  preload() {
    this.game.load.spritesheet('tiles', 'assets/tiles.png', 48, 48);
  }

  makeBomb(x: number, y: number) {
    if (!this.checkForBombs(x, y)) {
      let bomb = new Bomb(this, x, y, this.bombs);
    }
  }

  explodeBrick(x: number, y: number) {
    this.map.putTile(null, x, y, 'bricks');
  }

  checkForBombs(x: number, y: number): Bomb {
    let bomb: Bomb = null;
    this.bombs.forEachAlive((b: Bomb) => {
      if (b.alive && !b.exploded && b.mapPosition.x === x && b.mapPosition.y === y) {
        bomb = b;
      }
    }, this);
    return bomb;
  }

  checkForExplosions(x: number, y: number): Explosion {
    let explosion: Explosion = null;
    this.explosions.forEachAlive((e: Explosion) => {
      if (e.alive && e.checkTile(x, y)) {
        explosion = e;
      }
    }, this);
    return explosion;
  }

  makeExplosion(x: number, y: number, power: number, exceptDirection?: string) {
    new Explosion(this, x, y, power, exceptDirection);
  }

  create() {

    this.map = this.game.add.tilemap();
    this.map.addTilesetImage('tiles', 'tiles', 48, 48);
    this.map.setCollision([1, 2]);
    this.ground = this.map.create('ground', 31, 13, 48, 48);
    this.bombs = this.game.add.group();
    this.walls = this.map.createBlankLayer('walls', 31, 13, 48, 48);
    this.bricks = this.map.createBlankLayer('bricks', 31, 13, 48, 48);
    this.explosions = this.game.add.group();

    for (let x = 0; x < 31; x++) {
      for (let y = 0; y < 13; y++) {
        if (x % 2 === 0 && y % 2 === 0) {
          // Muros blindados
          this.map.putTile(1, x, y, 'walls');
        } else if (x === 0 || x === 30 || y === 0 || y === 12) {
          // Bordas
          this.map.putTile(1, x, y, 'walls');
        } else {
          this.map.putTile(0, x, y, 'ground');
          if (x  <= 2 && y <= 2) {
          // Mantém o cantinho limpo;
          } else {
            if (Math.floor((Math.random() * 4)) === 0) {
              this.map.putTile(2, x, y, 'bricks');
            }
          }
        }
      }
    }

    this.ground.resizeWorld();
    this.game.camera.setBoundsToWorld();

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(() => {
      this.action = true;
    }, this);
    this.player = this.game.add.sprite(68, 68, 'asdasd');
    this.player.anchor.set(0.5);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
    this.game.physics.arcade.enableBody(this.player);
    // this.walls.debug = true;

  }
  action: boolean = false;
  update() {
    let speed = 300;
    this.player.body.velocity.set(0, 0);
    if (this.cursors.down.isDown) {
      this.player.body.velocity.y = speed;
    }
    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -speed;
    }
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -speed;
    }
    if (this.cursors.right.isDown) {
      this.player.body.velocity.x = speed;
    }
    if (this.action) {
      this.action = false;
      this.makeBomb(Math.floor(this.player.x / 48), Math.floor(this.player.y / 48));
    }
    this.game.physics.arcade.collide(this.player, this.walls);
    this.game.physics.arcade.collide(this.player, this.bricks);
    this.game.physics.arcade.collide(this.player, this.bombs);
  }

  render() {
    this.game.debug.text(`x: ${Math.round(this.player.x)}, y: ${Math.round(this.player.y)}`, 30, 30, '#FF0000', '');
  }

}