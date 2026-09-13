# ПОЛНЫЙ ПЛАН КУРСА (v2 — 2026 edition)

## TypeScript с нуля до сильного junior/middle

**33 занятия • 99 уроков • 11 недель**

---

| Параметр | Значение |
|----------|----------|
| Длительность | 11 недель |
| Расписание | Понедельник, Среда, Пятница |
| Формат | 3 урока по 45 минут |
| Учеников | 6-7 человек |
| Уровень | С нуля (TypeScript как первый язык программирования) |
| Возраст | 14-24 года |
| Предзнания | Базовая работа с компьютером, желательно знакомство с HTML |

---

## ЧТО ИЗМЕНИЛОСЬ ПО СРАВНЕНИЮ С v1

Цель v2 — выпускник умеет писать **идиоматический TypeScript 2026 года**, а не "JS с типами".

| # | Изменение | Зачем |
|---|-----------|-------|
| 1 | Tsconfig с самого начала **strict-режим** + `noUncheckedIndexedAccess` + `verbatimModuleSyntax` | Без этого strict-флага TS почти бесполезен |
| 2 | **`tsx` / Node 22+ native** вместо `ts-node` | `ts-node` устарел, не успевает за TS |
| 3 | **Discriminated unions** как отдельная тема (Занятие 18) | Главный паттерн моделирования состояний |
| 4 | **`as const` + literal unions** вытесняют enum (Занятие 19) | Enum — анти-паттерн в 2026, не работает с native TS-runtime |
| 5 | **`satisfies` оператор** (Занятие 21) | Ключевой инструмент TS 4.9+ |
| 6 | **Exhaustiveness checking через `never`** (Занятие 20) | Гарантия покрытия всех веток |
| 7 | **Новый модуль "Система типов"** (Занятия 23-26): utility types, conditional, mapped, template literal types | Без этого "сильным" не стать |
| 8 | **Type predicates + assertion functions** вместо function overloads (Занятие 14) | Overloads → legacy; predicates — современный путь |
| 9 | **ООП сжат** с 5 до 3 занятий (Занятия 27-29) | Современный TS меньше про классы; добавлены Stage 3 decorators |
| 10 | **`import type`, ESM, `.js`-расширения** в модулях (Занятие 30) | CommonJS — только для legacy |
| 11 | **Типизированный `fetch` + Zod** вместо чистого DOM (Занятие 32) | Мост типы↔рантайм — must-know |
| 12 | **AbortController, Promise.allSettled, top-level await** (Занятие 31) | Современная асинхронность |
| 13 | **Финальный проект сразу использует** discriminated unions, utility types, typed fetch, strict tsconfig | Закрепление всего стека |

---

## СОДЕРЖАНИЕ КУРСА

| Модуль | Тема | Занятия |
|--------|------|---------|
| **Модуль 1** | Введение в TypeScript | 1-3 |
| **Модуль 2** | Базовые типы | 4-7 |
| **Модуль 3** | Управление потоком | 8-10 |
| **Модуль 4** | Функции | 11-14 |
| **Модуль 5** | Объекты и интерфейсы | 15-18 |
| **Модуль 6** | Продвинутые типы | 19-22 |
| **Модуль 7** | Система типов и метапрограммирование 🆕 | 23-26 |
| **Модуль 8** | ООП в TypeScript | 27-29 |
| **Модуль 9** | Модули, асинхронность, рантайм | 30-32 |
| **Модуль 10** | Финальный проект | 33 |

Обозначения:
- 🆕 — новое в v2
- ♻️ — переработанное содержание
- ⚠️ — тема осталась, но переакцентирована под 2026
- ⛔ — удалено / понижено до "упомянуть и идти дальше"

---

## МОДУЛЬ 1: Введение в TypeScript
*Занятия 1-3 • Неделя 1*

### Занятие 1: Что такое TypeScript и зачем он нужен
> История языка, проблема JS, superset, как работает компиляция. **Контент уже написан.**

### Занятие 2: ⚠️ Установка инструментов (Node 22+ / Bun, VS Code, tsx)
- Node.js 22+ LTS (поддерживает native TS через `--experimental-strip-types`)
- **Альтернатива:** Bun (TS из коробки)
- VS Code + встроенный TS-сервер
- `npm install -D typescript tsx` (локально в проект, **не глобально**)
- Запуск: `npx tsx app.ts` вместо устаревшего `ts-node`
- ⛔ `ts-node` упомянуть только как "то, что вы увидите в старых туториалах"

