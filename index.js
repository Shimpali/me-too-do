var todoList = {
    todos: [],
    /*   displayTodos: function () {
          if (this.todos.length === 0) {
              console.log("TodoList is empty!!");
          } else {
              console.log("TodosList:");
              for (var i = 0; i < this.todos.length; i++) {
                  // console.log(this.todos[i].todoText);
                  if (this.todos[i].completed === true) {
                      console.log("(X)", this.todos[i].todoText);
                  } else {
                      console.log("()", this.todos[i].todoText);
                  }
              }
          }
      }, */
    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
        // this.displayTodos();
    },
    changeTodo: function (position, todoText) {
        this.todos[position].todoText = todoText;
        // this.displayTodos();
    },
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
        // this.displayTodos();
    },
    toggleCompleted: function (position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
        // this.displayTodos();
    },
    toggleAll: function () {
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        //Get number of completed Todos:
        /*  for (var i = 0; i < totalTodos; i++) {
             if (this.todos[i].completed === true) {
                 completedTodos++;
             }
         } */

        this.todos.forEach(function (todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });

        /*   //If everything's true, make everything false:
          if (completedTodos === totalTodos) {
              /*    for (var i = 0; i < totalTodos; i++) {
                     this.todos[i].completed = false;
                 } 
  
              thid.todos.forEach(function (todo) {
                  todo.completed = false;
              });
  
          } else {
              //Othrwise, make everything true:
              /*   for (var i = 0; i < totalTodos; i++) {
                    this.todos[i].completed = true;
                } 
  
              this.todos.forEach(function (todo) {
                  todo.completed = true;
              });
          }
          // this.displayTodos(); */

        //If-else in one forEach instead of two forEaches in if and else:

        this.todos.forEach(function (todo) {
            //If everything's true, make everything false:

            if (completedTodos === totalTodos) {
                todo.completed = false;
            }
            //Othrwise, make everything true:
            else {
                todo.completed = true;
            }
        })
    }
};
var handlers = {
    /*  displayTodos: function () {
         todoList.displayTodos();
     }, */
    toggleAll: function () {
        todoList.toggleAll();
        view.displayTodos();
    },
    addTodo: function () {
        var addTodoText = document.getElementById("add");
        todoList.addTodo(addTodoText.value);
        addTodoText.value = "";
        view.displayTodos();
    },
    changeTodo: function () {
        var addChangedPosition = document.getElementById("position");
        var addChangedText = document.getElementById("change");
        todoList.changeTodo(addChangedPosition.valueAsNumber, addChangedText.value);
        addChangedPosition.value = "";
        addChangedText.value = "";
        view.displayTodos();
    },
    deleteTodo: function (position) {
        // var deletePosition = document.getElementById('delPosition');
        // todoList.deleteTodo(deletePosition.valueAsNumber);
        // deletePosition.value = '';
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleTodo: function () {
        var togglePosition = document.getElementById('togPosition');
        todoList.toggleCompleted(togglePosition.valueAsNumber);
        togglePosition.value = '';
        view.displayTodos();
    }
};

var view = {
    displayTodos: function () {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
        /*   for (var i = 0; i < todoList.todos.length; i++) {
              var todoLi = document.createElement('li');
              var todo = todoList.todos[i];
              var todoCompletedText = '';
  
              if (todo.completed === true) {
                  todoCompletedText = '(X)' + todo.todoText;
              } else {
                  todoCompletedText = '( )' + todo.todoText;
              }
  
              todoLi.id = i; //each li will get an id form i of above for loop
              todoLi.textContent = todoCompletedText;
              todoLi.appendChild(this.createDeleteButton());
              todosUl.appendChild(todoLi);
          } */

        //Use forEach instead of for above:

        todoList.todos.forEach(function (todo, position) {
            var todoLi = document.createElement('li');
            var todoCompletedText = '';

            if (todo.completed === true) {
                todoCompletedText = '(X)' + todo.todoText;
            } else {
                todoCompletedText = '( )' + todo.todoText;
            }

            todoLi.id = position; //each li will get an id from position of above for loop
            todoLi.textContent = todoCompletedText;
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);

        }, this);//createDeleteButton at line 164 is throwing error because thid function not a view object property but a callback function in forEach. To make the func available, use 'this'.
    },
        createDeleteButton: function () {
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'deleteButton';
            return deleteButton;
        },
        setUpEventListeners: function () {
            var todosUl = document.querySelector('ul');
            todosUl.addEventListener('click', function (event) {
                console.log(event.target.parentNode.id);

                //Get the element that was clicked:
                var elementClicked = event.target;

                //Check if elementClicked is a delete button:
                if (elementClicked.className === 'deleteButton') {
                    //Run handlers.deleteTodo(position):
                    handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
                }
            });
        }
    };

    view.setUpEventListeners();


