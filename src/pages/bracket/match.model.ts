export class myMatch{
    id: any;
    data:any;
    time:any;
    constructor(){
        this.id='';
        this.data = new MatchData;
        this.time=null;

    }
}

export class MatchData{
    category:any = 'TBA';
    datetime:any = '';
    description:any = '';
    match_no:any = 'TBA';
    team1_id:any = 'TBA';
    team1_name:any = 'TBA';
    team1_score:any = 0;
    team2_id:any = 'TBA';
    team2_name:any = 'TBA';
    team2_score:any = 0;
    venue:any = 'TBA';
    zone:any = 'TBA';
}