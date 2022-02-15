// Selectors
const surpriseInput_name = document.querySelector(".surprise-input_name");
const surpriseInput_prize = document.querySelector(".surprise-input_prize");
const surpriseInput_url = document.querySelector(".surprise-input_url");
const surpriseInput_comment = document.querySelector(".surprise-input_comment");
const surpriseButton = document.querySelector(".button-addSurprise");
const undoneList = document.querySelector(".list-undone");
const completedList = document.querySelector(".list-completed");
const filterUndone = document.querySelector(".filter-undone");
const filterCompleted = document.querySelector(".filter-completed");

// Event Listeners
surpriseButton.addEventListener("click", addSurprise);
undoneList.addEventListener("click", deleteCheckArrowLinkEdit);
completedList.addEventListener("click", deleteCheckArrowLinkEdit);
filterUndone.addEventListener("click", filterSurprise);
filterCompleted.addEventListener("click", filterSurprise);

// Functions
function addSurprise(event) {
    // Prevent form from submitting
    event.preventDefault();

    // CHECK - Inputs existence
    if(surpriseInput_name.value === "") {
        alert("Název překvapení nebylo vyplněno. Prosím doplňte název.");
        return false;
    }
    if(surpriseInput_prize.value === "") {
        alert("Cena překvapení nebyla vyplněna. Prosím doplňte cenu.");
        return false;
    }

    // surprise DIV
    const surpriseDiv = document.createElement("div");
    surpriseDiv.classList.add("surprise");
    // surprise item FORM
    const surpriseItem = document.createElement("div");
    surpriseItem.classList.add("item");
    // MONEY ICON
    const moneyIcon = document.createElement("button");
    moneyIcon.innerHTML = '<i class="fas fa-coins"></i>';
    surpriseItem.appendChild(moneyIcon);

    if (!setMoneyIconColor(surpriseItem, surpriseInput_prize.value)) {
        return false;
    }

    // Create LI
    const newSurprise = document.createElement("li");
    newSurprise.innerText = surpriseInput_name.value;
    newSurprise.classList.add("name");
    surpriseItem.appendChild(newSurprise);
    // ARROW BUTTON
    const arrowButton = document.createElement("button");
    arrowButton.innerHTML = '<i class="fas fa-sitemap"></i>';
    arrowButton.classList.add("arrow-btn");
    surpriseItem.appendChild(arrowButton);
    // LINK BUTTON
    const linkButton = document.createElement("button");
    linkButton.innerHTML = '<i class="fas fa-link"></i>';
    linkButton.classList.add("link-btn");
    surpriseItem.appendChild(linkButton);
    // EDIT BUTTON
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add("edit-btn");
    surpriseItem.appendChild(editButton);
    // CHECK BUTTON
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("check-btn");
    surpriseItem.appendChild(checkButton);
    // TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    surpriseItem.appendChild(trashButton);

    // Append to DIV
    surpriseDiv.appendChild(surpriseItem);

    // Create DIV for extra information
    // PRIZE-div
    const prizeDiv = document.createElement("div");
    prizeDiv.classList.add("prize-info");
    prizeDiv.style = `
        height: 0px;
        overflow: hidden;
    `;
    surpriseDiv.appendChild(prizeDiv);

    const prizeText = document.createElement("input");
    prizeText.classList.add("prize-text");
    prizeText.setAttribute("readonly", "readonly");
    prizeDiv.appendChild(prizeText);
    prizeText.value = surpriseInput_prize.value.trim() + " Kč";
    prizeText.style = `
        border: none;
        appearance: none;
        outline: none;
        background: none;
        width: 100%;
        font-size: inherit;
        font-family: "Poppins", sans-serif;
        font-style: italic;
    `;

    // URL-div
    const urlDiv = document.createElement("div");
    urlDiv.classList.add("url-info");
    urlDiv.style = `
        height: 0px;
        overflow: hidden;
    `;
    surpriseDiv.appendChild(urlDiv);

    const urlText = document.createElement("input");
    urlText.classList.add("url-text");
    urlText.setAttribute("readonly", "readonly");
    urlDiv.appendChild(urlText);
    if (surpriseInput_url.value === "") {
        urlText.value = "odkaz_nebyl_přidán_:-(";
    }
    else {
        urlText.value = surpriseInput_url.value.trim();
    }
    urlText.style = `
        border: none;
        appearance: none;
        outline: none;
        background: none;
        width: 100%;
        font-size: inherit;
        font-family: "Poppins", sans-serif;
        font-style: italic;
    `;

    // COMMENT-div
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment-info");
    commentDiv.style = `
        height: 0px;
        overflow: hidden;
    `;
    surpriseDiv.appendChild(commentDiv);

    const commentText = document.createElement("textarea");
    commentText.classList.add("url-text");
    commentText.setAttribute("readonly", "readonly");
    commentDiv.appendChild(commentText);
    if (surpriseInput_comment.value === "") {
        commentText.value = "komentář_nebyl_přidán_:-(";
    }
    else {
        commentText.value = surpriseInput_comment.value;
        /*commentText.value = surpriseInput_comment.value;*/
    }
    commentText.style = `
    border: none;
    appearance: none;
    outline: none;
    background: none;
    width: 100%;
    font-size: inherit;
    font-family: "Poppins", sans-serif;
    font-style: italic;
    resize: none;
    `;

    // Append to list
    undoneList.insertBefore(surpriseDiv, undoneList.firstChild);

    // Clear surprise INPUT VALUE
    surpriseInput_name.value = "";
    surpriseInput_prize.value = "";
    surpriseInput_url.value = "";
    surpriseInput_comment.value = "";
}

