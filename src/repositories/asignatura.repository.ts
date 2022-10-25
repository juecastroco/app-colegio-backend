import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Asignatura, AsignaturaRelations} from '../models';

export class AsignaturaRepository extends DefaultCrudRepository<
  Asignatura,
  typeof Asignatura.prototype.id,
  AsignaturaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Asignatura, dataSource);
  }
}
