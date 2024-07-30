import { Button } from './Button.js'
class Game extends Phaser.Scene {
  constructor() {
    super('Boot');
  }


  // Preload() runs before the game starts
  // Used for preloading assets into your scene, such as images and sounds.
  preload() {
    this.load.spritesheet('Apple', 'assets/AppleSheet.png', { frameWidth: 9, frameHeight: 13 });
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');
    this.load.spritesheet('GrabbyIdle', 'assets/Grabby/GrabbyIdleSheet.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('GrabbyWalk', 'assets/Grabby/GrabbyRunSheet.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('GrabbyJump', 'assets/Grabby/GrabbyJumpFrame.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('GrabbyJumpWalk', 'assets/Grabby/GrabbyJumpWalk.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('AppleW', 'assets/AppleW.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('GrabbyDeath', 'assets/Grabby/GrabbyDeath.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('Background', 'assets/Backgroudn.png')
    this.load.image('Heart', 'assets/Heart.png')
    this.load.image('AppleLogo', 'assets/AppleLogo.png')
    this.load.image('MissleWarning', 'assets/MissleWarning.png')
    this.load.spritesheet('GrabbyDef', 'assets/Grabby/GrabbyDefend.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('Missle', 'assets/Missle.png', { frameWidth: 14, frameHeight: 11 });
    this.load.image('Block', 'assets/Block.png')
    this.load.image('Explode', 'assets/explosion.png')
    this.load.spritesheet('GrabbyDefJump', 'assets/Grabby/DefendJump.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('SpeedPotion', 'assets/SpeedPotion.png')
    this.load.image('JumpPotion', 'assets/JumpPotion.png')
    this.load.image('JumpText', 'assets/JumpText.png')
    this.load.image('SpeedText', 'assets/SpeedText.png')
    this.load.spritesheet('GrabbyDefJumpWalk', 'assets/Grabby/GrabbyDefendJumpWalk.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('HealthPotion', 'assets/HealthPotion.png')
    this.load.image('HealthText', 'assets/HeartText.png')
    this.load.image('ScorePotion', 'assets/ScorePotion.png')
    this.load.image('ScoreText1', 'assets/ScoreText.png')
    this.load.image('ScoreText2', 'assets/ScoreText2.png')
    this.load.image('ArrowLeft', 'assets/ArrowLeft.png')
    this.load.image('ArrowRight', 'assets/ArrowRight.png')
    this.load.image('ButtonShield', 'assets/ButtonShield.png')
    this.load.image('ButtonJump', 'assets/JumpButton.png')
    //this.load.image('SizePotion', 'assets/SizePotion.png')
    //this.load.image('BigTray', 'assets/Bigthing.png')
  }

  // Create() runs when we start the game
  create(data) {
    if (this.scale.orientation !== Phaser.Scale.LANDSCAPE) {
      document.getElementById('orientation_warning').style = "display:flex;"
    };

    this.scale.on('orientationchange', function (orientation) {
      if (orientation === Phaser.Scale.LANDSCAPE) {
        document.getElementById('orientation_warning').style = "display:none;"
        document.location.reload(true);
      } else {
        document.getElementById('orientation_warning').style = "display:flex;"
      }
    });

    // Keys we want to get information about
    this.keys = this.input.keyboard.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      q: Phaser.Input.Keyboard.KeyCodes.Q,
      e: Phaser.Input.Keyboard.KeyCodes.E,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
    })
    this.input.addPointer(3)

    // Map
    this.map = this.add.tilemap('map')

    // Idle animation
    let GrabbyIdle = this.anims.generateFrameNames('GrabbyIdle');
    this.anims.create({ key: 'GrabbyIdle', frames: GrabbyIdle, frameRate: 15, repeat: -1 });

    // Run animation
    let GrabbyWalk = this.anims.generateFrameNames('GrabbyWalk');
    this.anims.create({ key: 'GrabbyWalk', frames: GrabbyWalk, frameRate: 15, repeat: -1 });

    //Death
    let GrabbyDeath = this.anims.generateFrameNames('GrabbyDeath');
    this.anims.create({ key: 'GrabbyDeath', frames: GrabbyDeath, frameRate: 10, repeat: -1 });

    //defence 
    let GrabbyDef = this.anims.generateFrameNames('GrabbyDef');
    this.anims.create({ key: 'GrabbyDef', frames: GrabbyDef, frameRate: 10, repeat: -1 });

    let GrabbyDefJump = this.anims.generateFrameNames('GrabbyDefJump');
    this.anims.create({ key: 'GrabbyDefJump', frames: GrabbyDefJump, frameRate: 10, repeat: -1 });

    let GrabbyDefJumpWalk = this.anims.generateFrameNames('GrabbyDefJumpWalk');
    this.anims.create({ key: 'GrabbyDefJumpWalk', frames: GrabbyDefJumpWalk, frameRate: 10, repeat: -1 });

    // Jump animation
    let GrabbyJump = this.anims.generateFrameNames('GrabbyJump');
    this.anims.create({ key: 'GrabbyJump', frames: GrabbyJump, frameRate: 1, repeat: -1 });
    let GrabbyJumpWalk = this.anims.generateFrameNames('GrabbyJumpWalk');
    this.anims.create({ key: 'GrabbyJumpWalk', frames: GrabbyJumpWalk, frameRate: 1, repeat: -1 });

    // Apple Animation
    let Apple = this.anims.generateFrameNames('Apple');
    this.anims.create({ key: 'Apple', frames: Apple, frameRate: 20, repeat: -1 });

    let AppleW = this.anims.generateFrameNames('AppleW');
    this.anims.create({ key: 'AppleW', frames: AppleW, frameRate: 50, repeat: -1 });

    // Player
    const spawnPoint = this.map.findObject("Objects", obj => obj.name === "Spawn Point");
    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'GrabbyJump');
    this.player.setVelocity(160)
    this.player.play("GrabbyWalk", true)

    // Apple
    this.apple = this.physics.add.sprite('Apple')
    this.apple.play('Apple', true)

    // Missle
    this.missle = this.physics.add.sprite('Missle')

    //rectangle
    let rect = this.add.rectangle(spawnPoint.x, spawnPoint.y + 100, 300, 100, 0)
    this.physics.add.existing(rect)
    rect.body.setImmovable(true)
    rect.body.setAllowGravity(false)

    // Camera
    this.camera = this.cameras.main;
    this.camera.startFollow(this.player, true, 0.1, 0.1)
    this.camera.setZoom(1.6)

    // Collisions
    this.physics.add.collider(this.player, rect)
    this.physics.add.collider(this.apple, rect)

    // Score text
    this.score = 0;
    this.scoreText = this.add.text(
      spawnPoint.x, // x
      spawnPoint.y + 100, // y
      'Score: 0', // texts
      { font: "32px Arial Black", fill: "#ffffff" }); // Font settings
    this.scoreText.setOrigin(0.5, 0.5)

    //lives
    this.HP = 5
    this.Heart = this.add.image(this.scoreText.x - 90, this.scoreText.y - 30, 'Heart')
    this.Heart.setScale(2.5)
    this.Bapple = this.add.image(this.scoreText.x - 90, this.scoreText.y, 'AppleLogo')
    this.Bapple.setScale(2.1)
    this.HPText = this.add.text(
      this.scoreText.x,
      this.scoreText.y - 30,
      'b',
      { font: "32px Arial Black", fill: "#ffffff" }
    )
    this.HPText.setOrigin(0.5, 0.5)

    //buttons
    if (!this.sys.game.device.os.desktop) {
      this.setupButtons()
    }

    //Player Velocity
    this.Speed = 160;
    this.Jump = 180;

    //Diffoculti increaser
    this.MissleSpawnSpeed = 5000;
    this.AppleSpawn = 2500;
    this.potionSpawn = 10000;
    this.AppleWD = 850;
    this.MissleSpeed = 160

    setInterval(() => {
      let randomNumber = Math.floor(Math.random() * 4)
      if (randomNumber === 0) {
        this.MissleSpawnSpeed -= 250
        if (this.MissleSpawnSpeed <= 1500) {
          this.MissleSpawnSpeed = 1500
        }
      }
      if (randomNumber === 1) {
        this.AppleSpawn -= 100
        if (this.AppleSpawn <= 1125) {
          this.AppleSpawn = 1125
        }
      }
      if (randomNumber === 2) {
        this.MissleSpeed += 10
      }
      if (randomNumber === 3) {
        return
      }
    }, 2500)

    //Power Upgrade
    setInterval(() => {
      let PowerWx = Math.floor(Math.random() * 300) + spawnPoint.x - 150
      let randomNumber = Math.floor(Math.random() * 4)
      if (randomNumber === 0) {
        this.SpeedPotion = this.physics.add.sprite(PowerWx, spawnPoint.y - 100, 'SpeedPotion')
        this.physics.add.collider(this.SpeedPotion, rect)
        this.physics.add.collider(this.SpeedPotion, this.player, (a, p) => {
          this.Speed *= 1.125
          a.destroy(true)
          this.SpeedText = this.add.image(this.player.x, this.player.y - 25, 'SpeedText')
          this.SpeedText.setScale(0.8)
          setTimeout(() => {
            this.SpeedText.destroy(true)
          }, 700)
        })
      }
      if (randomNumber === 1) {
        this.JumpPotion = this.physics.add.sprite(PowerWx, spawnPoint.y - 100, 'JumpPotion')
        this.physics.add.collider(this.JumpPotion, rect)
        this.physics.add.collider(this.JumpPotion, this.player, (a, p) => {
          this.Jump *= 1.125
          a.destroy(true)
          this.JumpText = this.add.image(this.player.x, this.player.y - 25, 'JumpText')
          this.JumpText.setScale(0.7)
          setTimeout(() => {
            this.JumpText.destroy(true)
          }, 700)
        })
      }
      if (randomNumber === 2) {
        this.HealthPotion = this.physics.add.sprite(PowerWx, spawnPoint.y - 100, 'HealthPotion')
        this.physics.add.collider(this.HealthPotion, rect)
        this.physics.add.collider(this.HealthPotion, this.player, (a, p) => {
          this.HP += 1
          a.destroy(true)
          this.HeartText = this.add.image(this.player.x, this.player.y - 25, 'HealthText')
          this.HeartText.setScale(0.8)
          setTimeout(() => {
            this.HeartText.destroy(true)
          }, 700)
        })
      }
      if (randomNumber === 3) {
        this.ScorePotion = this.physics.add.sprite(PowerWx, spawnPoint.y - 100, 'ScorePotion')
        this.physics.add.collider(this.ScorePotion, rect)
        this.physics.add.collider(this.ScorePotion, this.player, (a, p) => {
          let numberRandom = Math.floor(Math.random() * 2)
          if (numberRandom === 0) {
            this.score += 5
            a.destroy(true)
            this.ScoreText1 = this.add.image(this.player.x, this.player.y - 25, 'ScoreText1')
            setTimeout(() => {
              this.ScoreText1.destroy(true)
            }, 700)
          }
          if (numberRandom === 1) {
            this.score += 10
            a.destroy(true)
            this.ScoreText2 = this.add.image(this.player.x, this.player.y - 25, 'ScoreText2')
            setTimeout(() => {
              this.ScoreText2.destroy(true)
            }, 700)
          }

        })
      }

    }, 9500)

    //missle shooter 
    let MissleSpawn = () => {
      let randomNumber = Math.floor(Math.random() * 3)
      if (randomNumber === 0) {
        let side = this.sys.game.canvas.width / 2 + 170
        this.MissleW = this.physics.add.sprite(side, this.sys.game.canvas.height / 2 + 10, 'MissleWarning')
        setInterval(() => {
          this.MissleW.setVisible(false)
          setTimeout(() => {
            this.MissleW.setVisible(true)
          }, 50)
        }, 100)
        this.MissleW.body.setAllowGravity(false)
        this.MissleW.setOrigin(0.5, 0.5)
        this.MissleW.setScrollFactor(0)
        setTimeout(() => {
          this.MissleW.destroy(true)
          this.missle = this.physics.add.sprite(spawnPoint.x + 280, spawnPoint.y + 40, 'Missle')
          this.missle.body.setAllowGravity(false)
          this.missle.body.setVelocityX(-this.MissleSpeed)
          this.missle.setScale(1.1)
          this.physics.add.collider(this.missle, this.player, (a, p) => {
            if ((this.shield || this.keys.s.isDown) && this.player.flipX === false) {
              this.Blocked = this.add.image(this.player.x, this.player.y - 25, 'Block')
              this.Blocked.setScale(0.85)
              a.destroy(true)
              this.score++
              setTimeout(() => {
                this.Blocked.destroy(true)
              }, 500)
            } else {
              a.destroy(true)
              this.HP--
              this.explode = this.add.image(this.player.x, this.player.y, 'Explode')
              setTimeout(() => {
                this.explode.destroy(true)
              }, 500)
              if (this.HP <= 0) {
                this.HP = 0
                this.loseGame();
              }
            }
          })
        }, 1000)
      }
      if (randomNumber === 1) {
        let side = this.sys.game.canvas.width / 2 - 170
        this.MissleW = this.physics.add.sprite(side, this.sys.game.canvas.height / 2 + 10, 'MissleWarning')
        setInterval(() => {
          this.MissleW.setVisible(false)
          setTimeout(() => {
            this.MissleW.setVisible(true)
          }, 50)
        }, 100)
        this.MissleW.flipX = true
        this.MissleW.body.setAllowGravity(false)
        this.MissleW.setOrigin(0.5, 0.5)
        this.MissleW.setScrollFactor(0)
        setTimeout(() => {
          this.MissleW.destroy(true)
          this.missle = this.physics.add.sprite(spawnPoint.x - 280, spawnPoint.y + 40, 'Missle')
          this.missle.flipX = true
          this.missle.body.setAllowGravity(false)
          this.missle.body.setVelocityX(this.MissleSpeed)
          this.missle.setScale(1.1)
          this.physics.add.collider(this.missle, this.player, (a, p) => {
            if ((this.shield || this.keys.s.isDown) && this.player.flipX) {
              this.Blocked = this.add.image(this.player.x, this.player.y - 25, 'Block')
              this.Blocked.setScale(0.85)
              a.destroy(true)
              this.score++
              setTimeout(() => {
                this.Blocked.destroy(true)
              }, 500)
            } else {
              a.destroy(true)
              this.HP--
              this.explode = this.add.image(this.player.x, this.player.y, 'Explode')
              setTimeout(() => {
                this.explode.destroy(true)
              }, 500)
              if (this.HP <= 0) {
                this.HP = 0
                this.loseGame();
              }
            }
          })
        }, 1000)
      }
      setTimeout(MissleSpawn, this.MissleSpawnSpeed)
    }

    MissleSpawn()

    //apple falling

    let spawnApple = () => {
      if (this.gameOver) {
        return
      }
      let AppleWx = Math.floor(Math.random() * 300) + spawnPoint.x - 150
      this.appleW = this.physics.add.sprite(AppleWx, spawnPoint.y + 30, 'AppleW')
      this.appleW.play('AppleW', true)
      this.appleW.body.setAllowGravity(false)
      this.appleW.setScale(0.75)
      setTimeout(() => {
        this.appleW.destroy(true)
        this.apple = this.physics.add.sprite(AppleWx, spawnPoint.y - 100, 'Apple')
        this.apple.play('Apple', true)
        this.apple.body.setGravityY(-500)
        this.physics.add.collider(this.apple, rect, (a, p) => {
          a.destroy(true)
          this.HP--
          if (this.HP <= 0) {
            this.HP = 0
            this.loseGame();
          }
        })
        this.physics.add.collider(this.apple, this.player, (a, p) => {
          if (this.player.body.touching.up) {
            if (this.keys.s.isDown) {
              a.destroy(true)
              return
            }
            a.destroy(true)
            this.score++
          }

        })
      }, this.AppleWD)
      setTimeout(spawnApple, this.AppleSpawn)
    }

    spawnApple()

  }

  setupButtons() {
    this.left = false
    this.leftbutton = new Button(this, this.sys.game.canvas.width * 0.25, this.sys.game.canvas.height * 0.68, 'ArrowLeft')
    this.leftbutton.setScale(0.18)
    this.leftbutton.on('pointerdown', () => {
      this.left = true
    })
    this.leftbutton.on('pointerout', () => {
      this.left = false
    })

    this.right = false
    this.rightbutton = new Button(this, this.sys.game.canvas.width * 0.35, this.sys.game.canvas.height * 0.68, 'ArrowRight')
    this.rightbutton.setScale(0.18)
    this.rightbutton.on('pointerdown', () => {
      this.right = true
    })
    this.rightbutton.on('pointerout', () => {
      this.right = false
    })

    this.shield = false
    this.shieldbutton = new Button(this, this.sys.game.canvas.width * 0.65, this.sys.game.canvas.height * 0.68, 'ButtonShield')
    this.shieldbutton.setScale(0.18)
    this.shieldbutton.on('pointerdown', () => {
      this.shield = true
    })
    this.shieldbutton.on('pointerout', () => {
      this.shield = false
    })

    this.jump = false
    this.jumpbutton = new Button(this, this.sys.game.canvas.width * 0.75, this.sys.game.canvas.height * 0.68, 'ButtonJump')
    this.jumpbutton.setScale(0.18)
    this.jumpbutton.on('pointerdown', () => {
      this.jump = true
    })
    this.jumpbutton.on('pointerout', () => {
      this.jump = false
    })
  }

  // Update() runs many times per second
  update(time, delta) {
    if (this.gameOver) {
      return
    }
    let keys = this.keys;
    let player = this.player;
    if (this.left && !this.shield || keys.a.isDown && !keys.s.isDown) {
      if (player.body.velocity.y < -1 || player.body.velocity.y > 1) {
        player.play('GrabbyJumpWalk')
      } else {
        player.play('GrabbyWalk', true)
      }
      player.flipX = true
      player.setVelocityX(-this.Speed);
    }

    else if (this.right && !this.shield || keys.d.isDown && !keys.s.isDown) {
      if (player.body.velocity.y < -1 || player.body.velocity.y > 1) {
        player.play('GrabbyJumpWalk')
      } else {
        player.play('GrabbyWalk', true)
      }
      player.flipX = false
      player.setVelocityX(this.Speed);
    }

    else if (!keys.d.isDown || !keys.a.isDown) {
      player.setVelocityX(0);
    }

    if (this.left && this.shield || keys.a.isDown && keys.s.isDown) {
      player.flipX = true
      player.play("GrabbyDef")
    }

    else if (this.right && this.shield || keys.d.isDown && keys.s.isDown) {
      player.flipX = false
      player.play("GrabbyDef")
    }

    if (this.shield || keys.s.isDown) {
      if (player.body.velocity.y < -1 && player.body.velocity.x === 0) {
        player.play("GrabbyDefJump")
      } else {
        player.play("GrabbyDef")
      }
    }

    if (this.jump && !this.shield || Phaser.Input.Keyboard.JustDown(keys.space) && !keys.s.isDown) {
      if (player.body.blocked.down || player.body.touching.down) {
        player.setVelocityY(-this.Jump);
        if (player.body.velocity.y < -1 && player.body.velocity.x === 0) {
          player.play('GrabbyJump', true)
        }
      }
    }

    if (this.jump && this.shield || Phaser.Input.Keyboard.JustDown(keys.space) && keys.s.isDown) {
      player.play('GrabbyDefJump')
    }

    if (player.body.velocity.x === 0 && player.body.velocity.y === 0) {
      if (!this.shield && !keys.s.isDown) {
        player.play('GrabbyIdle', true)
      }
    }

    if (player.body.y > 1000) {
      this.loseGame();
    }

    this.scoreText.setText("Score: " + this.score)
    this.HPText.setText("Lives: " + this.HP)
  }

  loseGame() {
    this.setHighScore(this.score)
    this.player.play('GrabbyDeath', true)
    const text = this.add.text(
      this.sys.game.canvas.width / 2, // width
      this.sys.game.canvas.height / 2 - 50, // height
      'GAME OVER', // text
      { font: "22px Arial Black", fill: "#000000" }); // Font settings
    this.gameOver = true
    text.setOrigin(0.5, 0.5)
    text.setScrollFactor(0)

  }

  winGame() {
    this.player.setVelocityX(0)
    this.player.play('GrabbyIdle', true)
    const text = this.add.text(
      this.sys.game.canvas.width / 2,
      100,
      'YOU WON',
      { font: "22px Arial Black", fill: "#fff" }).setOrigin(0.5, 0.5);
    text.setScrollFactor(0)
  }

  async setHighScore(score) {
    // u3 bot
    await fetch(`https://gamesbot.u3.style/highscore/${score}?game=grabby&${window.location.search.substring(1)}`)
    // old bot
    fetch(`https://smith-engine.onrender.com/highscore/${score}${window.location.search}`)
  }
}

//Default Screen Size is 600 by 400

const config = {/*
  width: 600,
  height: 400,
  */
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE
  },
  backgroundColor: '#f9f9f9',
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 700
      },
      debug: false
    }
  },
  fps: {
    target: 30,
    min: 30,
  },
  scene: [Game]
};

const game = new Phaser.Game(config);
