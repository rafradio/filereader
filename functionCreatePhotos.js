console.log("Будем делать фотографии");
let allPhotosField = document.querySelectorAll('input[type="file"]');
allPhotosField.forEach((item, index) => {
    item.onchange = (event) => {
        console.log(item.value);
        let parent = item.parentNode.parentNode;
        console.log("Добавляем вопрос", parent.nextElementSibling);
        let targetQuestion = parent.nextElementSibling;
        let checkFlag = true;
        let selectQtrArr = new Map();
        console.log("Добавляем вопрос",parent, targetQuestion.getElementsByTagName("b")[1].innerHTML);
        while (checkFlag) {
            let startN = targetQuestion.getElementsByTagName("b")[1].innerHTML;
            console.log(isNaN(parseInt(startN.charAt(0))));
            if (!isNaN(parseInt(startN.charAt(0)))) selectQtrArr.set(targetQuestion.id, targetQuestion.getElementsByTagName("b")[1].innerHTML);
            targetQuestion = targetQuestion.nextElementSibling;
            let idName = targetQuestion.id;
            if (!(idName.includes("qwrap"))) checkFlag = false;
        }
        console.log("Добавляем вопрос", selectQtrArr);
        const myImage = new Image();
        myImage.height = 300;
        let selectedFile = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function(event) {
            myImage.src = event.target.result;
          };
        reader.readAsDataURL(selectedFile);
        let newSelect = document.createElement('select');
        newSelect.style.width = '200px';
        selectQtrArr.forEach((value, key) => {
            let opt = document.createElement('option');
            opt.value = key;
            opt.text = value;
            newSelect.appendChild(opt);
        });
        item.parentNode.appendChild(myImage);
        item.parentNode.appendChild(newSelect);
    }
});