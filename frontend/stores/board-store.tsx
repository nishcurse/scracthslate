import { create } from "zustand"; 

import {BoardObject} from "@/types/board"; 
import type {Tool} from "@/types/tools"
import type {PresenceUser} from "@/types/socket"


type liveUser = PresenceUser & {
    cursor : {
        x : number, 
        y : number,
    } | null;
};

type BoardStore = {
    objects : Record<string, BoardObject>; 
    activetool : Tool; 
    liveUsers: Record<string, liveUser>; 

    setLiveUsers : (users: PresenceUser[]) => void;
    addLiveUser : (user : PresenceUser) => void; 
    removeLiveUser: (userId : string) => void;
    setActivetool : (newTool : Tool) => void; 
    appendPoints: (id: string , points: number[]) => void;
    setObject: (objects : Record<string , BoardObject>) => void; 
    selectObjectId: string | null;
    selectObject : (id: string) => void;
    clearSelection : () => void;
    addObject: (object : BoardObject) => void; 

    updateObject : (
        id: string, 
        changes : Partial<BoardObject> 
    ) => void; 

    updateCursor : (
        userId : string, 
        x : number, 
        y : number,
    ) => void;

    removeObject : (id : string) => void;
};

export const  useBoardStore = create<BoardStore>((set) => ({
    objects : {},
    activetool: "select", 
    selectObjectId : null,
    liveUsers: {}, 
    selectObject: (id) => set({selectObjectId : id}), 
    clearSelection: () => {
        set({selectObjectId : null});
    }, 
    setActivetool: (newTool) => set({activetool: newTool}),
    setObject: (objects) => set({objects}),
    addObject : (object) => 
        set((state) => ({
            objects : {
                ...state.objects, 
                [object.id]: object
            }, 
        })), 
    setLiveUsers: (users) =>
        set({
            liveUsers: Object.fromEntries(
                users.map((user) => [
                    user.id,
                    {
                        ...user,
                        cursor: null,
                    },
                ])
            ),
        }),

    addLiveUser: (user) =>
        set((state) => ({
            liveUsers: {
                ...state.liveUsers,
                [user.id]: {
                    ...user,
                    cursor: null,
                },
            },
        })),

    removeLiveUser: (userId) =>
        set((state) => {
            const liveUsers = {
                ...state.liveUsers,
            };

            delete liveUsers[userId];

            return {
                liveUsers,  
            };
        }),

    updateCursor: (userId, x, y) =>
        set((state) => {
            const user = state.liveUsers[userId];

            if (!user) {
                return state;
            }

            return {
                liveUsers: {
                    ...state.liveUsers,
                    [userId]: {
                        ...user,
                        cursor: {
                            x,
                            y,
                        },
                    },
                },
            };
        }),
    removeObject : (id) => 
        set((state) => {
            const newobjects = {...state.objects}; 
            delete newobjects[id]
            return { objects : newobjects };
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