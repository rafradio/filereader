let list = document.querySelectorAll('input[type="checkbox"]');
let checkFlag = true;
let elem = list[0];
while (checkFlag) {
    let elemNext = elem.parentElement;
    if (elem.nodeName=='DIV' && elem.id.includes("qwrap")) {
        
            checkFlag = false;
        
        
    } else {
        elem = elemNext;
    }
}

console.log("Проверка длины - ", elem);
elem.style.display = "block";

let list1 = document.getElementsByTagName('textarea');
Array.from(list1).forEach((elem, ind) => {
    if (elem.innerHTML != "") {
        let checkFlag = true;
        let elem1 = elem;
        while (checkFlag) {
            let elemNext = elem1.parentElement;
            if (elem1.nodeName=='DIV' && elem1.id.includes("qwrap")) {
                    checkFlag = false;
            } else {
                elem1 = elemNext;
            }
        }

        console.log("Проверка длины1 - ", elem1);
        elem1.style.display = "block";
    }
    
});
