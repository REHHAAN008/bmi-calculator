import inquirer from "inquirer";
import chalk from "chalk";

// Function to calculate BMI
function calculateBMI(weight: number, height: number): number {
    return weight / (height * height);
}

// Function to get BMI category
function getBMICategory(bmi: number): string {
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
        return "Overweight";
    } else {
        return "Obesity";
    }
}

// Main function to run the BMI calculator
async function main() {
    const answers = await inquirer.prompt([
        {
            name: "weight",
            type: "input",
            message: "Please enter your weight in kg:",
            validate: (input: string) => {
                const value = parseFloat(input);
                return !isNaN(value) && value > 0 ? true : "Please enter a valid weight.";
            }
        },
        {
            name: "height",
            type: "input",
            message: "Please enter your height in meters:",
            validate: (input: string) => {
                const value = parseFloat(input);
                return !isNaN(value) && value > 0 ? true : "Please enter a valid height.";
            }
        }
    ]);

    const weight = parseFloat(answers.weight);
    const height = parseFloat(answers.height);
    const bmi = calculateBMI(weight, height);
    const category = getBMICategory(bmi);

    console.log(chalk.bold.blue(`\nYour BMI is: ${bmi.toFixed(2)}`));
    console.log(chalk.bold.green(`You are classified as: ${category}\n`));
}

main().catch((error) => {
    console.error("An error occurred:", error);
});
