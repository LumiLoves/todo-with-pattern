
// Model, Controller의 존재를 전혀 모르게 구현
class TodoListView {
  constructor({ form, textInput, listWrapper }) {
    // ?? form하나만 전달하고 뷰 안에서 의존한 셀렉터로 저장할까??
    // 일단 몇개 없으니깐 나누ㅓ서 받기.
    this.form = form;
    this.textInput = textInput;
    this.listWrapper = listWrapper;
    // this.listTemplate = `<li>${text}</li>`; // ?? 이런 템플릿은 어디에서 가지고 있어야 할까?

    this.handleSubmitForm = null;
    this.init();
  }
  init() {
    this.textInput.focus();
    this.onSubmitFormEvent();
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
  onSubmitFormEvent() {
    document.addEventListener('submit', (e) => {
      const target = e.target;
      const todoText = this.textInput.value;
  
      if (target === this.form) {
        e.preventDefault();
        todoText && this.handleSubmitForm(todoText);
      }
    });
  }
}