### Занятие 3: ♻️ Первая программа, tsconfig.json со strict-режимом
- `npm init -y` + `npx tsc --init`
- **Обязательные флаги 2026:**
  - `"strict": true` (включает `strictNullChecks`, `noImplicitAny` и др.)
  - `"noUncheckedIndexedAccess": true` — `arr[0]` становится `T | undefined`
  - `"verbatimModuleSyntax": true` — явные `import type`
  - `"moduleResolution": "bundler"` (для фронта) или `"nodenext"` (для Node)
  - `"target": "ES2022"`, `"module": "ESNext"`
- Что такое source maps, decl-файлы (`.d.ts`)
- Демо: одна и та же программа с `strict: false` и `strict: true` — увидеть разницу

---

## МОДУЛЬ 2: Базовые типы
*Занятия 4-7 • Недели 1-2*

### Занятие 4: ⚠️ Переменные (let, const) и аннотации типов + inference
- Когда TypeScript сам выводит тип (`let x = 5` → `number`)
- Когда нужно аннотировать явно
- `const` + literal types: `const x = "hello"` → `"hello"`, не `string`
- Правило: **аннотируйте границы (параметры, возврат), доверяйте inference внутри**

### Занятие 5: Примитивные типы (string, number, boolean) + literal types
- string, number, boolean
- bigint, symbol (упомянуть)
- **Literal types**: `let status: "ok" | "error"`
- Template literal types — короткий тизер (подробно в Занятии 26)

### Занятие 6: Массивы, readonly-массивы, кортежи (tuple)
- `number[]` vs `Array<number>`
- `readonly number[]` — почему это важно
- Tuples: `[string, number]`
- Named tuples: `[name: string, age: number]`
- `as const` для иммутабельных массивов

### Занятие 7: ♻️ any (анти-паттерн), unknown (правильный путь), void, never, null/undefined
- **`any` — анти-паттерн**, ломает всю систему типов
- **`unknown` — безопасный any**, нужно сужать перед использованием
- `void` — для функций без возврата
- `never` — недостижимые ветки (тизер exhaustiveness)
- `null` vs `undefined`, флаг `strictNullChecks`
- Правило: `unknown` на границах системы, никогда `any`

---

## МОДУЛЬ 3: Управление потоком
*Занятия 8-10 • Недели 2-3*

### Занятие 8: Операторы и выражения
### Занятие 9: ⚠️ Условия (if/else, switch, тернарный) + краткий тизер narrowing
> "Заметили, что после `if (typeof x === 'string')` TS считает x строкой? Это narrowing — подробно в Занятии 20."

### Занятие 10: Циклы (for, while, for...of, for...in)
- Особое внимание `for...of` для массивов
- `for...in` — почему опасен (даёт `string`, не индексы)
- `Object.entries / keys / values` — типизация

---

## МОДУЛЬ 4: Функции
*Занятия 11-14 • Недели 3-4*

### Занятие 11: Функции — основы и типизация параметров
### Занятие 12: Arrow-функции и тип возвращаемого значения
- Когда писать возврат явно, когда полагаться на inference
- Function types: `type Callback = (x: number) => void`

### Занятие 13: Опциональные, default и rest параметры
- `function f(x: number, y?: number)`
- `function f(x: number, y: number = 10)`
- `function f(...args: number[])`

### Занятие 14: 🆕 ♻️ Type predicates (`x is Type`) и assertion functions
- ⛔ Function overloads перенесены в финальный "упомянуть" блок этого занятия
- **Type predicates:** `function isString(x: unknown): x is string`
- **Assertion functions:** `function assert(cond: unknown): asserts cond`
- Реальные примеры: фильтрация массивов, валидация input
- В конце 10 минут — "В legacy коде вы увидите function overloads, вот как они выглядят"

---

## МОДУЛЬ 5: Объекты и интерфейсы
*Занятия 15-18 • Недели 5-6*

### Занятие 15: ⚠️ Объекты и аннотация типов объектов
- Inline-тип, optional поля (`?`), readonly свойства
- Index signatures: `{ [key: string]: number }`

### Занятие 16: Type aliases (псевдонимы типов)
- `type User = { name: string }`
- Когда type, когда interface (правило: type — для всего, interface — для расширяемых объектов и классов)

### Занятие 17: Interfaces
- `interface User { name: string }`
- `extends`, declaration merging
- Подробное сравнение type vs interface — таблица

