---
title: Tailwindcss 조금 자세히 살펴보기
tags: ["project"]
uploadDate: 2022년 11월 08일
description: Tailwindcss 조금만 자세히 알아보도록 하자.
---

제가 Tailwindcss를 접한 지도 벌써 7개월이라는 시간이 흘렀습니다. 어쩌다 보니 프론트엔드 개발은 대부분 혼자서 하는 경우가 많았고 기술 스택 선택이 매우 자연스러웠기 때문에 대부분의 프로젝트에 Tailwindcss을 적용해보았습니다. 저에게 있어서 Tailwindcss를 적용했을 때 오는 장점 중 하나인 생산성 향상이 Tailwindcss의 단점을 상쇄시키고도 남았기 때문에 현재까지도 TailwindCSS를 주로 쓰고 있습니다.

이번 블로그는 TailwindCSS가 처음이신 분들을 위한 글이 아닙니다. 제가 TailwindCSS를 사용하면서 배운 테크닉들을 정리하는 포스트이기에 초심자가 읽기에는 거북할 수 있습니다. 초심자분들은 TailwindCSS 장단점까지만 보시면서 감만 잡으시길 바랍니다.

### TailwindCSS 소개

Tailwindcss는 CSS framework 중 하나로 보통 CSS framework는 className에 수많은 CSS 코드가 들어간 완성된 CSS 코드들을 제공하는 반면 Tailwindcss는 className에 최소한의 CSS 코드만 연결해둔 CSS framework입니다. 덕분에 다른 CSS framework와 비교했을 때 className에 들어가는 내용은 엄청나게 많지만 그만큼 Tailwindcss가 제공하는 className 만으로 대부분의 디자인이 구현 가능합니다.

- className 당 하는 일은 적지만 덕분에 자유도를 얻은 CSS framework! **Atomic CSS** 라고 불리기도 한다.

```tsx
<input
  {...rest}
  {...register}
  autoComplete="off"
  className={cls(
    "w-full rounded-md border border-gray-300 bg-white px-2.5 py-2 shadow-sm",
    "text-base text-gray-600",
    "placeholder:text placeholder:text-gray-400",
    "focus:border-purple-500 focus:ring-0"
  )}
></input>
```

위에 코드처럼 className에 TailwindCSS가 제공하는 ClassName을 넣어주면 됩니다. placeholder나 focus등 Pseudo Class나 Pseudo Element 그리고 반응형 media Query는 prefix를 달아주는 형태로 작성하면 됩니다.

#### 🧐 Inline Style 같은데요?

<del>헛소리 그만..</del> TailwindCSS는 CSS 관련 코드가 HTML 구조 내에 녹아있다는 점 이외에는 Inline Style과 전혀 다릅니다. 게다가 TailwindCSS는 개발자 취향에 따라 className을 따로 관리하는 것도 가능합니다. 밑에 코드를 보시면 Inline Style과는 확연히 다르다고 느낄 겁니다.

```jsx
const InputStyle = cls(
  "w-full rounded-md border border-gray-300 bg-white px-2.5 py-2 shadow-sm ",
  "text-base text-gray-600",
  "placeholder:text placeholder:text-gray-400",
  "focus:border-purple-500 focus:ring-0"
);

const TextInput = ({ register, ...rest }: TextInputProps) => {
  return <input {...rest} {...register} autoComplete="off" className={InputStyle}></input>;
};
```

- 위의 코드처럼 스타일을 따로 빼서 쓰는 게 가능합니다. (제가 옛날에는 저렇게 관리했던 적이 있었습니다.)
- Inline style과는 다르게 Pseudo-Class, Pseudo-Element, Media-Query가 다 가능합니다.
- 무엇보다 Tailwindcss는 CSS 코드를 직접 쓰지 않습니다.

### TailwindCSS의 장, 단점

