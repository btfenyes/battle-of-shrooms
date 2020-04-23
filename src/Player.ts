import Projectile from "./Projectile";
import * as constants from './constants';
import * as PIXI from 'pixi.js';
import Particles from "./Particles";

export default class Player extends PIXI.Sprite {
  public dead: Boolean  = false;

  constructor(private stage: PIXI.Container){
    super(PIXI.Texture.from('../assets/player-ship-2.png'));
    this.position.x = 20;
    this.width = 100;
    this.height = 45;
    this.position.y = 200;
    this.stage = stage;
    this.stage.addChild(this);
  }

  moveUp(){
    if(this.position.y > 5){
      this.position.y -= constants.PLAYER_MOVEMENT_SPEED; 
    } else {
      this.position.y = 5;
    }
  }

  moveDown(){
    if(this.position.y + this.height < 595){
      this.position.y += constants.PLAYER_MOVEMENT_SPEED; 
    } else {
      this.position.y = 595 - this.height;
    }
  }

  moveLeft(){
    if(this.position.x > 5){
      this.position.x -= constants.PLAYER_MOVEMENT_SPEED;
    } else {
      this.position.x = 5;
    }
  }

  moveRight(){
    if(this.position.x + this.width < 795){
      this.position.x += constants.PLAYER_MOVEMENT_SPEED; 
    } else {
      this.position.x = 795 - this.width;
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