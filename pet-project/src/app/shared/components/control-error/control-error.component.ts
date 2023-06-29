import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
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

  @Input()
  control: AbstractControl;

  private setErrorText(): void {
    this.errorText$ = combineLatest([
      this.control.valueChanges,
      this.control.statusChanges,
    ]).pipe(
      untilDestroyed(this),
      debounceTime(50),
      switchMap(([, status]) => {
        if (status === 'INVALID' && this.control.touched) {
          const error = this.validationService.getFirstControlError(this.control);
          console.log(error);
          return of(error.message);
        }
        return of(null);
      })
    );
  }

  ngOnChanges(): void {
    this.setErrorText();
  }
}
