---
title: Promise 이해하기
tags: ["JS"]
uploadDate: 2022년 10월 28일
description: Promise를 공부하면서 얻은 지식을 정리해보았습니다.
---

시작하기 전에 이 글은 제가 Promise를 공부하고 기억해야겠다 싶은 내용을 정리한 내용입니다. Promise를 아예 모르시는 분이 보기에는 거북할 수 있으니 저보다 훨씬 친절하게 잘 쓰신 아래의 블로그를 먼저 보시기 바랍니다. (3번째 수정 중...)

완전 처음이시다. => https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/
정석 블로그 =>  https://ko.javascript.info/async
Promise 실행 원리 => https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke#syntax

### Callback이란

프라미스의 탄생 배경을 이해하기 위해서 먼저 callback에 대해 알아보도록 합시다. 

우선 자바스크립트에서 완료까지 오래 걸리는 작업, 예를 들어 파일 가져오기나 네트워크 통신하기 등의 작업들은 비동기적인 방식으로 처리합니다. 오래 걸리는 작업은 다른 아이에게 미뤄두고 내가 해야 할 일을 하다가 다른 아이가 작업이 끝나고 결과물이 나올 때 해당 결과물을 가지고 작업하는 방식입니다. 오래 걸리는 작업이 끝난 이후 내가 해야 할 일은 콜백 함수를 이용해서 등록합니다.

```js
setTimeout(() => { console.log("setTimeout 작업이 끝난 후 실행되는 콜백 함수") }, 1000);
console.log("먼저 실행됩니다.")
```



#### ✓ CallBack 지옥

파일을 읽은 후, 1초를 쉬다가, 결과를 파일에 저장하는 코드를 짜고 싶습니다. 문제는 파일을 읽는 작업, 1초 쉬는 작업, 파일을 쓰는 작업 모두 JS에서는 오래 걸리는 작업이라 판단하여 각각 콜백 함수를 등록하도록 강제합니다.

```js
fs.readFile("파일이름.txt", 'utf-8', (err, data) => {
  setTimeout((data) => {
    fs.writeFile(file, data, (err) => {
      console.log("함수가 벌써 세 개 나옴.")
    })
  }, 1000)
})
```

지금은 하는 일이 단순하기 때문에 그렇게 복잡해 보이지 않지만 비동기가 연계되는 과정이 많아지고 중간중간 처리해야 할 일들이 많아질수록 콜백 함수를 사용하기 힘들어집니다. 이렇게 비동기 작업이 서로 연계된 코드를 프로그래밍하기 위해서 만들어진 스펙이 Promise 입니다.



### Promise 객체 이해

🍀 Promise는 비동기 작업 진행 과정을 객체로 표현해주는 문법입니다.



#### ✓ Promise state

* pending : 아직 Promise 내부 코드의 실행이 끝나지 않았음을 나타냅니다.
* fulfilled : Promise 내부 코드가 제대로 실행되었음을 의미합니다. (Settled 상태이기도 함.)
* rejected : Promise 내부 코드를 실행하는 도중 에러가 발생했음을 의미합니다. (Settled 상태이기도 함)

<img src="/Users/cuzz/Documents/project-github/cuzzs-log/public/posts/js/image/Promise1_1.png" alt="Promise1_1" width="760" height="340"/>



#### ✓ Promise state 변화

프라미스는 resolve와 reject를 인자로 가지는 함수를 등록하여 생성합니다. 해당 함수 내에서 resolve 또는 reject를 호출 시에 Promise의 상태가 변화합니다. **한 번 상태가 변한 Promise는 다시는 다른 상태로 바뀔 수 없습니다.**



##### ✓ rejected가 되는 요건

rejected 상태가 되는 방법은 1. 어느 스택이든 reject 함수를 호출할 경우 2. Promise에 등록한 함수 내에서 에러가 발생 시입니다. setTimeout 내에서 에러가 발생하면 Promise 실행 도중 나온 에러가 아니고 setTimeout 콜백 함수를 실행하는 도중 나온 에러이기에 Promise의 상태에 영향을 주지 못해 Promise는 pending상태가 유지됩니다.

