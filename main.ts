namespace SpriteKind {
    export const gas = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Dart1`, mySprite, 0, -150)
    mySprite.startEffect(effects.fire, 100)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.spray, 100)
    otherSprite.destroy()
    info.changeScoreBy(1)
    if (info.score() == 10) {
        info.changeScoreBy(5)
        mySprite.sayText("+ 5 level up bonus", 2000, false)
        enemy_speed = 70
    }
    if (info.score() == 25) {
        info.changeScoreBy(5)
        mySprite.sayText("+ 5 level up bonus", 2000, false)
        enemy_speed = 80
    }
    if (info.score() == 35) {
        info.changeScoreBy(5)
        mySprite.sayText("+ 5 level up bonus", 2000, false)
        enemy_speed = 90
    }
    if (info.score() == 40) {
        info.changeScoreBy(5)
        mySprite.sayText("+ 5 level up bonus")
    }
    if (info.score() == 50) {
        game.over(true)
    }
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.spray, 500)
    scene.cameraShake(4, 500)
})
let myenemy: Sprite = null
let myfuel: Sprite = null
let projectile: Sprite = null
let enemy_speed = 0
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
game.splash("the space wars")
game.setDialogCursor(assets.image`UFO`)
scene.setBackgroundImage(assets.image`Galaxy`)
scroller.scrollBackgroundWithSpeed(0, 10)
mySprite = sprites.create(assets.image`Blue Rocket`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
animation.runImageAnimation(
mySprite,
assets.animation`Flying Blue`,
200,
true
)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -30, 0)
enemy_speed = 50
game.onUpdateInterval(5000, function () {
    myfuel = sprites.createProjectileFromSide(assets.image`Fuel`, 0, 80)
    myfuel.x = randint(5, 115)
    myfuel.setKind(SpriteKind.gas)
})
game.onUpdateInterval(2000, function () {
    myenemy = sprites.createProjectileFromSide(assets.image`Stealth`, 0, enemy_speed)
    myenemy.x = randint(5, 115)
    myenemy.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    myenemy,
    assets.animation`Flying Stealth`,
    100,
    true
    )
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
