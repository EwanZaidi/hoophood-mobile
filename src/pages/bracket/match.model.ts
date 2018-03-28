export class myMatch{
    id: any;
    data:any;
    constructor(){
        this.id='';
        this.data = new MatchData;
    }
}

export class MatchData{
    category:any = '';
    datetime:any = '';
    description:any = '';
    match_no:any = '';
    team1_id:any = '';
    team1_name:any = 'TBA';
    team1_score:any = '';
    team2_id:any = '';
    team2_name:any = 'TBA';
    team2_score:any = '';
    venue:any = '';
    zone:any = '';
}