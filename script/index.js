const formElement = document.querySelector("#item-form");
const inputElement = document.querySelector("#item-input");
const listElement = document.querySelector("ul");
const clearButton = document.getElementById("clear");

function renderPageHTML() {
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const newItem = inputElement.value;

    if (newItem === "") {
      console.log("Please add an input.");
      return;
    }

    const li = document.createElement("li");
    li.appendChild(document.createTextNode(newItem));

    const buttonElem = createButtonElement("remove-item btn-link text-red");
    const iconElem = createIconElement("fa-solid fa-xmark");
    buttonElem.appendChild(iconElem);
    li.appendChild(buttonElem);

    listElement.appendChild(li);

    inputElement.value = "";
  });

  inputElement.addEventListener("focus", (event) => {
    event.target.style.outlineColor = "green";
    event.target.style.outlineStyle = "solid";
    event.target.style.outlineWidth = "1px";
  });

  inputElement.addEventListener("blur", (event) => {
    event.target.style = "none";
  });
}

function removeItemFromList() {
  // Use event delegation to delete multiple items.
  listElement.addEventListener("click", (event) => {
    if (event.target.parentElement.classList.contains("remove-item")) {
      event.target.parentElement.parentElement.remove();
    }
  });
}

function clearItems() {
  clearButton.addEventListener("click", (event) => {
    while (listElement.firstChild) {
      listElement.removeChild(listElement.firstChild);
    }
  });
}

clearItems();

function createButtonElement(classes) {
  const button = document.createElement("button");
  button.className = classes;
  return button;
}
function createIconElement(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

renderPageHTML();
removeItemFromList();
