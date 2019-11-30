import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  /**
   * Building form group and controllers
   */
  form = new FormGroup({
    name: new FormControl('Roma Bilibov', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    email: new FormControl('romabilibov@gmail.com', [
      Validators.email,
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50)
    ]),
    subject: new FormControl('Subject test', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]),
    message: new FormControl('Message test', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(450)
    ])
  });

  /**
   * Contact form member getters
   */
  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get subject() {
    return this.form.get('subject');
  }

  get message() {
    return this.form.get('message');
  }

  // url where the post will be sent
  postUrl = 'http://lera.bilibov.com/contact/';

  /**
   * Constructor
   * @param http
   */
  constructor(private http: HttpClient) {

  }

  sendEmail() {
    const contactMessage = {
      name: this.name.value,
      email: this.email.value,
      subject: this.subject.value,
      message: this.message.value,
    };
    console.log(JSON.stringify(contactMessage));
    this.http.post(this.postUrl, JSON.stringify(contactMessage))
      .subscribe(
        response => {
          console.log(response);
        }
      )
    ;
  }

  ngOnInit() {
  }

}
