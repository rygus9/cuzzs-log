---
title: React 둘러보기
tags: ["react"]
uploadDate: 2022년 12월 14일
description: React의 전반적인 동작 과정을 조금 깊게 둘러봅니다.
---

다음 포스트는 전역 상태 관리 라이브러리의 사용법이 될 줄 알았으나 tearing 문제를 공부하다 보니 React의 동작 원리까지 공부하게 되었습니다. 해당 포스트는 정말 간단하게 React 동작 과정을 정리하는 것을 목표로 합니다. 이왕 하는 김에 React를 간략하게 정리하고 시작하려고 합니다.

### React 개요

##### React는 Facebook이 2013년도 출시한 뷰 라이브러리입니다. 

React는 개발자가 브라우저 Api를 사용하여 뷰를 제어하는 대신 State를 조작하여 뷰를 제어하게 합니다. 개발자는 뷰를 구성한 이후(by JSX) 이를 직접 제어하기 위한 로직을 작성할 필요가 없어졌습니다.

```jsx
function Component(){
  const [data, setDate] = useState(/*초깃값*/);
  /* Model(data)과 관련된 로직 */
  setData(/*결과물*/);
  
  return <div>
    	{/*데이터가 반영된 뷰*/}
    </div>
}
```

위의 코드처럼 React가 제공하는 API를 통해 뷰를 업데이트할 수 있게 되었고 개발자는 더는 뷰를 제어하기 위한 로직(DOM에 접근 및 변경)을 작성할 필요가 없어졌습니다.


##### React는 컴포넌트 단위로 동작합니다.

프론트엔드 개발을 크게 두 단위로 나눈다면 이렇게 나누어볼 수 있습니다.

1. Model과 관련된 로직 ( 통신, 데이터 조작, 모델 제어 )
2. View와 관련된 로직 ( DOM 생성, DOM 제어, 제어된 모델 반영 )

개발한다면 Model과 관련된 것인지 View와 관련된 것인지에 따라서 로직을 구분할 수도 있겠지만, React는 위의 구분과 좀 다르게 프론트엔드 개발을 Model과 View가 같이 존재하는 컴포넌트 기반으로 구분하였습니다. React는 컴포넌트 내의 Model를 의미하는 State의 변경을 감지하며 컴포넌트 단위로 렌더링을 진행합니다.

> 정확히 말하면 Component의 State와 Model은 완벽히 일치하는 개념은 아닙니다. React는 단지 해당 컴포넌트를 리렌더링할 기준이 되는 데이터와 이를 조작하는 함수를 제공할 뿐( **useState**, **useReducer** ) 해당 데이터가 꼭 Model이어야 할 필요는 없습니다.
>
> 그래서 State(React가 View를 렌더링하는 기준)과 Model(프론트엔드를 구동하기 위한 필수 데이터)를 구분하고 모델이 변경될 때마다 state에 의미 없는 업데이트를 진행하는 방식을 사용하여 개발하는 방식도 존재합니다. ( **selector 기반의 전역 상태 관리 라이브러리**가 이런 로직을 사용합니다. ) 이 글에서는 State와 Model를 구분하지 않습니다.

#### Mount, Update, UnMount

React 컴포넌트의 생명주기는 크게 3가지로 나타낼 수 있습니다. 영어 단어라서 있어 보이지만 아무것도 없는 화면에 컴포넌트를 만들고 변경하고 없애고가 전부입니다. 생명주기마다 개발자는 React가 제공하는 hook을 이용해 자신의 컴포넌트에 조작을 가할 수 있습니다. 함수형 컴포넌트 기준으로 생명주기에 관여하는 훅은  useState와 useEffect입니다.

```jsx
function Example(){
  const [a, setA] = useState() // 초기 생성 시 동작, 그 이후로는 참조만 넘김
  useEffect(() => {
    //초기 생성 시부터 의존성 배열이 변할 때마다 동작
    return () => {
      // unmount 되기 전에 동작
    }
  }, []) 
}
```

**클래스형 컴포넌트 vs 함수형 컴포넌트**

