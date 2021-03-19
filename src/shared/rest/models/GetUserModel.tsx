export interface GetUserModelApi {
    email: string;
    username: string;
    active: boolean;
    permissions: Array<number>;
    playerCount: number;
    maxPlayersPerUser: number;
}

export default class GetUserModel implements GetUserModelApi {
    public email: string;
    public username: string;
    public active: boolean;
    public permissions: Array<number>;
    public playerCount: number;
    public maxPlayersPerUser: number;

    constructor(email: string, username: string, active: boolean, permissions: Array<number>, playerCount: number, maxPlayersPerUser: number) {
        this.email = email;
        this.username = username;
        this.active = active;
        this.permissions = permissions;
        this.playerCount = playerCount;
        this.maxPlayersPerUser = maxPlayersPerUser;
    }
}