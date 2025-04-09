// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
    servers: [
      {
        url: 'http://localhost:5000', // update as needed
      },
    ],
  },
  apis: ['./index.js','./routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
