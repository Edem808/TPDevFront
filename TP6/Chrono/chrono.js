window.addEventListener("DOMContentLoaded",run,false);

function run(){
	let timer1;
	let timer2;
	let timer3;
	let debut2;
	let debut3;
	let compteur1 = 0;
	let compteur2 = 0;
	let compteur3 = 0;
	
	let start1 = document.getElementById("start1");
	start1.addEventListener("click",startChrono1,false);
	
	let stop1 = document.getElementById("stop1");
	stop1.addEventListener("click",stopChrono1,false);
	
	function startChrono1(){
		timer1 = setInterval(chrono1,1000);
	}
	
	function stopChrono1(){
		clearInterval(timer1);
	}
	
	function chrono1(){
		compteur1++;
		let element = document.querySelector("#chrono1 .affichage");
		element.innerHTML = compteur1;
	}
	
	let start2 = document.getElementById("start2");
	start2.addEventListener("click",startChrono2,false);
	
	let stop2 = document.getElementById("stop2");
	stop2.addEventListener("click",stopChrono2,false);
	
	function startChrono2(){
		timer2 = requestAnimationFrame(chrono2);
		debut2 = performance.now();
	}
	
	function stopChrono2(){
		cancelAnimationFrame(timer2);
	}
	
	function chrono2(time){
		if(time-debut2>1000){
			compteur2++;
			let element = document.querySelector("#chrono2 .affichage");
			element.innerHTML = compteur2;
			debut2 = time; 
		}
		timer2 = requestAnimationFrame(chrono2);
	}
	
	let start3 = document.getElementById("start3");
	start3.addEventListener("click",startChrono3,false);
	
	let stop3 = document.getElementById("stop3");
	stop3.addEventListener("click",stopChrono3,false);
	
	function startChrono3(){
		if(!timer3){
			timer3 = requestAnimationFrame(chrono3);
			debut3 = performance.now();
		}
	}
	
	function stopChrono3(){
		cancelAnimationFrame(timer3);
		timer3 = undefined;
	}
	
	function chrono3(time){
		if(time-debut3>1000){
			compteur3++;
			let element = document.querySelector("#chrono3 .affichage");
			element.innerHTML = compteur3;
			debut3 = time; 
		}
		timer3 = requestAnimationFrame(chrono3);
	}
	
}
