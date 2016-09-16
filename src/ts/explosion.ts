import {GameState} from './game-state';
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

interface SpreadType {
  left: number;
  right: number;
  up: number;
  down: number;
}

export class Explosion extends Phaser.Group {
  mapPosition: Phaser.Point = new Phaser.Point();
  spread: SpreadType = {
    left: null,
    right: null,
    up: null,
    down: null
  };

  throughBricks: boolean = false;

  constructor(private gameState: GameState, public mapX: number, mapY: number, public power: number, exceptDirection?: string) {
    super(gameState.game, gameState.explosions);
    this.x = mapX * 48;
    this.y = mapY * 48;
    this.mapPosition.set(mapX, mapY);

    if (exceptDirection) {
      this.spread[OPPOSITE_DIRECTIONS[exceptDirection]] = 0;
    }

    this.createExplosion();
  }

  createExplosion() {
    let bomb: Bomb;

    let calculateSpread = (actualDistance: number, x: number, y: number, direction: string) => {
      if (this.spread[direction] === null) {
        if (this.gameState.map.getTile(x, y, 'walls', false)) {
          this.spread[direction] = actualDistance - 1;
        } else if (this.gameState.map.getTile(x, y, 'bricks', false)) {
          if (!this.throughBricks) {
            this.spread[direction] = actualDistance;
          }
          this.gameState.explodeBrick(x, y);
        } else if (bomb = this.gameState.checkForBombs(x, y)) {
          this.spread[direction] = actualDistance - 1;
          bomb.explode(direction);
        }
      }
    };
    // Calcula a trajetória da explosão
    for (let i = 1; i < this.power + 1; i++) {
      // left
      calculateSpread(i, this.mapPosition.x - i, this.mapPosition.y, 'left');
      // right
      calculateSpread(i, this.mapPosition.x + i, this.mapPosition.y, 'right');
      // up
      calculateSpread(i, this.mapPosition.x, this.mapPosition.y - i, 'up');
      // down
      calculateSpread(i, this.mapPosition.x, this.mapPosition.y + i, 'down');
    }

    let tile = 9;
    // Center
    this.game.add.sprite(0, 0, 'tiles', tile, this);

    let createExplosionDirections = (actualDistance: number, x: number, y: number, direction: string) => {
       if (this.spread[direction] === null || this.spread[direction] >= actualDistance) {
        if (actualDistance === this.power) {
          tile = EXPLOSION_TILES[direction].end;
        } else {
          tile = EXPLOSION_TILES[direction].middle;
        }
        this.game.add.sprite(x * 48, y * 48, 'tiles', tile, this);
      }
    };

    for (let i = 1; i < this.power + 1; i++) {
      // left
      createExplosionDirections(i, -i, 0, 'left');
      // right
      createExplosionDirections(i, i, 0, 'right');
      // up
      createExplosionDirections(i, 0, -i, 'up');
      // down
      createExplosionDirections(i, 0, i, 'down');
    }
    this.game.time.events.add(300, () => {
      this.destroy();
    }, this);
  }
  // Verifica se este tile faz parte desta explosão
  checkTile(x: number, y: number): boolean {
    let mapX = this.mapPosition.x;
    let mapY = this.mapPosition.y;
    let minX = mapX - this.power;
    let maxX = mapX + this.power;
    let minY = mapY - this.power;
    let maxY = mapY + this.power;
    if (this.spread.up !== null) {
      minY = mapY - this.spread.up;
    }
    if (this.spread.down !== null) {
      maxY = mapY + this.spread.down;
    }
    if (this.spread.left !== null) {
      minX = mapX - this.spread.left;
    }
    if (this.spread.right !== null) {
      maxY = mapY + this.spread.right;
    }
    if (mapX === x || mapY === y) {
      if (mapX === x) {
        if (y <= maxY && y >= minY) {
          return true;
        }
      } else if (mapY === y) {
        if (x <= maxX && x >= minX) {
          return true;
        }
      }
    }
    return false;
  }
}