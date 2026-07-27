import { create } from "zustand"; 

import {BoardObject} from "@/types/board"; 
import type {Tool} from "@/types/tools"

type BoardStore = {
    objects : Record<string, BoardObject>; 
    activetool : Tool; 
    setActivetool : (newTool : Tool) => void; 
    appendPoints: (id: string , points: number[]) => void;
    setObject: (objects : Record<string , BoardObject>) => void; 

    addObject: (object : BoardObject) => void; 

    updateObject : (
        id: string, 
        changes : Partial<BoardObject> 
    ) => void; 

    removeObject : (id : string) => void;
};

export const  useBoardStore = create<BoardStore>((set) => ({
    objects : {},
    activetool: "select", 
    setActivetool: (newTool) => set({activetool: newTool}),
    setObject: (objects) => set({objects}),
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
    updateObject: (id, changes) =>
        set((state) => {
            const object = state.objects[id];

            if (!object) {
            return state;
            }

            return {
            objects: {
                ...state.objects,
                [id]: {
                ...object,
                ...changes,
                } as BoardObject,
            },
            };
    }),
    appendPoints: (id , points) => 
        set((state) => {
            const object = state.objects[id]; 
            if(!object || object.type !== "freehand"){
                return state;
            }
            return {
                objects : {
                    ...state.objects, 
                    [id] : {
                        ...object, 
                        points: [...object.points, ...points],
                    },
                }, 
            };
        }),
        

}))