> 클래스형 컴포넌트는 Mount 될 때 객체가 생성되고 해당 객체는 UnMount 될 때까지 유지됩니다. 반면 함수형 컴포넌트는 Mount 된 이후에도 Update가 발생할 때마다 다시 함수를 실행합니다. <= 생성 비용이라는 단점이 있습니다. (useState)
>
> 클래스형 컴포넌트는 생명주기 메서드를 통해 특정 시기에 실행할 로직을 작성합니다. 함수형 컴포넌트는 훅을 이용해 작성하고 매 생명주기마다 전체 함수가 실행되며 로직이 실행됩니다. <= 클래스형 컴포넌트가 좀 더 다룰 수 있는 부분이 많습니다.
>
> 함수형과 클래스형은 비슷해 보이지만 꽤 다릅니다. 현재는 함수형 컴포넌트가 대부분 쓰이지만 ErrorBoundary 같은 클래스형 컴포넌트에서만 동작하는 기능도 있기에 아예 무시하기는 힘듭니다. 

**해당 글은 함수형 컴포넌트 기준으로 작성할 것임을 밝힙니다**



### React 둘러보기

#### 프로젝트 살펴보기

* 리액트는 Yarn 기반의 모노레포로 개발되고 있습니다. package 폴더 내에는 우리가 API를 제공받는 React 패키지를 시작으로 React를 동작시키는 다양한 패키지들이 존재합니다. 

> /react : React API를 제공. 
  > /scheduler ( **Scheduler** ) : React의 렌더링 과정을 스케줄링함.
  > /react-reconciler ( **Reconciler** ): 렌더 트리를 비교하여 변경 지점을 찿아내는 작업을 진행함.
  > /react-dom, /react-native, etc... ( **Renderer** ) : Reconciler가 찾아낸 변경점을 반영함.
  > /Share : 패키지들이 상태를 주입 받을 때 해당 패키지를 이용함. (ep) React가 Reconciler에게 훅 주입 받을 때)
  > /react-server, /react-client ( Experimental ) : 실험용 패키지들

* 내부적으로는 flow라는 타이핑 툴을 이용해 개발하고 있으며  Babel과 Rollup을 사용해서 배포합니다.

* /fixtures 에는 컨트리뷰터를 위한 다양한 테스트용 예제들이 있다고 합니다.
  

#### React의 큰 동작 과정

ReactDOM의 createRoot 또는  render 함수를 호출하면 특정 HTML Element는 root가 됩니다. 그 후 해당 Element 아래로부터 React의 영향 아래에 렌더링이 작동됩니다.

* 보통 React를 전제로 시작하는 프로젝트는 createRoot에 등록된 Element 밑에 모든 화면을 구현하기 때문에 이 root가 여러 개가 존재할 수 있다는 것을 잘 모를 수 있습니다. 이미 어느 정도 만들어진 프로젝트의 여러 일부분을 createRoot로 감싸서 React로 화면을 구현하는 것이 가능합니다.

1. 리액트의 모든 작업은 **Scheduler**에 의해서 제어됩니다. Scheduler의 제어에 따라 어떤 작업을 어떻게 실행할지 결정합니다.
2. 리액트에서 화면에 반영하기 전에 기존 화면과 다른 점을 계산하는 과정은 **Reconciler**가 담당합니다. Reconciler의 동작은 **Scheduler**에 의해 제어됩니다. 
3. **Reconciler**로 부터 계산된 결과는 **Renderer**에게 전달됩니다. Renderer는 실제 사용자 환경에 맞추어서 화면을 렌더링합니다.

Reconciler와 scheduler는 서로 협력하는 관계입니다. Reconciler는 Scheduler에게 작업할 권한을 요청하면 Scheduler는 이에 맞추어서 Reconciler의 작업 순서를 제어합니다.



### React Concurrency

> React v18부터 Concurrency mode가 지원됩니다. 이 기능 때문에 React의 많은 부분이 바뀐 만큼 언급을 안 하고 넘어갈 수 없습니다. 사실 Concurrency 를 생각하기 전까지는 Scheduler 조차 없었습니다.

#### React v16 초창기에는...

이때 당시만 해도 Scheduler는 존재하지 않았으며 현재와 같이 여러 package가 분리된 구조도 아니었습니다. 이때에도 reconciler는 존재했었지만, 지금과는 매우 다른 아키텍처를 지녔습니다. 기존 구조에 무슨 문제가 있고 이를 어떻게 해결했는지 알아보면서 React 구조가 어떤 식으로 변화했는지 알아보고자 합니다.

**JS는 싱글 스레드 기반이다.**

