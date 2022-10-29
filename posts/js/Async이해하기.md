---
title: Async/Await 이해하기
tags: ["JS"]
uploadDate: 2022년 10월 29일
description: Async를 이해해보도록 합시다.
---

Async와 Await는 정말 편리한 도구이지만 이를 제대로 이해해본 적이 없다고 생각했습니다. 그래서 Async와 Await의 원리를 정리한 블로그를 찾아보았는데 생각보다 복잡해서 저의 말로 다시 한번 정리하고자 합니다. 참고로 Promise를 잘 아신다는 전제하에 쓰였습니다.

- 참고한 블로그

https://velog.io/@proshy/async-await-%EB%8F%99%EC%9E%91%EC%9B%90%EB%A6%AC
https://medium.com/sjk5766/async-await-%EC%9B%90%EB%A6%AC-cc643f18526d
위 두 블로그에서 제시한 코드가 서로 같다는 걸 이해하려는 방식으로 접근하시면 좋을 듯싶습니다.

### Async / Await 개론

🍀 한 가지 명심할 점! async function의 리턴 값은 무조건 Promise입니다.

Promise와 then으로 비동기 작업이 수월해졌다고 해도 기존 동기 방식으로 작업하던 사람들에게는 생소한 문법임은 틀림없습니다. 비동기 작업을 아예 동기 작업처럼 작업 순서에 맞게 쭉 쓰는 방식이 없을까 했다가 나온 문법이 async/await 입니다.

```js
new Promise((resolve) => {  //비동기
	resolve();
}).then(() => return Promise)
  .then(() => return Promise)

async function test() {
  const result = await Promise;
  await Promise;
  await Promise;
}
```

Promise에서 비동기 작업이 여러 개 있을 경우 then 메서드 내부 리턴 값으로 Promise를 리턴하게 해서 해당 Promise가 실행될 때까지 다음 then에 등록된 메서드를 실행하지 않도록 합니다.
Async 키워드가 붙은 함수 내에서 Promise 앞에 await 키워드를 붙이게 되면 해당 Promise가 실행되기 전까지 다음 코드가 실행되지 않고 기다리게 됩니다. 즉 Async/Await 문법으로 Promise chain 방식을 완전히 대체할 수 있게 됩니다.

```js
console.log(test()); // Promise
```

### Generator

🍀 Async/Await의 기저에는 Generator가 존재합니다.

약 5년 전에는 Async/Await 문법이 없었습니다. 대신 Generator라는 문법이 있었는데 옛날에는 이 문법을 이용해서 Async/Await 기능을 흉내 냈습니다. Async/Await 문법을 babel로 translate해버리면 Generator 문법으로 작성된 코드가 나오기에 저는 우선 Generator부터 이해해볼까 합니다.

```js
function* makeGen() {
  const school = yield "hello";
  const name = yield "I am ...";
  return `${school} and ${name}`;
}

const gen = makeGen();
console.log(gen.next()); // {value: 'hello', done: false}
console.log(gen.next("Ajou")); // {value: 'I am ...', done: false}
console.log(gen.next("Cuzz")); // {value: 'Ajou and Cuzz', done: true}
```

#### ✓ Generator 빠른 정리!

- Generator 함수를 생성할 때에는 function\* 키워드를 씁시다.
- Generator 함수를 호출하면 Generator 객체가 생성됩니다.
  🔺 Generator 함수와 Generator 객체를 구분하세요! (makeGen.next()하면 부끄러운 겁니다. => 이게 저예요;;)
- Generator가 실행되는 과정은 VS에서 디버깅하는 과정을 연상하시면 쉽습니다.
  🟢 Generator 함수의 맨 처음과 yield 부분에 Stop Point가 걸려있다고 생각하시고 generator객체의 next()함수가 실행 버튼이라고 생각하시면 편합니다.

- next가 호출되면 기존에 멈춘 지점 (맨 처음 또는 이전에 yield)부터 다시 실행됩니다. 이때 next()안에 인자로 넣은 값은 기존에 멈췄던 부분에 치환되어서 대입됩니다.
- next의 리턴 값은 value와 done을 property로 가지는 객체입니다. value는 yield 또는 return이 리턴한 값이고 done은 해당 generator가 끝났는지 아닌지(return이 호출되면 끝난 거예요.)를 나타냅니다.

> Generator와 Iterator는 나중에 따로 포스팅할 예정입니다. Generator의 핵심 동작만 간략히 서술해서 이해가 힘드시리라 생각합니다. 밑에 있는 블로그 글을 참고하시면 이해가 쉬우리라 생각합니다.
> https://ko.javascript.info/generators

### Generator + Async/Await

우선 설명하기에 앞서 제가 다른 블로그에서 본 코드를 기준으로 설명해볼까 합니다. 해당 코드만큼 async/await의 이해 정도를 판단하기 좋은 코드가 떠오르지 않아서 그냥 그대로 쓰겠습니다. 밑에 있는 코드의 실행 결과를 그대로 쓸 수 있으시다면 밑에 있는 내용이 필요 없을 수 있습니다. (물론 저는 처음에 틀렸습니다 ㅎㅎ)

```js
function a() {
  console.log("a");
}

async function b() {
  console.log("b1");
  await a();
  console.log("b2");
}
b();
console.log("c");
```

