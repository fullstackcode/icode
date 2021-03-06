$(function(){
	//
	$(document).on("touchmove",function(){
		event.preventDefault();
	});
	
	function preLoading(){
		var num = 0;
		var arr = ["vendor/img/pic1.png","vendor/img/page2/money.png","vendor/img/page2/hand1.png","vendor/img/page2/hand2.png","vendor/img/page2/word.png","vendor/img/page3/page3-1.png","vendor/img/page3/page3-2.png","vendor/img/page3/page3-3.png" ,"vendor/img/page3/page3-4.png","vendor/img/page3/page3-5.png","vendor/img/page3/page3-6.png"];
		for(var i=0;i<arr.length;i++){
			
			var imgObj = new Image();
			imgObj.src = arr[i];

			imgObj.onload = function(){
				num++;
				var percent = parseInt(num/arr.length* 100 );
				console.log(percent)
				$('.loadingText').html(percent+'%');
				if(num == arr.length){
					$(".spinner").remove();
					$(".loading").fadeOut('500', function() {});
					$(".loading").remove();
				}
			}

			imgObj.onerror = function(){
					$('.loadingText').html('100%');
					$(".spinner").remove();
					$(".loading").fadeOut('500', function() {});
					$(".loading").remove();
			}
		}
	}

	preLoading();
	var liObj = $(".list li");
	var startY,moveY,endY;
	var nowIndex,nextIndex;
	var viewHeight = $(window).height();
	function moveFn(event){
			moveY = event.originalEvent.changedTouches[0].pageY;
			console.log(moveY);

			if(moveY<startY){
				console.log('向上滑动');
				nextIndex = nowIndex + 1;
				if(nextIndex>3){
					nextIndex = 0;
				}
				console.log(nextIndex);
				//向上滑动要显示下一张图片 
				liObj.eq(nextIndex).show().addClass('current').siblings().removeClass('current');
				var s = startY - moveY;
				liObj.eq(nextIndex).css("top",viewHeight-s);

			}else if(moveY>startY){
				console.log('向下滑动');
				nextIndex = nowIndex - 1;
				if(nextIndex < 0){
					nextIndex = 3;
				}
				var s = moveY - startY;
				liObj.eq(nextIndex).show().addClass('current').siblings().removeClass('current');
				liObj.eq(nextIndex).css("top",-viewHeight+s);	
			}else{
				console.log('回到原点');
			}
		};

	function endFn(event){
			endY = event.originalEvent.changedTouches[0].pageY;
			liObj.eq(nextIndex).css("top",0);
			liObj.eq(nextIndex).css("transition","top 1s ease 0s");
			//解决暴力用户 如果切屏还在继续不允许 再切屏
			
			if(startY!=endY){
				liObj.off("touchstart touchmove touchend");
			}
			
	}

	liObj.on("touchstart",function(event){
		startY = event.originalEvent.changedTouches[0].pageY;
		nowIndex = $(this).index();
	});

	liObj.on("touchmove",moveFn);
	liObj.on("touchend",endFn);



	liObj.on("webkitTransitionEnd transitionEnd",function(){
			console.log("过渡结束了");
			liObj.eq(nextIndex).css("transition","");

			//过渡结束后,避免出现权重问题 ，其他都隐藏掉
			liObj.eq(nextIndex).siblings().hide();
			liObj.eq(nextIndex).addClass('inAnimated').siblings().removeClass('inAnimated');
			// touchend 结束后 恢复事件
			liObj.on("touchstart",function(event){
						startY = event.originalEvent.changedTouches[0].pageY;
						nowIndex = $(this).index();
					});

			liObj.on("touchmove",moveFn);
			liObj.on("touchend",endFn);
		
    });




});