> 이야기하기에 앞서 Tailwindcss는 어떻게 쓰냐에 따라서 코드의 모양이 확 바뀔 수 있습니다. 저는 TailwindCSS 공식 문서 스타일 기준으로 장단점을 설명할 계획입니다. (JSX className에 TailwindCSS 코드를 넣는 방식)

#### 👍🏻 장점

1. 호불호가 갈릴 수 있겠지만 저는 개인적으로 CSS 코드를 정말 쓰기 편하게 추상화시켰다고 생각합니다. 꼭 필요한 box-model관련 코드는 길이만 줄이는 방식으로 사용하고 디폴트가 있으면 좋겠다 싶은 속성들(box-shadow)이나 CSS 선택자를 잘 활용한 유틸리티 속성들(space-x-2) 덕분에 개발이 매우 편합니다.
2. CSS 관련 코드들이 압축되어 있다 보니 익숙해지면 한눈에 특정 element에 적용된 디자인 속성을 볼 수 있습니다. 특히 반응형 관련 코드 작성 시 이미 있던 속성을 덮어씌우는 경우가 많은데 라인을 끊어서 정리하면 정말 보기도 편하고 적용하기도 편합니다.
3. HTML 구조 안에 CSS를 넣음으로써 naming과 관련된 이슈를 해결할 수 있습니다. 또한 design code의 책임을 하나의 element에 강제해서 cascading과 관련된 이슈를 회피할 수 있습니다.
4. 종합적으로 생산성이 대폭 향상됩니다. TailwindCSS가 잘 지원되는 분야에서 노는 경우 (반응형, 적당한 애니메이션, dynamic CSS가 없는 경우) 생산성은 2배 이상이라고 장담합니다.
5. 공식 문서가 굉장히 친절합니다. 모르는 부분은 TailwindCSS 공식문서 내에서 대부분 해결이 가능합니다.

#### 👎🏻 단점

1. 확실히 러닝 커브가 있는 라이브러리입니다.

   TailwindCSS가 제공하는 많은 utility class나 prefixer, tailwind.config.js, plugin 기능 등 TailwindCSS가 많은 기능을 제공하는 만큼 러닝 커브도 생각보다 높습니다.

2. 추상화와 압축에는 많은 단점도 따라옵니다.

   저로써는 가독성이 크게 떨어지지 않는다고 생각하지만 확실히 넓게 펼쳐져 있는 CSS 코드보다 읽기 힘들고 코드가 빡빡한 느낌이 듭니다. => 이건 코드를 어떻게 관리하느냐 + 사람 바이 사람이 크게 작동한다고 생각합니다.

3. HTML 구조 안에 CSS를 넣는 구조는 일정 부분 가독성을 해칩니다.

   확실히 TailwindCSS 코드가 HTML 구조에 파고들면서 HTML 구조 자체에 대한 가독성이 해칩니다. => 이건 저도 동의하는 부분입니다. HTML 구조만 보려고 해도 Design 코드가 이를 방해합니다.

4. 애니메이션, dynamic CSS 처리 등 TailwindCSS가 약한 부분이 필연적으로 존재합니다. 각자 대처법이 있기는 한데 좀 많이 귀찮습니다.

#### 🚫 주의할 점

1. **절대 CSS를 모르는 상태에서 TailwindCSS를 쓰지 맙시다.**

   이건 몇 번을 강조해도 지나치지 않습니다. CSS가 design을 추상화시켰다면 TailwindCSS는 그런 CSS를 한 번 더 추상화시킨 툴입니다. CSS는 아직 현역이며 요즘처럼 CSS 관련 tools과 framework들이 싸우는 시대는 특히나 기본이 중요하기 때문에 무조건 CSS를 먼저 공부하시길 바랍니다. JS를 배우기 전에 React를 배우는 꼴입니다.

2. prefixer와 반응형은 꼭 체험해보시길 바랍니다.

   정말 prefixer를 이용한 반응형 코딩은 TailwindCSS의 존재 이유라고 생각합니다. TailwindCSS를 체험해보실 계획이시라면 꼭 반응형 웹을 제작해보시길 바랍니다. 주의할 점은 디폴트가 모바일 디자인입니다.

