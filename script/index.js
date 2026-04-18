const formElement = document.querySelector("#item-form");
const inputElement = document.querySelector("#item-input");
const listElement = document.querySelector("ul");
const clearButton = document.getElementById("clear");
const filterButton = document.getElementById("filter");

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
    checkUiState();

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
      console.log(event.target);
      if (confirm(`Are you sure you want to delete?`)) {
        event.target.parentElement.parentElement.remove();
        checkUiState();
      }
    }
  });
}

function clearItems() {
  clearButton.addEventListener("click", (event) => {
    while (listElement.firstChild) {
      listElement.removeChild(listElement.firstChild);
      checkUiState();
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

function checkUiState() {
  const listItem = document.querySelectorAll("li");
  if (listItem.length === 0) {
    filterButton.style.display = "none";
    clearButton.style.display = "none";
  } else {
    filterButton.style.display = "block";
    clearButton.style.display = "block";
  }
}

function filterItems() {
  filterButton.addEventListener("input", (event) => {
    const item = listElement.querySelectorAll("li");
    const text = event.target.value.toLowerCase();

    item.forEach((item) => {
      const itemName = item.firstChild.textContent.toLowerCase();

      if (itemName.indexOf(text) !== -1) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });
}

filterItems();
clearItems();
renderPageHTML();
removeItemFromList();
checkUiState();
