import Map from './map/mapModule';

export default class Modules {
  constructor(
    public map = new Map()
  ){}
}

