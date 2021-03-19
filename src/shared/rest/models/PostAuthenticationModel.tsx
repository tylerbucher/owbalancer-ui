export interface PostAuthenticationModelApi {
    email: string;
    password: string;
    rememberMe: boolean;
}

export class PostAuthenticationModel implements PostAuthenticationModelApi {
    public email: string;
    public password: string;
    public rememberMe: boolean;

    constructor(email: string, password: string, rememberMe: boolean) {
        this.email = email;
        this.password = password;
        this.rememberMe = rememberMe;
    }
}