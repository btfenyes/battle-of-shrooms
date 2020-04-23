import * as PIXI from 'pixi.js';
import Scroller from './Scroller';
import Player from './Player';
import Enemy from './Enemy';
import keyboard from './keyboard';
import Projectile from './Projectile';
import GameOverText from './GameOverText';
import * as constants from './constants';

export default class Game {
  private renderer: PIXI.Renderer;
  private stage: PIXI.Container = new PIXI.Container();
  private ticker: PIXI.Ticker = new PIXI.Ticker();

  private scroller: Scroller;
  private player: Player;
  private enemies: Array<Enemy> = [];
  private projectiles: Array<Projectile> = [];
  
  private shouldScrollLevel: boolean = true;
  private shouldSpawnEnemy: boolean = false;
  private shouldSpawnProjectile: boolean = false;
  private canSpawnProjectile: boolean = true;
  private enemySpawner: any;
  private enemySpawnTimer: number = 2000;

  private loopCounter: number = 0;

  public isRunning: boolean = true;
  
  private keys: any = {
    left: keyboard('ArrowLeft'),
    leftA: keyboard('a'),
    right: keyboard('ArrowRight'),
    rightD: keyboard('d'),
    up: keyboard('ArrowUp'),
    upW: keyboard('w'),
    down: keyboard('ArrowDown'),
    downS: keyboard('s'),
    space: keyboard(32)
  };


  constructor(private difficulty: string = 'easy'){
    const canvas = document.querySelector('canvas') || undefined;
    this.renderer = new PIXI.Renderer({
      view: canvas,
      width: constants.VIEW_WIDTH,
      height: constants.VIEW_HEIGHT
    });

    switch (this.difficulty) {
      case 'easy':
        this.enemySpawnTimer = 2000;
        break;
      case 'medium':
        this.enemySpawnTimer = 500;
        break;
      case 'hard':
        this.enemySpawnTimer =  200;
        break;
      default:
        break;
    }

    this.scroller = new Scroller(this.stage);
    this.player = new Player(this.stage);

    this.enemySpawner = setInterval(() => {
      this.shouldSpawnEnemy = true;
    }, this.enemySpawnTimer);

    this.ticker.add(this.gameloop.bind(this));
    this.ticker.start();
  }

  gameloop(){
    this.loopCounter += 1;

    this.checkPlayerState();
    this.checkEnemyState();
    this.checkProjectileState();
    
    this.filterSprites();

    this.checkPlayerMovement();

    this.enemyMovement();

    this.projectileMovement();
    
    this.checkCollision();

    this.scrollLevel();
   
    this.renderer.render(this.stage);
  }

  scrollLevel(){
    if(this.shouldScrollLevel){
      this.scroller.moveViewportXBy(constants.SCROLL_SPEED);
    }    
  }

  enemyMovement(){
    this.enemies.forEach(enemy => {
      if(this.loopCounter - enemy.getDirChangeSnapshot() > 45){
        enemy.setDirChangeSnapshot(this.loopCounter);
        enemy.setRandomYMovement();
      }
      enemy.moveForward(true);
    });
  }

  projectileMovement(){
    this.projectiles.forEach(projectile => {
      projectile.animate();
    });
  }

  checkCollision(){
    this.enemies.forEach(enemy => {
      if(this.hitTestRectangle(enemy, this.player) && !this.player.dead){
        enemy.explode();
        this.player.explode();
        new GameOverText('GAME OVER', this.stage);
      }
      this.projectiles.forEach(projectile => {
        if(this.hitTestRectangle(enemy, projectile)){
          enemy.explode();
          projectile.remove();
        }
      });
    });
  }

  checkPlayerMovement(){
    if(!this.player.dead){
      if(this.keys.left.isDown || this.keys.leftA.isDown){
        this.player.moveLeft();
      }
      if(this.keys.right.isDown || this.keys.rightD.isDown){
        this.player.moveRight();
      }
      if(this.keys.up.isDown || this.keys.upW.isDown){
        this.player.moveUp();
      }
      if(this.keys.down.isDown || this.keys.downS.isDown){
        this.player.moveDown();
      }
      if(this.keys.space.isDown){
        this.shouldSpawnProjectile = true;
      }
    }
  }
  
  checkPlayerState(){
    if(this.player.dead){
      this.gameOver();
    }
  }

  checkEnemyState(){
    if(this.shouldSpawnEnemy){
      this.enemies.push(new Enemy(this.stage));
      this.shouldSpawnEnemy = false;
    }
  }

  checkProjectileState(){
    if(this.canSpawnProjectile && this.shouldSpawnProjectile){
      this.projectiles.push(this.player.shoot());
      this.canSpawnProjectile = false;
      this.shouldSpawnProjectile = false;
      setTimeout(() => {
        this.canSpawnProjectile = true;
      }, 200);
    }
  }

  gameOver(){
    this.shouldSpawnEnemy = false;
    this.shouldScrollLevel = false;
    setTimeout(() => {
      this.ticker.stop();
      this.resetGameState();
    }, 3000);
  }

  filterSprites(){
    this.enemies = this.enemies.filter(enemy => !enemy.dead);
    this.projectiles = this.projectiles.filter(projectile => !projectile.dead);
  }

  hitTestRectangle(r1: any, r2: any) {
    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  
    //hit will determine whether there's a collision
    hit = false;
  
    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;
  
    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;
  
    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;
  
    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  
    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
  
      //A collision might be occurring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
  
        //There's definitely a collision happening
        hit = true;
      } else {
  
        //There's no collision on the y axis
        hit = false;
      }
    } else {
  
      //There's no collision on the x axis
      hit = false;
    }
  
    //`hit` will be either `true` or `false`
    return hit;
  }

  resetGameState(){
    this.isRunning = false;
  }
}