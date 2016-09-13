export class ExampleState extends Phaser.State {
  player: Phaser.Sprite;
  cursors: Phaser.CursorKeys;
  ground: Phaser.TilemapLayer;
  walls: Phaser.TilemapLayer;
  explosions: Phaser.Group;
  bricks: Phaser.Group;
  map: Phaser.Tilemap;

  preload() {
    this.game.load.spritesheet('tiles', 'assets/tiles.png', 48, 48);
  }

  makeExplosion(x: number, y: number, size: number) {
    let group: Phaser.Group = this.game.add.group(this.explosions);
    let spread = {
      left: null,
      right: null,
      up: null,
      down: null
    };
    // Calcula a tragetória da explosão
    for (let i = 1; i < size + 1; i++) {
      // left
      if (spread.left === null){
        if (this.map.getTile(x - i, y, 'walls', false)) {
          spread.left = i - 1;
        }
      }
      // right
      if (spread.right === null){
        if (this.map.getTile(x + i, y, 'walls', false)) {
          spread.right = i - 1;
        }
      }
      // up
      if (spread.up === null){
        if (this.map.getTile(x, y - i, 'walls', false)) {
          spread.up = i - 1;
        }
      }
      // down
      if (spread.down === null){
        if (this.map.getTile(x, y + i, 'walls', false)) {
          spread.down = i - 1;
        }
      }
    }
    console.log(spread);
    let tile = 9;
    // Center
    this.game.add.sprite(x * 48, y * 48, 'tiles', tile, group);
    for (let i = 1; i < size + 1; i++) {
      // left
      if (spread.left === null || spread.left >= i) {
        if (i === size) {
          tile = 3;
        } else {
          tile = 7;
        }
        this.game.add.sprite((x - i) * 48, y * 48, 'tiles', tile, group);
      }
      // right
      if (spread.right === null || spread.right >= i) {
        if (i === size) {
          tile = 4;
        } else {
          tile = 7;
        }
        this.game.add.sprite((x + i) * 48, y * 48, 'tiles', tile, group);
      }
      // up
      if (spread.up === null || spread.up >= i) {
        if (i === size) {
          tile = 5;
        } else {
          tile = 8;
        }
        this.game.add.sprite(x * 48, (y - i) * 48, 'tiles', tile, group);
      }
      // down
      if (spread.down === null || spread.down >= i) {
        if (i === size) {
          tile = 6;
        } else {
          tile = 8;
        }
        this.game.add.sprite(x * 48, (y + i) * 48, 'tiles', tile, group);
      }
    }
  }

  create() {

    this.map = this.game.add.tilemap();
    this.map.addTilesetImage('tiles', 'tiles', 48, 48);
    this.map.setCollision([1]);
    this.ground = this.map.create('ground', 31, 13, 48, 48);
    this.bricks = this.game.add.group();
    this.explosions = this.game.add.group();
    this.walls = this.map.createBlankLayer('walls', 31, 13, 48, 48);

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
              this.game.add.sprite(x * 48, y * 48, 'tiles', 2, this.bricks);
            }
          }
        }
      }
    }

    this.ground.resizeWorld();
    this.game.camera.setBoundsToWorld();

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.player = this.game.add.sprite(48, 48, 'asdasd');
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
    this.game.physics.arcade.enableBody(this.player);

    // this.layer.debug = true;
    this.makeExplosion(3, 3, 2);
    this.makeExplosion(1, 8, 1);
    this.makeExplosion(9, 6, 3);
  }

  update() {
    let speed = 400;
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
    this.game.physics.arcade.collide(this.player, this.walls);
  }

  render() {
    this.game.debug.text(`x: ${Math.round(this.player.x)}, y: ${Math.round(this.player.y)}`, 30, 30, '#FF0000', '');
  }

}