Javascript는 싱글 스레드 위에서 동작합니다. 물론 현재 브라우저 환경에서는 webworker라는 API를 통해 worker thread를 지원하고 있지만 여러 가지 이유로 React는 메인 스레드 위에서 동작합니다. ( https://github.com/facebook/react/issues/3092, 아직 제가 초보 개발자임을 느낍니다... ) 그래서 React가 변경 사항을 계산하고 이를 화면에 적용하는 로직도 싱글 스레드 위에서 수행됩니다.

* 만약 React가 변경 사항을 계산하는데 오랜 시간이 걸린다면?

React의 작업이 끝날 때까지 다른 동작들이 모두 Blocking 됩니다. React의 동작은 브라우저 화면을 그리는 Main Thread 위에서 동작하기 때문에 React의 작업이 끝날 때까지 화면도 멈춰있게 됩니다. 물론 React의 Diff Algorithm은 매우 빠르게 동작하기 때문에 긴 시간 동안 Blocking 하는 경우가 많이 없지만 (물론 상대적인 겁니다.) 복잡한 프로젝트일수록 위와 같은 이유로 사용성이 저해될 수 있습니다.

React 팀은 Blocking 되는 문제를 해결하기 위해 React의 작업이 Concurrency 하게 동작하도록 React 구조를 바꾸는 작업에 착수합니다. Renderer는 중간에 멈출 수 없어서 Renderer 이전 작업을 Concurrency하게 바꾸는 것을 목표로 하게 되었습니다.


#### Stack Reconciler

기존 React는 변경 사항을 찾기 위해서 Component Tree를 DFS 방식으로 전부 순회하는 방식을 사용했습니다. 해당 과정은 Main Thread의 콜스택에서 이루어졌기 때문에 한 번 Component Tree를 탐색하기 시작하면 중간에 멈추는 방법이 없었습니다.

> **Stack Reconciler** (동기) => **Renderer** (동기)

React 팀은 여러 가지 대안을 탐색한 끝에 ( webworker 사용도 고려되었습니다. ) Stack Reconciler의 작업을 Scheduler와 Fiber 기반 Reconciler로 대체해서 concurrency 하게 만들기로 하였습니다. 물론 이 논의는 2, 3년 전부터 진행되었지만, 생각보다 해야 할 작업이 많았던 탓에 비교적 최근에 React v18 버전으로 등장하게 되었습니다.

> **Scheduler => Fiber Reconciler**(Concurrency) => Renderer (동기)

Concurrency를 보장하기 위해서는 다음과 같은 작업이 선행되어야 합니다.

1. Scheduler는 작업의 우선순위를 판단해서 해야 할 일들을 선택해야 합니다. Browser 상에서 Main thread에 급하게 처리해야 할 일이 있으면 작업을 미뤄두고 그런 작업이 없다면 우선순위에 맞추어서 작업을 스케줄링해야 합니다.
2. Scheduler가 작업을 조정한다고 하더라도 작업 단위 자체가 크다면 Blocking이 될 수 있습니다. 그래서 변경 사항을 찾아가는 작업 자체를 쪼갤 필요가 있습니다. 중간에 변경 점을 찾는 작업을 중단하더라도 나중에 다시 실행시킬 수 있어야 합니다.


#### Browser의 렌더링

먼저 스케줄러를 이야기하기에 앞서 브라우저가 동작하는 과정을 살펴보고 왜 Scheduler를 만들게 되었는지 알아보겠습니다.

* 브라우저의 렌더링 프로세스

  1. 브라우저는 Frame마다 화면을 주기적으로 갱신합니다. 컴퓨터마다 Frame 주기는 다르지만 60FPS 기준 한 프레임당 16ms가 할당되어 있습니다.
  2. 브라우저는 프레임이 시작되면 Layout, Paint 등 프레임을 화면에 그리기 위한 동작을 수행합니다. 이런 동작들을 수행하고 나면 한 프레임 내에서 개발자에게 할당한 시간은 더 줄어듭니다.
  3. 위 과정은 모두 Main Thread에서 이루어지며 만약 개발자가 호출한 작업으로 인해 Blocking 되면 해당 프레임 작업은 드랍됩니다. 그래서 개발자의 작업이 오래 걸리면 오래 걸릴수록 화면이 뚝뚝 끊겨 보입니다.

*  관련 API

  > 브라우저의 이벤트 루프 모델은 microTaskQueue, macroTaskQueue와 더불어 AnimationFrame이 존재합니다.
  > 꼭 브라우저의 이벤트 루프 모델을 공부해보시길 바랍니다. 

  **requestAnimationFrame**

  Frame 내에서 브라우저가 프레임 갱신 작업이 실행하기 전에 콜백을 등록할 수 있습니다. 보통 브라우저 실행 환경에 따라 프레임 주기가 달라지기 때문에 시간을 하드코딩 하는 방법을 사용하면 프레임과 싱크가 안 맞을 수 있지만 위 API를 사용하면 프레임 커밋이 시작하기 전에 작업이 실행됨을 보장할 수 있습니다.

  다만 브라우저의 프레임 갱신 작업 전에 실행되고 실제 프레임 갱신 작업이 얼마나 걸리는지 모르기 때문에 한 프레임에 할당된 시간을 예측할 수 없다는 단점이 있습니다.

  **requestIdleCallback**

  Frame이 끝난 이후에 남는 시간이 있으면 함수를 실행할 수 있도록 해주는 API입니다. requestAnimationFrame과 다르게 프레임 커밋 이후 남는 시간에만 작업을 진행하기 때문에 프레임이 깨질 걱정을 줄일 수 있습니다. (물론 단일 작업 자체가 오래 걸린다면 말짱 도루묵입니다.) 보통은 한 작업 단위를 쪼개서 큐에 넣은 이후 requestIdleCallback을 이용해 여유가 있을 때만 실행시킵니다.

위의 requestIdleCallback을 사용하면 될 것 같았지만 몇 가지 문제가 있었습니다. 먼저 requestIdleCallback은 브라우저 간 지원 정도가 상이했고 콜백의 호출 주기가 불안정했습니다. 그래서 React 팀은 직접 Scheduler를 만들기에 이릅니다.


#### Scheduler

리액트 스케줄러는 메인 스레드가 필요할 경우 작업을 양도해주고 여러 작업이 있으면 이를 우선순위에 기반해 실행시켜주는 역할을 가집니다. 이를 위해 작업들은 min-heap으로 구성된 Timer Queue와 Task Queue를 거쳐 가며 여기서 우선순위에 따라 작업이 호출됩니다.

스케줄러의 구현은 다음과 같은 의사 코드 구조로 이루어져 있습니다. 

```js
const performWorkUntilDeadline = () => {
  startTime = performance.now();
  currentTask = flushWork(currentTask) // 순회가 결정난다.
  if(currentTask) {
    schedulePerformWorkUntilDeadline(); // 다시 시작.
  }
}

const channel = new MassageChannel();
const port = channel.port2
channel.port1.onmessage = performWorkUntilDeadline
schedulePerformWorkUntilDeadline = () => {
  port.postMessage(null);
}

const queue = []
const frameInterval = 5
let currentTask = null
let startTime = -1

function shouldYield(){
  const timeElapsed = performance.now() - startTime
  return timeElapsed > frameInterval
}

function flushWork(currentTask) {
  let count = 0
  while(currentTask && !shouldYield()){
    count ++;
  }
  return queue.shift();
}
```

schedulePerformWorkUntilDeadline 에서 메시지 호출 => 리스너로 등록된 performWorkUntilDeadline 실행 => 그 안에서 workflush 실행함, 여기서 작업을 계속할지 아니면 끝내고 넘어갈지 결정함. 해당 함수가 호출될 때 reconciler의 로직 등을 실행. ... 무한 반복

실제 작업을 수행하는 workflush까지 Timer Queue와 Task Queue를 이용해 우선순위를 조절하고 현재 진행되는 reconciler 작업을 관리하며 main thread에게 시간을 할당하는 등 여러 가지 동작을 수행합니다.


#### Fiber Reconciler

기존 Stack 기반 Reconciler의 경우 JS의 콜스택 위에 동작하며 모든 트리의 변경 사항을 알아내기까지 멈출 수 없었습니다. 스케줄러가 아무리 스케줄링을 잘해도 작업 단위가 크면 무의미하므로 기존 Stack 기반 Reconciler를 변경할 필요가 있었습니다. 그래서 Fiber achitecture를 도입했습니다.

Fiber는 가상 Stack Frame + 컴포넌트 정보입니다. 기존의 Stack Reconciler와 동작은 같지만 이를 JS 콜스택에서 실행 순서를 결정하는 대신 Fiber를 연결리스트 형식으로 스택의 실행 순서와 동일하게 구성하여 실행시킵니다. 리스트의 노드 단위로 작업을 실행하고 이를 메모리에서 관리하기 때문에 언제든지 실행과 중단이 가능합니다.

**Double Buffering Model**
FiberRootNode는 현재 화면을 구성하는 current 트리와 작업을 진행 중인 workInProcess 트리를 가집니다. workInProcess 트리는 작업이 끝난 이후에 current 트리와 바꾸어 화면에 갱신됩니다. 그 이후에 기존 current 트리는 workInProcess 트리로 변환됩니다.

변경에 걸리는 시간과 화면 노출에 걸리는 시간이 다르기에 변경과 출력을 격리한 모델입니다. 이런 구조를 사용하여 변경 작업 중 취소되더라도 current 트리가 화면을 그리고 있기 때문에 크게 문제가 되지 않습니다.

**우선순위 모델**
React는 Lane 모델로 작업의 우선순위를 결정합니다.
Lane 모델은 작업을 prioritization와 batching으로 우선순위를 결정합니다.

* Task prioritization ( Lane Type ) : A가 B보다 급한가.
  1. 기한이 지난 작업 또는 동기화 작업
  2. 사용자 상호 작용에 의한 업데이트
  3. 일반 우선순위 (네트워크 호출)
  4. Suspense는 가장 낮은 순위
* Task Batching ( Lanes Type ) : A가 이 그룹 테스크에 속하는가
  1. InputDiscreteLanes : 사용자 상호작용
  2. DefaultLanes : 데이터 요청에 의한 업데이트
  3. TransitionLanes : Suspense, useTransition

Lane 은 두 개념을 분리하였고 CPU => I/O => CPU에서 CPU 병목을 효과적으로 처리한다고 합니다.
이를 통해서 구현한 기능은 다음과 같다고 합니다.

> useTransition에서 중간 상태 건너뛰기 구현
> useTransition을 통해 Parallel UI transitions
> useState hook를 통해 예약된 상태 업데이트를 빠르게 계산.



### 결론

전역 상태 관리 라이브러리에서 tearing 문제를 파악하기 위해 Concurrency 모드를 알아보다가 이렇게 되버렸네요. Reconciler를 알게 되고 자연스럽게 Scheduler를 공부하게 되다가 React 자체를 이해해야 겠다고 생각해서 React 라이브러리도 clone 받고 hook 구현체부터 찾아다니다가 코드 분석 전에 React 이론을 공부해야 할 필요가 있어서 공부하다가 정리 목적으로 해당 블로그를 작성하게 되었습니다.

공부를 하면 할수록 공부해야할 부분들이 너무 많이 나와서 일단 이번 포스트는 여기서 마칠려고 합니다. 아마 다음 주제는 밑에 있는 주제 중 하나이지 않을까 싶습니다.

1. React hook 구현체 따라가기 ( React 톺아보기 글을 보고 이를 React v18 코드에 맞춰 변경해볼 생각입니다. )
2. Reconciler 동작 상세 정의 ( 이번 포스트는 정말 대충 설명했기 때문에 좀더 상세하게 서술해볼 생각입니다. )
3. React v18 공부하기 ( Suspense 관련된 동작, 스케줄링 관련된 API를 소개할까 합니다. )
4. React 프로젝트를 분석하다보니 Flow라는 툴을 알게 되었습니다. 지식이 꼬리에 꼬리를 뭅니다.

물론 저의 작업 큐에는 CJS, ESM 소개하기부터 전역 상태 관리 라이브러리 소개하기 등 여러 가지 작업이 밀려있는데 이걸 언제 다 할지 모르겠습니다. 스케줄러가 아무리 좋아도 부하가 크면 답이 없습니다.( 스케줄러 성능도 영 좋지 않습니다. ) 공부를 하다보면 공부할 게 산더미라서 정말 슬픕니다. 그래도 공부를 하면 할수록 지식 습득이 빨라지는 느낌이 들어서 그나마 다행입니다. 



#### 참고자료 출처

> https://www.bsidesoft.com/8267 : React로 MVVM 패턴을 작성하는 블로그, 리액트에 대한 전반적인 동작을 서술했습니다.
> https://bumkeyy.gitbook.io/bumkeyy-code/frontend/a-deep-dive-into-react-fiber-internals : Fiber 동작에 대한 포스트의 번역문입니다.
> https://velog.io/@superlipbalm/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior : 렌더링 관련해서 다룬 포스트
>
> https://tv.naver.com/v/23652451 : 이런 자료가 한국어로 있어도 되나 싶을 정도입니다.



