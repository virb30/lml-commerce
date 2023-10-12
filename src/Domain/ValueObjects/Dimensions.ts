export class Dimensions {

    constructor(
        private readonly height: number,
        private readonly width: number,
        private readonly length: number
    ) {
        if(height <= 0 || width <= 0 || length <= 0) {
          throw new Error("Invalid values")
        }
    }

    public getVolume(): number
    {
        return this.height * this.width * this.length
    } 

}