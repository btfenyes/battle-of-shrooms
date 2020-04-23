import * as PIXI from 'pixi.js';

export default class MidBack extends PIXI.TilingSprite {
  DELTA_X = 0.32;
  viewportX: number = 0;

  constructor(){
    super(PIXI.Texture.from('../dist/assets/mid-back.png'), 800, 1024);
    this.position.x = 0;
    this.position.y = 155;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;
  }

  update(){
    this.tilePosition.x -= this.DELTA_X;
  }
  
  setViewportX(newViewportX: number){
    const distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * this.DELTA_X);
  }
}