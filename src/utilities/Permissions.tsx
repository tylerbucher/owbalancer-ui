export const IS_USER_SUPER_ADMIN = 0;
export const IS_USER_ADMIN = 1;
export const CAN_USER_INVITE = 2;
export const CAN_USER_MOD_INVITE = 3;
export const CAN_USER_DELETE_INVITE = 4;
export const CAN_USER_MOD_USERS = 5;
export const CAN_USER_DELETE_USERS = 6;
export const CAN_USER_BALANCE = 7;
export const CAN_USER_ADD_PLAYER = 8;
export const CAN_USER_MOD_PLAYER = 9;
export const CAN_USER_DELETE_PLAYER = 10;


export function isAdmin(permissions: Array<number>): boolean {
    return containsAny(permissions, [
        IS_USER_SUPER_ADMIN,
        IS_USER_ADMIN
    ]);
}

export function canSeeBalancerTab(permissions: Array<number>): boolean {
    return containsAny(permissions, [
        IS_USER_SUPER_ADMIN,
        IS_USER_ADMIN,
        CAN_USER_BALANCE
    ]);
}

export function canSeeAddPlayersTab(permissions: Array<number>): boolean {
    return true;
}

export function canAddMorePlayers(permissions: Array<number>): boolean {
    return containsAny(permissions, [
        IS_USER_SUPER_ADMIN,
        IS_USER_ADMIN,
        CAN_USER_ADD_PLAYER
    ]);
}

export function canSeeManagePlayersTab(permissions: Array<number>): boolean {
    return containsAny(permissions, [
        IS_USER_SUPER_ADMIN,
        IS_USER_ADMIN,
        CAN_USER_MOD_PLAYER,
        CAN_USER_DELETE_PLAYER
    ]);
}

export function canSeeSettingsTab(permissions: Array<number>): boolean {
    return true;
    /*return containsAny(permissions, [
        IS_USER_SUPER_ADMIN,
        IS_USER_ADMIN,
        CAN_USER_INVITE,
        CAN_USER_MOD_INVITE,
        CAN_USER_DELETE_INVITE,
        CAN_USER_MOD_USERS,
        CAN_USER_DELETE_USERS
    ]);*/
}

export function canInviteUsers(permissions: Array<number>): boolean {
    return containsAny(permissions, [
        IS_USER_SUPER_ADMIN,
        IS_USER_ADMIN,
        CAN_USER_INVITE
    ]);
}

export function canModifyInvites(permissions: Array<number>): boolean {
    return containsAny(permissions, [
        IS_USER_SUPER_ADMIN,
        IS_USER_ADMIN,
        CAN_USER_MOD_INVITE,
        CAN_USER_DELETE_INVITE
    ]);
}

export function internalCanModifyInvites(permissions: Array<number>): boolean {
    return containsAny(permissions, [
        IS_USER_SUPER_ADMIN,
        IS_USER_ADMIN,
        CAN_USER_MOD_INVITE,
    ]);
}

export function internalCanDeleteInvites(permissions: Array<number>): boolean {
    return containsAny(permissions, [
        IS_USER_SUPER_ADMIN,
        IS_USER_ADMIN,
        CAN_USER_DELETE_INVITE
    ]);
}

export function canModifyUsers(permissions: Array<number>): boolean {
    return containsAny(permissions, [
        IS_USER_SUPER_ADMIN,
        IS_USER_ADMIN,
        CAN_USER_MOD_USERS,
        CAN_USER_DELETE_USERS
    ]);
}

export function internalCanModifyUsers(permissions: Array<number>): boolean {
    return containsAny(permissions, [
        IS_USER_SUPER_ADMIN,
        IS_USER_ADMIN,
        CAN_USER_MOD_USERS
    ]);
}

export function internalCanDeleteUsers(permissions: Array<number>): boolean {
    return containsAny(permissions, [
        IS_USER_SUPER_ADMIN,
        IS_USER_ADMIN,
        CAN_USER_DELETE_USERS
    ]);
}

export function internalCanDeletePlayers(permissions: Array<number>): boolean {
    return containsAny(permissions, [
        IS_USER_SUPER_ADMIN,
        IS_USER_ADMIN,
        CAN_USER_DELETE_PLAYER
    ]);
}

function containsAny(permissionArray: Array<number>, checkPerms: Array<number>): boolean {
    for (let i = 0; i < checkPerms.length; i++) {
        if (permissionArray.includes(checkPerms[i])) {
            return true;
        }
    }
    return false;
}