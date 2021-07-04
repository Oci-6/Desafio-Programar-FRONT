import { NgModule } from "@angular/core";

import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    exports: [
        PasswordModule,
        InputTextModule,
        MenubarModule,
        CardModule,
        ButtonModule,
        DividerModule,
        MessageModule,
        MessagesModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        PanelMenuModule,
        BrowserAnimationsModule,
        TableModule,
        DialogModule,
        DropdownModule,
        ConfirmDialogModule,
    ],
    imports: [
      PasswordModule,
      InputTextModule,
      MenubarModule,
      CardModule,
      ButtonModule,
      DividerModule,
      MessageModule,
      MessagesModule,
      FormsModule,
      ReactiveFormsModule,
      ToastModule,
      PanelMenuModule,
      BrowserAnimationsModule,
      TableModule,
      DialogModule,
      DropdownModule,
      ConfirmDialogModule,
    ]
  })
  export class PrimeNGModule { }