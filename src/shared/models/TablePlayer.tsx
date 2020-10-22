import StatPlayer from "./StatPlayer";
import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import {NonRolePriority, PrimaryRolePriority, SecondaryRolePriority} from "../forms/FormData";

class TablePlayer {
    public readonly team: number;
    public readonly position: number;
    public readonly user: StatPlayer;

    constructor(team: number, position: number, user: StatPlayer) {
        this.team = team;
        this.position = position;
        this.user = user;
    }

    getPositionName() {
        return this.position === 0 ? "Tank" : this.position === 1 ? "DPS" : "Support";
    }

    getPositionSr() {
        return this.position === 0 ? this.user.tankSr : this.position === 1 ? this.user.dpsSr : this.user.supportSr;
    }

    private static withTooltip(item: JSX.Element, title: string): JSX.Element {
        return <Tooltip title={title} placement="right">{item}</Tooltip>
    }

    private static getIconPriority(val: number) {
        return val === 2 ? TablePlayer.withTooltip(PrimaryRolePriority.icon, PrimaryRolePriority.fullName) :
            val === 1 ? TablePlayer.withTooltip(SecondaryRolePriority.icon, SecondaryRolePriority.fullName) :
                TablePlayer.withTooltip(NonRolePriority.icon, NonRolePriority.fullName);
    }

    getTankPosIcon() {
        return TablePlayer.getIconPriority(this.user.tankPreference);
    }

    getDpsPosIcon() {
        return TablePlayer.getIconPriority(this.user.dpsPreference);
    }

    getSupportPosIcon() {
        return TablePlayer.getIconPriority(this.user.supportPreference);
    }
}

export default TablePlayer;