import MapService from './mapService';

export default class MapController {
  constructor(
    private mapService = new MapService()
  ) {}
  public initMap() {
    return 0;
  }
}