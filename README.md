# Шаблон сборки проектов Perco

## Список рекомендаций

1. [nicothin.pro](https://nicothin.pro/idiomatic-pre-CSS/)
2. [codeguide.academy](http://codeguide.academy/)

---

## 📋 Как правильно создавать компоненты

### Структура компонента

Каждый компонент должен находиться в отдельной папке в `src/components/ui/` или `src/components/blocks/` и состоять из:

```
src/components/ui/component-name/
├── component-name.pug   (разметка)
└── component-name.scss  (стили)
```

**Важно:** Названия файлов Pug и SCSS **ДОЛЖНЫ совпадать с названием папки**!

### ✅ Правильный пример: кнопка (btn)

#### Структура:
```
src/components/ui/btn/
├── btn.pug
└── btn.scss
```

#### btn.pug:
```pug
//- Все примеси должны начинаться с имени блока
mixin btn(text, mods)
  - var allMods = ''
  - if(typeof(mods) !== 'undefined' && mods)
    - var modsList = mods.split(',')
    - for (var i = 0; i < modsList.length; i++)
      - allMods = allMods + ' btn--' + modsList[i].trim()

  button.btn(class=allMods)!= text
    block
```

#### btn.scss:
```scss
.btn {
  padding: 10px 20px;
  border: none;

  &--primary {
    background: blue;
  }

  &--secondary {
    background: gray;
  }
}
```

#### Использование в pages:
```pug
+btn('Нажми меня', 'primary')
+btn('Отмена', 'secondary')
```

---

### ❌ Неправильный пример: список (list) - ДО ИСПРАВЛЕНИЯ

```
src/components/ui/list/
├── list.pug      // ❌ Несколько миксинов с разными именами
└── list.scss
```

**Проблема:**
- В `list.pug` есть миксины `list-unordered` и `list-ordered`
- Система ищет класс `.list`, но находит `.list-unordered` и `.list-ordered`
- Стили не добавляются в `styles.scss` автоматически!

**Решение:** Либо:
1. **Переименовать миксины и классы** под единый компонент с модификаторами
2. **Или добавить компонент в `alwaysAddBlocks`** в `config.js`

---

### 📝 Система автоматического подключения стилей

Как система находит и добавляет компоненты в финальный `styles.scss`:

#### Шаг 1: Компиляция Pug в HTML
Все файлы из `src/pages/**/*.pug` компилируются в HTML.

#### Шаг 2: Извлечение классов
Система извлекает все CSS-классы из скомпилированного HTML.

#### Шаг 3: Поиск совпадений
Для каждого класса:
- **Игнорирует** модификаторы (содержат `--`) и элементы (содержат `__`)
- **Ищет** папку с таким названием в `src/components/`
- **Добавляет** `@import` для найденного компонента

#### Шаг 4: Результат
Все найденные стили добавляются в `src/styles/styles.scss`

---

### 🎯 Правила для автоматического подключения

#### 1️⃣ **Основное правило: названия должны совпадать**

| Что | Должно совпадать |
|-----|------------------|
| Имя папки | `list` |
| Имя файлов | `list.pug`, `list.scss` |
| Имя BEM-блока (класс) | `.list` |

Когда вы используете `<div class="list">` в HTML, система:
1. Видит класс `list`
2. Ищет папку `src/components/ui/list/` или `src/components/blocks/list/`
3. Находит `list.scss`
4. Добавляет `@import "../components/ui/list/list.scss";` в `styles.scss`

#### 2️⃣ **Модификаторы и элементы не влияют на подключение**

```pug
// Все эти классы ведут к одному компоненту:
.list              // ← система ищет по этому
.list--unordered   // ← это модификатор, система его пропускает
.list__item        // ← это элемент, система его пропускает
```

#### 3️⃣ **Несколько способов подключить стили**

**Способ 1: Автоматически (рекомендуется)**
```pug
//- В любом файле pages/ используйте класс компонента
div.list
  +list-unordered(['item 1', 'item 2'])
```
✅ Стили подключатся автоматически!

**Способ 2: Принудительно (для инструментов, не используемых в pages)**
```js
// config.js
alwaysAddBlocks: [
  'list',      // компонент всегда будет подключен
  'tippy',     // даже если не используется в pages
],
```

**Способ 3: Вручную (для стилей и библиотек)**
```js
// config.js
addStyle: [
  "src/styles/variables.scss",
  "src/styles/vendor.scss",  // явное добавление
],
```

---

### 🛠️ Чек-лист создания нового компонента

- [ ] Создал папку: `src/components/ui/my-component/`
- [ ] Создал файл разметки: `my-component.pug`
- [ ] Создал файл стилей: `my-component.scss`
- [ ] Первый класс в миксине называется как папка: `.my-component`
- [ ] Остальные классы - модификаторы: `.my-component--mod`
- [ ] Компонент используется в одном из файлов `src/pages/**/*.pug`
- [ ] Запустил сборку: `npm run dev`
- [ ] Проверил, что стили добавились в `src/styles/styles.scss`

---

### 🔍 Отладка: стили не добавляются?

1. **Проверьте совпадение имен:**
   ```
   Папка:    src/components/ui/button/
   Файлы:    button.pug, button.scss  ✅
   Класс:    .button (в button.pug)  ✅
   ```

2. **Убедитесь, что компонент используется в pages:**
   ```pug
   //- src/pages/index.pug или любой другой pages файл
   +button('Click me')
   // Это создаст <div class="button">... в HTML
   ```

3. **Или добавьте в alwaysAddBlocks:**
   ```js
   // config.js
   alwaysAddBlocks: ['my-component'],
   ```

4. **Перезапустите сборку:**
   ```bash
   npm run dev
   ```

5. **Проверьте src/styles/styles.scss:**
   ```scss
   @import "../components/ui/my-component/my-component.scss";
   ```

---

### 📚 Стили SCSS -> CSS

- Используйте BEM-нотацию: `.block`, `.block__element`, `.block--modifier`
- Структурируйте вложенность по BEM: блок → элементы → модификаторы
- Переменные и миксины в `src/styles/variables.scss` и `src/styles/mixins.scss`

### 📐 Разметка Pug -> HTML

- Все примеси компонентов должны находиться в одном файле компонента
- Названия примесей должны совпадать с названием компонента
- Используйте примеси через `+component-name()` в page файлах
