import Projectile from "./Projectile";
import * as constants from './constants';
import * as PIXI from 'pixi.js';
import Particles from "./Particles";

export default class Player extends PIXI.Sprite {
  public dead: Boolean  = false;

  constructor(private stage: PIXI.Container){
    super(PIXI.Texture.from('../dist/assets/player-ship-2.png'));
    this.position.x = 20;
    this.width = 100;
    this.height = 45;
    this.position.y = 200;
    this.stage = stage;
    this.stage.addChild(this);
  }

  moveUp(){
    if(this.position.y > 5){
      this.position.y -= constants.PLAYER_MOVEMENT_UNIT; 
    } else {
      this.position.y = 5;
    }
  }

  moveDown(){
    if(this.position.y + this.height < constants.VIEW_HEIGHT){
      this.position.y += constants.PLAYER_MOVEMENT_UNIT; 
    } else {
      this.position.y = constants.VIEW_HEIGHT - this.height;
    }
  }

  moveLeft(){
    if(this.position.x > 5){
      this.position.x -= constants.PLAYER_MOVEMENT_UNIT;
    } else {
      this.position.x = 5;
    }
  }

  moveRight(){
    if(this.position.x + this.width < constants.VIEW_WIDTH){
      this.position.x += constants.PLAYER_MOVEMENT_UNIT; 
    } else {
      this.position.x = constants.VIEW_WIDTH - this.width;
    }        
  }

  shoot(){
    return new Projectile(this.stage, this);
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