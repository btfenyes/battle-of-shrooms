import * as constants from './constants';
import * as PIXI from 'pixi.js';
import Particles from './Particles';

export default class Enemy extends PIXI.Sprite {
  dead: Boolean = false;
  private yDirection: number = 0;  
  private dirChangeSnapshot: number = 0;
  
  constructor(private stage: PIXI.Container){
    super(PIXI.Texture.from('../dist/assets/enemy-1.png'));
    this.width = 75;
    this.height = 60;
    this.position.x = 800;
    this.position.y = Math.floor(Math.random() * (595 - this.height)) + 5;

    this.stage = stage;
    this.stage.addChild(this);
  }

  moveForward(withRandom: boolean = false){
    if(this.position.x > 0 - this.width){
      this.position.x -= constants.ENEMY_MOVEMENT_UNIT;
      if(withRandom){
        this.yMovement();
      }
    }
    if(this.reachedEndCheck()){
      this.remove();
    }
  }

  yMovement(){
    switch (this.yDirection) {
      case 1:
        if(this.position.y > this.height){
          this.position.y -= constants.ENEMY_MOVEMENT_UNIT;
        }        
        break;
      case 2:
        if(this.position.y < 600 - this.height){
          this.position.y += constants.ENEMY_MOVEMENT_UNIT;
        }
        break;
      case 3:
      default:
        break;
    }
  }

  setRandomYMovement(){
    this.yDirection = Math.floor(Math.random() * 3) + 1;    
  }
  
  reachedEndCheck(){
    if(this.position.x <= 0 - this.width){
      return true;
    }
    return false;
  }

  setDirChangeSnapshot(snapshot: number){
    this.dirChangeSnapshot = snapshot;
  }

  getDirChangeSnapshot(){
    return this.dirChangeSnapshot;
  }

  explode(){
    this.stage.addChild(new Particles(this));
    this.remove();
  }
  
  remove(){
    this.dead = true;    
    this.stage.removeChild(this);
  }
}