```js
const setTimeoutError = new Promise(() => {
    setTimeout(() => {
        throw new Error("Not catched by Promise");
    });
})
console.log(setTimeoutError); // pending

const inPromiseError = new Promise(() => {
  throw new Error("catched by Promise");
})
console.log(inPromiseError); // rejected
```



##### ✓ Promise에 등록한 함수

resolve가 실행된 이후에도 뒤에 남은 코드들은 실행됩니다. rejected도 에러를 전달하고 그 자리에서 종료할 것 같지만 뒤에 남은 코드를 실행합니다. return처럼 생각하면 큰일 납니다. 

```js
const afterResolve = new Promise((resolve, reject) => {
  resolve(1); // or reject
  resolve(2); // 의미없는 resolve
  console.log("실행됩니다.");
})
setTimeout(() => {
  console.log(afterResolve); // Promise {<fulfilled>: 1}
}, 0)
```



### then, catch, finally

🍀 Promise가 fulfilled나 rejected 될 때 실행시킬 코드를 등록하는 방법이 then과 catch입니다.

then과 catch는 Promise가 fulfilled 되거나 rejected 될 때 실행돼야 하는 함수를 쉽게 등록할 수 있게 해주는 prototype method입니다. pending 상태의 Promise에 then 또는 catch를 호출해 함수를 등록한다면 나중에 fulfilled나 rejected 될 때 실행되며 이미 fulfilled나 rejected 된 Promise에 then 또는 catch에 함수를 등록하면 바로 실행됩니다.



#### ✓ then의 동작 원리

then 또는 catch가 실행되면 이 아이들은 새로운 Promise를 리턴한다. then에 있는 코드들은 해당 함수를 호출한 Promise가 fulfilled상태가 될 경우 microTaskQueue에 올라가게 됩니다. Promise에 then 메서드가 실행되면 리턴값으로 새로운 Promise가 반환됩니다. 다만 Promise에 등록하는 function과 then에 등록되는 function은 다른 구조로 되어 있습니다.

|                           Promise                            |                             Then                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| Promise를 생성할 때 등록한 함수는 보통 함수처럼 실행. (**microTaskQueue를 거치지 않음**) | 해당 함수를 호출한 Promise가 fulfilled가 될 때 microTaskQueue에 인자 함수 등록(이때 새 Promise 생성) |
| resolve가 호출되면 fulfilled 로 변함, **resolve이후 코드들이 끝까지 실행**된다. | return문이 호출되면 fulfilled로 변함. **return 이후 코드들은 실행되지 않음** |
| 등록되는 함수에 매개변수로 resolve와 reject함수가 주입됩니다. | 등록되는 함수의 매개변수로 Promise가 resolve를 실행할 때 넣은 값이 매개변수로 주입됩니다. |

> **then의 리턴 값** 또는 Promise 등록 함수 안에 **resolve에 들어가는 값**에 Promise를 주입한다면 알아서 해당 프로미스가 fulfilled될 때까지 기다린 후 해당 Promise의 result값을 then에 등록된 함수에게 넘긴다.

```js
(new Promise((res) => {
  res(1); console.log("in Promise done")
})).then((result) => {
	return 3; console.log("in then not done") // not print
s})
```
then의 리턴값은 Promise이기 때문에 then을 여러 번 겹쳐서 사용할 수 있다. 그러면 then이 겹쳐지는 순서대로 함수가 실행되며 이를 Promise chain이라고 한다. 위의 코드는 Promise chain은 아니지만 하나의 Promise에 여러 then이 붙을 수 있음을 보여주고 밑의 코드는 Promise chain으로 차례로 코드가 실행된다는 것을 표현한다.
```js
const myPromise = new Promise((resolve, reject) => {resolve(1)})

myPromise.then((res) => console.log(res + 1))
myPromise.then((res) => console.log(res + 2)) 
myPromise.then((res) => console.log(res + 3))
```

