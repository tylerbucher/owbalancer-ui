import TablePlayer from "../../models/TablePlayer";
import MetadataResponse from "../../models/MetadataResponse";
import StatPlayer from "../../models/StatPlayer";

interface BalanceResponseModelApi {
    version: string;
    userList: Array<Array<TablePlayer>>;
    balancerMeta: Array<MetadataResponse>;
}

export class BalanceResponseModel {

    public readonly version: string;
    public readonly balanceList: Array<Array<TablePlayer>>;
    public readonly metadataList: Array<MetadataResponse>;

    constructor(inputString: string) {
        let jsonObj: BalanceResponseModelApi = JSON.parse(inputString);
        this.version = jsonObj.version;

        this.balanceList = new Array<Array<TablePlayer>>();
        jsonObj.userList.forEach((arr, index)=>{
            arr.forEach((value => {
                let tablePlayer = new TablePlayer(0, 0, new StatPlayer(0, "", 0, 0, 0, 0, 0, 0, 0));
                Object.assign(tablePlayer, value);

                if(this.balanceList[index] === undefined) {
                    this.balanceList[index] = new Array<TablePlayer>();
                }
                this.balanceList[index].push(tablePlayer);
            }));
        });

        this.metadataList = new Array<MetadataResponse>();
        jsonObj.balancerMeta.forEach((val)=>{
            let metadataObj = new MetadataResponse(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
            Object.assign(metadataObj, val);
            this.metadataList.push(metadataObj)
        });
    }
}