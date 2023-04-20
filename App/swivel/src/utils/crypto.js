import crypto from 'crypto';

const algorithm = 'aes-256-cbc'; // Choose an appropriate algorithm

// Encrypt the role
export function encryptRole(text) {
  const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex'); // Generate a random initialization vector
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return encrypted.toString('hex');
  
}

// Decrypt the role
export function decryptRole(encryptedText) {
  const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex'); // Generate a random initialization vector
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
  return decrypted.toString('utf8');
}


  