### TailwindCSS 똑똑하게 쓰기

#### ⚡️ Dynamic CSS

TailwindCSS는 빌드 시에 문자열 내에 있는 className만 읽어와서 해당 className에 해당하는 CSS 코드만 생성해둡니다.. JS 코드로 생성한 className은 인식을 못 합니다. 또한 빌드 이후에 바뀌는 className 또한 적용이 불가합니다.

```js
const mdPrefix="md:"
className={`${mdPrefix}py-10`}
// 위와 같은 짓은 하지 말자... 못 읽습니다.
```

prefixer 정도야 그냥 타자를 열심히 치면 해결할 수 있는 부분이지만 가끔 스크롤 값 또는 연속적으로 변화하는 값에 따라 디자인을 다르게 적용해야 하는 경우가 생깁니다. => 이럴 때에는 1. CSS Style을 적용해서 직접 CSS 코드 주입, 2. CSS Variable을 이용해서 값만 변화시키기(tailwindCSS의 arbitrary 값을 이용합니다.)가 있습니다. 제 블로그는 근본이 없어서 두 가지 경우를 다 사용했습니다.

추천을 하자면 CSS variable을 이용한 방식을 추천합니다. CSS 코드 변화를 최소화하는 방향이기도 하고 className에 해당 속성이 쓰였음을 알려줄 수 있기 때문에 className만 보다가 style안에 정의된 CSS 코드를 놓치는 일이 없어집니다.

```tsx
// Header 일부 코드 발췌
const { current } = headerRef;
current.style.marginTop = `${headerPos}px`;

// Category 일부 코드 발췌
const { current } = disclosureRef;
current.style.setProperty("--content-height", nowScrollHeight.toString() + "px");

return <section className={cls(panelOpen ? "max-h-[var(--content-height)]" : "max-h-0")} ref={disclosureRef}></section>;
```

#### ⚡️ TailwindCSS Intellisense

VSCode에 있는 TailwindCSS 관련 extension 중 하나로 마우스 hover 시 원래 CSS 코드를 보여주는 기능과 자동 완성 기능을 지원합니다. 따로 설정하지 않으면 className 안에 있는 문자열에만 해당 기능이 적용됩니다.

```json
//settings.json
{
  //tailwind Intellisence
  "tailwindCSS.experimental.classRegex": [["cls\\(([^)]*)\\)", "'([^']*)'"]]
}
```

VSCode에 Intellisense를 적용하고 싶은 코드 부분을 저런 식으로 등록해주면 className 밖에 있는 문자열에도 Intellisense 기능이 동작합니다. 혹여나 className 바깥 부분에 className을 정의하고 싶으신 분은 classRegex에 Regex를 등록해주시면 되겠습니다.

물론 **className 안쪽에 모든 코드를 몰아넣는 것을 추천합니다.**

```js
const TestStyle = cls("py-10 px-5"); //저는 cls 안에 문자열들을 적용해보았습니다.
```

#### ⚡️ Tailwind Code Refactoring

단순히 ClassName에 박아넣어 두시면 나중에 후회합니다. 자기만의 규칙으로 className 내에서 코드들을 예쁘게 관리해보도록 합시다.

##### 1. Util 함수 활용하기 (classnames 모듈로 대체 가능)

```js
export default function cls(...args: (string | boolean)[]) {
  return args.filter((arg) => arg).join(" ");
}
```

저 같은 경우는 classnames가 은근 기능이 많다고 생각해서 그냥 간단하게 문자열을 붙여주는 util 함수를 정의해서 쓰고 있습니다. 해당 함수를 이용해 조건에 따라 className을 빼거나 넣을 수 있습니다.

```js
<input className={cls(cond1 && "text-xl", cond2 & "text-red-500" : "text-red-300" )}
```

