import * as fs from 'fs';

export function ls(currentDir: string) {
    fs.readdir(currentDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        console.log('Files:', files.join(', '));
    });
}
