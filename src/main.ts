import Modules from './modules/modules';

class Game extends Modules{
  public start(): number {
    return this.map.showLength();
  }
}

console.log(new Game().start());