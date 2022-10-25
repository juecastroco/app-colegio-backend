import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Asignatura} from './asignatura.model';
import {Estudiante} from './estudiante.model';

@model({settings: {strict: false}})
export class Profesor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  area: string;

  @property({
    type: 'boolean',
    required: true,
  })
  catedra: boolean;

  @hasMany(() => Asignatura)
  asignaturas: Asignatura[];

  @hasOne(() => Estudiante)
  estudiante: Estudiante;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Profesor>) {
    super(data);
  }
}

export interface ProfesorRelations {
  // describe navigational properties here
}

export type ProfesorWithRelations = Profesor & ProfesorRelations;
