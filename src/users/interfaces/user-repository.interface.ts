export interface IUserRepository<T> {
  findOneByEmail(email: string): Promise<T>;
}
