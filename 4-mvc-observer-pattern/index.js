const todoAppElem = document.querySelector('.todo-app');

/* Model */

const oTodoModel = new TodoModel({
  reqUrl: '/todo-list',
  utils: { fetchJsonFn }
});
const oListModel = new ListModel();

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
});

/* Controller */

const oTodoController = new TodoController({
  model: {
    todoModel: oTodoModel,
    listModel: oListModel
  },
  view: {
    formView: oTodoFormView,
    listView: oTodoListView,
    collapsedBtnView: oTodoCollapsedBtnView    
  }
});

// ===============================================================

oTodoController.init()


