let form = document.querySelector("form");
let nameInput = document.querySelector("#name");
let typeSelection = document.querySelector(".selectType");
let locationSelect = document.querySelector(".locationSelect");
let root = document.querySelector(".root");
let nodeTree = document.querySelector(".nodeTree");

function createNode(name, type) {
  if (type === "file") type = "li";
  if (type === "folder") type = "ul";

  let node;

  node = document.createElement(type);
  node.id = type;
  node.innerHTML = name;
  if (type === "li" || type === "ul") {
    node.className = name;
  }
  return node;
}

function deleteNode(node) {
  if (node.className === "root")
    return alert(`Opps! you can't delete the root folder`);
  let nodeClass = node.className;
  console.log(nodeClass);
  let targetNode = document.querySelector(`.${nodeClass}`);
  targetNode.parentNode.removeChild(targetNode);
  let selectNode = document.getElementById(`${nodeClass}`);
  if (!selectNode) return;
  locationSelect.remove(selectNode.index);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let nodeVal = nameInput.value.trim();
  let type = typeSelection.value;
  let dir = locationSelect.value;

  let newNode = createNode(nodeVal, type);
  let parentEl = document.querySelector(`.${dir}`);

  for (let child of parentEl.children) {
    if (child.className === nodeVal)
      return alert("Damn! there is one like this in here.");
  }
  // type === "folder" ? parentEl.appendChild(newNode) : parentEl.insertBefore(newNode, null);
  parentEl.appendChild(newNode);

  // adding to select location menu

  if (type === "folder") {
    let newSelect = createNode(nodeVal, "option");
    newSelect.id = nodeVal;
    newSelect.value = nodeVal;
    locationSelect.appendChild(newSelect);
  }

  // reseting
  nameInput.value = "";
  typeSelection.selectedIndex = 0;
  locationSelect.selectedIndex = 0;
});

nodeTree.addEventListener("click", (e) => {
  e.preventDefault();

  let el = document.querySelector(`.${e.target.className}`);

  for (let child of el.children) {
    child.classList.toggle("hidden");
  }
});

nodeTree.addEventListener("dblclick", (e) => {
  e.preventDefault();

  let nodeToDelete = document.getElementById(e.target.id);
  deleteNode(nodeToDelete);
});
