#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//Implementing the Object Oriented Programming concepts
// Creating a class for students Information
class StudentsInfo {
    static IDcounter = 100000; //for generating a unique five digit student-ID
    ID;
    name;
    courses;
    balance;
    constructor(Name) {
        this.ID = StudentsInfo.IDcounter++;
        this.name = Name;
        this.courses = [];
        this.balance = 1500; //dollars
    }
    Enroll(course) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(chalk.bold.rgb(170, 22, 100)(`\nBalance for ${chalk.bold.greenBright(this.name)} is : $ ${chalk.bold.yellow(this.balance)}.\n`));
    }
    payFees(amount) {
        if (amount <= this.balance) {
            this.balance -= amount; //Updating the student balance after fee payment
            console.log(chalk.bold.rgb(170, 22, 100)(`\n$ ${chalk.bold.yellow(amount)} fees paid successfully!.`));
        }
        else {
            console.log(chalk.bold.redBright(`\nSorry!! You are $ ${chalk.bold.yellow(amount - this.balance)} short to pay the full fees.\n`));
        }
        ;
    }
    showStatus() {
        console.log("\n" + "₊˚ ✧ ‿︵‿୨୧‿︵‿ ✧ ₊˚");
        console.log(chalk.yellowBright(`ID: ${chalk.rgb(170, 22, 100)(this.ID)}`));
        console.log(chalk.yellowBright(`Name: ${chalk.greenBright(this.name)}`));
        console.log(chalk.yellowBright(`Courses: ${chalk.blueBright(this.courses)}`));
        console.log(chalk.yellowBright("Balance:"), chalk.greenBright(`$${this.balance}/-`));
        console.log("₊˚ ✧ ‿︵‿୨୧‿︵‿ ✧ ₊˚");
    }
}
;
//Class for student management
class Student_Manager {
    students; //defining the type of property students as an array
    constructor() {
        this.students = []; //This array will contain all the data of students in it
    }
    //Method to add a new student
    Add_student(Name) {
        let objStudent = new StudentsInfo(Name);
        this.students.push(objStudent);
        console.log(chalk.bold.rgb(170, 22, 100)(`\n${chalk.bold.greenBright(Name)} added successfully.\nStudent ID: ${chalk.bold.yellow(objStudent.ID)}\n`));
    }
    //Method to enroll the student
    Enroll_student(id, courses) {
        let std_found = this.find_student(id);
        if (std_found) {
            std_found?.Enroll(courses);
            console.log(chalk.bold.rgb(170, 22, 100)(`\n${chalk.bold.greenBright(std_found.name)} is enrolled in ${chalk.bold.yellow(courses)} course successfully.\n`));
        }
        else {
            console.log(chalk.bold.red(`\nStudent not found.Please enter correct Id.\n`));
        }
    }
    //Method to view the student balance
    View_studentBalance(id) {
        let std_found = this.find_student(id);
        if (std_found) {
            std_found.viewBalance();
        }
        else {
            console.log(chalk.bold.red(`\nStudent not found.Please enter correct Id.\n`));
        }
    }
    //Method to pay student fees
    Pay_studentFees(id, Amount) {
        let std_found = this.find_student(id);
        if (std_found) {
            std_found.payFees(Amount);
        }
        else {
            console.log(chalk.bold.red(`\nStudent not found.Please enter correct Id.\n`));
        }
    }
    //Method to display ALL students status
    Show_ALLstudentStatus() {
        this.students.forEach((val) => { return val.showStatus(); });
    }
    //Method to display a certain students status
    Show_oneStatus(id) {
        let std_found = this.find_student(id);
        if (std_found) {
            std_found.showStatus();
        }
        else {
            console.log(chalk.bold.red(`\nStudent not found.Please enter correct Id.\n`));
        }
    }
    //Finding students to enroll,viewbalance,payfees & displaying status
    find_student(studentID) {
        return this.students.find((std) => { return std.ID === studentID; });
    }
}
;
let condition = true;
//Main Function for running the program
async function Main() {
    console.log("-".repeat(100));
    console.log(chalk.bold.rgb(170, 22, 100)("\t\t\tWELCOME TO STUDENT MANAGEMENT SYSTEM"));
    console.log("-".repeat(100));
    let student_manager = new Student_Manager();
    //Using while loop 
    while (condition) {
        //Prompting answers(data) from user(students)
        let Options = await inquirer.prompt({
            type: "list",
            name: "available",
            message: chalk.rgb(234, 190, 108)("Choose an Option:"),
            choices: [
                "Add Student",
                "Enroll Student",
                "Pay Student Fees",
                "View Student Balance",
                "Show Status(Requires Id)",
                "Show All Student Status",
                chalk.red.bold("Exit")
            ]
        });
        //Conditional statement for acting upon users choice
        if (Options.available === "Add Student") {
            let student = await inquirer.prompt({
                type: "input",
                name: "name",
                message: "Enter student name: "
            });
            student_manager.Add_student(student.name);
        }
        else if (Options.available === "Enroll Student") {
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
            student_manager.Enroll_student(enroll.id, enroll.course);
        }
        else if (Options.available === "View Student Balance") {
            let balance = await inquirer.prompt({
                type: "number",
                name: "id",
                message: "Enter student ID: "
            });
            student_manager.View_studentBalance(balance.id);
        }
        else if (Options.available === "Pay Student Fees") {
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
            student_manager.Pay_studentFees(fee.id, fee.amount);
        }
        else if (Options.available === "Show Status(Requires Id)") {
            let std = await inquirer.prompt({
                type: "number",
                name: "id",
                message: "Enter student ID: "
            });
            student_manager.Show_oneStatus(std.id);
        }
        else if (Options.available === "Show All Student Status") {
            student_manager.Show_ALLstudentStatus();
        }
        else if (Options.available === chalk.red.bold("Exit")) {
            function exittime() {
                console.log("\nExiting......");
            }
            ;
            setTimeout(exittime, 2000);
            condition = false;
        }
        ;
    }
    ;
}
;
//Calling the Main function
Main();
