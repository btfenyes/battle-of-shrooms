import * as PIXI from 'pixi.js';

export default class CloseBack extends PIXI.TilingSprite {
  DELTA_X = 0.64;
  viewportX: number = 0;

  constructor(){
    super(PIXI.Texture.from('../assets/close-back.png'), 800, 600);
    this.position.x = 0;
    this.position.y = 320;
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