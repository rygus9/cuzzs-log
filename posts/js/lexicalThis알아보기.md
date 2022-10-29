---
title: Lexical This 알아보기
tags: ["JS"]
uploadDate: 2022년 10월 30일
description: Lexical this를 얉게 알아보도록 하겠습니다.
---

Arrow Function는 This Binding이 없고 내부에 this를 쓸 경우 Lexical This로 동작한다고 배웁니다. 하지만 MDN 문서는 숙련된 개발자가 본다는 전제 하에 쓰인 문서답게 Lexical This 자체에 대한 설명이 거의 없습니다. 저도 단어만 보고 느낌은 왔지만 Lexical This에 대해 잘못 설명한 블로그를 보고 해당 블로그를 작성하기로 맘을 먹었습니다.

이 블로그의 부제는 얉게 알아보기입니다. 제대로 파악하려면 Lexical Scope와 This Binding의 기반 원리인 EC(Execution Context)에 대해 알아야 합니다만 EC는 정말 어려운 주제이고 세간에 잘못 돌아다니는 정보도 많아 저도 요즘 ECMA262를 보며 개념을 검증하는 중이기에 설명하기가 애매하기에 정말 얉게 알아볼 예정입니다.

### 사전 지식

> Lexical Scope, This binding, Closure를 정말 간략히 알아봅니다. 해당 개념이 익숙하지 않으신 분은 따로 공부하시길 바랍니다.

#### ✓ Lexical Scope

- Scope: 변수, 매개변수, 함수에 접근할 수 있는 범위, 함수 스코프와 변수 스코프가 있음..

  함수 스코프 : 함수 단위로 스코프를 잡는 방식 (같은 함수에 있음 접근 가능)
  블록 스코프 : 블록 단위로 스코프를 잡는 방식 (같은 블록에 있음 접근 가능)

- Scope Chain : 내 스코프에 없는 식별자의 경우 내 스코프 위에 있는 스코프에 해당 식별자가 있는지 물어봄.

Scope Chain에 따라 **함수 스코프의 상위 스코프를 결정할 때** 어떤 방식으로 상위 스코프를 결정하는지에 따라 Lexical Scope와 Dynamic Scope로 나뉩니다. 스코프 방식에 따라서 현재 스코프에 없는 식별자를 어떻게 찾을지 달라집니다.

<img src="/Users/cuzz/Documents/project-github/cuzzs-log/public/posts/js/image/lexicalThis1_1.png" alt="lexicalThis1_1" width="700" height="380" />

#### ✓ Closure

원래는 함수가 실행되고 난 이후에 해당 함수를 실행시키기 위해 할당했던 메모리 공간은 사라집니다. 하지만 리턴한 값에서 사라져야할 변수를 참조할 경우 해당 메모리 공간은 사라지지 않고 유지되는데 이를 클로저라고 합니다.

```js
function closureTest1() {
  let a = 1; // return 문 호출되면 사라짐.
  return a;
}

function closureTest2() {
  let a = 2; // return 문으로 호출되는 값(함수)이 해당 변수를 참조함. 리턴되어도 안 사라짐
  return () => {
    console.log(a);
  };
}
```

Closure는 EC에 기반하여 동작합니다. 간단히 설명하자면 함수가 실행될 때마다 콜스택에 해당 함수가 올라가고 해당 함수와 관련된 정보가 메모리에 잡히고 리턴될 때 해당 함수와 관련된 모든 정보가 정리되는데 참조가 남아있으면 정보를 처리하지 않습니다.

#### ✓ This Binding

Arrow Function이 아닌 일반 함수가 실행될 때에는 this 키워드에 값이 할당됩니다. 이게 함수를 선언할 시점이 아니라 함수를 사용할 시점에 결정되어서 참 말이 많은 아이입니다. 저도 this에 대해 정리해둔 글이 있으니 해당 글을 참고하시길 바랍니다.

https://www.cuzz.kr/post/2

### Lexical This 알아보기

밑에 제시된 코드의 실행 결과가 어떻게 나올지 예상이 가신다면 이번 블로그의 역할을 다했다 볼 수 있습니다. 사실 어려울 것도 없는게 위의 사전 지식을 다 파악하셨다면 쉽게 결과를 예측하실 수 있으실 겁니다.

```js
"use strict";

function k() {
  let a = {
    func: () => {
      console.log(this);
    },
    name: "gugu",
  };
  return a;
}

let a = {
  kFunc: k,
};

a.kFunc().func();
k().func();
```

Arrow Function에서 this를 호출하면 undefined가 출력된다는 포스트를 꽤 보았습니다. 또한 Arrow Function을 이용하면 This Binding을 하지 않기 때문에 복잡한 This Binding 규칙으로부터 자유로워진다는 포스트도 보았습니다. 하지만 해당 코드를 실행시켜보면 Arrow Function의 this도 실행 방법에 따라서 값이 달라지는 것을 확인할 수 있습니다.

#### ✓ 작동 원리

- Arrow Function인 func에는 this keyWord 자체가 없습니다. 그래서 상위 스코프에 this를 찾기 시작합니다. (정적 스코프)
- 상위 스코프에는 k 함수가 있었고 해당 함수는 this binding을 제공하기에 this 키워드가 존재합니다. 이제 func는 k의 this를 클로저로 참조합니다.
- func 내의 this는 k 함수의 this binding 규칙에 얽매이게 됩니다. k가 어떻게 실행되었냐에 따라 this의 값이 달라진 채로 func가 만들어지기에 func의 this는 k의 바인딩 규칙에 따라 다양한 값을 가질 수 있습니다.

#### ✓ 결론

어찌보면 매우 쉽지만 스코프 개념과 클로저 개념, this binding 개념이 모두 다 잡혀있어야 이해가 가능하기에 어렵다면 어렵습니다. 여기에 EC까지 생각한다면 엄청 어렵게 다가올 수 있을 주제라고 생각합니다. 물론 기반이 튼튼하다면 Lexical This라는 말을 듣자마자 무엇을 암시하는지 예상이 가기 때문에 또 한 번 기초가 중요함을 꺠닫는 계기가 되었습니다.
