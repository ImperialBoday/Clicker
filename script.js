
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");		
	var direction; 
	var score = 0;
	var diagonal = 0;
	var scoreHeight = 20;
	var scoreWidth = 20;		
	var click = 0;
	var start = new Date; 		
	var figures = [new Ball(), new Ball(), new Ball(), new Box(), new Box(), new Box(), new Pic(), new Pic(), new Pic()];
	var check = false;
	var timer = 10;	
		
	
		
	function drawScore(){	

		var end = new Date;	
		
		if (score > 99 && check == false) {
			check = true;
			alert( "Вы закончили игру за " + ((end - start)/1000) + " секунд" );
			document.location.reload();
		}
		if ((timer -  Math.round(((end - start)/1000))) == 0 && check == false){
			check = true;
			alert( "Вы проиграли со счётом: " + score );
			document.location.reload();
		}
		ctx.font = "16px Arial";
		ctx.fillStyle = "#1E1E1E";				
		ctx.fillText("Score: " + score + " gaming time: " +(timer - Math.round(((end - start)/1000))) +" sec", scoreHeight, scoreWidth);
	}
		
	
	function random(min,max){
		return min+Math.round(Math.random()*(max-min));
	}

		
	function Ball(){
		this.radius = random(10,50);
		this.x = random(this.radius, canvas.width-this.radius);
		this.y = random(this.radius+scoreHeight, canvas.height-this.radius);
		this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')';
		this.draw = function(){
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		};
		this.onclick = function(x,y){
				if ((x - this.x) * (x - this.x) + (y - this.y)*(y - this.y) <= this.radius*this.radius){
					this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')';
					score = score + Math.round(this.radius/10);
				}
			}
	}

		
	function Box(){
		this.width = random(10, 50);
		this.height = random(10, 50);
		this.x = random(0, canvas.width-this.width);
		this.y = random(scoreHeight, canvas.height-this.height);			
		this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')';
		this.draw = function(){
			ctx.beginPath();
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		},
		this.onclick = function(x,y){
			if (x>=this.x && x<=this.x+this.width && y>=this.y && y<=this.y+this.height){				
				direction = Math.random ()*4					
				if(direction > 1 && direction  < 2) 
				{ 
					this.x+=10;
				}
				if(direction < 1 ) 
				{
					this.y+=10;
				}
				if(direction > 2 && direction  < 3) 
				{ 
					this.x-=10;
				}
				if(direction >= 3) 
				{
					this.y-=10;
				}
				score = score + (Math.round((this.width + this.height)/20));
			}
		}
	}

		
	function Pic() {
		this.diagonal= random(10, 30);
		this.width = this.diagonal*2.5;
		this.height = this.diagonal;
		this.x = random(0, canvas.width-this.width);
		this.y = random(scoreHeight, canvas.height-this.height);	        
		this.pic = new Image();
		this.draw = function() {
		ctx.beginPath();
		this.pic.src = "cdf03dd787fdd9aa96e48a5c776.jpg";			
		ctx.drawImage(this.pic, this.x, this.y, this.width, this.height);
		ctx.closePath();
    };
        this.onclick = function(x, y) {
            if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {					
				score = score + Math.round(this.diagonal/10);
				this.x = random(0, canvas.width-this.width);
				this.y = random(scoreHeight, canvas.height-this.height); 			
            }
        };
    }

	
	function onclick(event){
		var rect = canvas.getBoundingClientRect();
		var x = event.clientX - rect.left;
		var y = event.clientY - rect.top;
		for (var i = 0; i < figures.length; i++){
			figures[i].onclick(x,y);
		}
	}

		
		


	function draw(){	
		drawScore();
		ctx.fillStyle = 'rgba(173,216,230,0.25)';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		for (var i = 0; i<figures.length; i++){
			figures[i].draw();
		}
		
	}

	setInterval(draw,10);
	document.addEventListener("mousedown", onclick, false);
