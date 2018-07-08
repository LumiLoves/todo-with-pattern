// 관찰할 수 있는
class Observable {
  constructor() {
    this._observerList = new Set(); // 관찰자 목록
  }
  on(observer) {
    this._observerList.add(observer);
  }
  off(observer) {
    this._observerList.delete(observer);
  }
  fireObservers(data) {
    this._observerList.forEach((observer) => observer(data));
  }
}

// 참고 : Set https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set