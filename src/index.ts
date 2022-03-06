import "./style.scss";
import "phaser";
import Kakao from "./assets/image/ddd.jpeg";
class FPSScene extends Phaser.Scene {
  private text: Phaser.GameObjects.Text | null = null;

  constructor() {
    super({ key: "fpsScene", active: true });
  }

  create(): void {
    this.text = this.add.text(10, 10, "");
  }

  update(): void {
    this.text.setText(`FPS: ${this.game.loop.actualFps}`);
  }
}
class MainScene extends Phaser.Scene {
  private character: Phaser.GameObjects.Image | null = null;
  // 방향키를 감지할 키를 추가하기!
  private upKey: Phaser.Input.Keyboard.Key | null = null;
  private downKey: Phaser.Input.Keyboard.Key | null = null;
  private leftKey: Phaser.Input.Keyboard.Key | null = null;
  private rightKey: Phaser.Input.Keyboard.Key | null = null;

  constructor() {
    super({ key: "main", active: true });
  }

  preload(): void {
    this.load.image("character", Kakao);
  }

  create(): void {
    // this.matter.world.setBounds();
    // this.character2 = this.add.image(100, 150, "character");
    this.character = this.add.image(100, 150, "character");
    this.character.setScale(0.2);

    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.downKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    this.leftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.rightKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
  }

  update(time: number, delta: number): void {
    if (this.character) {
      if (this.upKey?.isDown) this.character.y -= 10;
      if (this.downKey?.isDown) this.character.y += 10;
      if (this.leftKey?.isDown) this.character.x -= 10;
      if (this.rightKey?.isDown) this.character.x += 10;
    }
  }
}
const game: Phaser.Game = new Phaser.Game({
  width: 1024,
  height: 768,
  scene: [MainScene, FPSScene],
  // 물리 효과 추가
  physics: {
    default: "matter",
    // matter 물리엔진 설정
    matter: {
      // 월드에 중력 설정
      gravity: {
        x: 0,
        y: 9.8,
      },
    },
  },
});
