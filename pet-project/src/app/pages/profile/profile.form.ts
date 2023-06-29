import { FormControl } from '@angular/forms';

export type ProfileForm = {
  email: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  phoneNumber: FormControl<string>;
  websiteUrl: FormControl<string>;
};
