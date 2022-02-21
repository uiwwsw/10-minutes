import "./style.scss";
import "phaser";
// import logoImg from "./assets/logo.png";

export default class Demo extends Phaser.Scene {
  logo: any;
  kbd: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor(config: any) {
    super(config);
  }

  preload() {
    // this.load.image("logo", logoImg);
  }

  create() {
    // this.add.shader("RGB Shift Field", 0, 0, 800, 600).setOrigin(0);

    // this.add.shader("Plasma", 0, 412, 800, 172).setOrigin(0);

    // this.add.image(400, 300, "libs");

    this.logo = this.add.image(400, 70, "logo");

    // this.tweens.add({
    //   targets: this.logo,
    //   y: 350,
    //   duration: 1500,
    //   ease: "Sine.inOut",
    //   yoyo: true,
    //   repeat: -1,
    // });
    this.kbd = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (this.kbd.up.isDown) {
      this.logo.y -= 1;
    }
    if (this.kbd.down.isDown) {
      this.logo.y += 1;
    }
    if (this.kbd.left.isDown) {
      this.logo.x -= 1;
    }
    if (this.kbd.right.isDown) {
      this.logo.x += 1;
    }
  }
}
console.log(
  getComputedStyle(document.querySelector(":root")).getPropertyValue(
    "--background"
  )
);
const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 800,
  height: 600,
  scene: Demo,
};

const game = new Phaser.Game(config);
