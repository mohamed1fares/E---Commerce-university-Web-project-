import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../../app/core/models/user.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,

  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  email:any=''
  myForm= new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(2)]),
    phone: new FormControl('',[Validators.required, Validators.minLength(2)]),
    location: new FormControl('',[Validators.required, Validators.minLength(2)]),
    email: new FormControl(this.email),

  })

  constructor(private _user:AuthService,private _route:Router){}
  decoded:any|User
  ngOnInit(): void {
    const token:any   = this._user.getToken()
     this.decoded = jwtDecode(token);
    // console.log(this.decoded);
    this.email=this.decoded.email
    // console.log(this.decoded.email);
    
  }
  showMessage: boolean = false;
  messageText: string = '';
  success: boolean = false;

  

  onSubmit(){
    if(confirm("you will logout and login again")){
      this._user.editUser(this.myForm.value,this.decoded.id).subscribe({
        next: ()=> {console.log('done')
          this.messageText = 'Done save';
          this.success = true;
          this.showMessage = true;
          setTimeout(() => this.showMessage = false, 2500);
          this._user.logout();
          this._route.navigate(['login'])
        },
        error : (err)=> {console.log(err)
          this.messageText = 'Failed to  submit.';
          this.success = false;
          this.showMessage = true;
          setTimeout(() => this.showMessage = false, 2500);
        }
        
        
      })
      console.log(this.myForm.value);
    }
    



    
    
    
      
  }

}
