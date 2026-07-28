
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
export type Ellipse = {
  
  id : string;
  type : "ellipse";
  x : number; 
  y : number; 
  radiusX : number; 
  radiusY : number;

}; 

export type Line = {
  id : string; 
  type : "line"; 
  points : number[];
};


export type BoardObject = 
Rectangle 
| 
Freehand
|
Line
|
Ellipse;