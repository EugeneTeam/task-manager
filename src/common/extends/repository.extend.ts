import { Repository } from 'typeorm';
import { notProvidedType } from '../types/custom.types';

export class RepositoryExtend<RepositoryType, EntityType> {
  readonly _repo: Repository<RepositoryType>;

  protected constructor(repository: Repository<RepositoryType>) {
    this._repo = repository;
  }

  protected async getItem<T = notProvidedType>(
    queryString: string,
  ): Promise<T extends notProvidedType ? EntityType | null : T> {
    const result = await this._repo.query(queryString);

    return result?.length ? result[0] : null;
  }

  protected async getList(queryString: string): Promise<EntityType[]> {
    const result = await this._repo.query(queryString);

    return result?.length ? result[0] : [];
  }
}
