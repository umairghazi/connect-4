import { IUserDTO, IUserEntity } from '../interface';

export class UserDTOMap implements IUserDTO {
  constructor(entity: IUserEntity) {}
}
