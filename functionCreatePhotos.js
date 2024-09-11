let allPhotosField = document.querySelectorAll('input[type="file"]');
allPhotosField.forEach((item, index) => {
    item.onchange = (event) => {
        Array.from(event.target.files).forEach((fileElem, indexFile) => {
            createImageBlock(item, fileElem);
        });
        
    }
});

const createImageBlock= function(item, fileElem) {
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
    
    let parentPhotoNode = item;
    if (item.parentNode.lastChild.className == "wrap-picture-front") {
        parentPhotoNode = item.parentNode.lastChild;
//        noDublicatePhoto = checkPhotos(parentPhotoNode,this.parentNode.firstChild.src);
    } else {
        parentPhotoNode = document.createElement('div');
        parentPhotoNode.setAttribute("class", "wrap-picture-front");
        item.parentNode.appendChild(parentPhotoNode);
    }
    
    let newDiv = document.createElement('div');
    newDiv.setAttribute("class", "picture-front-block");

    console.log("Добавляем вопрос", selectQtrArr);
    const myImage = new Image();
    myImage.height = 300;

    myImage.style.objectFit = "contain";
//            let selectedFile = event.target.files[0];
    let selectedFile = fileElem;
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

    let newButton = document.createElement('button');
    newButton.innerHTML = "Удалить";
    newButton.setAttribute("class", "delete-for-photo");
    newDiv.appendChild(myImage);
    newDiv.appendChild(newButton);
    newDiv.appendChild(newSelect);
//    item.parentNode.appendChild(newDiv);
    parentPhotoNode.appendChild(newDiv);
    let newItem = item.parentNode.lastElementChild.lastElementChild;

    console.log("Поиск ребенка = ", newItem.lastElementChild);
    let self = newItem.lastElementChild;
    let newItemButton = self.previousElementSibling;
    newItem.lastElementChild.onchange = selectChange.bind(self);

    newItemButton.onclick = () => {newItemButton.parentNode.remove();};
}

const selectChange = function() {
    console.log("Value вопроса = ", this.value);
    let checkFleBlockPhoto = this.value + "-photos";
    let questionElem = document.getElementById(this.value);
    let parentPhotoNode = questionElem;
    let noDublicatePhoto = true;
    if (questionElem.lastChild.className == "wrap-picture-front") {
        parentPhotoNode = questionElem.lastChild;
        noDublicatePhoto = checkPhotos(parentPhotoNode,this.parentNode.firstChild.src);
    } else {
        parentPhotoNode = document.createElement('div');
        parentPhotoNode.setAttribute("class", "wrap-picture-front");
        questionElem.appendChild(parentPhotoNode);
    }
    if (noDublicatePhoto) {
        let clone = this.parentNode.cloneNode(true);
        parentPhotoNode.appendChild(clone);

    //    let element = questionElem.lastElementChild.lastElementChild;
        let element = parentPhotoNode.lastElementChild.lastElementChild;
        element.onchange = selectChange;
        element.previousElementSibling.onclick = () => {element.parentNode.remove();};
        this.parentNode.remove();
        saveThisImage(this.parentNode.firstChild.src);
//        let imgs = document.images;
    } else {
        alert("Данная фотография уже прикреплена");
    }
}

const checkPhotos = function(parentPhotoNode, photoSrc) {
    let arrIm = Array.prototype.map.call(parentPhotoNode.children, elem => elem.firstChild.src).filter(imgSrc => imgSrc == photoSrc);
    return arrIm.length == 0;

}

const saveThisImage = async (photoSrc) => {
    let url = new URL(window.location.href);
    url.pathname = "/TestAnketa/request.php";
    let dataToSend = {'data': photoSrc};
    const request = new Request(url, {
                                method: "POST",
                                headers: {
                                            'Content-Type': 'application/json;charset=utf-8',
                                        },
                                body: JSON.stringify(dataToSend)
                                });
    try {
        const response = await fetch(request);  
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        console.log("url result = ", data.data);
    }
    catch(error) {
        console.log(error.message);
    }
}