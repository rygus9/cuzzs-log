---
title: Tailwind 소개하기
uploadDate: 2022년 10월 31일
description: Tailwind를 사용하면서 느낀 점을 정리해보았습니다.
---

저는 꽤 예전부터( 물론 프론트엔드 전체 공부 경력이 1년이라 ㅎㅎ ) Tailwindcss를 써왔고 현재도 다른 CSS tool를 배워보려고 하지 않는 이상 Taiwlindcss를 계속 사용합니다. 

https://www.youtube.com/watch?v=--D4WMPEIZI

위는 Tailwindcss를 소개하는 유튜브입니다. 생각보다 사람들이 부정적인 의견을 내비치는 경우가 많아서 좀 놀랐습니다. 잘쓰면 정말 좋은 프레임워크라 생각되어 지기 때문에 Tailwindcss를 다시 생각해볼 겸 해당 포스트를 쓰기로 하였습니다.



### Tailwindcss 소개

Tailwindcss는 Tailwindcss 만의 atomic Design System을 제공합니다. 보통 다른 CSS Framework와는 달리 클래스명 하나에 CSS 속성을 거의 일대일로 대응시켜 두었기 때문에 커스텀이 자유롭다는 특징이 있습니다. 물론 class명 하나가 할 수 있는 일이 줄어든다는 단점도 명백히 존재합니다.

```react
<div class="relative p-5 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 lg:row-start-1">
  <h1 class="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-2xl dark:sm:text-white">Beach House in Collingwood</h1>
  <p class="text-sm leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400">Entire house</p>
</div>
```

공식문서에 있는 예제 코드의 일부분을 가져왔습니다. Tailwindcss는 HTML className에 Tailwindcss가 제공하는 className을 직접 넣어서 스타일을 입히는 방식으로 작동합니다. 



#### ✓ 이걸 왜 쓰는 거나?

```html
<style>
</style>
<div class="card">
  <h1 class="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-2xl dark:sm:text-white">Beach House in Collingwood</h1>
  <p class="text-sm leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400">Entire house</p>
</div>
```

