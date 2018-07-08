// 1

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

* @ 데이터 정의 (count, todoMap / count올리기, todo데이터추가)
* @ 동작 정의 (todo 등록시 -> 데이터 추가, todo 그리기)
* @ 사용측 정의
* @ 사용측 디자인대로 constructor, method 작성해보기
* @ model, view 작성
* @ controller 작성
* 계속 작성.....

*/

//Controller, View의 존재를 전혀 모르게 구현.
class TodoModel {
  constructor() {
    this.counter = 1;
    this.todo = new Map();
  }
  addCounter() {
    this.counter++;
  }
  addTodo(text) {
    this.todo.set(this.counter, { text });
    this.addCounter();
  }
  getTodo(id) {
    return this.todo.get(id);
  }
  // updateTodo
  // removeTodo
}

//Model, View를 받아서 관계를 여기서 만들어 줌
class TodoController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
  }
  init() {
    const listLength = this.view.getListsDOM().length;
    const todoLength = this.model.todo.size;
    if (!listLength && todoLength) { this.view.render(this.model.todo); }

    // this.view.init(this);
    this.view.AFTERFormsubmit = this.onSubmitForm.bind(this);
  }
  onSubmitForm(e) {
    const todoText = this.view.textInput.value;

    this.model.addTodo(todoText);
    console.log(this.model.todo);

    this.view.render(this.model.todo);
  }
}

//Model, Controller의 존재를 전혀 모르게 구현
class ListView {
  constructor({ form, textInput, listWrapper }) {
    // ?? form하나만 전달하고 뷰 안에서 의존한 셀렉터로 저장할까??
    // 일단 몇개 없으니깐 나누ㅓ서 받기.
    this.form = form;
    this.textInput = textInput;
    this.listWrapper = listWrapper;
    // this.listTemplate = `<li>${text}</li>`; // ?? 이런 템플릿은 어디에서 가지고 있어야 할까?
    // this.fnformsubmit = null;
  }
  init(controller) {
    this.textInput.focus();
    this.handleFormEvent(controller.onSubmitForm.bind(controller));
  }
  getListsDOM() {
    return this.listWrapper.querySelectorAll('li');
  }
  render(todo) {
    const resultTodosHTML = this.makeListHtmlAll(todo); // ? 이런것도 메서드로?
    this.listWrapper.innerHTML = resultTodosHTML;
  }
  makeListHtmlAll(todoMap) {
    let result = '';
    todoMap.forEach((value, key) => {
      result += `<li>${value.text}</li>`;
    });
    return result;
  }
  handleFormEvent(callback) {
    document.addEventListener('submit', (e) => {
      const target = e.target;

      if (target === this.form) {
        e.preventDefault();
        callback(e);
      }
    });
  }
}


// ==================================================================

const myTodoModel = new TodoModel();
const myTodoView = new ListView({
  form: document.querySelector('.todo-app .user-form'),
  textInput: document.querySelector('.todo-app input[type="text"]'),
  listWrapper: document.querySelector('.todo-app .todo-list')
});
const myTodoController = new TodoController({
  model: myTodoModel,
  view: myTodoView
});

myTodoController.init();


/*
템플릿데이터
템플릿다루는 핸들러
*/


