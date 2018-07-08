export class Ball {
    num: number;
    isAlreadySelected: boolean;

    constructor(){ }
    
    public static createBall(num: number, isAlreadySelected: boolean) : Ball{
        let ball : Ball = new Ball();
        ball.num = num;
        ball.isAlreadySelected = isAlreadySelected;
        
        return ball;
    }
}
