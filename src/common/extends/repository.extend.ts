import { Repository } from 'typeorm';

export class RepositoryExtend<RepositoryType, EntityType> {
  readonly _repo: Repository<RepositoryType>;

  protected constructor(repository: Repository<RepositoryType>) {
    this._repo = repository;
  }

  protected async getItem(queryString: string): Promise<EntityType | null> {
    const result = await this._repo.query(queryString);

    return result?.length ? result[0] : null;
  }

  protected async getList(queryString: string): Promise<EntityType[]> {
    const result = await this._repo.query(queryString);

    return result?.length ? result[0] : [];
  }
}