```js
const myPromise = new Promise((resolve, reject) => {resolve(1)})
myPromise.then((res) => res + 1)
  .then((res) => res + 1)
  .then((res) => console.log(res + 1))
```

<img src="/Users/cuzz/Documents/project-github/cuzzs-log/public/posts/js/image/Promise1_2.png" alt="Promise1_2" width="800" height="280" />



#### ✓ catch, finally

catch와 finally 모두 then과 비슷하게 입력받은 함수를 기반으로 새로운 Promise를 리턴합니다. catch같은 경우에는 Promise가 rejected 일 경우에만 반응하는 메서드이고 finally는 fulfilled이든 rejected이든 settled된 Promise라면 무조건 실행되는 메서드입니다. catch같은 경우에는 Promise가 에러가 난 경우에도 반응하며 보통 Promise chain이 진행되면서 생긴 에러를 잡기 위해서 사용합니다. finally은 rejected나 fulfilled 여부와 상관없이 실행되어야 하는 동작이 있을 경우 사용합니다.

```js
new Promise((res, rej) => {
  // 실행;
  res(1)
}).then(() => { }).then(() => { })
  .catch(err => console.log(err))
  .finally(() => {console.log("공통 실행 부분")})
```

> 참고로 then에 함수 두 개를 입력하면 하나는 fulfilled일 때 새로운 Promise에 들어가는 함수로 작동하고 두 번째 함수는 rejected일 때 새로운 Promise에 들어가는 함수로 작동합니다. 저는 then의 두 번째 인자를 사용하기보다는 catch를 이용하는 편이라 잘 쓰진 않습니다.



#### ✓ catch에 대해 고찰하기

🍀 Promise 함수의 에러 처리는 보통 함수 에러 처리와 다릅니다.

```js
(() => {throw new Error("Error")})(); console.log("실행 안됨");
new Promise(() => {throw new Error("Error")}); console.log("실행 된다.");
```

첫 줄과 둘째 줄을 실행시켜보면 Promise의 에러와 보통 함수의 에러는 완전 별개로 처리된다는 것을 느낄 수 있습니다.

|                       Promise 내 함수                        |                        Normal한 함수                         |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| Promise 내 함수에서 try, catch를 사용하던지, Promise의 catch 메서드를 쓰던지 |   에러가 발생한 지점을 감싸는 try, catch를 사용해야 한다.    |
| 에러가 터지고 처리를 안해도 Promise 바깥 코드는 실행된다. 이러다가 catch를 만나게 되면 에러는 처리된다. | 어디선가 에러를 처리하지 않으면 뒤에 있는 코드는 실행되지 않고 바로 프로그램이 종료된다. |

Promise 내에서 에러가 터진 경우 catch 메서드를 만나기 전까지 then 메서드에 등록된 함수를 실행할 수 없게 됩다. Promise의 에러는 Promise 바깥 동기 코드 실행에 영향을 주지 않고 Promise chain 실행 여부에 영향을 주게 됩니다. 물론 Promise 밖으로 에러를 내보낼 수 있는 트릭이 있는데 이는 밑에 Promise 실행 원리에서 다루도록 하겠습니다.

🍀 Promise 함수의 에러가 처리되지 않고 콜스택이 끝나면 브라우저에선 window 객체에 unhandledrejection 이벤트를 발생시킵니다.

Promise에서 에러가 발생해도 콜스택이 끝나기 전까지는 catch 메서드가 호출될 수 있기에 바로 에러 메세지를 띄우지 않지만 콜스택이 끝나버리면 비로소 에러 메세지가 출력됩니다. 이 때 브라우저에서는 window 객체에 unhandledrejection이라는 이벤트를 node는 process 객체에 unhandledRejection이라는 이벤트를 발생시킵니다. 이 이벤트에 리스너를 걸어서 처리하지 않으면 이제 프로그램이 죽습니다. 

