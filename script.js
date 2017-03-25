var per = $("#txtSess").text() * 60; // seconds for session
i=0;
breakLen = $("#txtBrk").text() * 60; // seconds for break
totalBreak = 0;
totalTime = 0;
var interval = null;
var breakInterval = null;
var isClicked = false;
checkA = 0;
sessionIsTrue = true;
//alert(per);
$("#load-bar").height(100 + "%");


$("#load-bar").height(100 + "%");

  $("#load-bar-frame").click(function(evt){
    //console.log('triggered');
    
    if(per != 0 && totalTime == 0){
      per = 60 * parseInt($('#txtSess').text());
      totalTime = per;
    }
    
    if(totalBreak == 0 && breakLen !=0)
      {
        totalBreak = 60;
      }
    
    if(isClicked == false)
      {
        if(sessionIsTrue){
          $('#clockTxt').text('Session');
          $("#load-brkbar").prop('id', 'load-bar');
          clearInterval(breakInterval);
          interval = setInterval(changeSize, 1000);
          //console.log("in int");
          isClicked = true;
        }
        if (!sessionIsTrue){
          $("#load-bar").prop('id', 'load-brkbar');
          $('#clockTxt').text('Break');
          clearInterval(interval);
          breakInterval = setInterval(breakSess, 1000);
          //console.log("in int");
          isClicked = true;
        }

      }else{
        isClicked = false;
        //console.log("in else");
        clearInterval(interval);
        clearInterval(breakInterval);
        //alert(isClicked);
      }
      //do nothing
    
    if(breakLen === 0)
      {
        $("#txtBrk").text() * 60;
      }
    if(totalTime === 0)
      {
        $("#txtSess").text() * 60;
      }
  });

function breakSess(){
  $('#clockTxt').text('Break');
  $('#load-bar-frame').css('box-shadow', '0 0 0 4px #a90329');
  isClicked == false;
  
  if(sessionIsTrue === true && per ===0 && breakLen === 0){
    breakLen = $("#txtBrk").text() * 60;
  }
  
  $('.timeElapsed').html(secsToMS(breakLen));
  if( (breakLen * 100) / totalBreak <= 100 & (breakLen * 100) / totalBreak >= 0.1 ) // 
    {
      $("#load-brkbar").height((breakLen * 100) / totalBreak + "%");
      //$('.timeElapsed').html( ((breakLen * 100) / totalBreak).toFixed(2) + "%");
      $('.timeElapsed').html(secsToMS(breakLen));
      if(breakLen === 0)
        {
          $('.timeElapsed').html(secsToMS(breakLen));
          $("#load-brkbar").height(0 + "%");
          per = $("#txtSess").text() * 60;
          $("#load-brkbar").prop('id', 'load-bar');
          $("#load-bar").height(100 + "%");
          $('#load-bar-frame').css('box-shadow', '0 0 0 4px #D9F287');
          $('#clockTxt').text('Session');
        }
    }else{
      clearInterval(breakInterval);
      sessionIsTrue = true;
      interval = setInterval(changeSize, 1000);
      $('.timeElapsed').html(secsToMS(breakLen));
      $("#load-brkbar").prop('id', 'load-bar');
      $("#load-bar").height(100 + "%");
      $('#load-bar-frame').css('box-shadow', '0 0 0 4px #D9F287');
      per = $("#txtSess").text() * 60;
      $('#clockTxt').text('Session');
      $("#load-brkbar").prop('id', 'load-bar');
    }
  
  if(breakLen !== 0){
    breakLen--;
  }
}
// for session 
function changeSize(interVal){
  //alert(interVal);
  sessionIsTrue = true;
  $('.timeElapsed').text(secsToMS(per));
  if( (per * 100) / totalTime <= 100 & (per * 100) / totalTime >= 0.1 ) // 
    {
      $("#load-bar").height((per * 100) / totalTime + "%");
      //$('.timeElapsed').html( ((per * 100) / totalTime).toFixed(2) + "%");
      $('.timeElapsed').text(secsToMS(per));
      if(per === 0)
        {
          $('.timeElapsed').text(secsToMS(per));
          $("#load-bar").height(0 + "%"); //
          breakLen = $("#txtBrk").text() * 60;
        }
    }
  else{
      //alert('completed time ' + per);
    clearInterval(interval);
    sessionIsTrue = false;
    breakLen = $("#txtBrk").text() * 60;
    $("#load-bar").prop('id', 'load-brkbar');
    $("#load-brkbar").height((breakLen * 100) / totalBreak + "%");
    breakInterval = setInterval(breakSess, 1000);
    }
  if(per !==0){
    per--;
  }
  
}

$("#dcBrk").click(function(evt){
   if($('#txtBrk').text()-0 >= 2)
    {
      $('#txtBrk').text(parseInt($('#txtBrk').text()) - 1);
    }
  
  breakLen = 60 * parseInt($('#txtBrk').text());
  totalBreak = breakLen;
});

$("#inBrk").click(function(evt){
    if($('#txtBrk').text()-0 <= 24) //totalBreak = 0;
    {
      $('#txtBrk').text(parseInt($('#txtBrk').text()) + 1);
    }
  
  breakLen = 60 * parseInt($('#txtBrk').text());
  totalBreak = breakLen;
});

$("#dcSess").click(function(evt){
  if($('#txtSess').text()-0 >= 2)
    {
      $('#txtSess').text(parseInt($('#txtSess').text()) - 1);
    }
  per = 60 * parseInt($('#txtSess').text());
  totalTime = per;
});

$("#inSess").click(function(evt){
  if($('#txtSess').text()-0 <= 24)
    {
      $('#txtSess').text(parseInt($('#txtSess').text()) + 1);
    }
  
  per = 60 * parseInt($('#txtSess').text());
  totalTime = per;
});

function secsToMS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
