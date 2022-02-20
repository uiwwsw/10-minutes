import "./style.scss";
import "phaser";
// import logoImg from "./assets/logo.png";

export default class Demo extends Phaser.Scene {
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

    const logo = this.add.image(400, 70, "logo");

    this.tweens.add({
      targets: logo,
      y: 350,
      duration: 1500,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 800,
  height: 600,
  scene: Demo,
};

const game = new Phaser.Game(config);
