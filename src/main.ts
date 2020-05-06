import Modules from './modules/modules';

class Game extends Modules{
  public start(): void {
    console.log("游戏加载完成!");
  }
}

new Game().start();