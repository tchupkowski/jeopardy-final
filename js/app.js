var totalMoney = [];

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

    var ajaxArray=[];
    
    function fetch(smth,listNum) {

            var thisCategory = $(".category").eq(listNum) 

            for (var i=0; i<=4; i++){

              $(".clue", thisCategory).eq(i).html(smth.results[i].question);
              $(".answer", thisCategory).eq(i).html(smth.results[i].correct_answer);

                var thisClue = $("<div class='clueWords'>" + smth.results[i].question + "</div>");
                var correct = $('<br><br><button type="button" class="btn btn-info btn-lg correct" id="correct">' + smth.results[i].correct_answer + '</button>');
                var inc1 = $('<br><br><button type="button" class="btn btn-info btn-lg incorrect" id="inc1">' + smth.results[i].incorrect_answers[0]+ '</button>');
                var inc2 = $('<br><br><button type="button" class="btn btn-info btn-lg incorrect" id="inc2">' + smth.results[i].incorrect_answers[1]+ '</button>');
                var inc3 = $('<br><br><button type="button" class="btn btn-info btn-lg incorrect" id="inc3">' + smth.results[i].incorrect_answers[2]+ '</button>');

                var choices = [correct,inc1,inc2,inc3];

                choices = shuffle(choices);
                newdiv =document.createElement("div");
                
                $(".clueAndAnswer", thisCategory).eq(i).append(thisClue, choices[0], choices[1], choices[2], choices[3]);                   
            }

              
    }
    $(function () {

        var catArray = [9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,32];

        for(var h=0; h<=4; h++){

            var catIndex = Math.floor(Math.random() * catArray.length)

            var categoryNo = catArray.splice(catIndex,1);
             var idname = "#category-name-"+h;

            $.ajax({
                url: 'https://opentdb.com/api.php?amount=5&category=' + categoryNo + '&type=multiple',
                method: "GET",
                idname: idname,
                listNum: h,
                success: function (getResults) {
                   fetch(getResults,this.listNum);
                    ajaxArray.push(getResults);
                    $(this.idname).text(getResults.results[0].category); 
                }
            });
        }    
    });

function clickAmount (el) {
  el.className = 'clue-tile show-clueAndAnswer';
}

function clickClue (el) {
  el.className = 'clue-tile show-answer';
}

function clickAnswer (el) {
  var index = parseInt(el.getAttribute('data-category-index'), 10);
  var category = el.getAttribute('data-category');

  el.className = 'clue-tile revealed';
}

function boardClickHandler(event) {
  var clickedEl = event.target;
  var tagName = clickedEl.tagName;

  if (tagName !== 'LI' && tagName !== 'SPAN') return;

  var el = clickedEl;
  if (tagName === 'SPAN') {
    el = clickedEl.parentNode;
  }

  var classList = el.classList;

  if (classList.contains("show-amount")) {
    clickAmount(el);
  }

  else if (classList.contains("show-answer")) {
    clickAnswer(el);
  }

  $(document).off('click').on('click', 'button', function() {
     if ($(this).is('#correct')){


    $(this).addClass("btn-success");
    $(this).removeClass("btn-info");

    var clueValue = $(this).closest(".clue-tile").find(".amount").html();
    clueValue = Number(clueValue.slice(1));

      totalMoney.push(clueValue);

        setTimeout(function() {
              clickClue(el);
                }, 700);
            }
      else if ($(this).is('.incorrect')){
            $(this).addClass("btn-danger");
            $(this).removeClass("btn-info");
        setTimeout(function() {
              clickClue(el);
                }, 700);
            }
   
});
}

function clickFinish(event) {
var sum = totalMoney.reduce(add, 0);

function add(a, b) {
    return a + b;
}

localStorage.setItem("userScore",sum);

}

function init() {
  

  var boardEl = document.getElementById("board");
  var finishEl = document.getElementById("finish");

 
  boardEl.addEventListener('click', boardClickHandler);

  finishEl.addEventListener('click', clickFinish);
}

window.onload = init;