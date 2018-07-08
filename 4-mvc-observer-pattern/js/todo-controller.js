//Model, View를 받아서 관계를 여기서 만들어 줌

class TodoController {
  constructor({ model: { todoModel, listModel }, view: { formView, listView, collapsedBtnView } }) {
    // model
    this.todoModel = todoModel;
    this.listModel = listModel;

    // view
    this.formView = formView;
    this.listView = listView;
    this.collapsedBtnView = collapsedBtnView;

    this._bindEventHandlers();
    this._registerObservers();
  }

  /* register */

  _bindEventHandlers() {
    this.formView.handleSubmit = this.handleSubmitForm.bind(this);
    this.collapsedBtnView.handleClick = this.handleClickCollapsedBtn.bind(this);
  }

  _registerObservers() {
    this._observeAddingTodo();
    this._observeTogglingList();
  }
  _observeAddingTodo() {
    this.todoModel.on(this.renderListView.bind(this, this.todoModel));
  }
  _observeTogglingList() {
    this.listModel.on(this.toggleCollapsedBtnView.bind(this, this.listModel));
    this.listModel.on(this.toggleCollapsedListView.bind(this, this.listModel));
  }

  /* init */

  init() {
    this.todoModel.initStoredData();
    document.addEventListener('DOMContentLoaded', () => {
      this.formView.init();
      this.collapsedBtnView.init();
    });
  }

  /* control view */

  renderListView({ todos }) {
    this.listView.render(todos);      
  }
  toggleCollapsedBtnView({ isOpen }) {
    this.collapsedBtnView.toggleTxt(isOpen);
  }
  toggleCollapsedListView({ isOpen }) {
    this.listView.toggleStatus(isOpen);
  }

  /* view event handler */

  handleSubmitForm(todoStr) {
    this.todoModel.addTodo(todoStr);
    console.log(this.todoModel.todos);
  }
  handleClickCollapsedBtn() {
    this.listModel.toggleListStatus();
  }
}


