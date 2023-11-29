export default class Map {
  private _mapData: any;
  cities: any = [];
  currentInTake: number = 40;
  LongestLength: number = -1;
  refactoredCityData: any = {};

  constrctor(mapData: any) {
    this.setMapData(mapData);
    // this.createRefactoredCityArray();
    this.sortByBlockNumber();
    // this.setLongestCityLength();
  }

  destructuredData() {
    let cites = this._mapData.city;
    for (let city in cities) {
      this.cities.push(city);
    }
  }

  setMapData(mapData: any) {
    this._mapData = mapData;
    this.destructuredData();
  }

  sortByBlockNumber() {
    this.cities.forEach((city: string) => {});
  }
}
