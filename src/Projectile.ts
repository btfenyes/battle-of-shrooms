import Player from "./Player";
import * as PIXI from 'pixi.js';

export default class Projectile extends PIXI.Sprite {
  public dead: Boolean = false;

  constructor(private stage: PIXI.Container, private ship: Player){
    super(PIXI.Texture.from('../dist/assets/projectile.png'));
    this.position.x = ship.position.x + ship.width;
    this.position.y = ship.position.y + ship.height;
    this.width = 50;
    this.height = 10;
    this.stage = stage;
    this.stage.addChild(this);
  }

  positionCheck(){
    if(this.position.x >= this.stage.width - this.width){
      return true;
    }
    return false;
  }

  animate(){
    this.position.x += 20;
    if(this.positionCheck()){
      this.remove();
    }
  }
  
  remove(){
    this.dead = true;
    this.stage.removeChild(this);
  }
}