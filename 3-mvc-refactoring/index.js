// const myTodoView = new TodoListView({
//   form: document.querySelector('.todo-app .user-form'),
//   textInput: document.querySelector('.todo-app input[type="text"]'),
//   listWrapper: document.querySelector('.todo-app .todo-list')
// });

// const myTodoController = new TodoController({
//   model: oTodoModel,
//   view: myTodoView
// });




const todoAppElem = document.querySelector('.todo-app');


/* Model */

const oTodoModel = new TodoModel({
  utils: { runFns }
});

/* View */

const oTodoFormView = new TodoFormView({
  form: todoAppElem.querySelector('.user-form'),
  textInput: todoAppElem.querySelector('input[type="text"]')
});

const oTodoListView = new TodoListView({
  wrapper: todoAppElem.querySelector('.todo-list')
});

const oTodoCollapsedBtnView = new TodoCollapsedBtnView({
  btn: todoAppElem.querySelector('.collapsed-btn')
  // targetElem: todoAppElem.querySelector('[data-open-status]')
});

/* Controller */

const oTodoController = new TodoController({
  model: oTodoModel,
  view: {
    formView: oTodoFormView,
    listView: oTodoListView,
    collapsedBtnView: oTodoCollapsedBtnView    
  },
  reqUrl: '/todo',
  utils: { fetchJSON }
});


// ===============================================================

oTodoController.init();

