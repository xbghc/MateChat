# MateChat 贡献指南

你好！我们很高兴你有兴趣为 MateChat 做出贡献。在提交你的贡献之前，可以阅读以下指南：

### 快速上手

如果你想参与 `MateChat` 开发或者测试：

1. 点击 GitCode 右上角的 Fork 按钮，将仓库 Fork 仓库到个人空间
2. Clone 个人空间项目到本地：`git clone git@gitcode.com:username/MateChat.git`
3. 在 MateChat 的根目录下运行`npm i`, 安装 node 依赖
4. 运行 `npm run docs:dev`，启动组件库网站
5. 使用浏览器访问本地链接即可

```bash
# username 为用户名，执行前请替换
git clone git@gitcode.com:username/MateChat.git
cd matechat
npm i
npm run docs:dev
```

### 参与贡献
MateChat 是一个多人合作的开源项目，为了避免多人同时开发同一个组件/功能，请先在 [issues 列表](https://gitcode.com/DevCloudFE/MateChat/issues) 中选择自己感兴趣的任务，在评论区认领。

1. 请确保你已经完成快速上手中的步骤，并且正常访问本地启动网站
2. 创建新分支 `git checkout -b username/feature1`，分支名字建议为`username/feat-xxx`/`username/fix-xxx`
3. 遵循 [Angular Commit Message Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit) 进行提交（**不符合规范的提交将不会被合并**）
4. 提交到远程仓库，也就是 Fork 后的仓库，`git push origin branchName`
5. (可选) 同步上游仓库dev分支最新代码，`git pull upstream dev`
6. 打开上游仓库提交 [PR](https://gitcode.com/DevCloudFE/MateChat/pulls)
7.  仓库 Committer 进行 Code Review，并提出意见
8.  PR 发起人根据意见调整代码（一个分支发起了 PR 后，后续的 commit 会自动同步，不需要重新 PR）
9.   仓库管理员合并PR
10.  贡献流程结束，感谢你的贡献
