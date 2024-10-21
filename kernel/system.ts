import * as fs from 'node:fs';
import * as readline from 'node:readline';
import { ls } from './system/commands/ls';
import { cd } from './system/commands/cd';
import { echo } from './system/commands/echo';

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Global variable for current directory
let currentDir = process.cwd();
let isAuthenticated = false;

// Function to load user data
function loadUserData(): { [key: string]: string } {
    const data = fs.readFileSync('./data/users.json', 'utf-8');
    return JSON.parse(data);
}

// Function to handle user login
function login(users: { [key: string]: string }) {
    rl.question('Username: ', (username) => {
        rl.question('Password: ', (password) => {
            if (users[username] && users[username] === password) {
                console.log('Login successful!');
                isAuthenticated = true;
                startShell();
            } else {
                console.log('Login failed. Try again.');
                login(users);
            }
        });
    });
}

// Function to handle user input and commands
function handleCommand(input: string) {
    const args = input.trim().split(' ');
    const command = args[0];

    switch (command) {
        case 'ls':
            ls(currentDir);
            break;
        case 'cd':
            if (args.length < 2) {
                console.error('cd: missing argument');
                return;
            }
            cd(args[1], currentDir, (newDir) => {
                currentDir = newDir;
            });
            break;
        case 'echo':
            echo(args.slice(1).join(' '));
            break;
        case 'exit':
            rl.close();
            break;
        default:
            console.log(`Command not found: ${command}`);
    }
}

// Function to start the shell
function startShell() {
    rl.setPrompt(`${currentDir} $ `);
    rl.prompt();

    rl.on('line', (input) => {
        handleCommand(input);
        rl.prompt();
    }).on('close', () => {
        console.log('Exiting Nodix shell. Goodbye!');
        process.exit(0);
    });
}

// Entry point function for the kernel
export function startKernel() {
    const users = loadUserData();
    login(users);
}

// Call the entry point when this file is executed
startKernel();