#### ✓Generator로 변환!

참고한 블로그에서 babel로 트랜스파일링한 코드를 그대로 보여주었는데 가독성이 떨어진다고 판단하여 제가 좀만 수정해보았습니다. 물론 수정한 코드 또한 이해하기 힘드니 꼭 여기저기 console 찍어보시고 자신이 직접 이해하기 쉽게 리펙토링해보시는 과정을 거치시는 걸 추천해 드립니다.

```js
function asyncGeneratorStep(gen) {
  return new Promise((resolve, reject) => {
    function step(key, arg) {
      try {
        // generator를 실제로 실행하는 부분
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }

      if (info.done) {
        resolve(value);
      } else {
        // value가 Promise이든 그냥 값이든 Promise로 씌워져서 처리된다.
        Promise.resolve(value).then(
          (val) => {
            step("next", val);
          },
          (err) => {
            step("next", err);
          }
        );
      }
    }
    step("next", undefined);
  });
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments,
      gen = fn.apply(self, args);
    return asyncGeneratorStep(gen);
  };
}

function a() {
  return new Promise((resolve) => {
    console.log("a");
    resolve();
  });
}

function b() {
  return _b.apply(this, arguments);
}

function _b() {
  let promsieGen = _asyncToGenerator(function* () {
    console.log("b1");
    const val = yield a();
    console.log("b2");
  });
  return promsieGen(this, arguments);
}

b();
console.log("c");
```

#### ✓확인해볼 부분!

- Async 함수였던 b함수가 b함수와 \_b함수로 나누어졌습니다. b 함수는 프라미스를 리턴하는 \_b함수를 실행하는 역할을 담당하고 \_b함수는 기존의 async 함수인 b 함수의 실행 부분을 Generator 함수로 만들어서 \_asyncToGenerator함수에 전해줍니다. 최종적으로 \_b는 Promise를 리턴합니다.

  => Promise는 생성되는 즉시 실행됩니다. 그래서 특정 Promise를 원하는 시점에 동작시키고 싶으면 해당 Promise를 리턴하는 함수를 만든 뒤 원하는 시점에 해당 함수를 호출하는 방식을 사용합니다.

- \_asyncToGenerator는 입력받은 제너레이터 함수를 이용해 제너레이터 객체를 만든 이후 asyncGeneratorStep에게 전해줍니다.

- asyncGeneratorStep은 Promise를 리턴합니다

  => 해당 프로미스에서 입력받은 Generator 객체를 실행시킵니다. yield 뒤에 값이 리턴되어 generator가 멈추면 뒤에 있는 코드가 실행됩니다.
  => generator가 끝나지 않았다면 내부에서 Promise를 만듭니다. 해당 Promise의 then으로 generator를 실행시키는 함수를 다시 실행시킵니다.

  ```js
  Promise.resolve(1).then((ans) => step(ans));
  Promise.resolve(Promise).then((ans) => step(ans));
  // resolve 안에 Promise가 오면 해당 Promise가 fulfilled될 때까지 기다림.
  ```

  => Promise 내에 Promise를 만들고 해당 Promise에 then을 붙이고 then에 자신을 감싼 함수를 호출하는 방식으로 재귀를 구현하였습니다.

#### 간단하게 요약

- Async function은 Generator와 Promise로 구현됩니다.. next를 실행할 때 리턴되는 부분까지 실행되고 그 이후 부분은 Promise의 then 함수에서 처리됩니다.
- 그래서 위의 예제에서도 yield a()에서 a() 함수까지 처리된 이후 Promise.then 함수로 넘어갔습니다. yield 개수만큼 Promise가 생성된다고 보면 되겠습니다. (microQueue에 들어가는 task의 수는 yield 개수 - 1이다. )

기존 글인 Promise글과 이번 글을 잘 이해하셨다면 밑에 쓰인 코드의 실행 결과를 예상하실 수 있습니다. 만약 예상한 결과와 실제 실행 결과가 다르다면 Promise편과 해당 블로그 글을 다시 읽어보시길 바랍니다. 이벤트 루프에 대한 이해와 Promise에 대한 이해, Async/Await에 대한 이해가 수반되어야 풀 수 있는 문제입니다.

```js
var log = console.log;

function slowPromise() {
  return new Promise((resolve) => {
    log("20 start");
    setTimeout(() => {
      resolve(20);
      log("20 end");
    }, 2000);
  });
}

function fastPromise() {
  return new Promise((resolve) => {
    log("10 start");
    setTimeout(() => {
      resolve(10);
      log("10 end");
    }, 1000);
  });
}

async function concur() {
  let slow = slowPromise();
  let fast = fastPromise();
  log(await slow);
  log(await fast);
}

async function wait() {
  let slow = await slowPromise();
  log(slow);
  let fast = await fastPromise();
  log(fast);
}

concur();
wait();
```

위의 코드를 보고 실행 결과를 맞히실 수 있으시다면 Promise와 Async/Await 관련 문법이 헷갈려서 동작을 예상하지 못하시는 경우는 없으리라 생각합니다. <del>이정도로 꼬인 코드는 개발하면서 보기 힘들지 않을까 합니다.</del>
