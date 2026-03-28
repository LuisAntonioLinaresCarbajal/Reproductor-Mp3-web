//obtener el valor del audio por medio de su id
const audio= document.getElementById("audio");
//ventana reproductor
const playBtn=document.getElementById("play");
//progress
const progress= document.getElementById("progress");
//progressContainer
const progressContainer= document.getElementById("progressContainer");
//recorrido
const current = document.getElementById("current");
//duración
const duration= document.getElementById("duration");

// dejar  reproducir 
let isPlaying= false;
//reproducir / pausar
playBtn.addEventListener(
    "click", ()=>{
        //si el audio esta pausado reproducelo
        if(isPlaying){
            audio.pause();
            playBtn.textContent="▶️";
        }else{
            //si esta reproduciendo puedes pausarlo
            audio.play();
            playBtn.textContent="⏸️";
        }
        //si esta reproduciendo se pausa sino se reproduce
        isPlaying = !isPlaying;
    }
);
//actualizar progreso de reproduccion en la barra
audio.addEventListener(
    "timeupdate", ()=>{
        //evaluar cuanto tiempo ha transcurrido del audio y mostrar
        const { currentTime , duration: dur}= audio;
        //progreso de reproducción de manera porcentual en linea de reproduccion
        const percent = (currentTime / dur)* 100;
        //estilo de avanzar del prpgreso
        progress.style.width= percent + "%";
        //mostrar tiempo actual
        current.textContent= formatTime(currentTime);
        //mostrar duración del audio
        if(!isNaN(dur)){
            duration.textContent= formatTime(dur);
        }
    }
);
//click en la barra de reproducción
progressContainer.addEventListener(
    "click", (e)=>{
        const width= progressContainer.clientWidth;
        const clickX= e.offsetX;
        const dur = audio.duration; //mostrar duración en la barra
        //el audio avanza conforme a la barra de tiempo transcurrido en la reproduccion
        audio.currentTime=(clickX/width)* dur;
    }
);
//mostrar tiempo
function formatTime(time){
    const minutes= Math.floor(time / 60); //cada que llegue a 60s lo guarda como 1minuto
    let seconds= Math.floor(time % 60);
    if(seconds <10 ) seconds = "0" + seconds;
    //regresar y mostrar el tiempo en el inicio y el final
return `${minutes}:${seconds}`; 
}