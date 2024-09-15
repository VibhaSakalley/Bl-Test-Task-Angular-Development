export interface Group {
    image? : string,
    groupName : string,
    totalMembers : number,
    totalCost : string,
    groupDescription : string,
    costManagement : string,
    settledCost : string
}

export interface State {
    name? : string,
    action? : string
}

export interface User {
    user_name : string,
    user_password : string,
    user_role : string
}
