// UPDATE DATE FROM FOOTER COPYRIGHT CODE
document.getElementById("year").textContent = new Date().getFullYear();


let error = document.getElementById("error")


function generate(){

    let input = document.getElementById("input").value.trim()

    let input2 = input.replace("https://", "")
    
    let input3 = input.replace("http://", "")

    let noteClick = document.getElementById("noteClick")

    const display = document.getElementById("display")

    if (input == ""){

        error.textContent = "Please enter your url first"

    } else if (!input.startsWith("https://") && !input.startsWith("http://")){

        error.textContent = "Please enter a valid http:// or https:// url"

    } else if(input2.includes("/") && input3.includes("/")){

        display.textContent = `<link rel="canonical" href="${input}">`

        noteClick.textContent = "Generated"

        error.textContent = ""

    } else if(!input2.endsWith("/")){

        display.textContent = `<link rel="canonical" href="${input}/">`

        noteClick.textContent = "Generated"

        error.textContent = ""

    } else {
        
        display.textContent = `<link rel="canonical" href="${input}/">`

        noteClick.textContent = "Generated"

        error.textContent = ""
        
    }

}

// COPY BUTTON CODE -------------------------------------------------------------
function copy(){

    const copy = document.getElementById("copy");

    const display = document.getElementById("display")

    let noteCopied = document.getElementById("noteCopied")

    if(display.textContent == ""){

        noteCopied.textContent = "Copy"

        error.textContent = "Generate a url first"

    } else {

        noteCopied.textContent = "Copied"

        const copied = display.textContent;

        navigator.clipboard.writeText(copied);
    

    }
   
}

function  clear2(){

    const display = document.getElementById("display")

    let noteCopied = document.getElementById("noteCopied")

    let input = document.getElementById("input")

    let noteClick = document.getElementById("noteClick")

    input.value = ""

    noteClick.innerText = "Generate"

    error.textContent = ""

    display.innerText = ""

    noteCopied.textContent = "Copy"

}

// COPY BUTTON CODE -------------------------------------------------------------
function copyC(){

    const codeC = document.getElementById("codeC");

    const copied = codeC.innerText;

    const copyC = document.getElementById("copyC");

    copyC.textContent = "Copied code";
    copyC.style.background = "linear-gradient(230deg, rgb(60, 255, 0), rgb(45, 211, 3))";
    copyC.style.color = "black";

    navigator.clipboard.writeText(copied);

}