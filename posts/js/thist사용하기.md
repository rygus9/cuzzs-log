---
title: this 사용하기
tags: ["JS"]
uploadDate: 2022년 09월 21일
description: JS 문법 공부에 어려운 부분을 차지하는 this를 정리해보았습니다.
---

> 해당 시리즈는 기초부터 완성까지 프론트엔드 (이재성 저) 책 + 구글링(출처는 밑에 적겠습니다.) + MDN 문서 + 내 머리 속 지식 기반으로 작성했습니다. 애매한 부분은 ECMA-262를 보고 확인하려고 합니다. 개인 공부를 정리하는 목적이 강합니다. 쉽게 쓰려고 노력하겠지만 초보자를 고려하고 쓴 글이 아니니 참고바랍니다. 주제가 다소 어렵다 보니 틀린 내용이 있을 수 있습니다. 하루빨리 댓글 기능을 만들어야겠네요.

### This

JS에서 this는 일차표현식으로 분류된다. ( 빠른 시일 내에 식과 문도 다루어야겠다. ) 아무튼 표현식이기 때문에 this는 값으로 표현된다. 그럼 this가 표현하는 값만 알면 this를 사용하는데 있어서 크게 문제 없을 것 같은데 왜 어렵다고 하는걸까? 바로 this의 값이 코드를 작성하는 시점이 아닌 코드를 실행하는 시점에 결정되기 때문이다.

#### 코드를 작성하는 시점이 아닌 코드를 실행하는 시점에서 this가 표현하는 값이 결정된다.

> 확실하게 하자. 함수 안이 아닌 전역 공간에서 쓰인 this는 그냥 window 객체를 표현한다. 여기서 코드를 실행하는 시점에서 this가 표현하는 값이 변경되는 경우는 실행되는 함수 안에 쓰인 this를 의미한다.

```js
console.log(this); // 무조건 window 객체를 의미함.
```

이게 무슨 의미인지 잘 모를 것이다. 밑에 예제를 보도록 하자.

```js
function test() {
  expression1 = 3 + 5;
  expression2 = this;
  console.log("3 + 5 = ", expression1);
  console.log("this = ", this);
}
```

- expression1은 덧셈 산술 연산자를 사용한 표현식(3 + 5)의 결과 값을 할당받았다. 3 + 5는 test 함수가 어떻게 실행되든 무조건 8임이 보장된다. 우리가 코딩할 때 보통 표현식은 어디에서 쓰이든 동일한 결과를 표현한다고 생각한다. 어찌되었든 3 + 5는 8이 아닌가?
- expression2는 this 표현식의 결과 값을 할당받았다. this 도 표현식이니 어디서 실행되든 똑같은 값을 표현하기를 기대할 법도 하다.

```js
var a = {
  test,
};

test();
// 3 + 5 = 8
// this = window 객체
a.test();
// 3 + 5 = 8
// this = a 객체
```

- 3 + 5는 어디서 실행되든 8이라는 동일한 결과를 표현한다. 하지만 this는 객체의 메서드로 실행되었는지 그냥 실행되었는지에 따라 this의 값이 바뀐다. 즉 this의 값은 해당 표현식이 실행되는 시점에 결정된다.

> 우리가 보통 함수를 작성할 때 외부 상태와 함께 변동되면서 함수 내부 로직을 관여하는 값을 매개 변수로 정의하고 나머지는 외부 상태와 독립적으로 동작한다고 가정하고 작성한다. 하지만 this는 매개 변수로 받는 값도 아니면서 외부 상태에 따라 변동되며 함수 내부 로직에 관여한다. 이런 특성 덕분에 this를 잘 안다고 해도 생각없이 쓰면 찾기 힘든 에러가 발생할 수 있다.

#### This 값이 결정되는 메커니즘

> 위에서 설명했지만 먼저 전역 공간에서의 this는 고민할 필요없이 window 객체다. 여기서 값이 변경되는 this는 모두 함수 안에서 정의된 this를 의미한다.

1. 대부분의 경우 특정 함수의 this는 특정 함수를 호출한 객체를 의미한다고 생각하면 된다.

   ```js
   function test() {
     console.log(this);
   }

   var a = {
     test: test,
   };

   var b = {
     test: test,
     a: a,
   };

   a.test(); // {test: f} a객체
   b.test(); // {test: f, a: {...}} b 객체
   b.a.test(); // {test: f} a 객체
   ```

   test 함수 내부의 this는 test 함수를 호출한 test 함수 바로 앞의 객체를 의미한다.

2. 전역 공간에서 실행된 함수(호출한 객체가 없음 => 앞에 점이 없음) 내부의 this는 strict 모드에 따라 달라진다.

   ```js
   test();
   // strict 모드면 undefind
   // strict 모드가 아니면 window
   ```

   이게 test()가 window.test()와 같아서 엄격 모드가 아닌 경우에는 this값으로 window로 표현되지만 보이는 문장과 출력되는 결과가 달라 많은 혼란을 부르기 때문에 strict 모드에서는 undefined로 표현된다.

