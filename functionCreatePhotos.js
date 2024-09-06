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
        let newDiv = document.createElement('div');
        newDiv.setAttribute("class", "picture-front-block");
//        newDiv.style.width = "700px";
//        newDiv.style.height = "300px";
//        newDiv.style.display = "flex";
        console.log("Добавляем вопрос", selectQtrArr);
        const myImage = new Image();
        myImage.height = 300;
//        myImage.width = 400;
        myImage.style.objectFit = "contain";
        let selectedFile = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function(event) {
            myImage.src = event.target.result;
            item.value = "";
          };
        reader.readAsDataURL(selectedFile);
        let newSelect = document.createElement('select');
        newSelect.setAttribute("class", "select-for-photo");
        let optFirst = document.createElement('option');
        optFirst.value = 0;
        optFirst.text = "Выберите вопрос";
        newSelect.appendChild(optFirst);
        selectQtrArr.forEach((value, key) => {
            let opt = document.createElement('option');
            opt.value = key;
            opt.text = value;
            newSelect.appendChild(opt);
        });
//        newSelect.onchange = selectChange;
        let newButton = document.createElement('button');
        newButton.innerHTML = "Удалить";
        newButton.setAttribute("class", "delete-for-photo");
        newDiv.appendChild(myImage);
        newDiv.appendChild(newButton);
        newDiv.appendChild(newSelect);
        item.parentNode.appendChild(newDiv);
        let newItem = item.parentNode.lastElementChild;
        
        console.log("Поиск ребенка = ", newItem.lastElementChild);
        let self = newItem.lastElementChild;
        let newItemButton = self.previousElementSibling;
        newItem.lastElementChild.onchange = selectChange.bind(self);
//        newItem.lastElementChild.onchange = () => {selectChange();};
        newItemButton.onclick = () => {newItemButton.parentNode.remove();};
        
    }
});

const selectChange = function() {
    console.log("Value вопроса = ", this.value);
    let checkFleBlockPhoto = this.value + "-photos";
    let questionElem = document.getElementById(this.value);
    let parentPhotoNode = questionElem;
    if (questionElem.lastChild.className == "wrap-picture-front") {
        parentPhotoNode = questionElem.lastChild;
        checkPhotos(parentPhotoNode,this.parentNode.firstChild.src);
    } else {
        parentPhotoNode = document.createElement('div');
        parentPhotoNode.setAttribute("class", "wrap-picture-front");
        questionElem.appendChild(parentPhotoNode);
    }
    let clone = this.parentNode.cloneNode(true);
    parentPhotoNode.appendChild(clone);

//    let element = questionElem.lastElementChild.lastElementChild;
    let element = parentPhotoNode.lastElementChild.lastElementChild;
    element.onchange = selectChange;
    element.previousElementSibling.onclick = () => {element.parentNode.remove();};
    this.parentNode.remove();
    let imgs = document.images;
//    console.log(imgs[0].src);
}

let checkPhotos = function(parentPhotoNode, photoSrc) {
    let arrIm = Array.prototype.map.call(parentPhotoNode.children, elem => elem.firstChild.src).filter(imgSrc => imgSrc == photoSrc);
    console.log(arrIm.length);
//    let array = Array.prototype.map.call(parentPhotoNode.images, img => img.src).filter(imgSrc => imgSrc == photoSrc);
//    console.log(array.length);
}