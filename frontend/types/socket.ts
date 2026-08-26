import {BoardObject} from "@/types/board"

export type PresenceUser = {
    id: string;
    name: string;
    email: string;
    picture: string | null;
};


export type serverEvent = 
{
    type: "object:create";   
    object: BoardObject ; 
}
    |
{
    type : "object:update"; 
    id : string; 
    changes: Partial<BoardObject>;
}
    |
{
    type : "board:snapshot"; 
    objects : Record<string, BoardObject>; 
}
    |
{
    type : "object:delete"; 
    id : string;   
}
    |
{
    type : "stroke:append"; 
    id : string; 
    points : number[];
}
    |
{
    type : "object:commit"; 
    id : string;   
}
    |
{
    type: "presence:snapshot";
    users: PresenceUser[];
}
| {
    type: "presence:join";
    user: PresenceUser;
}
| {
    type: "presence:leave";
    user: PresenceUser;
}
| {
    type: "presence:cursor";
    user?: PresenceUser;
    x: number;
    y: number;
}
; 