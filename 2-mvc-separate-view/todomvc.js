'use strict';

/**
- 할일을 입력하면 '해야할일들'에 노출된다.
- event delegation 을 사용한다. (document 에만 event를 등록한다)
- Template literal 을 활용한 view용 html 데이터 생성.

================================================
1. Model
데이터를 갱신한다(추가,변경,제거,획득)
데이터를 획득하는 로직(Ajax나 localstorage등)을 model에 넣을 수도 있으나, controller에서 만들어서 줄 수도 있음.

2. Controller
전체적으로는 Model과 View간의 변경사항을 연결 지어주기.
event hander(listener) 구현체 만들기.
view 가 렌더링을 잘 할 수 있도록 데이터 가공(viewModel 만들기)
데이터 변경이 필요한 경우는 model에 전달.

3. View
DOM조작(view변경)에만 집중.
데이터를 받아서 별다른 가공없이 DOM에 추가.
Event listener 등록.

================================================
개발순서..
* @ 데이터 정의 (count, todoMap / count올리기, todo데이터추가)
* @ 동작 정의 (todo 등록시 -> 데이터 추가, todo 그리기)
* @ 사용측 정의
* @ 사용측 디자인대로 constructor, method 작성해보기
* @ model, view 작성
* @ controller 작성
* 계속 작성.....

질문
* Map
* 패턴이 정답이 아님. 설명할 줄 알기
* - 역할이 뭔지, 변화가 있을 때 어떻게 대응되는지, 추가할 때나 갈아낄때 어떤식으로 구현되는지에 대한 정의
*/


//Controller, View의 존재를 전혀 모르게 구현.
class TodoModel {
  constructor() {
    this.counter = 1;
    this.todo = new Map();
    // this.todoIsOpen = true;
  }
  addTodo(text, fnsAfterAddTodo) {
    this.todo.set(this.counter, { text });
    this._addCounter();

    if (toString.call(fnsAfterAddTodo) === '[object Array]') {
      fnsAfterAddTodo.forEach(fn => fn());
    }
  }
  _addCounter() {
    this.counter++;
  }
  // getTodo(id) {
  //   return this.todo.get(id);
  // }
  // updateTodo
  // removeTodo
}


//Model, View를 받아서 관계를 여기서 만들어 줌
class TodoController {
  constructor({ model, view: { formView, listView, collapsedBtnView }, reqUrl }) {
    this.model = model;

    this.formView = formView;
    this.listView = listView;
    this.collapsedBtnView = collapsedBtnView;

    this.reqUrl = reqUrl;
  }
  async init() {
    const todoArr = await this.requestTodo();
    const listElem = this.listView.getListsDOM();

    if (!listElem.length && todoArr.length) {
      todoArr.forEach((todoTxt) => this.model.addTodo(todoTxt));
      this.renderListView(this.model.todo);
    }
    
    this.formView.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.collapsedBtnView.handleToggleList = this.handleToggleList.bind(this);
  }
  async requestTodo() { // 추가기능 => 모델과 뷰 둘다 관계를 맺기때문에 컨트롤러에 있어야 한다고 생각. //유
    const res = await fetch(this.reqUrl);
    const resJSON = await res.json();
    return resJSON;
  }

  handleSubmitForm(todoText) {
    this.model.addTodo(todoText, [
      this.renderListView.bind(this, this.model.todo)
      // this.resetFormView.bind(this)
    ]);

    console.log(this.model.todo);
  }
  handleToggleList() {

  }
  renderListView(todo) {
    this.listView.render(todo);
  }
  // resetFormView() { 
  // 여기 있는게 맞는지 헷갈림! => 컨트롤러의 관심사항이 아님. 모델과 관계없는 뷰.
  //   this.formView.resetInput();
  // }
}

