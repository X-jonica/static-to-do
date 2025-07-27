const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");

//Sauvegarder les données de ul dans le localStorage
const saveData = () =>{
  localStorage.setItem("data", listContainer.innerHTML)
}

//Recuerer les données dans le localSorage
const getData = () => {
  listContainer.innerHTML = localStorage.getItem("data")
}

getData()

//Fonction ajouter tache
const addTask = () => {
  if (inputBox.value === "") {
    alert("Vous devez ecrire quelque chose!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    let edit = document.createElement('span')
    edit.classList.add("edit")
    edit.innerHTML = '<ion-icon name="create-outline"></ion-icon>'
    li.appendChild(edit)
  }
  inputBox.value = "";
  saveData();
};

//Ajout d'une evenement click pour le list
listContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData()
  }else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData()
  }else {
    // Gérer l'édition
    let editSpan = e.target.closest("span.edit"); 
    if (editSpan) {
      let li = editSpan.parentElement;
      let newText = prompt("Modifier la tâche :", li.firstChild.textContent.trim());
      if (newText) {
        li.firstChild.textContent = newText;
        saveData();
      }
    }
  }
}, false);

