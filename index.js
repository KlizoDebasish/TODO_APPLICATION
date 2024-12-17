
let todoData = JSON.parse(localStorage.getItem("todotask")) || [];

function allToDoData() {
  localStorage.setItem("todotask", JSON.stringify(todoData));

  let element = "";
  todoData.map(
    (item) =>
      (element += ` 
         <tr>
            <td style="background-color: ${item.check? "rgb(197, 243, 243)":"#ffd4c9"}">
              <div class="checker">
                <span><input type="checkbox" ${item.check? "checked" : ""} onClick="toggleCheckHandler(${item.id})"/></span> ${item.message}
              </div>

              <div class="button-section">
                <button class="edit-button" onClick="editHandler(${item.id})">Edit</button>
                <button class="delete-button" onClick="deleteHandler(${item.id})">Delete</button>
              </div>
            </td>
         </tr>
        `)
  );

  const table = document.querySelector("table");
  table.innerHTML = element;
}

document
  .querySelector("form")
  .addEventListener("submit", function handelSubmit(event) {
    event.preventDefault();

    let inputMessageAdder = document.getElementById("message-adder");
    const messageAdder = inputMessageAdder.value.trim();

    const messageInput = document.querySelector(".idStore");
    const messageId = messageInput.value;

    if (messageId) {
      // update existing message
      const idFinder = todoData.find((todo) => todo.id == messageId);
      if (idFinder) {
        idFinder.message = messageAdder;
      }
    } else {
      const newInputObj = {
        id: todoData.length + 1,
        message: messageAdder,
        check: false,
      };
      todoData.push(newInputObj);
    }

    //resetting input field
    inputMessageAdder.value = "";
    messageInput.value = "";
    document.querySelector(".add-message-button").innerHTML = "Add Task";

    allToDoData();
  });


// Update the todo

function editHandler(id) {
  const messageFinder = todoData.find((todo) => todo.id === id);
  if (messageFinder) {
    document.querySelector(".message-adder").value = messageFinder.message;
    document.querySelector(".add-message-button").innerHTML = "Update Task";
    document.querySelector(".idStore").value = messageFinder.id;
  }
  allToDoData();
}


// Delete the todo

function deleteHandler(id) {
  todoData = todoData.filter((todo) => todo.id !== id);
  allToDoData();
}


// toggleCheck to complete the task or not
function toggleCheckHandler(id) {
    const checkFinder = todoData.find( todo => todo.id === id)
    if (checkFinder) {
        checkFinder.check = !checkFinder.check;
        localStorage.setItem("todotask", JSON.stringify(todoData))
    }
    allToDoData();
}



allToDoData();