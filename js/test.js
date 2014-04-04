var cf = 0;
var cf_tag = 0;
var count = 0;
var timeout_hide, timeout_show;

// function popover_show(target) {
//   timeout_show = window.setTimeout(function(){
//     $(".popover-show").removeClass("popover-show").addClass("popover-hide");
//     $(target).find(".popover").removeClass("popover-hide").addClass("popover-show");
//   }, 300);
//   window.clearTimeout(timeout_hide);
// }

// function popover_hide(target) {
//   timeout_hide = window.setTimeout(function(){
//     $(target).find(".popover").removeClass("popover-show").addClass("popover-hide");
//   }, 400);
// }


// 暂时取消了setTimeout的步骤
function popover_show(target) {
  $(".popover-show").removeClass("popover-show").addClass("popover-hide");
  $(target).find(".popover").removeClass("popover-hide").addClass("popover-show");
}

// popover_hide 现在的target参数是用不上的只是没删而已
// 现在做法是直接全局之内找.popover-show关掉之，不考虑具体哪个开着
// ====
// 所以现在popover_hide更确切的名字应该是：
// popover_hide_all(); 并非popover_show的严格反面
// ====
// 同时把cf_tag 重置到 0
// ct_tag 是全局var，只在.popover-show展开的时候才有必要存在
// 每次.popover-show被关掉时reset成0
function popover_hide(target) {
  $(".popover-show").removeClass("popover-show").addClass("popover-hide");
  cf_tag = 0;
  $(".tag-focus").removeClass("tag-focus");
}


// 使用.pb-focus样式来标示目前cf里存着的对象，在_standard.sass里头，下面的tag-focus样式也是
// .pb-focus应作用在pb-target上，而非each-pb
// ====
// do_focus 工作逻辑：
// 先收起所有开着的东西
// 找到所有现在开着.pb-focus的东西，关之
// 把.pb-focus移到cf下的pb-target上
// 最后再展开它下面的popover
function do_focus() {
  popover_hide();
  $(".pb-focus").removeClass("pb-focus");
  cf.find(".pb-target").addClass("pb-focus");
  popover_show(cf); // 不应该把这两步分开吗？?
}


// 找到目前所有开着.tag-focus的，关之
// 然后只对currentfocus tag加上.tag-focus以标示cf_tag内的内容
function do_tag_focus() {
  $(".tag-focus").removeClass("tag-focus");
  cf_tag.addClass("tag-focus");
}

function press_right() {
  if (cf == 0) {
    // cf = 第一个
    cf = $(".pb-list").find(".each-pb").first();
    do_focus();
  } else if (cf.is(":last-child")){
    if (cf.parent().is(":last-child")) {
      cf = cf;
    } else {
      cf = cf.parent().next(".pb-group").find(".each-pb").first();
      do_focus();
    }
  } else {
    cf = cf.next(".each-pb");
    do_focus();
  }
} 

function press_left() {
  if (cf == 0) {
    cf = $(".pb-list").find(".each-pb").first();
    do_focus();
  } else if (cf.is(":first-child")){
    if (cf.parent().is(":first-child")) {
      cf = cf;
    } else {
      cf = cf.parent().prev(".pb-group").find(".each-pb").last();
      do_focus();
    }
  } else {
    cf = cf.prev(".each-pb");
    do_focus();
  }
}

// up & down 对于cf的选择，还没有写
function press_down() {
  if (cf == 0) {
    cf = $(".pb-list").find(".each-pb").first();
    do_focus();
  } else {
    if ( cf.find(".popover").hasClass("popover-show") ){
      // focus 到children里选择tag
      if (cf_tag == 0){
        cf_tag = cf.find(".each-tag").first();
        do_tag_focus();
      } else {
        if (cf_tag.is(":last-child")){
          cf_tag = cf_tag;
        } else {
          cf_tag = cf_tag.next();
          do_tag_focus();
        }
      }
    } else {
      // 跳到下一行
    }
  }
}

function press_up() {
  if (cf == 0) {
    cf = $(".pb-list").find(".each-pb").first();
    do_focus();
  } else {
    if ( cf.find(".popover").hasClass("popover-show") ){
      // focus 到children里选择tag
      if (cf_tag == 0){
        cf_tag = cf.find(".each-tag").last();
        do_tag_focus();
      } else {
        if (cf_tag.is(":first-child")){
          cf_tag = cf_tag;
        } else {
          cf_tag = cf_tag.prev();
          do_tag_focus();
        }
      }
    } else {
      // 跳到下一行
    }
  }
}

function press_enter(){
  if (cf_tag == 0){
    if (cf == 0){}
      else{
        clickpb(cf.find(".pb-target"));
      }
  } else{
    clicktag(cf_tag);
  };
}

function press_shift(){
  if(cf.find(".popover").hasClass("popover-show") == true){
//此处应写成hide this
    popover_hide();
  } else
  {do_focus();};
}

function press_number(target){
  cf = $(target);
  do_focus();
}

