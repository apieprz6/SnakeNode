function Food() {
	this.x = 0;
	this.y = 0;
	
	this.setLocation = function(){
		var cols = floor(width/scl);
		var rows = floor(height/scl);
		this.x = floor(random(cols)) * scl;
		this.y = floor(random(rows)) * scl;
	}

	this.draw = function(){
		fill(255,0,10);
		rect(this.x, this.y, scl, scl);
	}
}

