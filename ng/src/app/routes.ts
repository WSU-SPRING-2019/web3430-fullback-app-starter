import { Routes } from '@angular/router'
import { BooksComponent } from './books/books.component';
import { BookFormComponent } from './books/book-form.component';
import { LoginFormComponent } from './users/login-form-component';
import { RegisterFormComponent } from './users/register-form.component';
import { AuthenticationGuard } from './services/authentication.guard';
export const routes : Routes = [
    {path: 'books', component: BooksComponent},
    {path: 'books/new', component: BookFormComponent, canActivate: [AuthenticationGuard]},
    {path: 'books/:id/edit', component: BookFormComponent, canActivate: [AuthenticationGuard]},
    {path: 'login', component: LoginFormComponent},
    {path: 'register', component: RegisterFormComponent},
    {path: '', redirectTo: '/books', pathMatch: 'full'}
]