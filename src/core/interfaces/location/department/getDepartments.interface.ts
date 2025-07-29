export interface IDepartmentResponse {

    _id: string,
    idDepartment: string,
    label: string,
    name: string,
    description ?: string;
}

export interface IDepartments {

    departments: IDepartmentResponse[]
}