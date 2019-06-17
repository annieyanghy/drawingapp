

var canvas = document.getElementById('canvas');

// Set the canvas to fill the screen.
canvas.width = window.outerWidth;
canvas.height = window.outerHeight;

// Get a 2d drawing context.
var context = canvas.getContext('2d');

// Used to keep track of active touches.
var currentTouches = new Array;



var tmp_color = null;
setColor ('red');





var randomColor = function () {
  return tmp_color;
	var colors = ['#3F3F3F', '#929292', '#00A3EE', '#F5D908', '#D80351'];
	return colors[Math.floor(Math.random() * colors.length)];
};

//touch screen

var findCurrentTouchIndex = function (id) {
	for (var i=0; i < currentTouches.length; i++) {
		if (currentTouches[i].id === id) {
			return i;
		}
	}

	
	return -1;
};



// Creates a new touch in the currentTouches array and draws the starting
// point on the canvas.
var touchStarted = function (event) {
	var touches = event.changedTouches;

	for (var i=0; i < touches.length; i++) {
		var touch = touches[i];
		var touchColor = randomColor();

		currentTouches.push({
			id: touch.identifier,
			pageX: touch.pageX,
			pageY: touch.pageY,
			color: touchColor
		});

		context.beginPath();
		context.arc(touch.pageX, touch.pageY, 2.5, Math.PI*2, false);
		context.fillStyle = touchColor;
		context.fill();
	}

};


// Draws a line on the canvas between the previous touch location and
// the new location.
var touchMoved = function (event) {
	var touches = event.changedTouches;

	for (var i=0; i < touches.length; i++) {
		var touch = touches[i];
		var currentTouchIndex = findCurrentTouchIndex(touch.identifier);

		if (currentTouchIndex >= 0) {
			var currentTouch = currentTouches[currentTouchIndex];

			context.beginPath();
			context.moveTo(currentTouch.pageX, currentTouch.pageY);
			context.lineTo(touch.pageX, touch.pageY);
			context.lineWidth = 4;
			context.strokeStyle = currentTouch.color;
			context.stroke();
      
        pen.style.left = currentTouch.pageX - pen.offsetWidth / 2 + 'px';
        pen.style.top = currentTouch.pageY - pen.offsetHeight / 2 + 'px';    
      
			// Update the touch record.
			currentTouch.pageX = touch.pageX;
			currentTouch.pageY = touch.pageY;

			// Store the record.
      
			currentTouches.splice(currentTouchIndex, 1, currentTouch);
		} else {
			console.log('Touch was not found!');
		}

	}

};



var touchEnded = function (event) {
	var touches = event.changedTouches;

	for (var i=0; i < touches.length; i++) {
		var touch = touches[i];
		var currentTouchIndex = findCurrentTouchIndex(touch.identifier);

		if (currentTouchIndex >= 0) {
			var currentTouch = currentTouches[currentTouchIndex];

			context.beginPath();
			context.moveTo(currentTouch.pageX, currentTouch.pageY);
			context.lineTo(touch.pageX, touch.pageY);
			context.lineWidth = 4;
			context.strokeStyle = currentTouch.color;
			context.stroke();

			// Remove the record.
			currentTouches.splice(currentTouchIndex, 1);
		} else {
			console.log('Touch was not found!');
		}

	}

};


// Removes cancelled touches from the currentTouches array.
var touchCancelled = function (event) {
	var touches = event.changedTouches;

	for (var i=0; i < touches.length; i++) {
		var currentTouchIndex = findCurrentTouchIndex(touches[i].identifier);

		if (currentTouchIndex >= 0) {
			// Remove the touch record.
			currentTouches.splice(currentTouchIndex, 1);
		} else {
			console.log('Touch was not found!');
		}
	}
};





//  new touches.
canvas.addEventListener('touchstart', function(e) {
	e.preventDefault();
	touchStarted(event);
  
});


// for when a touch ends.
canvas.addEventListener('touchend', function(e) {
	e.preventDefault();
	touchEnded(e);
});


// for when a touch leaves the canvas.
canvas.addEventListener('touchleave', function(e) {
	e.preventDefault();
	touchEnded(e);
});


// for when the touch instrument is moved.
canvas.addEventListener('touchmove', function(e) {
	e.preventDefault();
	touchMoved(e);
});


// to catch cancelled touches.
canvas.addEventListener('touchcancel', function(e) {
	touchCancelled(e);
});
  


var radius = 2;
var painting= false;

// mouse 
var draw = function (e) {
  if (painting) {
   pen.style.left = e.clientX - pen.offsetWidth / 2 + 'px';
   pen.style.top = e.clientY - pen.offsetHeight / 2 + 'px';
    context.lineTo(e.clientX, e.clientY);
    context.stroke();
    context.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
    context.beginPath();
    context.fill();
    context.beginPath();
    context.moveTo(e.clientX, e.clientY);
 }
}

pen.ondragstart = function() {
  return false;
};
    
var engage= function (e){
  painting = true;
  context.lineWidth = radius *2;
  context.lineCap = "round";
  draw(e);
}
                       
   
var disengage = function () {
   painting = false;
   context.beginPath();
}

canvas.addEventListener('mousedown',engage);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup',disengage);
// canvas.addEventListener('mouseout',disengage);
// canvas.addEventListener('mouseover',disengage);


pen.style.position = 'absolute';
pen.style.zIndex = 1000 ; 
document.body.append(pen);




let redCode = 82
let blueCode = 66
let yellowCode = 89
let greenCode = 71
let clearCode = 32
let up = 38
let down = 40

document.addEventListener("keydown", event => {
  switch(event.keyCode) {
    case redCode:
      setColor ('red');
      break;
    case blueCode:
      context.fillStyle = 'blue';
      context.strokeStyle = 'blue';
      break;
    case yellowCode:
      setColor('yellow');
      break;
    case greenCode:
      setColor('green');
      break;
    case clearCode:
      redraw();  
      break;
    default:   
      break;
  }
});
// define color

var colors = ['black', 'grey', 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

var swatches = document.getElementsByClassName('swatch');

for(var i=0, n=colors.length;i<n;i++) {
 var swatch =  document.createElement('div');
  swatch.className = 'swatch';
  swatch.style.backgroundColor = colors[i];
  swatch.addEventListener('click', setSwatch);
  document.getElementById('colors').appendChild(swatch);
}

function setColor(color) {
  tmp_color = color;
  context.fillStyle = color;
  context.strokeStyle = color;
  var active = document.getElementsByClassName('active')[0];
  if(active) {
  active.className = 'swatch';
  }
}

function setSwatch(e) {
  
  var swatch = e.target; 
 
  setColor(swatch.style.backgroundColor);
  
  
}



  
   // clear 

document.addEventListener('keydown', redraw);

function redraw(event) {
  keyCode = 32;
  context.clearRect(0, 0, canvas.width, canvas.height); 
  
  
}


