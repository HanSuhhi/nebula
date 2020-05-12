import TimeModule from "../../modules/tool/time/timeModule";
import { VDOM } from "../../vdom";
import ButtonModule from "../../modules/tool/button/buttonModule";

export class World {
  constructor(
    private time = new TimeModule(),
    private button = new ButtonModule()
  ) {
    time.setVariate("author", "playBoy");
    // button.setVariate("name", "hello");
    const vdom = new VDOM(time.getNode()).render();
    // const vdom1 = new VDOM(button.getNode()).render();
  }
}
