---
title: ThoughtChain 思维链
desc: 用于展示AI思考过程的组件，支持多步骤思维流程可视化
bannerSrc: '/png/contentSlider/thoughtChainBanner.png'
iconSrc: '/png/contentSlider/thoughtChainIcon.png'
---

### 参数

| 参数名         | 类型                                            | 默认值      | 说明                 |
| -------------- | ----------------------------------------------- | ----------- | -------------------- |
| modelValue     | [ThoughtChainNode[]](#thoughtchainnode)         | []          | 思维链节点数据       |

### 事件

| 事件名           | 类型                                    | 说明               |
| ---------------- | --------------------------------------- | ------------------ |
| update:modelValue| `(value: ThoughtChainNode[]) => void`   | 更新节点数据时触发 |

### 插槽

| 插槽名    | 返回值                                           | 说明               |
| --------- | ------------------------------------------------ | ------------------ |
| icon      | `{ node: ThoughtChainNode, index: number }`     | 自定义节点图标     |
| top       | `{ node: ThoughtChainNode, index: number }`     | 自定义顶部内容     |
| header    | `{ node: ThoughtChainNode, index: number }`     | 自定义头部标题     |
| sidebar   | `{ node: ThoughtChainNode, index: number }`     | 自定义侧边栏内容   |
| middle    | `{ node: ThoughtChainNode, index: number }`     | 自定义中间内容     |
| content   | `{ node: ThoughtChainNode, index: number }`     | 自定义主要内容     |
| bottom    | `{ node: ThoughtChainNode, index: number }`     | 自定义底部内容     |

### 类型定义

#### ThoughtChainNode

```ts
interface ThoughtChainNode<Meta extends object = {}> {
  /** 唯一标识符 */
  key: string;
  /** 节点标题 */
  title: string;
  /** 节点内容 */
  content: string;
  /** 思考内容（可选，目前在markdown-card中与content合并） */
  think?: string;
  /** 节点状态 */
  status?: 'pending' | 'success' | 'error' | 'todo' | string;
  /** 附加元数据 */
  meta?: Meta;
}
```

#### NodeStatus

```ts
type NodeStatus = 'pending' | 'success' | 'error' | 'todo' | string;
```

### 样式定制

组件使用 CSS 变量，可以轻松定制主题：

```scss
.thought-chain {
  --icon-size: 24px;               // 图标大小
}

.thought-chain-item {
  // 可以通过覆盖CSS来自定义样式
  // 使用Grid布局：grid-template-areas: "icon header", "sidebar main";
}
```

### 组件布局

组件使用Grid布局，每个节点分为4个区域：
- **icon**: 左上角图标区域
- **header**: 右上角头部区域（包含top和title）
- **sidebar**: 左下角侧边栏区域（默认显示箭头）
- **main**: 右下角主要内容区域（包含middle、content、bottom）

### 图标映射

组件会根据节点的 `status` 自动显示对应图标：
- `success`: `icon-success`
- `error`: `icon-error`
- `pending`: `icon-pending`
- `todo`: `icon-todo`
- 其他: `icon-default`

### 使用场景

- **AI 问答**：展示AI的思考步骤
- **流程展示**：可视化多步骤流程
- **状态跟踪**：显示任务执行状态
- **思维过程**：展示复杂的思维过程 