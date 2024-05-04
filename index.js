#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.rgb(170, 22, 100)("\t\t<-------------------------------------------------->"));
console.log(chalk.bold.rgb(170, 22, 100)("\t\t\tWELCOME TO STUDENT MANAGEMENT SYSTEM"));
console.log(chalk.bold.rgb(170, 22, 100)("\t\t<-------------------------------------------------->"));
let condition = true;
let store_Data = [];
let call;
class StudentData {
    static counter = 45550;
    Student_ID;
    Name;
    courses;
    balance;
    constructor(Name) {
        this.Student_ID = StudentData.counter++;
        this.Name = Name;
        this.courses = [];
        this.balance = 1000; //dollars
    }
    ;
    //Method1:
    enroll_Course(courseName) {
        return this.courses.push(courseName);
    }
    ;
    //Method2:
    view_Balance() {
        console.log(chalk.bold.rgb(170, 22, 100)(`\nBalance for ${chalk.bold.greenBright(this.Name)} is : $ ${chalk.bold.yellow(this.balance)}\n`));
    }
    ;
    //Method3:
    pay_Fees(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(chalk.bold.rgb(170, 22, 100)(`\n$ ${chalk.bold.yellow(amount)} fees paid successfully!.\n${chalk.bold.greenBright(this.Name)} is now enrolled.\n`));
            store_Data.push(call);
        }
        else {
            console.log(chalk.bold.redBright(`\nSorry!! You are $ ${chalk.bold.yellow(amount - this.balance)} short to pay the full fees.\n`));
        }
        ;
    }
    ;
}
;
async function Main() {
    while (condition) {
        let Options = await inquirer.prompt({
            type: "list",
            name: "available",
            message: chalk.rgb(234, 190, 108)("Choose an Option:"),
            choices: ["Add Student", "Enroll Student", "Pay Student Fees", "View Student Balance", "Show Recent Student Status", "Show All Student Status", chalk.red.bold("Exit")]
        });
        if (Options.available === "Add Student") {
            await AddStudent();
        }
        else if (Options.available === "Enroll Student") {
            await Enroll();
        }
        else if (Options.available === "View Student Balance") {
            await view_balance();
        }
        else if (Options.available === "Pay Student Fees") {
            await payment();
        }
        else if (Options.available === "Show Recent Student Status") {
            await Recentstatus();
        }
        else if (Options.available === "Show All Student Status") {
            await Allstatus();
        }
        else if (Options.available === chalk.red.bold("Exit")) {
            condition = false;
        }
    }
    ;
}
;
async function AddStudent() {
    let st = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter student name: "
    });
    call = new StudentData(st.name);
    console.log(chalk.bold.rgb(170, 22, 100)(`\n${chalk.bold.greenBright(call.Name)} added successfully.\nStudent ID is: ${chalk.bold.yellow(call.Student_ID)}\n`));
}
;
async function Enroll() {
    let enroll = await inquirer.prompt([
        {
            type: "number",
            name: "id",
            message: "Enter student ID: "
        },
        {
            type: "input",
            name: "course",
            message: "Enter course name: "
        }
    ]);
    if (enroll.id === call.Student_ID) {
        call.enroll_Course(enroll.course);
        console.log(chalk.bold.rgb(170, 22, 100)(`\n${chalk.bold.greenBright(call.Name)} must pay Fee to get enrolled in ${chalk.bold.yellow(enroll.course)} course.\n`));
    }
    else {
        console.log(chalk.bold.redBright("\nINCORRECT student ID!!!"));
    }
    ;
}
;
async function view_balance() {
    let balance = await inquirer.prompt([
        {
            type: "number",
            name: "id",
            message: "Enter student ID: "
        }
    ]);
    if (balance.id === call.Student_ID) {
        call.view_Balance();
    }
    else {
        console.log(chalk.bold.redBright("\nINCORRECT student ID!!!"));
    }
    ;
}
;
async function payment() {
    let fee = await inquirer.prompt([
        {
            type: "number",
            name: "id",
            message: "Enter student ID: "
        },
        {
            type: "number",
            name: "amount",
            message: "Enter amount to pay: "
        }
    ]);
    if (fee.id === call.Student_ID) {
        await call.pay_Fees(fee.amount);
    }
    else {
        console.log(chalk.bold.redBright("\nINCORRECT student ID!!!"));
    }
    ;
}
;
async function Recentstatus() {
    console.log(store_Data[store_Data.length - 1]);
}
;
async function Allstatus() {
    console.log(store_Data);
}
;
setTimeout(Main, 2000);
