window.addEventListener("DOMContentLoaded",run,false);

function run(){
	let timer;
	let debut;
	let element1 = document.getElementById("defilement");
	let element2 = document.getElementById("grossissement");
	let element3 = document.getElementById("rotation");
	let element4 = document.getElementById("complexe");
	let t=-element1.clientWidth;
	let s = 0;
	let scale = true;
	let r = 0;
	
	let start1 = document.getElementById("start1");
	start1.addEventListener("click",startDefilement,false);
	
	let stop1 = document.getElementById("stop1");
	stop1.addEventListener("click",stop,false);
	
	let start2 = document.getElementById("start2");
	start2.addEventListener("click",startGrossissement,false);
	
	let stop2 = document.getElementById("stop2");
	stop2.addEventListener("click",stop,false);
	
	let start3 = document.getElementById("start3");
	start3.addEventListener("click",startRotation,false);
	
	let stop3 = document.getElementById("stop3");
	stop3.addEventListener("click",stop,false);
	
	let start4 = document.getElementById("start4");
	start4.addEventListener("click",startComplexe,false);
	
	let stop4 = document.getElementById("stop4");
	stop4.addEventListener("click",stop,false);
	
	function stop(){
		cancelAnimationFrame(timer); // fin du timer
		timer = undefined;
	}
	
	function startDefilement(){
		if(!timer){
			timer = requestAnimationFrame(defilement);
			debut = performance.now();
		}
	}
	
	function defilement(time){
		if((time-debut)>20){
			t = t+10;
			debut = time;
			element1.style.transform = "translatex("+t+"px)";
			if(t>document.documentElement.clientWidth){
				t=-element1.clientWidth;
			}
		}
		timer = requestAnimationFrame(defilement);
	}
	
	function startGrossissement(){
		if(!timer){
			timer = requestAnimationFrame(grossissement);
			debut = performance.now();
		}
	}
	
	function grossissement(time){
		if((time-debut)>20){
			if(scale)
				s=s+0.1;
			else
				s=s-0.1;
			debut = time;
			element2.style.transform = "scale("+s+")";
			if((s>10)||(s<0)){
				scale = !scale;
			}
		}
		timer = requestAnimationFrame(grossissement);
	}
	
	function startRotation(){
		if(!timer){
			timer = requestAnimationFrame(rotation);
			debut = performance.now();
		}
	}
	
	function rotation(time){
		if((time-debut)>20){
			r=(r+5)%360;
			debut = time;
			element3.style.transform = "rotate("+r+"deg)";
		}
		timer = requestAnimationFrame(rotation);
	}
	
	function startComplexe(){
		if(!timer){
			timer = requestAnimationFrame(complexe);
			debut = performance.now();
		}
	}
	
	function complexe(time){
		let timeFraction = (time - debut) / 10000; //10000 = durée de ms de l'animation
		if (timeFraction > 1) timeFraction = 1;
		let progress = rebond(timeFraction);
		r = 360/(progress);
		s = 3*progress;
		element4.style.transform = "scale("+s+") rotate("+r+"deg)";
		//debut = time;
		if (timeFraction < 1) {
			requestAnimationFrame(complexe);
		}
	}
	
	function rebond(timeFraction){
		return Math.abs(1-Math.pow((1-timeFraction),2)*Math.cos(15*(1-timeFraction)*Math.PI*timeFraction));
	}
}
