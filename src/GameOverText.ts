import * as PIXI from 'pixi.js';
import * as constants from './constants';

export default class GameOverText extends PIXI.Text {
  constructor(public text: string, private stage: PIXI.Container){
    super(text, {fontFamily: 'Bangers', fontSize: 90, fill: '#f1cb54', align: 'center', stroke: '#076886', strokeThickness: 4});
    this.x = constants.VIEW_WIDTH / 2 - this.width / 2;
    this.y = constants.VIEW_HEIGHT / 2 - this.height / 2;

    this.stage.addChild(this);
  }
}