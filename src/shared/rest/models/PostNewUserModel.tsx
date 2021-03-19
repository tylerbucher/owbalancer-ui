export interface PostNewUserModelApi {
    email: string;
    username: string;
    password: string;
    passwordConfirm: string;
}

export class PostNewUserModel implements PostNewUserModelApi {

    public email: string;
    public username: string;
    public password: string;
    public passwordConfirm: string;

    constructor(email: string, username: string, password: string, passwordConfirm: string) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
    }
}