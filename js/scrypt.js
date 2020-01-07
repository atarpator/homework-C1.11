function jQuery (selector, context = document){
  this.elements = Array.from(context.querySelectorAll(selector));
  return this
}

jQuery.prototype.each = function (fn){
  this.elements.forEach((element, index) => fn.call(element, element, index));
  return this;
}

jQuery.prototype.click = function(fn){
  this.each(element => element.addEventListener('click', fn, false));
  return this
}

jQuery.prototype.remove = function(){
  this.each(element => element.remove());
  return this;
}

jQuery.prototype.hide = function(){
  this.each(element => element.style.display = 'none');
  return this;
}

jQuery.prototype.show = function(){
  this.each(element => element.style.display = '');
  return this;
}

jQuery.prototype.class = function(name){
  this.each(element => element.className = name);
  return this;
}

jQuery.prototype.html = function(str='0'){
    if (str == '0') {
      let inner;
      this.each(element => inner = element.innerHTML);
      return inner
  } else {
    this.each(element => element.innerHTML = str);
    return this;
  };
}

jQuery.prototype.text = function(str='0'){
    if (str == '0') {
      let inner;
      this.each(element => inner = element.innerText);
      return inner
  } else {
    this.each(element => element.innerText = str);
    return this;
  };
}

const $ = (e) => new jQuery(e);


// Таймер

// Получение значений полей часов
function getData() {
  let min = Number($("#min").text());
  let sec = Number($("#sec").text());
  return [min, sec]
}

// Увеличение минут
function minPlus() {
  let min = getData()[0];
  if (min >= 59) {
    $("#min").html(`<p>0</p>`)
  } else {
    min ++;
    $("#min").html(`<p>${min}</p>`)
  }
}

// Увеличение секунд
function secPlus() {
  let sec = getData()[1];
  if (sec >= 59) {
    $("#sec").html(`<p>0</p>`)
    minPlus()
  } else {
    sec ++;
    $("#sec").html(`<p>${sec}</p>`);
  }
}

// Уменьшение минут
function minMinus() {
  let min = getData()[0];
  if (min <= 0) {
    $("#min").html(`<p>59</p>`);
  } else {
    min --;
    $("#min").html(`<p>${min}</p>`);
  }
}

// Уменьшение секунд
function secMinus() {
  let sec = getData()[1];
  if (sec <= 0) {
    $("#sec").html(`<p>59</p>`)
    minMinus()
  } else {
    sec --;
    $("#sec").html(`<p>${sec}</p>`);
  }
}

// Обратный отсчёт
function countDown(){
  let min = getData()[0];
  let sec = getData()[1];
  if (stopCount == false) {
    return
  } else if (sec == 0 && min != 0) {
    minMinus();
    $("#sec").html(`<p>59</p>`);
  } else if (sec > 0 || min > 0) {
    secMinus();
  } else if (sec == 0 && min == 0) {
    stopCount = false;
    $(".message").show();
  }
  window.setTimeout(countDown, 1000);
}


// Старт
function start() {
  if (stopCount == true) {
    return
  } else if (stopCount == false) {
    $(".message").hide();
    stopCount = true;
    countDown();
  }
}

// Пауза
function pause() {
  stopCount = false;
}

// Сброс
function reset() {
  $(".message").hide();
  stopCount = false;
  $("#sec").html(`<p>0</p>`);
  $("#min").html(`<p>0</p>`);

}

let stopCount = false;

$(".plus-m").click(minPlus);
$(".plus-s").click(secPlus);
$(".minus-m").click(minMinus);
$(".minus-s").click(secMinus);

$(".start").click(start);
$(".pause").click(pause);
$(".reset").click(reset);

$(".message").hide();
