export type Rectangle = {
  id: string;
  type: "rectangle";

  x: number;
  y: number;

  width: number;
  height: number;
};

export type Freehand = {
  id : string; 
  type : "freehand"; 
  points : number[];
}

export type BoardObject = Rectangle | Freehand;