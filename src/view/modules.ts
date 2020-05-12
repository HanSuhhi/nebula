import { World } from "./world/world";

export default class Modules {
  constructor(private world = new World()) {}
}