### Занятие 18: 🆕 Union, intersection, literal types + **Discriminated unions**
- Union: `string | number`
- Intersection: `A & B`
- Literal: `"red" | "green" | "blue"`
- **Discriminated unions (главное за занятие):**
  ```ts
  type State =
    | { kind: "loading" }
    | { kind: "success"; data: User }
    | { kind: "error"; message: string };
  ```
- Это **центральный паттерн** моделирования состояний в TS

---

## МОДУЛЬ 6: Продвинутые типы
*Занятия 19-22 • Недели 6-7*

### Занятие 19: 🆕 ♻️ `as const` и литеральные типы как современная замена enum
- Проблема enum: не работает с native TS-runtime (Node `--experimental-strip-types`, Bun, Deno)
- Современный паттерн:
  ```ts
  const Status = { Loading: "loading", Done: "done" } as const;
  type Status = typeof Status[keyof typeof Status];
  ```
- ⚠️ Enum показать (10 мин), отметить как legacy, объяснить когда всё ещё уместен (только при работе с готовым enum-кодом)

### Занятие 20: 🆕 ♻️ Type narrowing + exhaustiveness checking
- `typeof`, `instanceof`, `in`, equality narrowing
- Type guards (custom — связка с занятием 14)
- **Exhaustiveness через `never`:**
  ```ts
  function render(s: State) {
    switch (s.kind) {
      case "loading": return "...";
      case "success": return s.data;
      case "error": return s.message;
      default: const _exhaustive: never = s; return _exhaustive;
    }
  }
  ```
- Если добавишь новый case в State — TS сразу подсветит switch

### Занятие 21: 🆕 ♻️ Type assertions (`as`, `as const`) + **`satisfies` оператор**
- `as` — когда осознанно говоришь TS "я знаю лучше" (редко!)
- `as const` — freeze литералов
- **`satisfies` (TS 4.9+, главное за занятие):**
  ```ts
  const config = { port: 3000, host: "localhost" } satisfies Config;
  // ↑ TS проверит соответствие Config, но СОХРАНИТ узкие литеральные типы
  ```
- Сравнение `: Config` vs `satisfies Config` vs `as Config`

### Занятие 22: ⚠️ Generics — основы + constraints + defaults
- `function identity<T>(x: T): T`
- **Constraints:** `<T extends { length: number }>`
- **Default-параметры:** `<T = string>`
- `keyof` оператор
- Реальные примеры: generic API-функции

---

## МОДУЛЬ 7: 🆕 Система типов и метапрограммирование
*Занятия 23-26 • Недели 7-8*

> **Полностью новый модуль.** Это то, что отличает middle от junior.

### Занятие 23: 🆕 Utility types (часть 1) — мутации формы объекта
- `Partial<T>` — все поля опциональные
- `Required<T>` — все поля обязательные
- `Readonly<T>` — все поля readonly
- `Pick<T, K>` — выбрать подмножество полей
- `Omit<T, K>` — исключить поля
- Реальный кейс: DTO для PATCH-запроса = `Partial<User>`

### Занятие 24: 🆕 Utility types (часть 2) — извлечение типов из функций и значений
- `Record<K, V>` — словарь с известным набором ключей
- `ReturnType<T>` — извлечь тип возврата функции
- `Parameters<T>` — извлечь типы параметров
- `Awaited<T>` — развернуть Promise
- `NonNullable<T>` — убрать null/undefined
- Реальный кейс: типы из реальных функций без дублирования

### Занятие 25: 🆕 Conditional types и `infer` (основы)
- `T extends U ? X : Y` — условный тип
- `infer` — захват типа в позиции
- Как написать свой `ReturnType` через `infer`
- Distributive conditional types — короткое введение

### Занятие 26: 🆕 Mapped types и Template literal types
- Mapped types: `{ [K in keyof T]: ... }`
- Модификаторы: `readonly`, `?`, `-readonly`, `-?`
- **Template literal types:** `` `on${Capitalize<K>}` ``
- Реальный кейс: типобезопасные ключи событий, API-роутов

---

## МОДУЛЬ 8: ⚠️ ♻️ ООП в TypeScript
*Занятия 27-29 • Недели 8-9*

> Сжат с 5 до 3 занятий. ООП всё ещё важно (Angular, NestJS), но в современном TS — не основа.

