export interface ISignInPayload  {
    username:string;
    password:string;
}

export interface ISignInResponsePayload {
    token:string;
}

export interface IAdminAuth {
    isLoggedIn: boolean;
}
