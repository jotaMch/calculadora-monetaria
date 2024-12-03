// jest.config.js
module.exports = {
    transform: {
      '^.+\\.tsx?$': 'babel-jest', // Transforma arquivos .ts e .tsx usando babel-jest
      '^.+\\.jsx?$': 'babel-jest', // Transforma arquivos .js e .jsx usando babel-jest
    },
    testEnvironment: 'jsdom', // Usado para testes no navegador
};
