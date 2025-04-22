import { existsSync, readFileSync, rmdirSync } from 'node:fs';
import path from 'node:path';
import { type Context, defineCommand, run, select } from 'archons';
import chalk from 'chalk';

const cwd = process.cwd();

const templateMap = new Map([]);

function isValidProjectName(name: string) {
  return /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name);
}

const main = defineCommand({
  meta: {
    name: 'create-matechat',
    about: 'DevCloudFE MateChat Command-line Tool',
    version: JSON.parse(
      readFileSync(path.join(__dirname, '../package.json'), 'utf-8'),
    ).version,
    styled: true,
  },
  options: {
    name: {
      type: 'positional',
      help: 'The name of the project',
    },
  },
  callback: (ctx: Context) => {
    let projectName = ctx.args.name;

    while (true) {
      projectName ||= ctx.ask('Please input the project name:', {
        initialValue: projectName,
        placeholder: 'matechat-project',
      });
      if (!isValidProjectName(projectName)) {
        console.log(
          chalk.red(
            `Invalid project name ${chalk.redBright(projectName)}, please try again.`,
          ),
        );
        projectName = '';
        continue;
      }
      if (existsSync(path.join(cwd, projectName))) {
        const clean = ctx.confirm(
          'The project already exists, do you want to continue?',
          { default: false },
        );
        if (clean) {
          const spinner = ctx.createSpinner();
          spinner.setMessage('Cleaning existed directory...');
          rmdirSync(path.join(cwd, projectName), { recursive: true });
          spinner.finishWithMessage('Directory cleaned.');
        } else {
          console.log(
            chalk.red(
              `The project ${chalk.redBright(
                projectName,
              )} already exists, please try again.`,
            ),
          );
          return;
        }
      }
      break;
    }
    if (templateMap.size === 0) {
      console.log(
        chalk.red(`No template found, this is mostly like a MateChat internal issue,
create a new issue at https://gitcode.com/DevCloudFE/MateChat/issues`),
      );
      return;
    }
    const template = select(
      'Please select the template:',
      Object.keys(templateMap),
    );
    console.log(`Selected template: ${chalk.greenBright(template)}`);
  },
});

run(main);
