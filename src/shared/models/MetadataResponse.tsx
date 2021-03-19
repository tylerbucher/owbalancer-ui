class MetadataResponse {
    public readonly balanceScore: number;
    public readonly balanceTime: number;
    public readonly team1TotalSr: number;
    public readonly team1AverageSr: number;
    public readonly team1TotalSrDistribution: number;
    public readonly team1TotalAverageSr: number;
    public readonly team2TotalSr: number;
    public readonly team2AverageSr: number;
    public readonly team2TotalSrDistribution: number;
    public readonly team2TotalAverageSr: number;
    public readonly team1PositionPreferenceCount: number;
    public readonly team2PositionPreferenceCount: number;
    public readonly totalSRDifference: number;

    constructor(balanceScore: number, balanceTime: number, team1TotalSr: number, team1AverageSr: number, team1TotalSrDistribution: number, team1TotalAverageSr: number, team2TotalSr: number, team2AverageSr: number, team2TotalSrDistribution: number, team2TotalAverageSr: number, team1Adaptability: number, team1TankAdaptability: number, team1DpsAdaptability: number, team1SupportAdaptability: number, team2Adaptability: number, team2TankAdaptability: number, team2DpsAdaptability: number, team2SupportAdaptability: number, team1PositionPreferenceCount: number, team2PositionPreferenceCount: number, totalSRDifference: number) {
        this.balanceScore = balanceScore;
        this.balanceTime = balanceTime;
        this.team1TotalSr = team1TotalSr;
        this.team1AverageSr = team1AverageSr;
        this.team1TotalSrDistribution = team1TotalSrDistribution;
        this.team1TotalAverageSr = team1TotalAverageSr;
        this.team2TotalSr = team2TotalSr;
        this.team2AverageSr = team2AverageSr;
        this.team2TotalSrDistribution = team2TotalSrDistribution;
        this.team2TotalAverageSr = team2TotalAverageSr;
        this.team1PositionPreferenceCount = team1PositionPreferenceCount;
        this.team2PositionPreferenceCount = team2PositionPreferenceCount;
        this.totalSRDifference = totalSRDifference;
    }
}

export default MetadataResponse;