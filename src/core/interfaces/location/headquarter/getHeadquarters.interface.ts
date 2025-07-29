export interface IHeadquarterResponse {

    _id: string,
    idHeadquarter: string,
    label: string,
    name: string
}

export interface IHeadquarters {

    headquarters: IHeadquarterResponse[]
}

export interface IHeadquarterIdRequest {

    idHeadquarter: string
}