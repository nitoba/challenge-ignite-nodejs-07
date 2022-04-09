import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOne({ where: { id: user_id }, relations: ['games'] });
    if (user) {
      return user;
    } else {
      throw new Error('User not found');
    }
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query('SELECT * FROM users ORDER BY users.first_name'); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const users = await this.repository
    .query(`SELECT first_name, last_name, email FROM users WHERE LOWER(first_name) = '${first_name.toLowerCase()}' AND LOWER(last_name) = '${last_name.toLowerCase()}'`); // Complete usando raw query
    return users;
  }
}