3. bind, apply, call 함수로 특정 함수의 this 값을 강제할 수 있다.

   ```js
   function printIntro(age) {
     console.log("나이는 ", age);
     console.log(this.name);
   }

   gugu = {
     name: "gugu",
   };

   soul = {
     name: "soul",
   };

   // printIntro 함수 로직에 this가 gugu인 새로운 함수를 리턴함.
   guguTest = printIntro.bind(gugu);
   guguTest(10);

   // printIntro 함수에 this가 gugu인 경우 리턴 값을 리턴함. 두번째 인자는 printIntro에 들어갈 매개변수
   printIntro.apply(gugu, [10]);
   printIntro.call(soul, 10);
   ```

4. Class 문법으로 정의한 메소드의 this는 무조건 해당 클래스 객체를 가리키는거 아닌가 하는데 JS는 객체와 메서드의 관계가 거의 독립적이다. 메서드의 함수를 다른 변수에 옮기고 해당 변수로 함수를 실행하면 this의 값이 undefined가 된다.

   ```js
   class Test {
     test() {
       console.log(this);
     }
   }

   var a = new Test();
   a.test(); // Test {}

   var func = a.test;
   func(); // undefined
   ```

   그렇기에 클래스 안에 정의한 함수라고 무조건 this가 해당 클래스의 생성자가 생성한 객체라는 생각은 버리는게 좋다. 사용하는 사람이 어떻게 쓰냐에 따라 this의 값이 변할 수 있다.

5. 함수가 생성자로 쓰일 경우 함수 내부의 this는 생성하는 객체를 의미한다. JS에서는 앞에 new 키워드가 붙은 함수는 생성자로 동작하게 하였다.

   ```js
   function User(age, name) {
     this.age = age;
     this.name = name;
     console.log(this);
   }
   const user = new User(10, "gugu");
   // User {age: 10, name: 'gugu'}  // 생성된 User 객체

   a = { name: "temp", age: 202, func: User };
   a.func(10, "CHNAGE NAME");
   // {name: 'CHNAGE NAME', age: 10, func: ƒ}  // a 객체
   ```

   로직으로 쓰일 함수와 생성자로 쓰일 함수를 구분하는 건 필수지만 문법을 이해하기 위해 생성자와 함수 역할을 동시에 하도록 해보았다. User 함수에 new 키워드를 붙이면 생성자로 동작하며 이때의 this는 생성될 객체를 의미한다. 한편 a.func 의 User는 함수로 동작하며 이 때 User의 this는 해당 함수를 호출한 a 객체가 된다.

6. Arrow Function에서 this는 정의되지 않는다. Arrow Function 내부에서 this를 쓸 시 상위 스코프의 this 값을 가져온다. 이에 대한 내용은 추후에 자세히 설명할 예정이다.

#### This와 관련된 문제를 피하는 테크닉

- 최대한 함수 내부에 this를 쓰지 말자.

  모든게 다 함수 내부에 this를 써서 생긴 문제다. 물론 this가 없으면 특정 함수를 포함하는 객체를 참조하기 힘들다. 메서드를 작성해야 하는 객체 지향 프로그래밍에서는 힘든 이야기일 수 있으나 함수를 외부 상태에 의존하지 않고 오직 입력값에 의해서만 동작하는 단위로 보는 함수형 프로그래밍에선 오히려 this가 없어야 한다. 아무튼 함수를 작성할 때 최대한 this를 쓰지 말자.

- 함수를 생성하자마자 바로 바인딩시켜버리자.

  ```js
  const guguPrint = function () {
    console.log(this.name);
  }.bind({ name: "gugu" });

  guguPrint(); // gugu
  ```

  익명 함수로 this값이 바인딩되지 않은 함수를 접근 불가능하게 하였고 그 함수에 {name: 'gugu'}를 바인딩한 함수만 guguPrint로 접근 가능하게 하였다. 이러면 함수 내부의 this는 bind 함수의 매개변수로 들어온 객체가 된다.

- 함수 사용에 제한을 두자.

  ```js
  let test = a.test;
  // 이런거 하지 말자
  ```

  객체의 메서드를 다른 변수의 값으로 할당하지 말자. 만약 함수를 넘겨야 한다면 무조건 바인딩하고 넘기자.

### 요약 및 마무리

- 함수 안에 정의된 this는 해당 함수를 어떻게 사용하느냐에 따라 값이 달라진다.
- 보통은 함수를 호출한 객체가 this에 들어가고, bind,apply, call로 특정 함수의 this를 내가 지정할 수 있다. 생성자의 this는 생성할 객체를 가리키고 클래스 문법으로 정의된 메서드라 할지라도 무조건 this가 해당 클래스의 객체임을 보장할 수 없다.
- 그렇기에 함수 안에 this를 쓰는 건 최대한 자제하고 함수를 값으로 전달할 때에는 바인딩된 함수만 전달하며 객체의 메서드를 특정 변수에 할당하는 코드를 작성하지 않도록 약속하는 등 함수를 작성하는 시점에 this 값을 예측할 수 있도록 해주어야 한다.
