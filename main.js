//variables

let words = ["hello","ananas","banana","tiger","lion","tree","appel"];
let cur_word = words[Math.floor(Math.random()*words.length)];//select random word
let lines = document.querySelectorAll(".line");
let valid_line = document.querySelector(".valid"); 
let valid = document.querySelectorAll(".valid input");
let check = document.querySelector(".check");
let hints = document.querySelector(".hints");
let line_number = 0;
let hints_number = 3;
let hints_pos = [];

//events

//check button event

check.addEventListener("click",()=>{
    remove_valid(valid , valid_line);

    //if the answer is right

    if(check_word(cur_word,valid,valid_line)){
        let game = document.querySelector(".game");
        let win = document.createElement("h2");
            win.textContent = "You win";
            win.style.setProperty("color","green");
            win.style.setProperty("text-align","center");
        game.appendChild(win);
        restart();
    }

    //if the answer is wrong

    else{
        if(line_number < 5){
            ++line_number;
            valid_line = lines[line_number];
            valid_line.classList.add("valid");
            valid = document.querySelectorAll(".valid input");
            add_event(valid);
        }
        else{
            let game = document.querySelector(".game");
            let lose = document.createElement("h2");
                lose.textContent = "You lose";
                lose.style.setProperty("color","red");
                lose.style.setProperty("text-align","center");
            game.appendChild(lose);
            restart();
        }
    }
});

//hints button event

hints.addEventListener("click",()=>{
    if(hints_number > 0){
        --hints_number;
        let pos;
        do{
            pos = Math.floor(Math.random()*cur_word.length);
        }while(hints_pos.includes(pos));
        hints_pos.push(pos);
        valid[pos].value = cur_word[pos];
        valid[pos].style.setProperty("border-color","green");
    }
    if(hints_number === 0){
        hints.style.setProperty("background-color","grey");
    }
    hints.textContent = `${hints_number} hints`;
});

//add input event to the current inputs line

function add_event(valid){
    for(let i=0;i<valid.length;++i){
        valid[i].attributes.removeNamedItem("readonly");
        valid[i].addEventListener("input",(e)=>{
           if(i<5){
                if(valid[i].value.length === 0 && i>0)
                    valid[i-1].focus();
                if(valid[i].value.length === 2){
                    let c = valid[i].value[1];
                    valid[i].value = valid[i].value[0];
                    valid[i+1].focus();
                    if(valid[i+1].value.length === 0)
                        valid[i+1].value = c;
                }
           }
           else{
                if(valid[i].value.length === 0)
                    valid[i-1].focus();
                else
                    valid[i].value = valid[i].value[0];
           }
        });
    
    }    
}

//remove inputs line validity

function remove_valid(valid , valid_line){
    for(let i=0;i<valid.length;++i){
        valid[i].setAttribute("readonly","readonly");
    }
    valid_line.classList.remove("valid");    
}

//check the answer

function check_word(cur_word,valid,valid_line){
    valid_line.classList.add("done");
    let sol="";
    for(let i=0;i<valid.length;++i){
        sol+=valid[i].value.toLowerCase();
        if(sol[i] === cur_word[i]){
            valid[i].style.setProperty("background-color","orange")
        }
        else if(cur_word.indexOf(sol[i]) >= 0){
            valid[i].style.setProperty("background-color","green")
        }
        else{
            valid[i].style.setProperty("background-color","black")
        }
    }
    if(sol === cur_word)
        return true;
    return false;
}

//restart game function

function restart(){
    check.remove();
    hints.remove();
    let buttons = document.querySelector(".buttons");
    let re_bu = document.createElement("button");
        re_bu.textContent = "Restart";
        re_bu.style.setProperty("width","100%");
    buttons.appendChild(re_bu);
    re_bu.addEventListener("click",()=>{
        window.location.reload();
    });
}

add_event(valid);