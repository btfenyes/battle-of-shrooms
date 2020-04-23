import * as PIXI from 'pixi.js';
import Player from './Player';
import Enemy from './Enemy';
import * as constants from './constants';

export default class Particles extends PIXI.ParticleContainer {
  particles: Array<PIXI.Sprite> = [];
  private ticker: PIXI.Ticker = new PIXI.Ticker();
  private timer: number = 0;

  constructor(private ship: Player | Enemy){
    super(16, {
      position: true
    });

    for(let i = 0; i < 16; i++){      
      const sprite = (PIXI.Sprite.from('../assets/particle.png'));
      sprite.x = ship.x;
      sprite.y = ship.y;
      sprite.width = 10;
      sprite.height = 10;
      this.particles.push(this.addChild(sprite));
    }
    this.ticker.add(this.animate.bind(this));
    this.ticker.start();
  }

  animate(){    
    this.particles[4].x += constants.PARTICLE_MOVEMENT_UNIT;

    this.particles[5].y -= constants.PARTICLE_MOVEMENT_UNIT;

    this.particles[6].x -= constants.PARTICLE_MOVEMENT_UNIT;

    this.particles[7].y += constants.PARTICLE_MOVEMENT_UNIT;

    if(this.timer >= 10){
      this.particles[0].x += constants.PARTICLE_MOVEMENT_UNIT;
      this.particles[0].y += constants.PARTICLE_MOVEMENT_UNIT;
  
      this.particles[1].x += constants.PARTICLE_MOVEMENT_UNIT;
      this.particles[1].y -= constants.PARTICLE_MOVEMENT_UNIT;
  
      this.particles[2].x -= constants.PARTICLE_MOVEMENT_UNIT;
      this.particles[2].y -= constants.PARTICLE_MOVEMENT_UNIT;
  
      this.particles[3].x -= constants.PARTICLE_MOVEMENT_UNIT;
      this.particles[3].y += constants.PARTICLE_MOVEMENT_UNIT;  
    }

    if(this.timer >= 15){
      this.particles[8].x += constants.PARTICLE_MOVEMENT_UNIT;
      this.particles[8].y += constants.PARTICLE_MOVEMENT_UNIT / 2;
  
      this.particles[9].x += constants.PARTICLE_MOVEMENT_UNIT;
      this.particles[9].y -= constants.PARTICLE_MOVEMENT_UNIT / 2;
  
      this.particles[10].x -= constants.PARTICLE_MOVEMENT_UNIT;
      this.particles[10].y -= constants.PARTICLE_MOVEMENT_UNIT / 2;
  
      this.particles[11].x -= constants.PARTICLE_MOVEMENT_UNIT;
      this.particles[11].y += constants.PARTICLE_MOVEMENT_UNIT / 2;  

      this.particles[12].x += constants.PARTICLE_MOVEMENT_UNIT / 2;
      this.particles[12].y += constants.PARTICLE_MOVEMENT_UNIT;
  
      this.particles[13].x += constants.PARTICLE_MOVEMENT_UNIT / 2;
      this.particles[13].y -= constants.PARTICLE_MOVEMENT_UNIT;
  
      this.particles[14].x -= constants.PARTICLE_MOVEMENT_UNIT / 2;
      this.particles[14].y -= constants.PARTICLE_MOVEMENT_UNIT;
  
      this.particles[15].x -= constants.PARTICLE_MOVEMENT_UNIT / 2;
      this.particles[15].y += constants.PARTICLE_MOVEMENT_UNIT;  
    }

    if(this.timer >= 30){
      this.particles.forEach(particle => {
        this.removeChild(particle);
      });
      this.ticker.destroy();
    }

    this.timer += 1;
  }
}