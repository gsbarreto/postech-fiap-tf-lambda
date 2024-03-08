import User from "../entity/user";
import AwsService from "../services/awsService";


export class AuthenticateUseCase {

    cognitoService: AwsService;
    constructor() {
        this.cognitoService = new AwsService();
    }


    async authenticate(userData: User): Promise<any> {
        
        const { document, email, name, created } = userData;
        try {
            if (created){
                const tokenAcess = await this.cognitoService.authenticate(document);    
                return tokenAcess;
            }
            else{
                const userId = await this.cognitoService.registerUser(email, document, name);
                return userId;
            }
            
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return null;
        }
    }
}