해당 함수를 이용해서 className의 줄을 구분해 가독성을 향상시킬 수 있습니다. 저 같은 경우에는 비슷한 속성끼리 혹은 같은 prefixer 끼리 라인 별로 구분하는 방식을 사용하고 있습니다. 아직 명확한 룰을 정의하지 못했지만 이런 식으로 가독성을 개선할 수 있습니다.

```js
className={cls(
  'w-full rounded-md border border-gray-300 bg-white px-2.5 py-2 shadow-sm ',
  'text-base text-gray-600',
  'placeholder:text placeholder:text-gray-400',
  'focus:border-purple-500 focus:ring-0'
)}
```

##### 2. prettier-plugin-tailwindcss 사용하기

정말 CSS 관련 코드들도 prettier가 필요하다고 생각하던 찰나에 이런 라이브러리가 나와서 감격입니다. 사람마다 Style Code를 자기 멋대로 짜기 때문에 이를 보는 게 힘들었는데 해당 라이브러리는 그런 Code들의 순서를 강제해줍니다. CSS 코드 작성에도 컨벤션이 있어야 한다고 생각하는 저로서는 정말 좋다고 생각하는 라이브러리입니다. (생각보다 막 짜인 CSS로 인해 버려지는 시간이 많습니다.)

https://github.com/tailwindlabs/prettier-plugin-tailwindcss

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

```js
// prettier.config.js
module.exports = {
  plugins: [require("prettier-plugin-tailwindcss")],
};
```

안타까운 점은 className 안에 있는 문자열만 적용된다는 점입니다. 만약 Intellisence의 기능을 이용해서 TailwindCSS code를 외부 문자열에서 정의하고 싶으신 분들은 아직은 prettier-plugin-tailwindcss를 사용하실 수 없습니다. => 생각보다 괜찮은 오픈 소스 기여 기회인 듯싶네요.

#### ⚡️ TailwindCSS config 관련

##### 1. Plugin 만들기

당연히 TaiwlindCSS에서 제공하는 class만으로는 모든 CSS 코드를 표현하기 역부족입니다. 솔직히 충분히 많이 표현했다고 생각하지만 지금도 계속 CSS spec이 확장되고 있으니 장담할 수 없습니다. 이렇게 TailwindCSS에서 제공하지 않는 코드는 plugin을 통해서 추가할 수 있습니다.

```js
// rotateX.ts
const plugin = require("tailwindcss/plugin");

const rotateX = plugin(({ addUtilities }) => {
  addUtilities({
    ".rotate-y-0": {
      transform: "rotateY(0deg)",
    },
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".rotate-z-180": {
      transform: "rotateZ(180deg)",
    },
    ".rotate-x-180": {
      transform: "rotateX(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".backface-visibility": {
      backfaceVisibility: "hidden",
    },
    ".perspective": {
      perspective: "1000px",
    },
  });
});
export default rotateX;

// tailwind.config.js
import rotateX from "./rotateX";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [rotateX],
};
```

위 코드는 card 뒤집기 애니메이션을 구현하는 도중 tailwindCSS에서 지원하지 않은 CSS 코드들이 있어 이를 plugin으로 추가한 모습입니다. Tailwind 자동 완성 기능은 plugin에 추가한 className도 인식해줍니다. (이거 보고 감동받았습니다.)

#### 2. tailwind.config.js

중요한 부분만 빠르게 보자면 content는 JIT 컴파일러가 적용될 파일 범위를 정의합니다.

> **JIT 컴파일러란?** Just-In-Time의 약자로 TailwindCSS는 사용자가 쓴 Class만 따로 모아서 css파일을 만듭니다. 덕분에 TailwindCSS에 정의된 CSS 코드는 많아도 정작 실제 빌드된 코드 양은 10~20KB 이내입니다. JIT는 사용자가 입력한 className만 모아서 CSS 파일을 만드는 역할을 담당합니다.

plugin은 내가 커스텀한 플러그인 또는 외부 라이브러리로 불러온 플러그인을 등록합니다.

