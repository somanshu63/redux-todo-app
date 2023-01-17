let store = Redux.createStore(reducer);

let root = document.querySelector(".todo-list");
let newTodo = document.querySelector("#todo-name");

let AllTodos = store.getState();

newTodo.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    let todo = { name: event.target.value, completed: false };
    store.dispatch({ type: "add", value: todo });
    event.target.value = "";
  } else {
    AllTodos = store.getState();
    AllTodos = AllTodos.filter((todo) =>
      todo.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    createUI();
  }
});

store.subscribe(() => {
  AllTodos = store.getState();
  createUI();
});

function reducer(state = [], action) {
  switch (action.type) {
    case "delete":
      return [...state.filter((todo) => todo !== state[action.value])];
    case "add":
      return [...state, action.value];
    case "complete":
      state[action.value].completed = !state[action.value].completed;
      return state;
    default:
      return state;
  }
}

function createUI() {
  root.innerHTML = "";
  AllTodos.forEach((todo, index) => {
    let div = document.createElement("div");
    div.classList.add(
      "flex",
      "align-center",
      "single-todo",
      "justify-between",
      "py-2",
      "px-4",
      "m-2"
    );
    let name = document.createElement("p");
    if (todo.completed) {
      name.style.textDecoration = "line-through";
      name.classList.add("red");
    }
    name.addEventListener("click", () => {
      store.dispatch({ type: "complete", value: index });
    });
    name.innerText = todo.name;
    let remove = document.createElement("span");
    remove.addEventListener("click", () => {
      store.dispatch({ type: "delete", value: index });
    });
    let i = document.createElement("i");
    i.classList.add("fa-solid", "fa-trash", "red", "delete");
    remove.append(i);
    div.append(name, remove);
    root.append(div);
  });
}
