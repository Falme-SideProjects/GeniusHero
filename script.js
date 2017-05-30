var listblocks = ["redBlock",	"greenBlock",	"blueBlock",	"purpleBlock"];	

var score = 30;
var velocity = 1;

/*document.addEventListener('keydown', function (e) {
	if(e.keyCode == 55){
		verifyKey(0);
	} else if(e.keyCode == 57){
		verifyKey(1);
		
	} else if(e.keyCode == 51){
		verifyKey(2);
		
	} else if(e.keyCode == 49){
		verifyKey(3);

	}


});*/

function update(){


	document.getElementById("score").innerHTML = "Score : "+score;

	

	var num = Math.floor(Math.random() * (1000 - 1)) + 1;

	if(num==111){
		createBlock(0);
	} else if(num == 222){
		createBlock(1);
		
	} else if(num == 333){
		createBlock(2);
		
	} else if(num == 444){
		createBlock(3);

	}

	updatePosition();

	document.onkeydown = function(e){


		if(e.keyCode == 103){
			verifyKey(0);

		}
		if(e.keyCode == 105){
			
			verifyKey(1);
			
		}
		if(e.keyCode == 99){
			verifyKey(2);
			
		}
		if(e.keyCode == 97){
			
			verifyKey(3);
			
		}
	};


	if(score>=0 && score<=100)
	window.setTimeout(update, 1);

	if(score<0){
		document.getElementById("GameOver").style.visibility = "visible";
	} else if(score>100){
		document.getElementById("Winner").style.visibility = "visible";
	}
}

function createBlock(number){


	document.body.innerHTML+="<div class='"+listblocks[number]+"'></div>";
}

function init(){
	window.setInterval(function(){velocity+=0.05},1000);
	update();
}

function updatePosition(){


	var b = document.getElementsByClassName("redBlock");

	for(var a = 0; a<b.length; a++){
		var posX = b[a].getBoundingClientRect().left;
		if(posX > 300){
			b[a].parentElement.removeChild(b[a]);
			score--;
		} else {
			b[a].style.left = ""+(posX+velocity)+"px";
		}
	}
	
	b = document.getElementsByClassName("greenBlock");

	for(var a = 0; a<b.length; a++){
		var posY = b[a].getBoundingClientRect().top;
		if(posY > 300){
			b[a].parentElement.removeChild(b[a]);
			score--;
		} else {
			b[a].style.top = ""+(posY+velocity)+"px";
		}
	}
	
	b = document.getElementsByClassName("blueBlock");

	for(var a = 0; a<b.length; a++){
		var posX = b[a].getBoundingClientRect().left;
		if(posX < 400){
			b[a].parentElement.removeChild(b[a]);
			score--;
		} else {
			b[a].style.left = ""+(posX-velocity)+"px";
		}
	}
	
	b = document.getElementsByClassName("purpleBlock");

	for(var a = 0; a<b.length; a++){
		var posY = b[a].getBoundingClientRect().top;
		if(posY < 400){
			b[a].parentElement.removeChild(b[a]);
			score--;
		} else {
			b[a].style.top = ""+(posY-velocity)+"px";
		}
	}
}


function verifyKey(number){

	
	var toReturn = new Array();

	if(number == 0){
		toReturn[0] = "redBlock";
		toReturn[1] = "Btn1";
	} else if(number == 1){
		toReturn[0] = "greenBlock";
		toReturn[1] = "Btn2";
		
	} else if(number == 3){
		toReturn[0] = "purpleBlock";
		toReturn[1] = "Btn3";
		
	} else if(number == 2){
		toReturn[0] = "blueBlock";
		toReturn[1] = "Btn4";

	}

	verifyCollision(toReturn);
}

function verifyCollision(block){

	b = document.getElementsByClassName(block[0]);
	c = document.getElementById(block[1]);

	var found = false;

	for(var a=0; a<b.length; a++){
		if(collision(b[a].getBoundingClientRect().left,c.getBoundingClientRect().left,b[a].getBoundingClientRect().top,c.getBoundingClientRect().top,100,100,100,100) ||
			collision(c.getBoundingClientRect().left,b[a].getBoundingClientRect().left,c.getBoundingClientRect().top,b[a].getBoundingClientRect().top,100,100,100,100)){
			score++;
			found = true;
			c.className = "rightChord";
			window.setTimeout(function(){c.className = "";},100);
			b[a].parentElement.removeChild(b[a]);
		}
	}

	if(!found){
		score--;
			c.className = "wrongChord";
			window.setTimeout(function(){c.className = "";},100);
	}
}


function collision(aX,bX,aY,bY,aW,bW,aH,bH)
{
    if(aX < bX + bW && 
    	aX + aW > bX && 
    	aY < bY + bH && 
    	aY + aH > bY)
    {
        return true;
    }
    else
    {
        return false;
    }
}

init();