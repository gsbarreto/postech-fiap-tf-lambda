'use strict';

import User from "./entity/user";
import { AuthenticateUseCase } from "./useCase/authenticateUseCase";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const validateUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  try {
    if (event.body !== undefined && event.body !== null) { 
          const userAuthCase = new AuthenticateUseCase();
          // Extrair dados da requisição, se necessário
          const { email, document, name, created } = JSON.parse(event.body);
          console.log(email + " " + document + " " + " " + name + " " + created);
          
          const user = new User(name, email, document, created, null); // Supondo que User seja uma classe
      
          console.log(user);
          // Chamar o caso de uso correspondente
          const result = await userAuthCase.authenticate(user); // Supondo que userAuthCase seja um serviço ou caso de uso
      
          // Retornar resposta adequada
          return {
              statusCode: 200,
              body: JSON.stringify(result),
          };
    }else{
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Corpo da solicitação não fornecido' + " Event Headers: " + event.headers + " Event Data: " + event.pathParameters + " Event body: " + event.body  }),
      };
    }
  } catch (error : any) {
    // Lidar com erros e retornar resposta de erro
    console.log(event.body);
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: error.message + " " + event }),
    };
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
