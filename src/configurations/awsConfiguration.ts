import AWS from 'aws-sdk';

export class AwsConfiguration {
    cognito: any;
    constructor() {
        // Configuração do AWS Cognito
        const config = {
            accessKeyId: process.env.AWS_CHAVE_KEY,
            secretAccessKey: process.env.AWS_CHAVE_SECRET,
            region: process.env.AWS_REGION_KEY
        };

        AWS.config.update(config);
        this.cognito = new AWS.CognitoIdentityServiceProvider();
    }

    getCognito() {
        return this.cognito;
    }
}
