import {useBoardStore} from "@/stores/board-store"
import { use } from "react";
export const scalePoints = (
    points : number[], 
    scaleX : number, 
    scaleY : number,
) => {
    return points.map((value, index) => {
        return index % 2 == 0 
        ? value * scaleX
        : value * scaleY;
    });
}
export const getLineCenter = (points : number[]) => {
    const [x1, y1, x2, y2] = points; 
    return {
        x : (x1 + x2) / 2 , 
        y : (y1 + y2) / 2, 
    }; 
};
