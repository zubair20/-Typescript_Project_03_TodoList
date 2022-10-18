import inquirer from 'inquirer';

enum todoOperations{
  VIEW = 'View all Todos',
  ADD = 'Add Todo',
  EDIT = 'Edit Todo',
  DELETE = 'Delete Todo',
}

interface Todo {
  id: number,
  name: string,
  isCompleted: boolean
}

let todos: Todo[] = [
  {
    id: 1,
    name: 'Todo 1',
    isCompleted: false
  },
  {
    id: 2,
    name: 'Todo 2',
    isCompleted: true
  },
  {
    id: 3,
    name: 'Todo 3',
    isCompleted: false
  },
] 

const nameValidator = (name: string) => name.length < 3 ? "Name should be atleast 3 Characters" : true

const questions = [
  {
    type:'list',
    name: 'todoOperation',
    message: 'Please select any operation',
    choices: [todoOperations.VIEW, todoOperations.ADD, todoOperations.EDIT, todoOperations.DELETE]
  }
]

const questionAgain = [
  {
    type:'confirm',
    name: 'qAgain',
    message: 'Would you like to perform operation again? '
  }
]
function askAgain(){
  inquirer
  .prompt(questionAgain)
  .then((answers) => {
    //console.log(answers)
    if(answers.qAgain){
      todoCruds();
    }else{
      console.log('*****Thank you for using our application*****')
    }

  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error)
    } else {
      console.log('Something went wrong')
    }
  });
}
function todoCruds(){
  inquirer
  .prompt(questions)
  .then((answers) => {
    if(answers.todoOperation === todoOperations.VIEW){
      viewAllTodos();
    }else if(answers.todoOperation === todoOperations.ADD){
      addTodo();
    }else if(answers.todoOperation === todoOperations.EDIT){
      editTodo();
    }else if(answers.todoOperation === todoOperations.DELETE){
      deleteTodo();
    }

    //askAgain();
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error)
    } else {
      console.log(error)
      console.log('Something went wrong')
    }
  });
}


function viewAllTodos(){
  console.log(todos)
  askAgain()
}
function addTodo(){
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'todoName',
      message: 'Enter new todo Name : '
    }
  ])
  .then((answers) => {
    todos.push({id: todos.length+1, name: answers.todoName, isCompleted: false})
    console.log('Todo added Successfully!!!!')  
    askAgain() 
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error)
    } else {
      console.log('Something went wrong')
    }
  });

}
function editTodo(){
  inquirer
  .prompt([
    {
      type: 'number',
      name: 'todoId',
      message: 'Enter todo ID : '
    },
    {
      type: 'input',
      name: 'todoName',
      message: 'Enter new todo Name : '
    }
  ])
  .then((answers) => {
    let index = todos.findIndex(todo => todo.id === answers.todoId)
    if(index !== -1){
      let updatedTodo = {
        id: answers.todoId,
        name: answers.todoName,
        isCompleted: true
      }
      todos[index] = updatedTodo
      console.log('Todo updated Successfully!!!!')  
    }else{
      console.log('Invalid ID, please try again!!')
    }
    askAgain() 
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error)
    } else {
      console.log('Something went wrong')
    }
  });
}
function deleteTodo(){
  inquirer
  .prompt([
    {
      type: 'number',
      name: 'todoId',
      message: 'Enter todo ID you want to delete : '
    }
  ])
  .then((answers) => {
    console.log(answers)
    todos = todos.filter(todo => todo.id !== answers.todoId)
    console.log('Todo deleted Successfully!!!!')
    askAgain() 
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error)
    } else {
      console.log('Something went wrong')
    }
  });
}

todoCruds();