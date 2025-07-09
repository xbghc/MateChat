---
title: ThoughtChain API
desc: API reference for the ThoughtChain component
---

### Properties

| Property   | Type                                    | Default | Description              |
| ---------- | --------------------------------------- | ------- | ------------------------ |
| modelValue | [ThoughtChainNode[]](#thoughtchainnode) | []      | Thought chain node data  |

### Events

| Event             | Type                                  | Description                        |
| ----------------- | ------------------------------------- | ---------------------------------- |
| update:modelValue | `(value: ThoughtChainNode[]) => void` | Triggered when updating node data  |

### Slots

| Slot    | Return Value                                     | Description               |
| ------- | ------------------------------------------------ | ------------------------- |
| icon    | `{ node: ThoughtChainNode, index: number }`     | Custom node icon          |
| top     | `{ node: ThoughtChainNode, index: number }`     | Custom top content        |
| header  | `{ node: ThoughtChainNode, index: number }`     | Custom header title       |
| sidebar | `{ node: ThoughtChainNode, index: number }`     | Custom sidebar content    |
| middle  | `{ node: ThoughtChainNode, index: number }`     | Custom middle content     |
| content | `{ node: ThoughtChainNode, index: number }`     | Custom main content       |
| bottom  | `{ node: ThoughtChainNode, index: number }`     | Custom bottom content     |

### Type Definitions

#### ThoughtChainNode

```ts
interface ThoughtChainNode<Meta extends object = {}> {
  /** Unique identifier */
  key: string;
  /** Node title */
  title: string;
  /** Node content */
  content: string;
  /** Think content (optional, currently merged with content in markdown-card) */
  think?: string;
  /** Node status */
  status?: 'pending' | 'success' | 'error' | 'todo' | string;
  /** Additional metadata */
  meta?: Meta;
}
```

#### NodeStatus

```ts
type NodeStatus = 'pending' | 'success' | 'error' | 'todo' | string;
```

### Style Customization

The component uses CSS variables for easy theme customization:

```scss
.thought-chain {
  --icon-size: 24px;               // Icon size
}

.thought-chain-item {
  // Custom styles can be applied by overriding CSS
  // Uses Grid layout: grid-template-areas: "icon header", "sidebar main";
}
```

### Component Layout

The component uses Grid layout with each node divided into 4 areas:
- **icon**: Top-left icon area
- **header**: Top-right header area (includes top and title)
- **sidebar**: Bottom-left sidebar area (displays arrow by default)
- **main**: Bottom-right main content area (includes middle, content, bottom)

### Icon Mapping

The component automatically displays corresponding icons based on the node's `status`:
- `success`: `icon-success`
- `error`: `icon-error`
- `pending`: `icon-pending`
- `todo`: `icon-todo`
- Other: `icon-default`

### Use Cases

- **AI Q&A**: Display AI thinking steps
- **Process Display**: Visualize multi-step processes
- **Status Tracking**: Show task execution status
- **Thought Process**: Display complex thinking processes