
// UPDATE DATE FROM FOOTER COPYRIGHT CODE
document.getElementById("year").textContent = new Date().getFullYear();



// COPY BUTTON CODE -------------------------------------------------------------
function copy(){

    const code = document.getElementById("code");

    const copied = code.innerText;

    const copy = document.getElementById("copy");

    copy.textContent = "Copied code";
    copy.style.background = "linear-gradient(230deg, rgb(60, 255, 0), rgb(45, 211, 3))";
    copy.style.color = "black";

    navigator.clipboard.writeText(copied);

}

// COPY BUTTON CSS CODE --------------------------------------------------------------------
function copyCss(){

    const codeCss = document.getElementById("codeCss");

    const copiedCss = codeCss.innerText;

    const copyCss = document.getElementById("copyCss");

    copyCss.textContent = "Copied code";
    copyCss.style.background = "linear-gradient(230deg, rgb(60, 255, 0), rgb(45, 211, 3))";
    copyCss.style.color = "black";

    navigator.clipboard.writeText(copiedCss);

}

// COPY BUTTON JAVASCRIPT CODE --------------------------------------------------------------------
function copyJav(){

    const codeJav = document.getElementById("codeJav");

    const copiedJav = codeJav.innerText;

    const copyJav = document.getElementById("copyJav");

    copyJav.textContent = "Copied code";
    copyJav.style.background = "linear-gradient(230deg, rgb(60, 255, 0), rgb(45, 211, 3))";
    copyJav.style.color = "black";

    navigator.clipboard.writeText(copiedJav);

}

// HTML QUIZ ALL CODE ----------------------------------------------------------------------------------

function right(){
    const answer = document.getElementById("answer")

    answer.textContent = "Correct";
    answer.style.color = "lime";
    answer.style.fontWeight = "bold";

    document.getElementById("right").style.background = "lime";
    document.getElementById("wrong").style.background = "white";
    document.getElementById("wrong2").style.background = "white";
    document.getElementById("wrong3").style.background = "white";
    
}

function wrong(){
    const answer = document.getElementById("answer")

    answer.textContent = "Incorrect";
    answer.style.color = "red";
    answer.style.fontWeight = "bold";

    document.getElementById("wrong").style.background = "orange";
    document.getElementById("right").style.background = "white";
    document.getElementById("wrong2").style.background = "white";
    document.getElementById("wrong3").style.background = "white";
}

function wrong2(){
    const answer = document.getElementById("answer")

    answer.textContent = "Incorrect";
    answer.style.color = "red";
    answer.style.fontWeight = "bold";

    document.getElementById("wrong2").style.background = "orange";
    document.getElementById("wrong").style.background = "white";
    document.getElementById("right").style.background = "white";
    document.getElementById("wrong3").style.background = "white";
}

function wrong3(){
    const answer = document.getElementById("answer")

    answer.textContent = "Incorrect";
    answer.style.color = "red";
    answer.style.fontWeight = "bold";

    document.getElementById("wrong3").style.background = "orange";
    document.getElementById("wrong").style.background = "white";
    document.getElementById("right").style.background = "white";
    document.getElementById("wrong2").style.background = "white";
}

// HTML QUIZ ALL CODE ENDS ------------------------------------------------------------------------------