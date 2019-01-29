function Brick(context, x, y, width, height, color){
    
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
}

Brick.prototype = {
    draw: function() {
        let ctx = this.context;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}