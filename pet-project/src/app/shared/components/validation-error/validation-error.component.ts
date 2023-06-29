import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, combineLatest, debounceTime, map } from 'rxjs';
import { AppValidators } from 'src/app/core/utils/app-validators';

@UntilDestroy()
@Component({
  selector: 'app-validation-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationErrorComponent {
  visible$: Observable<boolean>;

  @Input({ required: true })
  control: AbstractControl;

  private setErrorVisibility(): void {
    this.visible$ = combineLatest([
      this.control.valueChanges,
      this.control.statusChanges,
    ]).pipe(
      untilDestroyed(this),
      debounceTime(50),
      map(([, status]) => status === 'INVALID' && this.control.touched)
    );
  }

  get validatorName(): Lowercase<keyof typeof AppValidators> | null {
    const keys = Object.keys(this.control.errors);
    return keys?.length
      ? (keys[0] as Lowercase<keyof typeof AppValidators>)
      : null;
  }

  get errorText(): string {
    switch (this.validatorName) {
      case 'maxlength':
        return `Максимальная длина поля ${
          this.control.errors[this.validatorName].requiredLength
        } символов`;
      case 'required':
        return `Заполните обязательное поле`;
      case 'pattern':
        return `Введите корректное значение`;
      case 'minlength':
        console.log(this.control.value);
        return `Минимальная длина поля ${
          this.control.errors[this.validatorName].requiredLength
        } символов`;
      default:
        return null;
    }
  }

  ngOnChanges(): void {
    this.setErrorVisibility();
  }
}
