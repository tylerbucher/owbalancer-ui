export interface PostNewInviteModelApi {
    email: string;
    permissions: Array<number>;
}

export class PostNewInviteModel implements PostNewInviteModelApi {
    public email: string;
    public permissions: Array<number>;

    constructor(email: string, permissions: Array<number>) {
        this.email = email;
        this.permissions = permissions;
    }
}