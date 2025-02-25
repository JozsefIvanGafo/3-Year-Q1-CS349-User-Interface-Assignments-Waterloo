/*
University of Waterloo 2023-24 / CS 349 / A1
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module in charge of representing handling the circle of the button
*/
export class Circle{
    /**
     * private methods:
     *      None
     * public methods:
     *      draw_circle()
     *      hittest
     *      change_x()
     *      change_height()
     *      change_radius()
     *      change_colour()
     *      reset_radius()
     *      reset()
     * public properties:
     *      get_coordinates
     * private properties
     *      radius
     *      original_radius
     *      center_of_coordinates
     *      original_center_coordinates
     *      colour
     */
    
    //Properties
    private radius:number;
    private original_radius:number;//to know what is the original radius
    private center_coordinates:[number,number];
    private original_center_coordinates:[number,number]//to know its original position
    private colour:string;

    public get_coordinates():[number,number] {
        return this.center_coordinates;
    }

    //constructor
    constructor(radius:number,center:[number,number],colour:string){
        //We initialize the circle
        this.radius=radius;
        this.original_radius=radius;
        this.center_coordinates=center;
        this.original_center_coordinates=center;
        this.colour=colour;
    }
    //Methods
    /**
     * draw_circle
     * In this method we draw the circle on the canvas
     */
    public draw_circle(gc:CanvasRenderingContext2D) {
        //We draw the circle
        gc.beginPath();
        gc.fillStyle=this.colour;
        gc.arc(this.center_coordinates[0],this.center_coordinates[1],this.radius,Math.PI *2,100);
        gc.fill();
    }
    /**
     * hit_test
     * It checks if the point of coordinates x,y is inside the circle
    */
    public hittest(x_coordinate:number,y_coordinate:number):boolean {
        //formula of hittest
        // sqrt((x_coordinate-x_circle)**2+(y_coordinate-y__circle))
        const x= (x_coordinate-this.center_coordinates[0])**2;
        const y= (y_coordinate-this.center_coordinates[1])**2;
        const distance= Math.sqrt(x+y);
        //Conditionals to know if the point is inside or not
        if (distance<this.radius)return true;//it means we are inside
        return false;
        
    }

    /**
     * change_x
     * we change to a new x (useful when we resize and want to maintain the new proportions)
     */
    public change_x(new_x:number) {
        //We also change the original center of coordinates 
        //because we use this when we change the num/of buttons
        this.center_coordinates[0]=new_x;
        this.original_center_coordinates[0]=new_x;
        
    }

    /**
     * increase_height 
     * we change the y coordinate (useful when we do animations)
     */
    public change_height(new_y:number):void {
        this.center_coordinates[1]=new_y;
    }
    
    /**
     * increase_radius
     * We increase the radius (useful when we do the bigger button animation)
     */
    public change_radius(new_radius:number):void {
        //We checked that we didn't exceeded the 25% of the original radius
        if (this.original_radius*1.25>=new_radius){
            //We can increase the radius
            this.radius=new_radius;
        }
        else{
            this.radius=this.original_radius*1.25
            console.log("We exceed the 25% threshold of the radius of the circle")
        }
    }
    
    /**
     * change_colour
     */
    public change_colour(new_colour:string) {
        this.colour=new_colour;
    }
  
    /**
     * reset_radius
     */
    public reset_radius() {
        this.radius=this.original_radius;
 
    }

    /**
     * reset
     * We want the circle to return to its original position
    */
   public reset():void {
    //We reset the values of the coordinates and radius
        this.center_coordinates=this.original_center_coordinates;
        this.radius=this.original_radius;
    }
}