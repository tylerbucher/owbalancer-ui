import React from "react";

export const DiscordNameHelperText = <i>The user's Discord username. Please refrain from adding the Discord id tag.
    (Example: TheLegend27, Not TheLegend27#1264)</i>;

export const OverwatchNamesHelperText1 = <i>The User's in-game name(s). Please refrain from adding
    the blizzard id tag.
    (Example: WRAITH, Not WRAITH#15678)</i>;

export const OverwatchNamesHelperText2 = <i>This is a multi tag input
    field. After typing the desired input hit enter to create a tag.
    Only tags are saved to the database. Any input left in the filed that is
    not a tag will be removed</i>;

export class RolePriority {
    readonly fullName: string;
    readonly shortName: string;
    readonly value: number;


    constructor(fullName: string, shortName: string, value: number) {
        this.fullName = fullName;
        this.shortName = shortName;
        this.value = value;
    }
}

export const PrimaryRolePriority = new RolePriority("Preferred", "PFD", 2);
export const SecondaryRolePriority = new RolePriority("Fill", "FLL", 1);
export const NonRolePriority = new RolePriority("Avoid", "AVD", 0);

export const roleToolTip = `"${PrimaryRolePriority.fullName} (${PrimaryRolePriority.shortName})" is an option reserved for the role a player will want to primarily play or 
insta-lock. "${SecondaryRolePriority.fullName} (${SecondaryRolePriority.shortName})" is a secondary option for players who can play another role if they can not play 
their ${PrimaryRolePriority.shortName} role. "${NonRolePriority.fullName} (${NonRolePriority.shortName})" is an option which should only be select if a user absolutely can not or does 
not want to play the role in question. A player should have one and only one ${PrimaryRolePriority.shortName} role, the only exception is if a 
player wants to play all roles and will let others pick first; in which case select ${SecondaryRolePriority.shortName} for all roles.`;