function deleteCheckArrowLinkEdit(e) {
    // DELETE surprise
    const icon = e.target.parentElement;
    const surpriseDiv = icon.parentElement.parentElement;
    const surpriseItem = surpriseDiv.firstChild;
    const prizeInfo = surpriseDiv.children[1];
    const urlInfo = surpriseDiv.children[2];
    const commentInfo = surpriseDiv.children[3];

    if (icon.classList[0] === "trash-btn") {
        surpriseDiv.remove();
    }

    // CHECK surprise
    if (icon.classList[0] === "check-btn") {
        completedList.insertBefore(surpriseDiv, completedList.firstChild);
        surpriseDiv.classList.toggle("completed");

        surpriseItem.children[4].remove();
        surpriseItem.children[4].remove();
        surpriseItem.children[4].remove();
    }

    if (icon.classList[0] === "arrow-btn") {

        if (prizeInfo.style.height === "0px") {

            prizeInfo.style = `
            width: calc(100% - margin-left); 
            margin-left: 1rem;
            border-bottom: 1px solid black;
            border-left: 1px solid black;
            text-align: left;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-left: 0.5rem;
            padding-top: 1.5rem;
            `;
            urlInfo.style = `
            width: calc(100% - margin-left); 
            margin-left: 1rem;
            border-bottom: 1px solid black;
            border-left: 1px solid black;
            padding-left: 0.5rem;
            justify-content: space-between;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            `;
            if (urlInfo.children[0].value === "odkaz_nebyl_přidán_:-(") {
                urlInfo.children[0].style.color = "#c4aead";
            }
            commentInfo.style = `
            width: calc(100% - margin-left); 
            margin-left: 1rem;
            border-bottom: 1px solid black;
            border-left: 1px solid black;
            text-align: left;
            padding-left: 0.5rem;
            `;           
            if (commentInfo.children[0].value === "komentář_nebyl_přidán_:-(") {
                commentInfo.children[0].style.color = "#c4aead";
            }
        }
        else {
            prizeInfo.style = "height: 0px; overflow: hidden";
            urlInfo.style = "height: 0px; overflow: hidden"
            commentInfo.style = "height: 0px; overflow: hidden"
        }
    }

    if (icon.classList[0] === "link-btn") {

        openTab(urlInfo.children[0].value);
    }

    if (icon.classList[0] === "edit-btn") {

        if (icon.style.color === "") {

            commentInfo.children[0].style.color = "";
            commentInfo.children[0].removeAttribute("readonly");
            commentInfo.children[0].focus();

            urlInfo.children[0].style.color = "";
            urlInfo.children[0].removeAttribute("readonly");
            urlInfo.children[0].focus();

            prizeInfo.children[0].value = prizeInfo.children[0].value.replace(' Kč','');
            prizeInfo.children[0].removeAttribute("readonly");
            prizeInfo.children[0].focus();

            icon.style.color = "#1974d2";
            return false;
        }
        else {

            if (!setMoneyIconColor(surpriseItem, prizeInfo.children[0].value)) {
                return false;
            }
            if (commentInfo.children[0].value.replace(/ /g,'') === "komentář_nebyl_přidán_:-(" || commentInfo.children[0].value.replace(/ /g,'') === "") {
                commentInfo.children[0].value = "komentář_nebyl_přidán_:-(";
                commentInfo.children[0].style.color = "#c4aead";
            }
            commentInfo.children[0].setAttribute("readonly", "readonly");

            if (urlInfo.children[0].value.replace(/ /g,'') === "odkaz_nebyl_přidán_:-(" || urlInfo.children[0].value.replace(/ /g,'') === "") {
                urlInfo.children[0].value = "odkaz_nebyl_přidán_:-(";
                urlInfo.children[0].style.color = "#c4aead";
            }
            urlInfo.children[0].setAttribute("readonly", "readonly");

            prizeInfo.children[0].value = prizeInfo.children[0].value.trim() + " Kč";
            prizeInfo.children[0].setAttribute("readonly", "readonly");

            icon.style.color = "";

            return false;
        }
    }
}

