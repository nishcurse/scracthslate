import {BoardObject} from "@/types/board"
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
; 