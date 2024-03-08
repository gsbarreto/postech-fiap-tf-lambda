import { AwsConfiguration } from "../configurations/awsConfiguration";


export default class AwsService {
    cognito: any;
    awsService: any;
    constructor() {
        this.awsService = new AwsConfiguration();
        this.cognito = this.awsService.getCognito();
    }
    
    async registerUser(email: string, document: string, name: string) {
        const params = {
            ClientId: process.env.COGNITO_CLIENT_ID_KEY,
            Username: document,
            Password: document,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email
                },
                {
                    Name: 'custom:document',
                    Value: document
                },
                {
                    Name: 'name',
                    Value: name
                }
            ]
        };

        try {
            const data = await this.cognito.signUp(params).promise();
            return data.UserSub;
        } catch (error) {
            console.log(error + " " + email + " " + name + " " + document + " ");
            throw error + " " + email + " " + name + " " + document + " ";
        }
    }

    // Outros métodos para login, verificação de e-mail, etc.

    async authenticate(document: string) {
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: process.env.COGNITO_CLIENT_ID_KEY,
            AuthParameters: {
                USERNAME: document,
                PASSWORD: document
            }
        };
    
        try {
            const data = await this.cognito.initiateAuth(params).promise();
            return data.AuthenticationResult.AccessToken; // Retorna o JWT
        } catch (error) {
            console.log(error + " " + document);
            throw error + " " + document;
        }
    }
}