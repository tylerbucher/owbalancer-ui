export interface PatchNewInviteModelApi {
    email: string;
    newEmail: string;
    permissions: Array<number>;
}

export class PatchNewInviteModel implements PatchNewInviteModelApi {
    public email: string;
    public newEmail: string;
    public permissions: Array<number>;

    constructor(email: string, newEmail: string, permissions: Array<number>) {
        this.email = email;
        this.newEmail = newEmail;
        this.permissions = permissions;
    }
}