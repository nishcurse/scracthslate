export type BaseBoardObject = {
  id : string; 
  x : number; 
  y : number;
  rotation : number;
}

export type Rectangle = BaseBoardObject & {

  type: "rectangle";
  width: number;
  height: number;

};

export type Freehand = BaseBoardObject & {
  type : "freehand"; 
  points : number[];
}
export type Ellipse = BaseBoardObject & {
  
  type : "ellipse";
  radiusX : number; 
  radiusY : number;
  rotation : number;

}; 

export type Line = BaseBoardObject & {
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