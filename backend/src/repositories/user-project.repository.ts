import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {UserProject, UserProjectRelations} from '../models';

export class UserProjectRepository extends DefaultCrudRepository<
  UserProject,
  typeof UserProject.prototype.id,
  UserProjectRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(UserProject, dataSource);
  }
}
