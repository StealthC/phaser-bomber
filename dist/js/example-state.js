"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExampleState = (function (_super) {
    __extends(ExampleState, _super);
    function ExampleState() {
        _super.apply(this, arguments);
    }
    ExampleState.prototype.preload = function () {
        this.game.load.image('logo', 'assets/phaser2.png');
    };
    ExampleState.prototype.create = function () {
        var _this = this;
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        logo.inputEnabled = true;
        logo.events.onInputOver.add(function () {
            _this.game.add.tween(logo.scale).to({ x: 1.2, y: 1.2 }, 100, Phaser.Easing.Linear.None, true);
        });
        logo.events.onInputOut.add(function () {
            _this.game.add.tween(logo.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.None, true);
        });
        logo.events.onInputDown.add(function () {
            _this.game.add.tween(logo).to({ angle: 360 }, 500, Phaser.Easing.Cubic.Out, true);
        });
    };
    return ExampleState;
}(Phaser.State));
exports.ExampleState = ExampleState;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4YW1wbGUtc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7SUFBa0MsZ0NBQVk7SUFBOUM7UUFBa0MsOEJBQVk7SUFtQjlDLENBQUM7SUFsQkMsOEJBQU8sR0FBUDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsNkJBQU0sR0FBTjtRQUFBLGlCQWFDO1FBWkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztZQUMxQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0YsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7WUFDekIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDSCxtQkFBQztBQUFELENBbkJBLEFBbUJDLENBbkJpQyxNQUFNLENBQUMsS0FBSyxHQW1CN0M7QUFuQlksb0JBQVksZUFtQnhCLENBQUEiLCJmaWxlIjoiZXhhbXBsZS1zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBFeGFtcGxlU3RhdGUgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIHByZWxvYWQoKSB7XHJcbiAgICB0aGlzLmdhbWUubG9hZC5pbWFnZSgnbG9nbycsICdhc3NldHMvcGhhc2VyMi5wbmcnKTtcclxuICB9XHJcbiAgXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgbGV0IGxvZ28gPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksICdsb2dvJyk7XHJcbiAgICBsb2dvLmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XHJcbiAgICBsb2dvLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICBsb2dvLmV2ZW50cy5vbklucHV0T3Zlci5hZGQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKGxvZ28uc2NhbGUpLnRvKHt4OiAxLjIsIHk6IDEuMn0sIDEwMCwgUGhhc2VyLkVhc2luZy5MaW5lYXIuTm9uZSwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICAgIGxvZ28uZXZlbnRzLm9uSW5wdXRPdXQuYWRkKCgpID0+IHtcclxuICAgICAgdGhpcy5nYW1lLmFkZC50d2Vlbihsb2dvLnNjYWxlKS50byh7eDogMSwgeTogMX0sIDEwMCwgUGhhc2VyLkVhc2luZy5MaW5lYXIuTm9uZSwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICAgIGxvZ28uZXZlbnRzLm9uSW5wdXREb3duLmFkZCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4obG9nbykudG8oe2FuZ2xlOiAzNjB9LCA1MDAsIFBoYXNlci5FYXNpbmcuQ3ViaWMuT3V0LCB0cnVlKTtcclxuICAgIH0pXHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
