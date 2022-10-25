import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Profesor,
  Estudiante,
} from '../models';
import {ProfesorRepository} from '../repositories';

export class ProfesorEstudianteController {
  constructor(
    @repository(ProfesorRepository) protected profesorRepository: ProfesorRepository,
  ) { }

  @get('/profesors/{id}/estudiante', {
    responses: {
      '200': {
        description: 'Profesor has one Estudiante',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Estudiante),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Estudiante>,
  ): Promise<Estudiante> {
    return this.profesorRepository.estudiante(id).get(filter);
  }

  @post('/profesors/{id}/estudiante', {
    responses: {
      '200': {
        description: 'Profesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estudiante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Profesor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {
            title: 'NewEstudianteInProfesor',
            exclude: ['id'],
            optional: ['profesorId']
          }),
        },
      },
    }) estudiante: Omit<Estudiante, 'id'>,
  ): Promise<Estudiante> {
    return this.profesorRepository.estudiante(id).create(estudiante);
  }

  @patch('/profesors/{id}/estudiante', {
    responses: {
      '200': {
        description: 'Profesor.Estudiante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {partial: true}),
        },
      },
    })
    estudiante: Partial<Estudiante>,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.profesorRepository.estudiante(id).patch(estudiante, where);
  }

  @del('/profesors/{id}/estudiante', {
    responses: {
      '200': {
        description: 'Profesor.Estudiante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.profesorRepository.estudiante(id).delete(where);
  }
}
