export interface PatchUserModelApi{
    email: string;
    username: string;
    active: boolean;
    password: string;
    permissions: Array<number>;
}

export class PatchUserModel implements PatchUserModelApi {

    public email: string;
    public username: string;
    public active: boolean;
    public password: string;
    public permissions: Array<number>;

    constructor(email: string, username: string, active: boolean, password: string, permissions: Array<number>) {
        this.email = email;
        this.username = username;
        this.active = active;
        this.password = password;
        this.permissions = permissions;
    }
}