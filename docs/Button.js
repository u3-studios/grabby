export class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y)
        scene.add.existing(this)
        this.setScrollFactor(0)
        this.setTexture(texture)
        this.setOrigin(0.5)
        this.setInteractive()
        this.on('pointerdown', () => {
            this.tempscale = this.scale
            this.setScale(this.scale*0.8)
        })
        this.on('pointerout', () => {
            if (!this.tempscale) {
                return
            }
            this.setScale(this.tempscale)
        })
        this.on('pointerup', () => {
            if (!this.tempscale) {
                return
            }
            this.setScale(this.tempscale)
        })
    }
}