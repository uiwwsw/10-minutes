import "./style.scss";
import "phaser";
import Kakao2 from "./assets/image/ddd.jpeg";
import Kakao1 from "./assets/image/1.png";
import Kakao from "./assets/image/ic-system-service-binance.svg";
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
  private character: Phaser.Physics.Matter.Image | null = null;
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
    this.load.image("character1", Kakao1);
    this.load.image("character2", Kakao2);
  }

  makeMe() {
    this.character = this.matter.add.image(100, 150, "character");
    this.character.setCircle(50);
  }

  makeMonster() {
    // const a = this.matter.add.image(300, 150, "character1");
    // const b = this.matter.add.image(500, 150, "character2");
    // a.setScale(0.2);
    // b.setScale(0.2);
  }

  onCollisionstart() {
    this.matter.world.on("collisionstart", (event) => {
      //  Loop through all of the collision pairs
      const pairs = event.pairs;

      for (var i = 0; i < pairs.length; i++) {
        const bodyA = pairs[i].bodyA.gameObject;
        const bodyB = pairs[i].bodyB.gameObject;
        if (bodyA === this.character) {
          console.log("1");
        } else {
          console.log("2");
        }
        // var bodyA = pairs[i].bodyA;
        // var bodyB = pairs[i].bodyB;
        // console.log(
        //   pairs[i].bodyA.gameObject === a,
        //   pairs[i].bodyB.gameObject === a
        // );
        //  We only want sensor collisions
        // if (pairs[i].isSensor) {
        //   var blockBody;
        //   var playerBody;

        //   if (bodyA.isSensor) {
        //     blockBody = bodyB;
        //     playerBody = bodyA;
        //   } else if (bodyB.isSensor) {
        //     blockBody = bodyA;
        //     playerBody = bodyB;
        //   }

        //   //  You can get to the Sprite via `gameObject` property
        //   var playerSprite = playerBody.gameObject;
        //   var blockSprite = blockBody.gameObject;

        //   var color;

        //   if (playerBody.label === "left") {
        //     color = 0xff0000;
        //   } else if (playerBody.label === "right") {
        //     color = 0x00ff00;
        //   } else if (playerBody.label === "top") {
        //     color = 0x0000ff;
        //   } else if (playerBody.label === "bottom") {
        //     color = 0xffff00;
        //   }

        //   blockSprite.setTintFill(color);
        // }
      }
    });
  }

  create(): void {
    // this.matter.world.setBounds();
    // this.character2 = this.add.image(100, 150, "character");
    this.makeMe();
    this.onCollisionstart();

    this.matter.world.setBounds(0, 0, 800, 600);

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

  update(): void {
    if (this.character) {
      if (this.leftKey?.isDown) {
        this.character.setVelocityX(-10);
      } else if (this.rightKey?.isDown) {
        this.character.setVelocityX(10);
      } else {
        this.character.setVelocityX(0);
      }

      if (this.upKey?.isDown) {
        this.character.setVelocityY(-10);
      } else if (this.downKey?.isDown) {
        this.character.setVelocityY(10);
      } else {
        this.character.setVelocityY(0);
      }
    }
  }
}
const game: Phaser.Game = new Phaser.Game({
  width: 800,
  height: 600,
  scene: [MainScene, FPSScene],
  // 물리 효과 추가
  physics: {
    default: "matter",
    matter: {
      gravity: {
        x: 0,
        y: 0,
      },
    },
  },
});
