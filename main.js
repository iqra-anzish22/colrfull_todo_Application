#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todolist = [];
let conditions = true;
console.log(chalk.magenta("\n\tWelcome to Todo list Application\n\t"));
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.yellowBright("Select an option you want to do:"),
                choices: ["Add Task", "Delete Task", "Update Task", "view todolist", "Exit"],
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await UpdateTask();
        }
        else if (option.choice === "view todolist") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            conditions = false;
        }
    }
};
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.blueBright("Enter your new task :")
        }
    ]);
    todolist.push(newTask.task);
    console.log(chalk.greenBright(`\n ${newTask.task} task added successfully in todolist \n`));
};
let viewTask = () => {
    console.log(chalk.magentaBright("\n your todolist:\n"));
    todolist.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
};
console.log("\n");
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellowBright("Enter the  'index no.' of the task you want to delete :"),
        }
    ]);
    let deletedTask = todolist.splice(taskIndex.index - 1, 1);
    console.log(chalk.greenBright(`\n ${deletedTask} this task has ben deleted successfully from your todolist \n`));
};
let UpdateTask = async () => {
    await viewTask();
    let Update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.blueBright("Enter the' index no' of the task you want to update:")
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.blueBright("Now Enter  new task name"),
        }
    ]);
    todolist[Update_task_index.index - 1] = Update_task_index.new_task;
    console.log(chalk.greenBright(`\n Task at index no. ${Update_task_index.index - 1} updated successfully [For updated list check option: view todolist \n ]`));
};
main();
