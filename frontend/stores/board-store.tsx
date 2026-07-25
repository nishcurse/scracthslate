import { create } from "zustand"; 

import {BoardObject} from "@/types/board"; 

type BoardStore = {
    objects : Record<string, BoardObject>; 

    addObject: (object : BoardObject) => void; 

    updateObject : (
        id: string, 
        changes : Partial<BoardObject> 
    ) => void; 

    removeObject : (id : string) => void;
};

export const  useBoardStore = create<BoardStore>((set) => ({
    objects : {},
    addObject : (object) => 
        set((state) => ({
            objects : {
                ...state.objects, 
                [object.id]: object
            }, 
        })), 
    removeObject : (id) => 
        set((state) => {
            const objects = {...state.objects}; 
            delete objects[id]
            return { objects };
        }),
    updateObject : (id, changes) => 
        set((state) => {
            const object = state.objects[id]; 
            if(!object){
                return state;
            }

            return {
                ...state.objects, 
                [id] : {
                    ...object, 
                    ...changes, 
                } as BoardObject,
            }
        }),
}))