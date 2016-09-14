import {Bomb} from './bomb';

const DIRECTIONS = ['left', 'right', 'up', 'down'];
const OPPOSITE_DIRECTIONS = {
  left: 'right',
  right: 'left',
  up: 'down',
  down: 'up'
};
const EXPLOSION_TILES = {
  left: {
    middle: 7,
    end: 3
  },
  right: {
    middle: 7,
    end: 4
  },
  up: {
    middle: 8,
    end: 5
  },
  down: {
    middle: 8,
    end: 6
  }
};

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
    let bomb = new Bomb(this, x, y, this.bombs);
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

  makeExplosion(x: number, y: number, size: number, exceptDirection?: string) {
    let group: Phaser.Group = this.game.add.group(this.explosions);
    let spread = {
      left: null,
      right: null,
      up: null,
      down: null
    };

    if (exceptDirection) {
      spread[OPPOSITE_DIRECTIONS[exceptDirection]] = 0;
    }

    let bomb: Bomb;

    let calculateSpread = (actualDistance: number, x: number, y: number, direction: string) => {
      if (spread[direction] === null) {
        if (this.map.getTile(x, y, 'walls', false)) {
          spread[direction] = actualDistance - 1;
        } else if (this.map.getTile(x, y, 'bricks', false)) {
          if (!this.explosionThroughBricks) {
            spread[direction] = actualDistance;
          }
          this.explodeBrick(x, y);
        } else if (bomb = this.checkForBombs(x, y)) {
          spread[direction] = actualDistance - 1;
          bomb.explode(direction);
        }
      }
    };
    // Calcula a trajetória da explosão
    for (let i = 1; i < size + 1; i++) {
      // left
      calculateSpread(i, x - i, y, 'left');
      // right
      calculateSpread(i, x + i, y, 'right');
      // up
      calculateSpread(i, x, y - i, 'up');
      // down
      calculateSpread(i, x, y + i, 'down');
    }

    let tile = 9;
    // Center
    this.game.add.sprite(x * 48, y * 48, 'tiles', tile, group);

    let createExplosionDirections = (actualDistance: number, x: number, y: number, direction: string) => {
       if (spread[direction] === null || spread[direction] >= actualDistance) {
        if (actualDistance === size) {
          tile = EXPLOSION_TILES[direction].end;
        } else {
          tile = EXPLOSION_TILES[direction].middle;
        }
        this.game.add.sprite(x * 48, y * 48, 'tiles', tile, group);
      }
    };
    for (let i = 1; i < size + 1; i++) {
      // left
      createExplosionDirections(i, x - i, y, 'left');
      // right
      createExplosionDirections(i, x + i, y, 'right');
      // up
      createExplosionDirections(i, x, y - i, 'up');
      // down
      createExplosionDirections(i, x, y + i, 'down');
    }
    this.game.time.events.add(100, () => {
      group.destroy();
    }, this);
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