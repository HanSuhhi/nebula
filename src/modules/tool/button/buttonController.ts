import { BaseService } from "../../../base/baseService";

export default class ButtonController extends BaseService {
  constructor() {
    super();
    this.create("button");
    console.log(this.getvariates());
  }
}
