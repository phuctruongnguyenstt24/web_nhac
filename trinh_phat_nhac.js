let currentSong =0 ;

const music=document.querySelector('#audio');
const seekbar=document.querySelector('.seek-bar');
const tenbaihat=document.querySelector('.ten-bai-hat');
const tacgia=document.querySelector('.tac-gia');
const boxdisk=document.querySelector('.box-disk');
const currenttime=document.querySelector('.current-time');
const musictime=document.querySelector('.music-time');
const btnplay=document.querySelector('.btn-play');
const btnback=document.querySelector('.btnback');
const btnnext=document.querySelector('.btnnext');


btnplay.addEventListener('click',() => {
    if(btnplay.className.includes('pause')){
        music.play();
    }
    else{
        music.pause();
    }
    btnplay.classList.toggle('pause');
    boxdisk.classList.toggle('play');
} );

//cai dat bai hat

const setSong=(i)=>{
    seekbar.value=0;
    let song=songs[i];
    currentSong=i;
    music.src=song.path;
    tenbaihat.innerHTML=song.name;
    tacgia.innerHTML=song.artist;
    boxdisk.style.backgroundImage = `url(${song.image})`;

    currenttime.innerHTML='00:00';
    setTimeout(()=>{
    seekbar.max=music.duration;
    musictime.innerHTML=formatTimes(music.duration);
        
}, 300);

}

setSong(0);

const formatTimes=(time)=>{
    let min=Math.floor(time / 60);
    if(min<10){
        min=`0${min}`;
    }
    let sec=Math.floor(time % 60);
    if(sec<10){
        sec=`0${sec}`;

    }
    return `${min}:${sec}`
}

// set seekbar (thoi gian hien tai bai hat chay)
setInterval(()=> {
    seekbar.value=music.currentTime;
    currenttime.innerHTML=formatTimes(music.currentTime);
    if(Math.floor(music.currentTime)==Math.floor(seekbar.max)){
        btnnext.click();
    }

}, 500 );
// chinh thoi gian chay tuy y
seekbar.addEventListener('change', ()=>
{
    music.currentTime=seekbar.value;

});

//hieu ung quay cua dia

const playmusic=() =>{
    music.play();
    btnplay.classList.remove('pause');
    boxdisk.classList.add('play');
}

btnnext.addEventListener('click',() =>
{
    if( currentSong>=songs.length-1){   // Nếu đang ở bài cuối, quay lại bài đầu tiên
        currentSong=0; 
    }else{
        currentSong++;
    }
    setSong(currentSong);
    playmusic();
});


btnback.addEventListener('click',() =>
{
    if( currentSong<=0){   // Nếu đang ở bài đầu → quay về bài cuối
        currentSong=songs.length-1
    }else{
        currentSong--;
    }
    setSong(currentSong);
    playmusic();
});

