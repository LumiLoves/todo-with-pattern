//Controller, View의 존재를 전혀 모르게 구현.

class TodoModel extends Observable {
  constructor({ reqUrl,  utils: { fetchJsonFn } }) {
    super();
    this.todos = new Map();
    this.count = 1;

    this.reqUrl = reqUrl;
    this.fetchJsonFn = fetchJsonFn;
  }
  async initStoredData() { 
    const todoArr = await this._requestTodo();
    const hasNoTodo = !todoArr.length;

    if (hasNoTodo) { return; }
    todoArr.forEach((todo) => this._saveData(todo));
    this.fireObservers();
  }
  addTodo(todoStr) {
    this._saveData(todoStr);
    this.fireObservers();
  }

  async _requestTodo() {
    const resJSON = await this.fetchJsonFn(this.reqUrl);
    return resJSON;
  }
  _saveData(todoStr) {
    this.todos.set(this.count, { text: todoStr });
    this._increaseCount();    
  }
  _increaseCount() {
    this.count++;
  }
}

class ListModel extends Observable {
  constructor() {
    super();
    this.isOpen = true;
  }
  toggleListStatus() {
    (this.isOpen)? this._setListToClose() : this._setListToOpen();
    this.fireObservers();
    // this.runFns(fns);
  }
  _setListToOpen() {
    this.isOpen = true;
  }
  _setListToClose() {
    this.isOpen = false;
  }
}