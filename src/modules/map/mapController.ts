import MapService from './mapService';

export default class MapController {
  constructor(
    private mapService = new MapService()
  ) {}
  public showLength() {
    return this.mapService.getMapLength();
  }
}