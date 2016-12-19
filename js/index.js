/**
 * Created by Weiyan on 2016/12/8.
 */
window.onload=function () {
    //决定初始页面展示哪首歌曲
    (function () {
        var audio = document.createElement("audio");
        document.body.appendChild(audio);
        // audio.src = 'http://mr3.doubanio.com/5f896e01ceed62879807d3bcb550a58b/0/fm/song/p1395966_128k.mp4'
        audio.src= dataList[0].music;
        var datalistName = document.querySelector(".datalistName");
        datalistName.innerHTML = dataList[0].songName;
        var datalistPerson = document.querySelector(".datalistPerson");
        datalistPerson.innerHTML = dataList[0].singerName;
    })()
    $(document).on("touchstart",function (e) {
        return false;
        // e.stopPropagation();
        // e.preventDefault();
    })
    var audio = document.querySelector("audio");
    var timer =null;
    var currentTime = 0;


    //首次进入的动画
    setTimeout(function () {
        $(".startwrap").eq(0).css("opacity",0);
        setTimeout(function () {
            $(".startwrap").eq(0).css("display","none");
        },500)

    },2000);
    //动画结束

    //yourMusic  根据数据信息为音乐列表添加数据
    fileList(dataList);
    function  fileList(a) {
        for(var i=0;i<a.length;i++){
            //做到后面再考虑要不要给行添加属性??
            $(".filelist_ul").append('<li class="filelist_ul_li1 clearfix"><div>'+(i+1)+'</div> <div class="filelistname"><span class="filesongname">'+a[i].songName+'</span> <span class="filesingername">'+a[i].singerName+'</span> </div> <div class="fileplay"></div> </li>');
        };
    }

    //搜索  歌曲页的歌曲数据渲染
    //   playList(data);
    function  playList(a) {
        for(var i=0;i<a.length;i++){
            //做到后面再考虑要不要给行添加属性??
            $(".playlistlist_ul").append('<li class="playlistlist_ul_li1 clearfix"><div>'+(i+1)+'</div> <div class="playlistlistname"> <span class="playlistsongname">'+a[i].songName+'</span> <span class="playlistsingername">'+a[i].singerName+'</span></div><div>'+a[i].time+'</div> </li>');
        }
    }

    //确定一个最开始时的_this指向
    var _this = $(".filelist_ul_li1").eq(0);
    $(".filelist_ul_li1").bind("tap",function (e) {
        var kk = $(this).children('*:nth-child(2)').children('*:nth-child(1)');
        for(var i=0;i<dataList.length;i++){
            if(kk.html() == dataList[i].songName){
                _this = $(this);
                // console.log(_this);
            }
        }
        e.preventDefault();
    })
// index页

    //点击播放音乐
    var startOff = true;
          //index
    $(".indexcontrol_ul_li3").tap(function (e) {
        if(startOff){
            $(this).css("background",'url("/img/stop.png") no-repeat');
            $(this).css("background-size",'1.94666rem 1.94666rem');
            // $(this).css("background-size",'146rem/75 146rem/75');
            $(".playlistsection_ul_li4").css("background",'url("/img/stop.png") no-repeat');
            $(".playlistsection_ul_li4").css("background-size",'0.88rem 0.88rem');
            audio.currentTime = currentTime;
            // console.log(audio.currentTime)  //如果是本地音乐，这个地方的值永远是0，但是网络音乐就不会永远是0。
            clearInterval(timer);
            audio.play();

            //歌词播放需要的总时间
            $(".playlistsection_ul_li7").html(ms(audio.duration));
            $(".indextotaltime").html(ms(audio.duration));
            //歌词播放的当前时间
            $(".indexpretime").html(ms(audio.currentTime));
            $(".playlistsection_ul_li1").html(ms(audio.currentTime));
            //音乐列表页面的图标变化
            for(var i=0;i<$(".filelist li").length;i++){
                var name =$(".filelist li").eq(i).children("*:nth-child(2)").children("*:nth-child(1)").html();
                if(name ==  $(".datalistName").html()){
                    $(".filelist li").eq(i).children("*:nth-child(3)").css("background",'url("/img/stop.png") no-repeat');
                    $(".filelist li").eq(i).children("*:nth-child(3)").css("background-size",'0.89333rem 0.93333rem');
                }
            }
        }else{
            clearInterval(timer);
            $(this).css("background",'url("/img/sprit.png") no-repeat 0 0');
            $(this).css("background-size",'10rem 20.32rem');
            $(".playlistsection_ul_li4").css("background",'url("/img/sprit.png") no-repeat -2.69333rem -2.18667rem');
            $(".playlistsection_ul_li4").css("background-size",'10rem 20.32rem');
            audio.pause();
            // console.log(audio.currentTime)
            currentTime = audio.currentTime;
            // console.log(currentTime)

            for(var i=0;i<$(".filelist li").length;i++){
                var name =$(".filelist li").eq(i).children("*:nth-child(2)").children("*:nth-child(1)").html();
                if(name ==  $(".datalistName").html()){
                    $(".filelist li").eq(i).children("*:nth-child(3)").css("background",'url("/img/sprit.png") no-repeat -2.69333rem -2.18667rem');
                    $(".filelist li").eq(i).children("*:nth-child(3)").css("background-size",'10rem 20.32rem');
                }
            }
        }
        startOff = !startOff;
        e.preventDefault();
    });
           //搜索页面
    $(".playlistsection_ul_li4").tap(function (e) {
        if(startOff){
            $(".indexcontrol_ul_li3").css("background",'url("/img/stop.png") no-repeat');
            $(".indexcontrol_ul_li3").css("background-size",'1.94667rem 1.94667rem');
            $(this).css("background",'url("/img/stop.png") no-repeat');
            $(this).css("background-size",'0.88rem 0.88rem');
            audio.currentTime = currentTime;
            clearInterval(timer);
            audio.play();

            //歌词播放需要的总时间
            $(".playlistsection_ul_li7").html(ms(audio.duration));
            $(".indextotaltime").html(ms(audio.duration));
            //歌词播放的当前时间
            $(".indexpretime").html(ms(audio.currentTime));
            $(".playlistsection_ul_li1").html(ms(audio.currentTime));

            for(var i=0;i<$(".filelist li").length;i++){
                var name =$(".filelist li").eq(i).children("*:nth-child(2)").children("*:nth-child(1)").html();
                if(name ==  $(".datalistName").html()){
                    $(".filelist li").eq(i).children("*:nth-child(3)").css("background",'url("/img/stop.png") no-repeat');
                    $(".filelist li").eq(i).children("*:nth-child(3)").css("background-size",'0.89333rem 0.89333rem');
                }
            }
        }else{
            clearInterval(timer);
            $(".indexcontrol_ul_li3").css("background",'url("/img/sprit.png") no-repeat 0 0');
            $(".indexcontrol_ul_li3").css("background-size",'10rem 20.32rem');
            $(this).css("background",'url("/img/sprit.png") no-repeat -2.69333rem -2.18667rem');
            $(this).css("background-size",'10rem 20.32rem');

            for(var i=0;i<$(".filelist li").length;i++){
                var name =$(".filelist li").eq(i).children("*:nth-child(2)").children("*:nth-child(1)").html();
                if(name ==  $(".datalistName").html()){
                    $(".filelist li").eq(i).children("*:nth-child(3)").css("background",'url("/img/sprit.png") no-repeat -2.69333rem -2.18667rem');
                    $(".filelist li").eq(i).children("*:nth-child(3)").css("background-size",'10rem 20.32rem');
                }
            }
            audio.pause();
            currentTime = audio.currentTime;
        }
        startOff = !startOff;
        e.preventDefault();
    })

    //歌词显示和隐藏
    $(".wrap_citelist").on("doubleTap",function (e) {
        $(this).css("display","none");
        $(".indexsection_ul").css("display","block");
        $(".indexpicture").css("display","block");
        $(".nameM").html("Music");
        e.preventDefault();
    })
    $(".indexpicture").on("doubleTap",function (e) {
        var citelist = document.getElementsByClassName(".citelist")[0];
        $(this).css("display","none");
        $(".indexsection_ul").css("display","none");
        $(".wrap_citelist").css("display","block");
        doingSS(currentTime);
        e.preventDefault();
    })


    //indexof搜索匹配搜索的歌词名称
    $("input").on("touchstart",function (e) {
     $(this).focus();
     e.preventDefault();
    })
    var input = document.querySelector("input");
    input.oninput=function (e) {
        var arr = [];
        $(".playlistlist_ul").html('');
        for(var i=0;i<data.length;i++){
            var str = input.value;
            if(str == ''){
                $(".playlistlist_ul").html('');
            }else{
                if(data[i].songName.indexOf(str) > -1){
                    arr.push({
                        songName:data[i].songName,
                        singerName:data[i].singerName,
                        time:data[i].time
                    });
                }
            }
        }
        playList(arr);
        arr =[];
        $(".playlistlist_ul li").on("touchstart",function (e) {
            var name=$(this).children("*:nth-child(2)").children("*:nth-child(1)").html();
            console.log(name);
            console.log(data[1].songName)
            for(var i=0;i<data.length;i++){
                //只有data中有数据
                if(name == data[i].songName){
                    console.log(data[i].songName)
                    audio.src = data[i].music;
                    $(".datalistName").html(data[i].songName);
                    $(".datalistPerson").html(data[i].singerName);
                    $(".playlistsection_ul_li7").html(data[i].time);
                    $(".indextotaltime").html(data[i].time);
                    clearInterval(timer);
                    audio.currentTime = currentTime;
                    audio.play();
                    startOff = false;
                    //各个页面的图标应该变化
                    //搜索页面图标变化
                    $(".playlistsection_ul_li4").css("background",'url("/img/stop.png") no-repeat');
                    $(".playlistsection_ul_li4").css("background-size",'0.88rem 0.88rem');
                    //首页图标变化
                    $(".indexcontrol_ul_li3").css("background",'url("/img/stop.png") no-repeat');
                    $(".indexcontrol_ul_li3").css("background-size",'1.94667rem 1.94667rem');
                    for(var i=0;i<dataList.length;i++){
                        if(name != dataList[i].songName){
                            //首页的心变灰色表示不是datalist的数据
                            $(".indexsection_ul_li3").css("background",'url("/img/heart.png") no-repeat');
                            $(".indexsection_ul_li3").css("background-size",'0.56rem 0.56rem');
                            //播放列表play状态也要变
                            clear();
                        }else{
                             //如果datalist中也有该数据,记住改变指针指向
                            for(var i=0;i<$(".filelist li").length;i++){
                                var kkName = $(".filelist li").eq(i).children('*:nth-child(2)').children('*:nth-child(1)').html();
                                if(name == kkName){
                                    _this = $(".filelist_ul li").eq(i);
                                    //心要变成红色
                                    $(".indexsection_ul_li3").css("background",'url("/img/sprit.png") no-repeat -4.48rem -2.06667rem');
                                    $(".indexsection_ul_li3").css("background-size",'10rem 20.32rem');
                                    //播放列表play状态也要变
                                    clear();
                                }
                            }
                        }
                    }
                }
            }
        })
        e.preventDefault();
    }

    //点击心，data和datalist数据交换
    $(".indexsection_ul_li3").on("touchstart",function (e) {


       var hh = dataList.every(function (items,index,arr) {
           return items.songName != $(".datalistName").html();
        })
        if(hh){
            for(var i=0;i<data.length;i++){
                if($(".datalistName").html()  == data[i].songName) {
                    dataList.push(data[i]);
                    console.log(dataList)
                    fileList(dataList);
                    _this = $(".filelist_ul li").eq(dataList.length-1);
                    $(".indexsection_ul_li3").css("background", 'url("/img/sprit.png") no-repeat -4.48rem -2.06667rem');
                    $(".indexsection_ul_li3").css("background-size",'10rem 20.32rem');
                }
            }
        }else{
            for(var i=0;i<dataList.length;i++){
                if($(".datalistName").html()  == dataList[i].songName){
                    dataList.splice(i,1);
                    fileList(dataList);
                    _this = $(".filelist_ul li").eq(0);
                    $(".indexsection_ul_li3").css("background",'url("/img/heart.png") no-repeat');
                    $(".indexsection_ul_li3").css("background-size",'0.53333rem 0.53333rem');
                }

            }
        }

        e.preventDefault();
    })

    // 音乐快进
    $(".indexprocess").bind("touchstart",function (e) {
        console.log("start")
        var startX = e.changedTouches[0].pageX;
        e.stopPropagation();
        $(".indexprocess").bind("touchmove",function (e) {
            console.log("move")
            var moveX = e.changedTouches[0].pageX;
            $(".indexcurrent_process").css("width",moveX);
            var t = $(".indexcurrent_process").width()/$(".indexprocess").width()*audio.duration;
            audio.currentTime = t;
            currentTime = audio.currentTime;
            doingSS(audio.currentTime);
            clearInterval(timer);
            //歌词播放需要的总时间
            $(".indextotaltime").html(ms(audio.duration));
            //歌词播放的当前时间
            $(".indexpretime").html(ms(audio.currentTime));

            e.preventDefault();
        })
         $(".indexprocess").bind("touchmend",function (e) {
             $(".indexprocess").unbind("touchmove",function (e) {
                 e.preventDefault();
             })
        })
        e.preventDefault();
    })

    // 音乐音量
    $(".indexl_menu").on("touchmove",function (e) {
        return false;
    })
    $(".indexdot").on("touchstart",function (e) {
        var indexvolume = document.querySelector(".indexvolum_process");
        var dotX =  indexvolume.getBoundingClientRect().left;
        e.stopPropagation();
        $(".indexdot").on("touchmove",function (e) {
            var moveX = e.changedTouches[0].pageX;
            var ll = moveX - dotX;
            if(ll > $(".indexvolum_process").width()){
                ll = $(".indexvolum_process").width();
            }
            if(ll < 0){
                ll = 0;
            }
            var myVolume = ll / $(".indexvolum_process").width();
            var m = audio.volume;
            m = myVolume;
            audio.volume = m;
            $(".indexcurrentvolum_process").css("width",ll);
            $(".indexdot").css("left",ll-10);
            return false;
        })
        $(".indexdot").on("touchend",function (e) {
            //加上这句会回报apply为null的错误
            // $(".indexdot").on("touchmove",null);
            return false;

        });

    })


    //音乐播放时的动作
    var audioOff = false;
    audio.onplaying=function (e) {
        for(var i=0;i<dataList.length;i++){
            if($(".datalistName").html()  == dataList[i].songName){
                $(".indexsection_ul_li3").css("background", 'url("/img/sprit.png") no-repeat -4.48rem -2.06667rem');
                $(".indexsection_ul_li3").css("background-size",'10rem 20.32rem');
            }
        }
        //音乐播放时填充歌词
        // doingSS();

        timer = setInterval(function () {
            var bil = audio.currentTime/audio.duration;
            //自动寻找下一首歌曲,然歌词列表循环播放
            if(bil> 0.99){
                var cc  =$(_this).next().children("*:nth-child(2)").children("*:nth-child(1)").html();
                if(cc) {
                    _this = $(_this).next();
                    for (var i = 0; i < dataList.length; i++) {
                        var str = $(_this).children("*:nth-child(2)").children("*:nth-child(1)").html();
                        if (str == dataList[i].songName) {
                            $(".datalistName").html(dataList[i].songName);
                            $(".datalistPerson").html(dataList[i].singerName);
                            audio.src = dataList[i].music;
                            clearInterval(timer);
                            currentTime = 0;
                            audio.currentTime = currentTime;
                            audio.play();
                            $(".citelist").html('');
                            $(".citelist").css("top",0);
                            doingSS(audio.currentTime);
                            //把心变成红色
                            $(".indexsection_ul_li3").css("background",'url("/img/sprit.png") no-repeat -4.48rem -2.06667rem');
                            $(".indexsection_ul_li3").css("background-size",'10rem 20.32rem');
                        }
                    }
                }else{
                    if(audioOff){
                        _this = $(".filelist").children("*:nth-child(1)").children("*:nth-child(1)");
                        for (var i = 0; i < dataList.length; i++) {
                            var str = $(_this).children("*:nth-child(2)").children("*:nth-child(1)").html();
                            if (str == dataList[i].songName) {
                                $(".datalistName").html(dataList[i].songName);
                                $(".datalistPerson").html(dataList[i].singerName);
                                audio.src = dataList[i].music;
                                clearInterval(timer);
                                currentTime = 0;
                                audio.currentTime = currentTime;
                                audio.play();
                                $(".citelist").html('');
                                $(".citelist").css("top",0);
                                doingSS(audio.currentTime);

                            }
                        }

                    }else{
                        clearInterval(timer);
                        alert("已经是最后一首了")
                    }

                }
            }else{

                $(".indexpretime").html(ms(audio.currentTime));
                $(".playlistsection_ul_li1").html(ms(audio.currentTime));
                doingSS(audio.currentTime);
                var W= $(".indexprocess").css("width");
                 W= W.replace(/\D+$/ig,'');
                $(".indexcurrent_process").css("width",bil*W);
                // process = bil*W;
            }
        },900);
        e.preventDefault();

    };



    //点击播放下一曲
         //index
    $(".indexcontrol_ul_li4").tap(function (e) {
        var cc  =$(_this).next().children("*:nth-child(2)").children("*:nth-child(1)").html();
        if(cc) {
            _this = $(_this).next();
            for (var i = 0; i < dataList.length; i++) {
                var str = $(_this).children("*:nth-child(2)").children("*:nth-child(1)").html();
                if (str == dataList[i].songName) {
                    $(".datalistName").html(dataList[i].songName);
                    $(".datalistPerson").html(dataList[i].singerName);
                    // 心的颜色
                    $(".indexsection_ul_li3").css("background", 'url("/img/sprit.png") no-repeat -4.48rem -2.06667rem');
                    $(".indexsection_ul_li3").css("background-size",'10rem 20.32rem');

                    audio.src = dataList[i].music;
                    currentTime = 0;
                    audio.currentTime = currentTime;
                    if(startOff == false){
                        clearInterval(timer);

                        audio.play();

                        clear();
                    }
                    $(".citelist").html('');
                    $(".citelist").css("top",0);
                    doingSS(audio.currentTime);
                }
            }
        }else{
            alert("这是最后一曲了")
        }
        e.preventDefault();
    })
          //搜索页面
    $(".playlistsection_ul_li5").tap(function (e) {
        console.log(1)
        var cc  =$(_this).next().children("*:nth-child(2)").children("*:nth-child(1)").html();
        console.log(cc)
        if(cc) {
            _this = $(_this).next();
            for (var i = 0; i < dataList.length; i++) {
                var str = $(_this).children("*:nth-child(2)").children("*:nth-child(1)").html();
                if (str == dataList[i].songName) {
                    $(".datalistName").html(dataList[i].songName);
                    $(".datalistPerson").html(dataList[i].singerName);
                    audio.src = dataList[i].music;
                    clearInterval(timer);
                    audio.currentTime = currentTime;
                    audio.play();

                }
            }
        }else{
            alert("这是最后一曲了")
        }
        e.preventDefault();
    })



    //点击播放上一曲
         //index
     $(".indexcontrol_ul_li2").tap(function (e) {
         var cc  =$(_this).prev().children("*:nth-child(2)").children("*:nth-child(1)").html();
         if(cc) {
             _this = $(_this).prev();
             for (var i = 0; i < dataList.length; i++) {
                 var str = $(_this).children("*:nth-child(2)").children("*:nth-child(1)").html();
                 if (str == dataList[i].songName) {
                     $(".datalistName").html(dataList[i].songName);
                     $(".datalistPerson").html(dataList[i].singerName);
                     //心的颜色
                     $(".indexsection_ul_li3").css("background", 'url("/img/sprit.png") no-repeat -4.48rem -2.06667rem');
                     $(".indexsection_ul_li3").css("background-size",'10rem 20.32rem');

                     audio.src = dataList[i].music;
                     currentTime = 0;
                     audio.currentTime = currentTime;
                     if(startOff == false){
                         clearInterval(timer);
                         audio.play();
                         clear();
                     }
                     $(".citelist").html('');
                     $(".citelist").css("top",0);
                     doingSS(audio.currentTime);
                 }
             }
         }else{
             alert("已经到第一曲了")
         }
         e.preventDefault();
     })
         //搜索页面
    $(".playlistsection_ul_li3").tap(function (e) {
        var cc  =$(_this).prev().children("*:nth-child(2)").children("*:nth-child(1)").html();
        if(cc) {
            _this = $(_this).prev();
            for (var i = 0; i < dataList.length; i++) {
                var str = $(_this).children("*:nth-child(2)").children("*:nth-child(1)").html();
                if (str == dataList[i].songName) {
                    $(".datalistName").html(dataList[i].songName);
                    $(".datalistPerson").html(dataList[i].singerName);
                    audio.src = dataList[i].music;
                    clearInterval(timer);
                    audio.currentTime = currentTime;
                    audio.play();

                }
            }
        }else{
            alert("已经到第一曲了")
        }
        e.preventDefault();

    })



    //点击歌曲列表循环播放
    var loopOff = true;
         //index页面
    $(".indexcontrol_ul_li1").tap(function (e) {
        if(loopOff){
            $(".indexcontrol_ul_li1").css("background",'url("/img/loop.png") no-repeat');
            $(".indexcontrol_ul_li1").css("background-size",'0.53333rem 0.45333rem');
            $(".playlistsection_ul_li2").css("background",'url("/img/loop.png") no-repeat 1rem 1rem');
            $(".playlistsection_ul_li2").css("background-size","0.53333rem 0.4rem");
            // audioOff是true歌曲列表循环播放
            audioOff = true;
        }else{
            $(".indexcontrol_ul_li1").css("background",'url("/img/sprit.png") no-repeat -4.49333rem -1.41333rem');
            $(".indexcontrol_ul_li1").css("background-size",'10rem 20.32rem');
            $(".playlistsection_ul_li2").css("background",'url("/img/sprit.png") no-repeat -4.49333rem -1.17333rem');
            $(".playlistsection_ul_li2").css("background-size",'10rem 20.32rem');
            // audio.loop = '';
            audioOff = false;
        }
        loopOff = !loopOff;
        e.preventDefault();
    })
        //搜索页面
    $(".playlistsection_ul_li2").tap(function (e) {
        if(loopOff){
            $(".indexcontrol_ul_li1").css("background",'url("/img/loop.png") no-repeat');
            $(".indexcontrol_ul_li1").css("background-size",'0.53333rem 0.45333rem');
            $(".playlistsection_ul_li2").css("background",'url("/img/loop.png") no-repeat 0 0.3rem');
            $(".playlistsection_ul_li2").css("background-size","0.53333rem 0.4rem");
            // audioOff是true歌曲列表循环播放
            audioOff = true;
        }else{
            $(".indexcontrol_ul_li1").css("background",'url("/img/sprit.png") no-repeat -4.49333rem -1.41333rem');
            $(".indexcontrol_ul_li1").css("background-size",'10rem 20.32rem');
            $(".playlistsection_ul_li2").css("background",'url("/img/sprit.png") no-repeat -4.49333rem -1.17333rem');
            // $(".playlistsection_ul_li2").css("backgroundSize","10rem 20.32rem");
            $(".playlistsection_ul_li2").css("background-size",'10rem 20.32rem');
            // background-size: 10rem 20.32rem;
            // audio.loop = '';
            audioOff = false;
        }
        loopOff = !loopOff;
        e.preventDefault();
    })


    //点击单曲循环
    var singAudio = true;
          //index页面
    $(".indexcontrol_ul_li5").tap(function (e) {
        if(singAudio){
            $(".indexcontrol_ul_li5").css("background",'url("/img/singloop.png") no-repeat');
            $(".indexcontrol_ul_li5").css("background-size",'0.42667rem 0.42667rem');
            $(".playlistsection_ul_li6").css("background",'url("/img/singloop.png") no-repeat');
            $(".playlistsection_ul_li6").css("background-size",'0.42667rem 0.42667rem');
            audio.loop = 'loop';
        }else{
            $(".indexcontrol_ul_li5").css("background",'url("/img/sprit.png") no-repeat -4.48rem 0rem');
            $(".indexcontrol_ul_li5").css("background-size",'10rem 20.32rem');
            $(".playlistsection_ul_li6").css("background",'url("/img/sprit.png") no-repeat -4rem 0.8rem');
            $(".playlistsection_ul_li6").css("background-size",'10rem 20.32rem');
            audio.loop = '';
        }
        singAudio = !singAudio;
        e.preventDefault();
    })
         //搜索页面
    $(".playlistsection_ul_li6").tap(function (e) {
        if(singAudio){
            $(".indexcontrol_ul_li5").css("background",'url("/img/singloop.png") no-repeat');
            $(".indexcontrol_ul_li5").css("background-size",'0.42667rem 0.42667rem');
            $(".playlistsection_ul_li6").css("background",'url("/img/singloop.png") no-repeat 0 0.2rem');
            $(".playlistsection_ul_li6").css("background-size",'0.4rem 0.5rem');
            audio.loop = 'loop';
        }else{
            $(".indexcontrol_ul_li5").css("background",'url("/img/sprit.png") no-repeat -4.48rem 0.3rem');
            $(".indexcontrol_ul_li5").css("background-size",'10rem 20.32rem');
            $(".playlistsection_ul_li6").css("background",'url("/img/sprit.png") no-repeat -4.48rem 0.25rem');
            $(".playlistsection_ul_li6").css("background-size",'10rem 20.32rem');
            audio.loop = '';
        }
        singAudio = !singAudio;
        e.preventDefault();
    })
     //音乐停止后要停止指针
    audio.onpause=function (e) {
        clearInterval(timer);
        e.preventDefault();
    }


    //点击index菜单，出现弹窗
    $(".indexmenu").eq(0).attr("indexmenuOff","true");
    $(".indexmenu").eq(0).tap(function (e) {
        if($(".indexmenu").eq(0).attr("indexmenuOff") == "true"){
            $(".indexl_menu").eq(0).css("top","10.8rem");
            $(".indexmenu").eq(0).attr("indexmenuOff","false");
        }else{
            $(".indexl_menu").eq(0).css("top","17.33333rem");
            $(".indexmenu").eq(0).attr("indexmenuOff","true");
        }
        e.preventDefault();
    })
    //点击弹窗“关闭”，关闭弹窗
    $(".indexclose").eq(0).on("touchstart",function (e) {
        $(".indexl_menu").eq(0).css("top","17.33333rem");
        $(".indexmenu").eq(0).attr("indexmenuOff","true");
        return false;
    })

    //点击“我的音乐”出现音乐列表,filelist页(tap有事件冒泡，改用touchstart解决)
    $(".indexnonediv2").on("touchstart",function (e) {
        $(".indexl_menu").eq(0).css("top","17.33333rem");
        $(".indexmenu").eq(0).attr("indexmenuOff","true");
        $(".indexwrap").css("display","none");
        $(".playlistwrap").css("display","none");
        $(".filewrap").css("display","block");
        return false;
    })

   //点击index的搜索，出现playlist页
    $(".indexsearch").tap(function (e) {
        $(".indexwrap").css("display","none");
        $(".playlistwrap").css("display","block");
        $(".filewrap").css("display","none");
        e.preventDefault();
    })
   //点击playlist的返回，返回到index
     $(".playlistmenu").tap(function (e) {
         $(".indexwrap").css("display","block");
         $(".playlistwrap").css("display","none");
         $(".filewrap").css("display","none");
         e.preventDefault();
     })
   // 点击file的x，返回到index
    $(".filemenu").tap(function (e) {
        $(".indexwrap").css("display","block");
        $(".playlistwrap").css("display","none");
        $(".filewrap").css("display","none");
        e.preventDefault();
    })
    //点击file的搜索，出现playlist页
    $(".filesearch").tap(function (e) {
        $(".indexwrap").css("display","none");
        $(".playlistwrap").css("display","block");
        $(".filewrap").css("display","none");
        e.preventDefault();
    })

//filewrap第三页
   //点击“更多信息”
     $(".filemore").tap(function (e) {
         $(this).css("display","none");
         //zepto中的数字不用加引号
         $(".filelist").css("height",648);
         e.preventDefault();

         // 歌词列表添加滑动事件
         var abc =0;
         $(".filelist").bind("touchstart",function (e) {

             var startPoint = e.changedTouches[0].pageY;
             var top = $(".filelist_ul").css("top").replace(/\D+$/ig, "");
             if (top == 0) {
                 $(".filelist_ul").attr("topOff", "true");
             } else {
                 $(".filelist_ul").attr("topOff", "false");
             }
             e.preventDefault();

             $(".filelist").bind("touchmove", function (e) {
                 var nowPoint = e.changedTouches[0].pageY;
                 abc = nowPoint - startPoint;
                 //abc的值，向上是负的，向下是正的
                 console.log($(".filelist_ul").attr("topOff"));
                 if ($(".filelist_ul").attr("topOff") == "true") {
                     if (abc >= 0) {
                         $(".filelist_ul").css("top", 0);
                     } else {

                         var ulTop = $(".filelist_ul").height() - Math.abs(abc);
                         var listHeight = $(".filelist").height();
                         if (ulTop <= listHeight) {
                             var h = $(".filelist_ul").height() - $(".filelist").height();
                             $(".filelist_ul").css("top", h);
                         } else {
                             $(".filelist_ul").css("top", abc);
                         }
                     }
                 } else {
                     if (abc >= 0) {
                         var H = parseFloat(abc) + parseFloat(top);
                         $(".filelist_ul").css("top", H);
                         if (parseFloat(abc) > Math.abs(top)) {
                             $(".filelist_ul").css("top", 0);
                         }
                     } else {
                         var ulTop_Top = parseFloat($(".filelist_ul").height()) - Math.abs(abc) + parseFloat(top);
                         var listHeight = $(".filelist").height();
                         if (ulTop_Top <= listHeight) {
                             var h = $(".filelist").height() - $(".filelist_ul").height() - 172;
                             console.log(h);
                             $(".filelist_ul").css("top", h);
                         } else {
                             //使用+时，首先要清除你要干嘛，运算，一定要清楚+两边是否都是number类型的数据
                             $(".filelist_ul").css("top", parseFloat(abc) + parseFloat(top));
                         }
                     }
                 }
                 e.preventDefault();
             })
         })
     })

     //歌曲列表点击播放音乐
     $(".filelist li").on("touchstart", function (e) {
         _this = $(this);
         if (startOff) {
             isPlay();
             startOff = !startOff;
         } else {
             clearInterval(timer);
             audio.pause();
             currentTime = audio.currentTime;
             //当前页面的图标变化
             for (var i = 0; i < $(".filelist li").length; i++) {
                 var nameHtml = $(".filelist li").eq(i).children("*:nth-child(2)").children("*:nth-child(1)").html();
                 if (nameHtml == $(".datalistName").html()) {
                     $(".filelist li").eq(i).children("*:nth-child(3)").css("background", 'url("/img/sprit.png") no-repeat -2.69333rem -2.18667rem');
                     $(".filelist li").eq(i).children("*:nth-child(3)").css("background-size", '10rem 20.32rem');
                 }
             }

             var name = $(_this).children("*:nth-child(2)").children("*:nth-child(1)").html();
             if (name == $(".datalistName").html()) {
                 //index页面的图标变化
                 $(".indexcontrol_ul_li3").css("background", 'url("/img/sprit.png") no-repeat 0 0');
                 $(".indexcontrol_ul_li3").css("background-size", '10rem 20.32rem');
                 //搜索页的图标变化
                 $(".playlistsection_ul_li4").css("background", 'url("/img/sprit.png") no-repeat -2.69333rem -2.18667rem');
                 $(".playlistsection_ul_li4").css("background-size", '10rem 20.32rem');
                 startOff = true;

             } else {
                 isPlay();
             }
         }
         return false;
     })

     //歌曲列表点击播放音乐  使用的方法
     function isPlay() {
         for (var i = 0; i < dataList.length; i++) {
             var name = $(_this).children("*:nth-child(2)").children("*:nth-child(1)").html();
             if (name == dataList[i].songName) {
                 $(".datalistName").html(dataList[i].songName);
                 $(".datalistPerson").html(dataList[i].singerName);
                 audio.src = dataList[i].music;
                 clearInterval(timer);
                 audio.currentTime = currentTime;
                 audio.play();

                 //当前页面的图标变化
                 $(_this).children("*:nth-child(3)").css("background", 'url("/img/stop.png") no-repeat');
                 $(_this).children("*:nth-child(3)").css("background-size", '0.89333rem 0.93333rem');
                 //index页面的图标变化
                 $(".indexcontrol_ul_li3").css("background", 'url("/img/stop.png") no-repeat');
                 $(".indexcontrol_ul_li3").css("background-size", '1.94667rem 1.94667rem');
                 //搜索页的图标变化
                 $(".playlistsection_ul_li4").css("background", 'url("/img/stop.png") no-repeat');
                 $(".playlistsection_ul_li4").css("background-size", '0.88rem 0.88rem');
                 audio.currentTime = currentTime;
                 //歌词播放需要的总时间
                 $(".playlistsection_ul_li7").html(ms(audio.duration));
                 $(".indextotaltime").html(ms(audio.duration));
                 //歌词播放的当前时间
                 $(".indexpretime").html(ms(audio.currentTime));
                 $(".playlistsection_ul_li1").html(ms(audio.currentTime));
             }
         }
     }

     //点击上一曲下一曲时，音乐列表图标de变化
     function clear() {
         //先大清除，再单个渲染
         for (var i = 0; i < $(".filelist li").length; i++) {
             var nameHtml = $(".filelist li").eq(i).children("*:nth-child(2)").children("*:nth-child(1)").html();
             $(".filelist li").eq(i).children("*:nth-child(3)").css("background", 'url("/img/sprit.png") no-repeat -2.69333rem -2.18667rem');
             $(".filelist li").eq(i).children("*:nth-child(3)").css("background-size", '10rem 20.32rem');
         }
         for (var i = 0; i < $(".filelist li").length; i++) {
             var name = $(".filelist li").eq(i).children("*:nth-child(2)").children("*:nth-child(1)").html();
             if (name == $(".datalistName").html()) {
                 $(".filelist li").eq(i).children("*:nth-child(3)").css("background", 'url("/img/stop.png") no-repeat');
                 $(".filelist li").eq(i).children("*:nth-child(3)").css("background-size", '0.89333rem 0.93333rem');
             }
         }
     }
}

