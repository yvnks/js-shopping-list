const formElement = document.querySelector("#item-form");
const inputElement = document.querySelector("#item-input");
const itemList = document.getElementById("item-list");
const listElement = document.querySelector("ul");
const clearButton = document.getElementById("clear");
const filterButton = document.getElementById("filter");
const formButton = formElement.querySelector("button");
let isEditMode = false;

function renderFromStorage() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
    checkUiState();
  });
}

function renderPageHTML() {
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const newItem = inputElement.value;

    if (newItem === "") {
      console.log("Please add an input.");
      return;
    }

    if (isEditMode) {
      const itemToEdit = listElement.querySelector(".edit-mode");
      removeItemFromStorage(itemToEdit.textContent);
      itemToEdit.classList.remove("edit-mode");
      itemToEdit.remove();
      isEditMode = false;
    } else {
      if (checkIfItemExist(newItem)) {
        alert("Todo Item exists!");
        return;
      }
    }

    addItemToDOM(newItem);
    saveToStorage(newItem);

    checkUiState();

    inputElement.value = "";
  });

  inputElement.addEventListener("focus", (event) => {
    event.target.style.outlineColor = "green";
    event.target.style.outlineStyle = "solid";
    event.target.style.outlineWidth = "1px";
  });

  inputElement.addEventListener("blur", (event) => {
    event.target.style.outline = "none";
  });
}

function addItemToDOM(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const buttonElem = createButtonElement("remove-item btn-link text-red");
  const iconElem = createIconElement("fa-solid fa-xmark");
  buttonElem.appendChild(iconElem);
  li.appendChild(buttonElem);

  listElement.appendChild(li);
}

function saveToStorage(items) {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(items);

  // Convert to JSON str and set to localStorage.
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function onClickItem(event) {
  if (event.target.parentElement.classList.contains("remove-item")) {
    removeItemFromList(event.target.parentElement.parentElement);
  } else {
    setItemToEdit(event.target.closest("li"));
  }
}

function checkIfItemExist(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;

  listElement.querySelectorAll("li").forEach((i) => {
    i.classList.remove("edit-mode");
  });

  item.classList.add("edit-mode");
  formButton.innerHTML = `<i class='fa-solid fa-pen'></i> 
 Update Item`;
  formButton.style.backgroundColor = "#228b22";
  inputElement.value = item.textContent;
}

function removeItemFromList(item) {
  if (confirm("Are you sure?")) {
    // Remove item from DOM.
    item.remove();

    removeItemFromStorage(item.firstChild.textContent);
    checkUiState();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
  clearButton.addEventListener("click", (event) => {
    while (listElement.firstChild) {
      listElement.removeChild(listElement.firstChild);
    }
    checkUiState();
    localStorage.removeItem("items");
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
  listElement.value = "";
  const listItem = document.querySelectorAll("li");
  if (listItem.length === 0) {
    filterButton.style.display = "none";
    clearButton.style.display = "none";
  } else {
    filterButton.style.display = "block";
    clearButton.style.display = "block";
  }
  formButton.innerHTML = `<i class="fa-solid fa-plus"></i> Add item`;
  formButton.style.backgroundColor = "#333";
  isEditMode = false;
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

function init() {
  filterItems();
  clearItems();
  renderPageHTML();
  checkUiState();
  renderFromStorage();
  listElement.addEventListener("click", onClickItem);
}
init();
