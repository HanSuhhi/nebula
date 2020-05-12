import { BaseService } from "../../../base/baseService";

export default class TimeService extends BaseService {
  constructor() {
    super();
    this.create("time");
    // this.setVariate("author", "HanSuhhi");
  }
}
