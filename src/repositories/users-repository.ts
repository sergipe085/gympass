export abstract class UsersRepository {
    abstract create(data: any): Promise<any>;
}