import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const verifyImageWithStored = async (capturedBase64, storedImageUrl) => {
  return new Promise((resolve, reject) => {
    const filename = `temp_${uuidv4()}.jpg`;
    const tempPath = path.join(__dirname, filename);

    // Remove the base64 header
    const base64Data = capturedBase64.replace(/^data:image\/jpeg;base64,/, '');

    // Save image to temp file
    fs.writeFileSync(tempPath, base64Data, 'base64');

    const command = `python ./face-verification-api/face-api.py "${storedImageUrl}" "${tempPath}"`;

    exec(command, (error, stdout, stderr) => {
      // Cleanup temp image
      fs.unlinkSync(tempPath);

      if (error) {
        console.error('Error running Python script:', stderr);
        return resolve(false);
      }

      try {
        const result = JSON.parse(stdout);
        resolve(result.verified);
      } catch (e) {
        console.error('Error parsing Python output:', e);
        resolve(false);
      }
    });
  });
};
