import { FormControl } from '@angular/forms';

export type ProfileForm = {
  id: FormControl<number>;
  email: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  phoneNumber: FormControl<string>;
  websiteUrl: FormControl<string>;
};
