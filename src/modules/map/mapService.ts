import {MAP_WIDTH, MAP_LENGTH} from './mapEntity';

export default class MapService {
  public getMapLength() {
    return MAP_LENGTH;
  }
  public getMapWidth() {
    return MAP_WIDTH;
  }
}