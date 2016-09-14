export interface GameTile {
  bomb?: boolean;
  explosion?: boolean;
  brick?: boolean;
  wall?: boolean;
}

export class GameMap extends Phaser.Tilemap {
  mapData: Array<any>;
  constructor(game: Phaser.Game, width: number, height: number) {
    super(game, null, 48, 48, width, height);
    this.mapData = new Array(width * height);



  }

}