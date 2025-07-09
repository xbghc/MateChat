# MateChat Contributing Guide

Hello! We're glad you're interested in contributing to MateChat. Before submitting your contribution, please read the following guide:

### Quick Start

If you want to participate in `MateChat` development or testing, please refer to the following process:

1. Click the Fork button in the upper right corner of the [GitCode repository](https://gitcode.com/DevCloudFE/MateChat.git) to fork this repository to your personal space;
2. Clone the personal space project to local:

   Since GitCode currently does not support Web OAuth, for more convenient code collaboration, we recommend using SSH method for cloning:

   ```bash
   git clone git@gitcode.com:<username>/MateChat.git
   ```

   **The `<username>` in the above command is your GitCode username, please replace it with your actual username before execution.**

   You can also use HTTPS method for cloning:

   ```bash
   git clone https://gitcode.com/DevCloudFE/MateChat.git
   ```

   Before this, please ensure you have correctly installed and configured Git tools.

3. Ensure that Node.js and pnpm are correctly installed on your computer:

   Execute the following commands in terminal (such as Powershell or Fish Shell):

   ```bash
   node -v
   pnpm -v
   ```

   If you see version numbers like `v22.12.0` and `9.15.4`, it means you have correctly installed Node.js and pnpm.

   If an exception occurs, please install `pnpm` after installing the Node.js environment:

   ```bash
   npm install -g pnpm
   ```

4. Install Node.js dependencies:

   ```bash
   pnpm install
   ```

5. Start the development server:

   ```bash
   pnpm run docs:dev
   ```

## Contributing

MateChat is a multi-person collaborative open source project. To avoid multiple people developing the same component/function at the same time, please first select the task you are interested in from the [issue list](https://gitcode.com/DevCloudFE/MateChat/issues) and claim it in the comment area.

1. Please ensure you have completed the steps in Quick Start and can normally access the locally started website
2. Create a new branch `git checkout -b username/feature1`, branch name is recommended as `username/feat-xxx`/`username/fix-xxx`
3. Follow [Angular Commit Message Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit) for commits (**non-compliant commits will not be merged**)
4. Submit to remote repository, which is the forked repository, `git push origin branchName`
5. (Optional) Synchronize the latest code from upstream repository dev branch, `git pull upstream dev`
6. Open upstream repository to submit [PR](https://gitcode.com/DevCloudFE/MateChat/pulls)
7. Repository Committer performs Code Review and provides feedback
8. PR initiator adjusts code based on feedback (after a branch initiates a PR, subsequent commits will be automatically synchronized, no need to re-PR)
9. Repository administrator merges PR
10. Contribution process ends, thank you for your contribution