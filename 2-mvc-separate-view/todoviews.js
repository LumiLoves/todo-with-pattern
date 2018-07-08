class TodoFormView {
  constructor({ form, textInput }) {
    this.form = form;
    this.textInput = textInput;
    this.handleSubmitForm = null;
    this.init();
  }
  init() {
    this.textInput.focus();
    this._onSubmitFormEvent();
  }
  resetInput() {
    this.textInput.value = '';
  }
  _onSubmitFormEvent() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const todoText = this.textInput.value;
      if (!todoText) { return; }
      this.resetInput();
      this.handleSubmitForm(todoText);
    });
  }
}


class TodoListView {
  constructor({ wrapper }) {
    this.wrapper = wrapper;
  }
  getListsDOM() {
    return this.wrapper.querySelectorAll('li');
  }
  render(todos) {
    const resultTodosHTML = this._makeListHtmlAll(todos); // ? 이런것도 메서드로?
    this.wrapper.innerHTML = resultTodosHTML;
  }
  _makeListHtmlAll(todoMap) {
    let result = '';
    todoMap.forEach((value, key) => {
      result += `<li>${value.text}</li>`;
    });
    return result;
  }
}


class TodoCollapsedBtnView {
  constructor({ btn, targetElem }) {
    this.btn = btn;
    this.actionTxt = btn.querySelector('.action-txt');
    this.targetElem = targetElem; // FIX 리스트뷰! 없어야 함
    this.actionTxtMap = {
      'open': '열기',
      'close': '접기'
    };
    this.isOpened = (this.targetElem.dataset.openStatus === 'true')? true : false;
    this.init();
  }
  init() {
    this._onClickBtn();
  }
  toggleTarget() { 
    (this.isOpened) ? this.closeTarget() : this.openTarget();
  }
  openTarget() {
    if (this.isOpened) { return; }
    this.isOpened = true;
    this._setTargetElemForOpen();
    this._updateActionTxt(this.actionTxtMap.close);
  }
  closeTarget() {
    if (!this.isOpened) { return; }
    this.isOpened = false;
    this._setTargetElemForClose();
    this._updateActionTxt(this.actionTxtMap.open);
  }
  _setTargetElemForOpen() {
    this.targetElem.dataset.openStatus = 'true';
  }
  _setTargetElemForClose() {
    this.targetElem.dataset.openStatus = 'false';
  }
  _updateActionTxt(txt) {
    this.actionTxt.innerText = txt;
  }
  _onClickBtn() { 
    this.btn.addEventListener('click', () => this.toggleTarget());
  }
}



