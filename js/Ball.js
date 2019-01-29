function Ball(context, x, y, radius, color)
{
    this.context = context;
    this.x = x;
    this.y = y;
    this.vx = Math.random() + 0.1;
    this.vy = -3;
    this.radius = radius;
    this.color = color;
}

Ball.prototype = {
    update: function() {
        let ctx = this.context;

        this.x += this.vx;
        this.y += this.vy;

        if(this.x < this.radius){
            this.vx *= -1;
            this.x = 4;
        }else if(this.x > ctx.canvas.width - this.radius){
            this.vx *= -1;
            this.x = ctx.canvas.width - this.radius;
        }else if(this.y < this.radius){
            this.vy *= -1;
            this.y = 4;
        }else if(this.y > ctx.canvas.height){
            // Se a bola sair na parte inferior da tela
            this.x = 310;
            this.y = 250;
            balls--;
        }
    },
    draw: function() {

        let ctx = this.context;

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}