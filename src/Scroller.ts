import FarBack from './FarBack';
import MidBack from './MidBack';
import CloseBack from './CloseBack';
import * as PIXI from 'pixi.js';

export default class Scroller {
  private farBack: FarBack = new FarBack();
  private midBack: MidBack = new MidBack()
  private closeBack: CloseBack = new CloseBack();
  viewPortX: number = 0;

  constructor(stage: PIXI.Container){
    stage.addChild(this.farBack);
    stage.addChild(this.midBack);
    stage.addChild(this.closeBack);
  }

  update(){
    this.farBack.update();
    this.midBack.update();
    this.closeBack.update();
  }

  setViewportX(viewPortX: number){
    this.viewPortX = viewPortX;
    this.farBack.setViewportX(viewPortX);
    this.midBack.setViewportX(viewPortX);
    this.closeBack.setViewportX(viewPortX);
  }

  getViewportX(){
    return this.viewPortX;
  }

  moveViewportXBy(units: number){
    const newViewportX = this.viewPortX + units;
    this.setViewportX(newViewportX);
  }
}