브라우저 콘솔에서 rejected된 Promise가 생길 경우 바로 에러 메세지를 출력하지만 해당 Promise에 catch 문을 달아주게 되면 기존에 출력된 에러메세지가 사라지는 모습을 볼 수 있습니다.



### Promise 실행 원리

🍀 Promise 등록 함수는 micro TaskQueue에 들어간 이후 처리됩니다.

Promise chain이 어떻게 동작하는지 이해하려면 JS EventLoop 방식이 어떻게 동작하는지 알아야 합니다. 이 부분을 제 블로그에서 소개하면 좋겠지만 움짤로 정말 잘 정리한 블로그가 있어서 해당 블로그의 링크를 남겨둡니다. 핵심만 간단하게 요약하겠습니다.
https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke#syntax

★ 맨 처음 JS 파일을 실행시키면서 생긴 콜스택을 다 해치우고 나면 그 이후 macroTaskQueue와 microTaskQueue에 있는 작업을 실행합니다.
★ 두 개의 큐에 동시에 Task가 존재하면 microTaskQueue에 있는 내용 먼저 실행하고 그 이후 macroTaskQueue에 있는 내용을 실행합니다.
★ TaskQueue에 들어가는 내용은  또는 **비동기 함수의 콜백 함수**입니다.

> 사실 microTaskQueue와 macroTaskQueue말고 AnimationFrames라는 큐가 하나 더 있습니다. 해당 큐는 requestAnimationFrame의 작업이 등록되는 큐로 microTaskQueue보다는 우선 순위가 낮고 macroTaskQueue보다는 우선 순위가 높습니다.

```js
new Promise(() => {
  setTimeout(() => {
    throw new Error("Error!1")
  }, 1000)
}).catch((err) => {
  console.log("여기로 오지 않아요.")
})
```

위의 코드에서 catch 안에 있는 코드는 실행되지 않습니다. 왜냐하면 에러가 발생한 부분은 setTimeout의 콜백 함수이고 해당 함수는 macroTaskQueue에서 콜스택으로 옮겨져 Promise의 제어를 받지 않는 상태이기 때문에 Promise의 catch문에도 오지 않습니다. microTaskQueue와 macroTaskQueue를 제대로 이해한다면 catch가 걸리지 않음을 이해할 수 있습니다. 이를 위해 Promise 등록 함수에 reject 함수를 주입받습니다.

```js
new Promise(() => {throw new Error()})
  .catch((err) => {
  	setTimeout(() => {
			throw err;
    })
	})
```

위의 코드를 실행하면 Promise에서 발생한 에러가 catch로 처리된 이후 setTimeout callback 함수에서 바깥으로 전달됩니다.



### Promise API



#### ✓ Promise Prototype Method

Promise Prototype에는 위에서 설명한 then, catch, finally가 존재합니다. 위에서 자세하게 설명했으니 대부분의 설명은 생략하겠습니다.

**♌︎ then이 없다면**
Promise에 등록된 함수는 거의 보통 함수처럼 실행된다. Promise를 어떻게 사용하든 then을 쓰지 않는다면 Promise의 상태에 맞춰 실행시킬 함수를 등록할 방법이 없다. Promise에 등록한 함수는 자신이 등록된 Promise의 상태를 바꿀 수 있는 수단이 있을 뿐 **그냥 함수처럼 바로 콜스택에 올라간다는 것**을 기억하자.



####  ✓ Promise Static Method

MDN에서 소개하는 static Method는 총 여섯 개가 있다. 하나하나 알아보도록 합시다.

* Promise.resovle
  ```js
  Promise.resolve(1)
  new Promise((resovle) => resolve(1))
  ```

  위의 두 개의 코드는 같은 동작을 한다. Promise.resolve는 이행 상태의 Promise를 간단하게 만들어주는 static 메서드입니다.

* Promise.reject
  ```js
  Promise.reject(new Error("에러"))
  new Promise((resolve, reject) => reject(new Error("에러")))
  ```

  위의 두 개의 코드는 같은 동작을 한다. Promise.resolve의 reject 버전입니다.

