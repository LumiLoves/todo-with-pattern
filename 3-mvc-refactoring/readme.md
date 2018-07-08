
# 3회차 : 리뷰 피드백



## 리뷰-수정할 점.

### 의존하는 뷰 분리

```javascript

const oTodoCollapsedBtnView = new TodoCollapsedBtnView({
  btn: todoAppElem.querySelector('.collapsed-btn'),
  targetElem: todoAppElem.querySelector('[data-open-status]')
});

// 여기서 targetElem === listView임
// TodoCollapsedBtnView에서 다른 뷰를 알 필요가 없으므로 수정함.

```

  



**데이터 전달구조**

​			모델

​	컨트롤러			컨트롤러

뷰1	뷰2	뷰3			뷰4	뷰5	뷰6



뷰1 => 컨트롤러 => 모델 => 뷰1, 뷰2



- (뷰에서 이벤트가 발생하거나 하면) 컨트롤러가 모델과 뷰를 건드리는데 그 관계를 맺어준다.
- 모델에 변화가 없는 뷰자체의 데이터, 다른 뷰를 건드리지 않는 뷰데이터는
  - 해당 뷰 내부에서 데이터를 가지고 있어도 됨.
  - 그러나 다른 뷰를 건드린다면 상위로 데이터를 빼서 (모델로 데이터 이동)
  - 컨트롤러가 관계를 맺어주도록 해야 한다.



**느낀 점**

공부할수록 (배민찬보다) 한페이지의 뷰가 하나의 목적으로 동작하는 애플리케이션에 어울리는 패턴이라는 생각이 많이 듦.

한 뷰가 다른 데이터,뷰들에 영향을 끼치는.






















































