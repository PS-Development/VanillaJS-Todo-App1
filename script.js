
    var todoList = {
      todos: [],
    /*  displayTodos: function(){
        if (this.todos.length === 0) {
         console.log('Your todo list is empty!');
        } else { 
        console.log('My Todos:');
        for (var i = 0; i < this.todos.length; i++) {
          if (this.todos[i].completed === true) {
            console.log('(x)', this.todos[i].todoText);
          } else {
            console.log('( )',this.todos[i].todoText);
          }
        }
      }
    }, */
      addTodo: function(todoText){
        this.todos.push({
          todoText: todoText,
          completed: false
        });
      },
      changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
      },
      deleteTodo: function(position) {
        this.todos.splice(position, 1);
      },
      toggleCompleted: function(position, completed) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
      },
      toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        // for (var i = 0; i < totalTodos; i++){
        //   if (this.todos[i].completed === true){
        //   completedTodos++;
        //   }
        // }
        this.todos.forEach(function(todo) {
          if (todo.completed === true) {
            completedTodos++;
          }
        });
/*
        if (completedTodos === totalTodos) {
          // for (var i = 0; i < totalTodos; i++) {
          //   this.todos[i].completed = false;
          // }

            this.todos.forEach(function(todo) {
              todo.completed = false;
            });

            

        } else {
          // for (var i = 0; i < totalTodos; i++) {
          //   this.todos[i].completed = true;
          // }
          this.todos.forEach(function(todo) {
            todo.completed = true;
          });
        }*/

        this.todos.forEach(function(todo) {
          if (completedTodos === totalTodos) {
            todo.completed = false;
          } else {
            todo.completed = true;
          }
        });

      }
    }

    var handlers = {
     addTodo: function() {
       var addTodoTextInput = document.getElementById('addTodoTextInput');
       todoList.addTodo(addTodoTextInput.value);
       addTodoTextInput.value = '';
       view.displayTodos();
     },
     changeTodo: function() {
      var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
      var changeTodoTextInput = document.getElementById('changeTodoTextInput');
      todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
      changeTodoPositionInput.value = '';
      changeTodoTextInput.value = '';
      view.displayTodos();
     },
     deleteTodo: function(position) {
       todoList.deleteTodo(position)
       view.displayTodos();
     },
     toggleCompleted: function() {
       var toggleCompletePositionInput = document.getElementById('toggleCompletePositionInput');
       todoList.toggleCompleted(toggleCompletePositionInput.valueAsNumber)
       toggleCompletePositionInput.value = '';
       view.displayTodos();
     },
     toggleAll: function() {
       todoList.toggleAll();
       view.displayTodos();
     }
    };

    var view = {
      displayTodos: function() {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
        // for (var i = 0; i < todoList.todos.length; i++) {
        //   var todoLi = document.createElement('li');
        //   var todo = todoList.todos[i];
        //   var todoTextWithCompletion = '';



        //   if (todo.completed === true) {
        //     todoTextWithCompletion = '(x) ' + todo.todoText;
        //   } else {
        //     todoTextWithCompletion = '( ) ' + todo.todoText;
        //   }

        //   todoLi.id = i;
        //   todoLi.textContent = todoTextWithCompletion;
        //   todoLi.appendChild(this.createDeleteButton())
        //   todosUl.appendChild(todoLi);
        // }

        todoList.todos.forEach(function(todo, position) {
        var todoLi = document.createElement('li');
          var todoTextWithCompletion = '';

          if (todo.completed === true) {
            todoTextWithCompletion = '(x) ' + todo.todoText;
          } else {
            todoTextWithCompletion = '( ) ' + todo.todoText;
          }

          todoLi.id = position;
          todoLi.textContent = todoTextWithCompletion;
          todoLi.appendChild(this.createDeleteButton())
          todosUl.appendChild(todoLi);
        }, this);
      },
      createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
      },
      setUpEventListeners: function() {
        var todosUl = document.querySelector('ul')
      todosUl.addEventListener('click', function(event) {
        var elementClicked = event.target;
        if (elementClicked.className === 'deleteButton'){
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }});
      }
    };

    view.setUpEventListeners()
