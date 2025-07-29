export interface ICreateUserRequest {

    idUser: string,
    name: string,
    lastName: string,
    codeCountry: string,
    phoneNumber: string,
    email: string,
    password: string,
    username: string,
    status ?: string,
    hasTwoFactor ?: boolean,
    department: string,
    roleConfig: string,
}