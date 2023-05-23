export class stopsDTO {
    stopName: string

    pickupDate: Date
    constructor(stopName: string, pickupDate: Date) {
        this.stopName = stopName
        this.pickupDate = pickupDate
    }
}