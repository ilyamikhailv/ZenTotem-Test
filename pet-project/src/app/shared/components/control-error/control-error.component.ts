import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { combineLatest, Observable, map } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { CommonModule } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ControlErrorComponent implements OnChanges {
  constructor(private validationService: FormValidationService) {}

  errorText$: Observable<string>;

  @Input({ required: true })
  control: AbstractControl;

  private setErrorText(): void {
    this.errorText$ = combineLatest([
      this.control.valueChanges,
      this.control.statusChanges,
    ]).pipe(
      untilDestroyed(this),
      debounceTime(50),
      map(([, status]) => {
        if (status === 'INVALID' && this.control.touched) {
          const error = this.validationService.getFirstControlError(
            this.control
          );
          return error.message;
        }
        return null;
      })
    );
  }

  ngOnChanges(): void {
    this.setErrorText();
  }
}