### Занятие 27: Классы + модификаторы доступа
- class, constructor, методы, поля
- `public`, `private`, `protected`, `readonly`
- Shorthand: `constructor(private name: string)`
- **`#private` поля** (ECMAScript private) vs TypeScript `private` — разница

### Занятие 28: Наследование, абстрактные классы, implements
- `extends`, `super`
- `abstract class`, abstract methods
- `class X implements Interface`
- Композиция vs наследование (короткое обсуждение)

### Занятие 29: 🆕 Stage 3 Decorators (TS 5.0+)
- Что такое Stage 3 decorators (ECMAScript-стандарт, не "experimental")
- Class decorator, method decorator
- Простой пример: `@log`, `@deprecated`
- Где встречается: NestJS, Angular
- ⛔ "Legacy decorators" (`experimentalDecorators: true`) только упомянуть для понимания старого кода

---

## МОДУЛЬ 9: ⚠️ ♻️ Модули, асинхронность, рантайм
*Занятия 30-32 • Неделя 10*

### Занятие 30: 🆕 ♻️ ESM-модули
- `export` / `import` (named, default, namespace)
- **`import type`** — почему это важно с `verbatimModuleSyntax`
- **`.js` в путях** при ESM (`import { x } from "./util.js"`) — даже в `.ts` файлах
- Re-exports: `export * from`, `export { x } from`
- ⛔ CommonJS (`require`) — только упомянуть для работы с legacy

### Занятие 31: 🆕 ♻️ Асинхронность: Promise, async/await + современные паттерны
- Promise, `.then`/`.catch` — короткое напоминание
- `async`/`await` с типами: `Promise<User>`
- **`AbortController`** — отмена fetch
- **`Promise.allSettled`** vs `Promise.all` — когда что
- **Top-level await** в ESM
- Типизация ошибок (try/catch с `unknown`)

### Занятие 32: 🆕 ♻️ Типизированный fetch + работа с DOM + runtime-валидация (Zod)
- Типизация `fetch`: `fetch(...).then(r => r.json() as Promise<User>)` — почему **опасно**
- **Zod** — рантайм-валидация + автоматический вывод TS-типа
  ```ts
  const UserSchema = z.object({ name: z.string(), age: z.number() });
  type User = z.infer<typeof UserSchema>;
  ```
- Мост типы ↔ рантайм: TS-типы стираются при компиляции, Zod проверяет реальные данные
- Краткий блок про DOM: типизированные `querySelector`, события

---

## МОДУЛЬ 10: Финальный проект
*Занятие 33 • Неделя 11*

### Занятие 33: 🆕 ♻️ Финальный проект — Todo List на современном TS + презентация
**Технический стек:**
- strict tsconfig из Занятия 3
- Discriminated unions для состояний задачи (`pending | done | archived`)
- Utility types для DTO (`Partial<Todo>` для PATCH)
- Typed fetch + Zod для backend-моков
- ESM + `import type`
- `as const` для констант
- `satisfies` для конфига
- Exhaustiveness checking в reducer

**Формат занятия:**
- 1-й урок: планирование архитектуры + типы
- 2-й урок: реализация
- 3-й урок: презентация (5 мин на студента + Q&A)

---

## ЧТО НЕ ВОШЛО В КУРС (отложено на "TypeScript продвинутый")

Эти темы важны, но не для первого курса:
- Branded / nominal types (`type UserId = string & { __brand: "UserId" }`)
- Variance: covariance, contravariance
- Higher-Kinded Types (через симуляции)
- `using` / `Symbol.dispose` (TS 5.2 — Resource Management)
- `NoInfer<T>` (TS 5.4)
- Module augmentation, ambient declarations
- Глубокая работа с `.d.ts` для JS-библиотек
- Performance: тип-чекинг больших codebases
- Monorepo + project references

---

## РОУДМАП "сильный TypeScript-разработчик" после курса

1. **Месяц 1-2 после курса:** написать pet-project на Next.js + Zod
2. **Месяц 3:** разобрать исходники популярной TS-библиотеки (`zod`, `effect`, `trpc`)
3. **Месяц 4-6:** контрибьютить в open source (типы для JS-библиотек на DefinitelyTyped)
4. **Параллельно:** курс "TypeScript продвинутый" — темы из блока выше

---

> **Примечание:** Детальная разбивка уроков будет добавлена по мере наполнения курса контентом. Уроки в стиле Lesson-1 (билингва RU/EN, ~50KB лекция + конспект + задания).
