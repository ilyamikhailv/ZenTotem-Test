import { maxLength, required } from '@rxweb/reactive-form-validators';

export class AuthFormValidationModel {
  @required({ message: 'Введите обязательное поле' })
  @maxLength({ value: 128, message: 'Максимальная длина поля 128 символов' })
  login: string = null;

  @required({ message: 'Введите обязательное поле' })
  @maxLength({ value: 128, message: 'Максимальная длина поля 128 символов' })
  password: string = null;
}
