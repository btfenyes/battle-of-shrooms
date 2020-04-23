import * as PIXI from 'pixi.js';
import Game from "./Game";

const splashLogo = document.getElementById('splash-logo')!;
const astronautImg = document.getElementById('astronaut-img')!;
const container = document.getElementById('container')!;
const canvas = document.getElementById('canvas')!;
const buttonContainer = document.getElementById('button-container')!;

const gameOneButton = document.getElementById('game-1')!;
const gameTwoButton = document.getElementById('game-2')!;
const gameThreeButton = document.getElementById('game-3')!;
const exitButton = document.getElementById('exit')!;

const gameOneTooltip = document.getElementById('game-1-tooltip')!;
const gameTwoTooltip = document.getElementById('game-2-tooltip')!;
const gameThreeTooltip = document.getElementById('game-3-tooltip')!;

const initGame = (difficulty: string) => {
  buttonContainer.style.display = 'none';
  canvas.style.display = 'inline';

  const game = new Game(difficulty);

  const checkGameState = (game: any, ticker: any) => {
    if(!game.isRunning){
      game = null;
      ticker.stop();
      canvas.style.display = 'none';
      buttonContainer.style.display = 'grid';
    }
  };

  const ticker = new PIXI.Ticker();
  ticker.add(() => checkGameState(game, ticker));
  ticker.start();
}

gameOneButton.addEventListener('click', () => initGame('easy'));
gameTwoButton.addEventListener('click', () => initGame('medium'));
gameThreeButton.addEventListener('click', () => initGame('hard'));

gameOneButton.addEventListener('mouseenter', () => gameOneTooltip.style.visibility = 'visible');
gameOneButton.addEventListener('mouseleave', () => gameOneTooltip.style.visibility = 'hidden');
gameTwoButton.addEventListener('mouseenter', () => gameTwoTooltip.style.visibility = 'visible');
gameTwoButton.addEventListener('mouseleave', () => gameTwoTooltip.style.visibility = 'hidden');
gameThreeButton.addEventListener('mouseenter', () => gameThreeTooltip.style.visibility = 'visible');
gameThreeButton.addEventListener('mouseleave', () => gameThreeTooltip.style.visibility = 'hidden');

exitButton.addEventListener('click', () => {
  window.location.reload();
});

window.onload = () => {
  buttonContainer.style.display = 'none';
  canvas.style.display = 'none';
  splashLogo.style.opacity = '0';
  gameOneTooltip.style.visibility = 'hidden';
  gameTwoTooltip.style.visibility = 'hidden';
  gameThreeTooltip.style.visibility = 'hidden';
  setTimeout(() => {
    splashLogo.style.display = 'none';
    buttonContainer.style.display = 'grid';
  }, 4000);
};