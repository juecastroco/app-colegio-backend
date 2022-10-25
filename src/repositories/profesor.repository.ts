import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Profesor, ProfesorRelations, Asignatura, Estudiante} from '../models';
import {AsignaturaRepository} from './asignatura.repository';
import {EstudianteRepository} from './estudiante.repository';

export class ProfesorRepository extends DefaultCrudRepository<
  Profesor,
  typeof Profesor.prototype.id,
  ProfesorRelations
> {

  public readonly asignaturas: HasManyRepositoryFactory<Asignatura, typeof Profesor.prototype.id>;

  public readonly estudiante: HasOneRepositoryFactory<Estudiante, typeof Profesor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsignaturaRepository') protected asignaturaRepositoryGetter: Getter<AsignaturaRepository>, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>,
  ) {
    super(Profesor, dataSource);
    this.estudiante = this.createHasOneRepositoryFactoryFor('estudiante', estudianteRepositoryGetter);
    this.registerInclusionResolver('estudiante', this.estudiante.inclusionResolver);
    this.asignaturas = this.createHasManyRepositoryFactoryFor('asignaturas', asignaturaRepositoryGetter,);
    this.registerInclusionResolver('asignaturas', this.asignaturas.inclusionResolver);
  }
}
