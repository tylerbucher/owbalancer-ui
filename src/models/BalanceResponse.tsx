import TablePlayer from "./TablePlayer";
import MetadataResponse from "./MetadataResponse";
import StatPlayer from "./StatPlayer";

interface BalanceResponseApi {
    version: string;
    userList: Array<Array<TablePlayer>>;
    balancerMeta: Array<MetadataResponse>;
}

class BalanceResponse {

    public readonly version: string;
    public readonly balanceList: Array<Array<TablePlayer>>;
    public readonly metadataList: Array<MetadataResponse>;

    constructor(inputString: string) {
        let jsonObj: BalanceResponseApi = JSON.parse(inputString);
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

export default BalanceResponse;