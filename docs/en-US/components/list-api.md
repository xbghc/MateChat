---
title: List API
desc: API reference for the List component
---

### Properties

| Property       | Type                            | Default       | Description                                                     |
| -------------- | ------------------------------- | ------------- | --------------------------------------------------------------- |
| data           | [ListItemData[]](#listitemdata) | []            | Data to display                                                 |
| direction      | [ListDirection](#listdirection) | 'vertical'    | Option arrangement direction, vertical or horizontal            |
| autoWrap       | `boolean`                       | true          | Whether to auto wrap, only effective in horizontal arrangement  |
| variant        | [ListVariant](#listvariant)     | 'transparent' | Option appearance, default no background, hover and select highlight |
| selectable     | `boolean`                       | true          | Whether options are selectable, highlights on click when true  |
| enableLazyLoad | `boolean`                       | false         | Whether to enable lazy loading                                  |
| enableShortKey | `boolean`                       | false         | Whether to enable keyboard shortcuts                            |
| inputEl        | `object`                        | --            | Element to listen for keyboard events when shortcuts enabled, defaults to `document` |

### Events

| Event    | Type                        | Description                                                       |
| -------- | --------------------------- | ----------------------------------------------------------------- |
| select   | `(e: ListItemData) => void` | Event triggered when clicking an option, parameter is the option data |
| loadMore | `(e: Event) => void`        | Event triggered when scrolling to bottom, only when lazy loading is enabled and direction is vertical |

### Slots

| Slot | Return Value             | Description           |
| ---- | ------------------------ | --------------------- |
| item | `{ item: ListItemData }` | Customize option content |

### Type Definitions

#### ListItemData

```ts
interface ListItemData {
  label: string; // Display content
  value: string | number; // Corresponding value
  disabled?: boolean; // Whether disabled
  active?: boolean; // Whether selected
  [key: string]: any; // Other custom fields
}
```

#### ListDirection

```ts
enum ListDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}
```

#### ListVariant

```ts
enum ListVariant {
  Transparent = 'transparent', // No background, hover and select highlight
  Filled = 'filled', // With background
  Bordered = 'bordered', // With border
  None = 'none', // No styles, fully customizable by user
}
```