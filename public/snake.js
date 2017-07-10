function Snake() {
	this.x = 0;
	this.y = 0;
	this.xspeed = 0;
	this.yspeed = 0;
	this.total = 1;
	this.tail = [];
	
	this.death = function(){
		for(var i=0; i < this.tail.length; i++){
			var pos = this.tail[i];
			var d = dist(this.x,this.y,pos.x,pos.y);
			if(d < 1 && this.total!=1){
				console.log("Dead");
				console.log("SENDING: " + this.total);
				
				var data = {
					totalLength: this.total
				}
				
				socket.emit('length', data);
				
				this.total = 1;
				this.tail = [];
			}
		}
	}
	
	this.update = function() {
		if(this.total === this.tail.length){
			for(var i = 0; i < this.tail.length - 1; i++){
				this.tail[i] = this.tail[i+1];
			}
		}
		this.tail[this.total-1] = createVector(this.x, this.y);
		
		this.x = this.x + this.xspeed*movementScale;
		this.y = this.y + this.yspeed*movementScale;
		if(this.x < 0){
			this.x = width-scl;
		}
		if(this.x + scl > width){
			this.x = 0;
		}
		if(this.y < 0){
			this.y = height-scl;
		}
		if(this.y + scl > height){
			this.y = 0;
		}
		
	}

	this.show = function(){
		fill(255);
		for(var i = 0; i < this.tail.length; i++){
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
	}
	
	this.dir = function(speedX, speedY){
		this.xspeed = speedX;
		this.yspeed = speedY;
	}
	
	this.eat = function(food){
		var d = dist(this.x, this.y, food.x, food.y);
		if(d < 1)
			return true;
		else
			return false;
	}
}

