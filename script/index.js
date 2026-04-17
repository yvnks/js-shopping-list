const formElement = document.querySelector("#item-form");
const inputElement = document.querySelector("#item-input");
const listElement = document.querySelector("ul");

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
