export interface GetInviteModelApi {
    email: string;
    permissions: Array<number>;
}

export class GetInviteModel implements GetInviteModelApi {
    public email: string;
    public permissions: Array<number>;

    constructor(email: string, permissions: Array<number>) {
        this.email = email;
        this.permissions = permissions;
    }
}