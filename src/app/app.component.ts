import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup,Validators } from '@angular/forms';
import { RegestretionForm } from './model/regestretion';
import { ApiService } from './serveis/API/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService){}
  title = 'reactive-form';
  reactiveForm: FormGroup;
  regestretionForm: RegestretionForm;

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      signUpForm: new FormGroup({
        fullName: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
        userName: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
        email: new FormControl(null, [Validators.required, Validators.email, this.noSpaceAllowed]),
        phone: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
        password: new FormControl(null),
      }),
      gender: new FormControl(null),
      skills: new FormArray([
        new FormControl(null, Validators.required),
      ])
    });
  }
  onSubmit(){
    console.log(this.reactiveForm.value.signUpForm);
    this.regestretionForm = this.reactiveForm.value.signUpForm
    console.log(this.regestretionForm)
    this.apiService.post<RegestretionForm>('users',this.regestretionForm).subscribe((user)=>{console.log(user);})
  }
  addSkill(){
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required));
  }
  noSpaceAllowed(control: FormControl){
     if(control.value != null && control.value.indexOf(' ') != -1){
      return {noSpaceAllowed: true};
     }
     return null;
  }
}
