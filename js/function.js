/**
 * Created by Weiyan on 2016/11/21.
 */
//添加class的方法
function addClass(ele,name) {
    var arr = ele.className.split(' ');
    if(arr.indexOf(name) == -1){
        arr.push(name);
    }
    ele.className = arr.join(' ');
}

//删除class方法
function removeClass(ele,name) {
    var arr = ele.className.split(' ');
    if(arr.indexOf(name) != -1){
        arr.splice(arr.indexOf(name),1);
    }
    ele.className = arr.join(' ');
}
//把音乐播放的秒换算成分秒
function ms(time) {
    var min = 0;
    var sec = 0;
    var str = '';
    if(time>60){
        min = parseInt(time/60);
        sec = parseInt(time%60);
        if(min < 10){
            if(sec<10){
                str = '0'+min+':'+0+sec;

            }else{
                str = '0'+min+':'+sec;
            }
        }else{
            if(sec<10){
                str = min+':'+'0'+sec;

            }else{
                str = min+':'+sec;
            }
        }
    }else{
        sec = parseInt(time);
        if(sec<10){
            str = '00'+':'+'0'+sec;

        }else{
            str = '00'+':'+sec;
        }
    }
    return str;
}
//自动搜索下一首歌曲
function nextSong(ele) {
    ele = ele.nextElementSibling;
    if(ele){
        musicName.innerHTML = ele.dataset.songname;
        musicSinger.innerHTML =ele.dataset.artname;
        if(ele.dataset.songUrl){
            audio.src = ele.dataset.songUrl;
            audio.play();
        }else{
            console.log("Soory，没有歌曲连接")
        }
    }else{
        alert("没有下一曲")
    }
}