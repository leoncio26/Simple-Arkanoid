function Paddle(context, x, y, width, height, color)
{
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
}

Paddle.prototype = {
    update: function(x) {
        this.x = x;

        if(this.x < 0){
            this.x = 0;
        }else if(this.x + this.width > this.context.canvas.width){
            this.x = this.context.canvas.width - this.width;
        }
    },
    draw: function() {
        let ctx = this.context;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}