theme은 TailwindCSS에 정의된 전반적인 className의 CSS 코드값을 설정합니다. 꼭 extend에 제가 정의할 코드를 넣으셔야 덮어쓰기가 아니라 추가하기로 등록됩니다. 또한 typography 플러그인을 쓰신다면 theme에서 해당 플러그인이 제공하는 CSS 코드를 변경할 수 있습니다. + 애니메이션 같은 경우 라이브러리를 안 쓰신다면 theme에 직접 정의하셔야 합니다. (**framer-motion** 추천합니다. 다음 포스트 주제 중 하나입니다.)

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        deepPurple: "#B284EC",
        lightPurple: "#C1A0EB",
        deepBlack: "#232323",
        black: "#454545",
        lightBlack: "#787878",
        deepGray: "#a1a1a1",
        gray: "#cdcdcd",
        lightGray: "#efefef",
      },
      backgroundImage: {
        "question-image": "url('../public/img/background/question.png')",
        "resume-image": "url('../public/img/background/resume.png')",
        "main-image": "url('../public/img/background/main.png')",
      },
      fontFamily: {
        DoHyean: ["Do Hyeon", "sans-serif"],
        NotoSans: ["Noto Sans KR", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
```

제대로 쓰시는 분들은 여기에 단위나 색상 등 Design System에 들어가는 모든 것을 theme안에 몰아둡니다. 저 같은 경우에는 Design System이 없기에 그냥 중복되는 값들만 해당 theme에 등록합니다.

### 마지막으로

순수 CSS부터 지금까지 CSS framework, Sass + PostCSS, CSS-in-JS, Atomic CSS 등 다양한 방식을 만들어 냈습니다. 각자 무언가 해결을 하기 위해서 만들어졌고 각자 장단점이 공존하기 때문에 아직 하나의 방식이 우세하다는 결론이 나지 않은 상태입니다. 저는 TailwindCSS를 사랑하지만 그렇다고 TailwindCSS가 실버 불릿이라고 생각하지 않습니다. 그렇기에 저 또한 다양한 디자인 툴을 써보려고 노력하고 있으며 최근에는 CSS-in-JS 중 성능이 좋다고 소문난 stitches를 체험 중입니다. (<del>아직 덜 써봤지만 TailwindCSS가 확실히 편합니다.</del>)

이번 블로그를 쓰게 된 계기 중 하나는 TailwindCSS 관련 영상의 댓글에 부정적인 의견이 너무 많았다는 점입니다. 가독성이 떨어진다거나 큰 프로젝트에 적합하지 않다는 의견은 인정할 만하나 customizing이 힘들다는 댓글, 반응형이 힘들다는 댓글들은 인정하기 힘들었습니다. Arbitrary Value와 custom Plugin, tailwind.config.js을 활용하면 표현하지 못할 CSS 코드는 진짜 극히 드물며(제 경우에는 없었습니다.) 디자인 관련 코드가 모여 있어 반응형할 때 속성값을 덮어씌우는 작업을 진행하기 매우 용이합니다. 제 개인적인 의견이기는 하나 TailwindCSS를 제대로 써보셨다면 이런 종류의 반응은 나오지 않았으리라 생각합니다.

그래서 저는 프론트엔드 개발자라면 한번 쯤 TailwindCSS를 사용해보셨으면 합니다. 모든 프로젝트에 적합하다고 생각하진 않지만 생산성이 중요한 프로젝트는 이만한 도구가 없습니다. Atomic CSS 패러다임 자체가 눈으로 보고 이해하는 것과 실제로 써보는 것에는 큰 차이가 있다고 생각하기 때문에 꼭 한 번 써보길 추천합니다. 또한 카카오와 넥슨의 기술 블로그에 쓰인 TailwindCSS 관련 포스트을 참고해보시는 것도 추천해 드립니다.

```css
body {
  color: "#121212";
}
```
