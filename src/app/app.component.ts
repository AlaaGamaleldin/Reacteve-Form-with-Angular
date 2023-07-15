import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-form';
  reactiveForm: FormGroup;

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
    console.log(this.reactiveForm);
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
