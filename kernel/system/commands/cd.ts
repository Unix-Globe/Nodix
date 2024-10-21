import * as fs from 'fs';
import * as path from 'path';

export function cd(dir: string, currentDir: string, setCurrentDir: (newDir: string) => void) {
    const newDir = path.resolve(currentDir, dir);
    fs.stat(newDir, (err, stats) => {
        if (err || !stats.isDirectory()) {
            console.error(`cd: ${dir}: No such file or directory`);
            return;
        }
        setCurrentDir(newDir);
        console.log(`Changed directory to: ${newDir}`);
    });
}
