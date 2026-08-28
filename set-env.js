const fs = require('fs');
const path = require('path');

// Leer la variable de entorno API_URL (inyectada por Vercel o GitHub Actions)
// Si no existe, usamos una URL de respaldo para que no falle la compilación.
const apiUrl = process.env.API_URL || 'https://registrocreditosapi-production.up.railway.app/api';

const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};
`;

const targetPath = path.join(__dirname, 'src', 'environments', 'environment.ts');

try {
  fs.writeFileSync(targetPath, envConfigFile, { encoding: 'utf8' });
  console.log(`✅ [set-env.js] Archivo environment.ts generado dinámicamente.`);
  console.log(`🔗 API_URL configurada como: ${apiUrl}`);
} catch (err) {
  console.error('❌ Error al escribir environment.ts', err);
  process.exit(1);
}
