import {Entity, model, property} from '@loopback/repository';

@model()
export class Asignatura extends Entity {
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
    type: 'number',
    required: true,
  })
  intensidadHoraria: number;

  @property({
    type: 'string',
  })
  profesorId?: string;

  constructor(data?: Partial<Asignatura>) {
    super(data);
  }
}

export interface AsignaturaRelations {
  // describe navigational properties here
}

export type AsignaturaWithRelations = Asignatura & AsignaturaRelations;