function filterSurprise(e) { 
    if (e.target.classList.contains("filter-undone")) {
        undoneList.childNodes.forEach(function(surprise) {
            switch(e.target.value) {
                case "all":
                    surprise.style.display = "flex";
                    break;
                case "bronze":
                    if (surprise.firstChild.firstChild.classList.contains("bronzeCoin")) {
                        surprise.style.display = "flex";
                    }
                    else {
                        surprise.style.display = "none";
                    }
                    break;
                case "silver":
                    if (surprise.firstChild.firstChild.classList.contains("silverCoin")) {
                        surprise.style.display = "flex";
                    }
                    else {
                        surprise.style.display = "none";
                    }
                    break;
                case "gold":
                    if (surprise.firstChild.firstChild.classList.contains("goldCoin")) {
                        surprise.style.display = "flex";
                    }
                    else {
                        surprise.style.display = "none";
                    }
                    break;
                case "rubin":
                    if (surprise.firstChild.firstChild.classList.contains("rubinCoin")) {
                        surprise.style.display = "flex";
                    }
                    else {
                        surprise.style.display = "none";
                    }
                    break;        
            }
        });
    }
    else {
        completedList.childNodes.forEach(function(surprise) {
            switch(e.target.value) {
                case "all":
                    surprise.style.display = "flex";
                    break;
                case "bronze":
                    if (surprise.firstChild.firstChild.classList.contains("bronzeCoin")) {
                        surprise.style.display = "flex";
                    }
                    else {
                        surprise.style.display = "none";
                    }
                    break;
                case "silver":
                    if (surprise.firstChild.firstChild.classList.contains("silverCoin")) {
                        surprise.style.display = "flex";
                    }
                    else {
                        surprise.style.display = "none";
                    }
                    break;
                case "gold":
                    if (surprise.firstChild.firstChild.classList.contains("goldCoin")) {
                        surprise.style.display = "flex";
                    }
                    else {
                        surprise.style.display = "none";
                    }
                    break;
                case "rubin":
                    if (surprise.firstChild.firstChild.classList.contains("rubinCoin")) {
                        surprise.style.display = "flex";
                    }
                    else {
                        surprise.style.display = "none";
                    }
                    break;        
            }
        });
    }
}

function openTab(url) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    link.remove();
}

function setMoneyIconColor(surpriseItem, amountOfMoney) {
    // CHECK - Inputs correction
    if (isNaN(amountOfMoney)) {
        alert("Cena přání musí být nezáporná číselná hodnota.\nKolonka nesmí obsahovat nic jiného než číslo.");
        return false;
    }
    else if (amountOfMoney.replace(/ /g,'') === "") {
        alert("Cena překvapení nebyla vyplněna. Prosím doplňte cenu.");
        return false;
    }
    else {
        if (amountOfMoney <= 500) {
            surpriseItem.firstChild.firstChild.style.color = "#cd7f32";
            surpriseItem.firstChild.classList.toggle("bronzeCoin");
        }
        else if (500 < amountOfMoney && amountOfMoney <= 1500){
            surpriseItem.firstChild.firstChild.style.color = "#c0c0c0";
            surpriseItem.firstChild.classList.toggle("silverCoin");
        }
        else if (1500 < amountOfMoney && amountOfMoney <= 4000){
            surpriseItem.firstChild.firstChild.style.color = "#f4c430";
            surpriseItem.firstChild.classList.toggle("goldCoin");
        }
        else {
            surpriseItem.firstChild.firstChild.style.color = "#ef3038";
            surpriseItem.firstChild.classList.toggle("rubinCoin");
        }
        return true;  
    }
}


