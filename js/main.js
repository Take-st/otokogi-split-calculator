(function(){
  "use strict";

  var price = document.getElementById("price");
  var num = document.getElementById("num");
  var unit = document.getElementById("unit");
  var btn = document.getElementById("btn");
  var result = document.getElementById("result");
  var reset = document.getElementById("reset");

  function checkInput(){
    //    /^[1-9][0-9]*$/  自然数
    if(
      price.value.match(/^[1-9][0-9]*$/) !== null &&
      num.value.match(/^[1-9][0-9]*$/) !== null
    ){
      btn.classList.remove("disabled");
    }else{
      btn.classList.add("disabled");
    }
  }


  btn.addEventListener("click", function(){
    var payLess;
    var short;
    var payMore;
    var over;
    var str;
    var fraction;
    if(this.classList.contains("disabled")){
      return;
    }
    if(price.value < 1000){
      str = "今回は安いから、男たちでジャン負けが払おう！"
      result.textContent = str;
      reset.classList.remove("hidden");
      return;
    }
    fraction = price.value - (Math.floor(price.value / 1000)) * 1000;
    // 端数の計算
    // 5500/1000 5.5 5  5000 500
    // 15000/1000 15 15000 0
    // 15700/1000 15.7 15000 700

    //300*3 100  payLEss short
    //400*3 -200 payMore over
    // payLess = 1000 / 3; //333.33333
    // payLess = 1000 / 3 / 100; //3.3333333
    // payLess = Math.floor(1000 / 3 / 100) * 100; ///300
    // short = 1000 - (300 * 3) //100
    // payMore = Math.ceil(1000 / 3 / 100) * 100; //400
    // over = Math.abs(1000 - (400 * 3)) //200

    var menSum = price.value - fraction;
    payLess = Math.floor(menSum / num.value / unit.value) * unit.value; ///300
    short = menSum - (payLess * num.value) //100
    payMore = Math.ceil(menSum / num.value / unit.value) * unit.value; //400
    over = Math.abs(menSum - (payMore * num.value)) //200
    if(short === 0 && over === 0 && fraction === 0 ){
      str =
      "今回は女性は出さなくて大丈夫！" +
      "男性陣は一人" + (menSum/num.value) + "円ちょうどね！";
    }else if(short === 0 && over === 0){
      str =
      "女性は端数の" + fraction + "円を協力して！" +
      "男性陣は一人" + (menSum/num.value) + "円ちょうどね！";
    }else{
      str =
      "女性はみんなで" + fraction + "円でいいよ！" +
      "一人" + payLess +"円だと" + short + "円足りなくて" +
      "一人" + payMore +"円だと" + over + "円余るって感じ！" ;
    }
    result.textContent = str;
    reset.classList.remove("hidden");
  });

  price.addEventListener("keyup", checkInput);
  num.addEventListener("keyup", checkInput);

  reset.addEventListener("click", function(){
    result.textContent = "ここに結果を表示します";
    price.value = "";
    num.value = "";
    unit.value = "100";
    btn.classList.add("disabled");
    this.classList.add("hidden");
    price.focus();
  });
  price.focus();
})();
