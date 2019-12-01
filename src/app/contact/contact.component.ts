import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
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
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50)
    ]),
    subject: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]),
    message: new FormControl('', [
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
  postUrl = 'http://lera.bilibov.com/contact_me/index.php';
  //postUrl = 'http://localhost/lera/contact/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Loading animation
  loading = false;
  // Email status
  emailStatus = null;

  /**
   * Constructor
   * @param http
   */
  constructor(private http: HttpClient) {

  }

  sendEmail() {
    this.loading = true;
    const contactMessage = {
      name: this.name.value,
      email: this.email.value,
      subject: this.subject.value,
      message: this.message.value,
    };
    this.http.post(this.postUrl, JSON.stringify({data: contactMessage}), this.httpOptions)
      .subscribe(
        response => {
          this.loading = false;
          if (response === 1) {
            this.emailStatus = true;
          } else {
            this.emailStatus = false;
          }
        }
      )
    ;
  }

  ngOnInit() {
  }

}