function hotkeys(){
  KeyboardJS.on('right', press_right);
  KeyboardJS.on('left', press_left);
  KeyboardJS.on('down', press_down);
  KeyboardJS.on('up', press_up);
  KeyboardJS.on('1', function() {press_number($("#pb-1"))});
  KeyboardJS.on('2', function() {press_number($("#pb-2"))});
  KeyboardJS.on('3', function() {press_number($("#pb-3"))});
  KeyboardJS.on('4', function() {press_number($("#pb-4"))});
  KeyboardJS.on('5', function() {press_number($("#pb-5"))});
  KeyboardJS.on('6', function() {press_number($("#pb-6"))});
  KeyboardJS.on('7', function() {press_number($("#pb-7"))});
  KeyboardJS.on('8', function() {press_number($("#pb-8"))});
  KeyboardJS.on('9', function() {press_number($("#pb-9"))});
  KeyboardJS.on('1>0', function() {press_number($("#pb-10"))});
  KeyboardJS.on('space + 1', function() {press_number($("#pb-11"))});
  KeyboardJS.on('1>2', function() {press_number($("#pb-12"))});
  KeyboardJS.on('1>3', function() {press_number($("#pb-13"))});
  KeyboardJS.on('1>4', function() {press_number($("#pb-14"))});
  KeyboardJS.on('1>5', function() {press_number($("#pb-15"))});
  KeyboardJS.on('1>6', function() {press_number($("#pb-16"))});
  KeyboardJS.on('1>7', function() {press_number($("#pb-17"))});
  KeyboardJS.on('1>8', function() {press_number($("#pb-18"))});
  KeyboardJS.on('1>9', function() {press_number($("#pb-19"))});
  KeyboardJS.on('2>0', function() {press_number($("#pb-20"))});
  KeyboardJS.on('2>1', function() {press_number($("#pb-21"))});
  KeyboardJS.on('space + 2', function() {press_number($("#pb-22"))});
  KeyboardJS.on('2>3', function() {press_number($("#pb-23"))});
  KeyboardJS.on('2>4', function() {press_number($("#pb-24"))});
  KeyboardJS.on('2>5', function() {press_number($("#pb-25"))});
  KeyboardJS.on('2>6', function() {press_number($("#pb-26"))});
  KeyboardJS.on('2>7', function() {press_number($("#pb-27"))});
  KeyboardJS.on('2>8', function() {press_number($("#pb-28"))});
  KeyboardJS.on('2>9', function() {press_number($("#pb-29"))});
  KeyboardJS.on('3>0', function() {press_number($("#pb-30"))});
  KeyboardJS.on('shift',press_shift);
  KeyboardJS.on('enter',press_enter);
}

//有关click的一堆
function clickpb(target){
  $(target).parent(".each-pb").find(".pb-target").toggleClass("pb-selected");
  popover_hide();
  //下面一行如果删掉，用户可以将错误类型用作中性标签
  $(target).parent().find(".each-tag").removeClass("tag-selected");
}

function selectpb(target){
  $(target).parent().parent().prev().addClass("pb-selected");
}

function clicktag(target){
  if ($(target).hasClass("tag-selected")){
    $(target).removeClass("tag-selected");
  } else{
    $(target).addClass("tag-selected");
    selectpb($(target));
  }
  popover_hide(); 
}
// 以上为有关click的一堆结束

// 以下是input的事情
function score_input_hide(){
  $(".score-input").css("display","none");
}


$(".has-score").on("click", function(){
  score_input_focus(this);
});

//target必须是each pb
function score_input_focus(target){
  score_input_hide();
  $(target).find(".score-input").css("display","block").find("input").focus();
  current_input = $(target);
}

//target必须是each pb
function score_input_blur(target){
  $(target).find(".score-input input").blur().parent().css("display","none");
}

function event_in_eachpb(){
  if ($(event.target).parents(".each-pb").hasClass("each-pb")){return true}
    else{return false}
}

$(document).bind("click",function(){
  if ( event_in_eachpb() ) {
    //do nothing
  } else{
    score_input_hide();
  }
})

//以上为有关input的主要事情结束

$(function(){
  window.onload = function(){
    hotkeys();
  }

  $(".each-pb").mouseenter(function(){
    cf = $(this);
    do_focus();
  });

  $(".each-pb").mouseleave(function(){
    // popover_hide();  
    $(this).find(".popover-show").removeClass("popover-show").addClass("popover-hide");
    cf_tag = 0;
    $(this).find(".tag-focus").removeClass("tag-focus");  
  });

// click的工作方式，目前只改换了pb-target的样式
  $(".pb-target").on("click", function(){
    clickpb($(this));
  });

 $(".each-tag").on("click", function(){
    clicktag($(this));
  });

//问题1:鼠标在tag上时，right，popover昙花一现
//解决办法：把原因里的hide全局改为hide this
//原因：当从第一题换到第二题时，cf变为第二题，此时第一题popover消失，然后mouseleave触发，然后hide，然后全部hide了

//问题2:tag无法添加tag_focus类
//解决办法：将所有mouseover改为mouseenter
//原因：疑似某个事件触发之后，mouseover被重新执行了一遍，导致了某些蛋疼的问题

  $(".each-tag").mouseenter(function(){
    cf_tag = $(this);
    do_tag_focus();
  });
});

