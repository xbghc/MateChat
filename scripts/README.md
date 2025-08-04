# 文档自动翻译系统

## 概述

本系统使用 DeepSeek API 自动将中文文档翻译为英文，并通过 GitHub Actions 自动创建 PR。

## 工作流程

1. 当 `docs/zh-CN/` 目录下的 `.md` 文件发生变化时触发
2. GitHub Action 自动运行翻译脚本
3. 翻译后的文件保存到 `docs/en-US/` 对应路径
4. 自动创建 PR 供审核

## 配置步骤

### 1. 设置 DeepSeek API Key

在 GitHub 仓库设置中添加 Secret：
- 名称：`DEEPSEEK_API_KEY`
- 值：你的 DeepSeek API 密钥

获取 API Key：访问 [DeepSeek Platform](https://platform.deepseek.com/)

### 2. 触发方式

#### 自动触发
- Push 到 `main` 或 `dev` 分支
- 修改 `docs/zh-CN/**/*.md` 文件

#### 手动触发
1. 访问 Actions 页面
2. 选择 "Auto Translate Docs" workflow
3. 点击 "Run workflow"
4. 可选：指定要翻译的文件（逗号分隔）

## 本地测试

```bash
# 设置环境变量
export DEEPSEEK_API_KEY="your-api-key"
export CHANGED_FILES="docs/zh-CN/components/bubble/api.md"

# 运行翻译脚本
node scripts/translate-docs.js
```

## 文件结构

```
scripts/
├── translate-docs.js           # 主翻译脚本
├── translation-config.js       # 配置文件
└── utils/
    └── translation-utils.js    # 工具函数
```

## 配置说明

### translation-config.js

- `deepseek.model`: 使用的模型（默认：deepseek-chat）
- `deepseek.temperature`: 温度参数，控制翻译的创造性（默认：0.3）
- `corrections`: 修正规则，当发现翻译问题时添加

## 注意事项

1. **费用控制**：系统只翻译修改的文件，避免重复翻译
2. **格式保持**：自动保留 Markdown 格式、代码块、表格等
3. **人工审核**：所有翻译通过 PR 提交，需要人工审核后合并
4. **错误处理**：包含重试机制（最多3次）

## 常见问题

### Q: 如何添加翻译修正规则？

编辑 `scripts/translation-config.js` 中的 `corrections` 对象：

```javascript
corrections: {
  'incorrect term': 'correct term',
  // 添加更多规则...
}
```

### Q: 如何跳过某些文件？

在 `.github/workflows/auto-translate.yml` 中修改 `paths` 配置，或添加 `paths-ignore`。

### Q: 翻译失败怎么办？

1. 检查 Actions 日志查看错误信息
2. 确认 API Key 是否正确设置
3. 检查 API 余额是否充足
4. 如果是网络问题，可以重新运行 workflow

## 贡献指南

欢迎提交 Issue 或 PR 来改进翻译系统！