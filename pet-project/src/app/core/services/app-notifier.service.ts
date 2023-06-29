import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AppNotifierService {
  constructor(private notifierService: ToastrService) {}

  success(text: string, title?: string): void {
    this.notifierService.success(text, title);
  }
  warning(text: string, title?: string): void {
    this.notifierService.info(text, title);
  }
  error(
    text: string,
    title = 'Произошла ошибка',
    closeOnBtnClick = true
  ): void {
    this.notifierService.error(text, title, {
      closeButton: true,
      disableTimeOut: closeOnBtnClick,
    });
  }
  closeAll():void{
    this.notifierService.clear();
  }
}
