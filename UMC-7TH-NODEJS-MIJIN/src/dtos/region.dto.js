export class RegionDTO {
    constructor(regionName) {
      this.regionName = regionName;
    }
  
    static fromRequestBody(body) {
      return new RegionDTO(body.regionName);
    }
  }
  