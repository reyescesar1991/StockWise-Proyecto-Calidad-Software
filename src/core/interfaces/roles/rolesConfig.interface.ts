export interface IGetRolesResponse {
    _id: string,
    idRole: string,
    name: string,
    label: string,
    idConfigRole : string,
}

export interface IRoles {

    roles : IGetRolesResponse[]
}