* Promise.all
  ```js
  let prom1 = new Promise((resolve) => resolve(1));
  let prom2 = new Promise((resolve) => resolve(1));
  
  Promise.all([prom1, prom2])
  // Promise(fulfill : [1, 1])
  ```

  Promise.all은 Promise들의 배열을 입력받습니다. 리턴 값은 Promise입니다.
  → Promise.all이 모두 성공할 경우, 리턴하는 Promise는 fulfilled 상태가 되며 result로 각 Promise들이 fulfilled되었을 시에 result 값들의 배열이 들어갑니다.
  → Promise.all 중 하나라도 실패한다면, 리턴하는 Promise는 reject 상태가 되며 실패한 Promise의 result를 그대로 가져갑니다.

* Promise.allSettled
  ```js
  let prom1 = new Promise((resolve) => resolve(1));
  let prom2 = new Promise((resolve) => reject(1));
  
  Promise.allSettled([prom1, prom2])
  /* Promise(fulfill : [{status : "fulfilled", value : 1}, 
  		{status: "rejected", reason:"..."}]) */
  ```

  Promise.allSettled은 Promise들의 배열을 입력받는다. 리턴 값은 Promise입니다.
  → Promise.allSettled 안에 Promise들이 모두 settled(reject, resolve)가 된다면 fulfilled 상태가 됩니다. 리턴하는 Promise의 result 값으로 각 배열의 Promise의 결과 상태와 결과 값이 배열로 들어갑니다.
  → 배열 안의 Promise가 fulfilled라면 status는 "fulfilled"로 value는 result가 들어가며 rejected가 된다면 status는 "rejected"로 reason은 에러 메세지가 들어갑니다.

* Promise.race

  Promise 배열을 입력받아 가장 빠르게 settled 된 Promise의 결과를 그대로 가져옵니다. 
  해당 Promise가 rejected되면 Promise.race가 반환하는 Promise도 reject됩니다.

* Promise.any
  Promise 배열을 입력받아 가장 빠르게 fulfilled 된 Promise의 결과를 그대로 가져옵니다. 
  배열 안에 모든 Promise가 rejected될 때 rejected되며 result에는 AggregateError가 들어갑니다.

> 저 같은 경우에 allSettled 이외에는 거의 써본 경험이 없습니다. 보통 Promise들을 배열로 관리할 때에는 해당 Promise들을 다 관리해야 하는 경우가 많아서 그런 듯 싶습니다. resolve와 reject는 가끔 간단한 Promise 만들 때 씁니다.

#### 12/13 추가 내용

* new Promise의 콜백과 then의 콜백은 굉장히 차이가 많다. 이 둘은 에러가 터졌을 때 catch 체인이 에러를 잡아준다는 점 말고는 닮은 구석이 없다. 
  (Ep) new Promise 콜백의 return은 Promise에 영향을 미치지 않음 vs then 콜백의 return은 곧 resolve임)
* new Promise 콜백은 비동기 처리 이후 then과 연결시켜주기 위한 resolve를 제공한다. then은 단지 자신이 연결한 Promise의 후처리를 담당할 뿐이다. then에서도 비동기 로직을 만난다면 그 안에서 new Promise를 이용해야 한다. (다행히 Promise를 리턴하면 then이 원래 리턴해야 했던 Promise( fulfilled 된 거의 동기 로직 )가 대체된다. )
* 생각해보면 당연하다. new Promise의 매개 변수는 비동기를 가정해 다른 콜스택에서도 Promise를 조작할 수 있도록 resolve와 reject를 준 반면 then은 단순히 결과값만 주어 내부에서 새로운 new Promise 구문을 쓰지 않는 한 비동기 로직을 처리할 수 없게 된다. 




#### 📄 출처

https://stackoverflow.com/questions/30715367/why-can-i-not-throw-inside-a-promise-catch-handler
https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/
https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke#syntax
https://ko.javascript.info/async
