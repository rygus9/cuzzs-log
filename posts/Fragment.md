---
title: React.Fragment 배우기
tags: ["react"]
uploadDate: 2022년 9월 04일
---

https://www.youtube.com/watch?v=XuF6Qem0cTE&t=328s

```react
<React.Fragment></React.Fragment>
<></>
```

아무것도 없는 그냥 묶어주기 위한 용도의 태그다.

#### 왜 있니?

```react
export default function App() {
  return (
    <h1>안녕하세요 </h1>
    <p>반가워요</p>
  )		// ==> 에러가 납니다.
}
```

```react
export default function App() {
  return (
    <div>
    	<h1>안녕하세요 </h1>
    	<p>반가워요</p>
    </div>
  )		// ==> 에러는 해결되지만 쓸데없는 태그가 들어간다.
}
```

```react
export default function App() {
  return (
    <>
    	<h1>안녕하세요 </h1>
    	<p>반가워요</p>
    </>
  )		// ==> 에러도 해결되고 쓸데없는 태그도 사라진다.
}
```

#### 언제 유용한가요?

1. Styling 할 때 감싸주는 태그 때문에 레이아웃이 깨지는 경우가 많다. 그럴 때 쓰면 좋다.

2. table과 같이 안에 태그가 정해진 경우 태그가 없는 Fragment가 유용하다.

3. map 안에 key를 넣을때 쓸 수 있구나! 다만 이 경우는 직접적으로 명시를 해주어야 합니다.
   ```react
   export default function App(){
     const data = [1, 2, 3]
     return <>
     	{data.map(elem =>
                 <React.Fragment key={elem}>
                 	<h1>안녕</h1>
                   <p>하세요</p>
                 </React.Fragment>
       )}
     </>
   }
   ```
