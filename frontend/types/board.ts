export type Rectangle = {
  id: string;
  type: "rectangle";

  x: number;
  y: number;

  width: number;
  height: number;
};

export type BoardObject = Rectangle;