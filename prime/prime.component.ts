import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prime',
  templateUrl: './prime.component.html',
  styleUrls: ['./prime.component.css']
})
export class PrimeComponent implements OnInit {

  // some attributes for the form inputs:
  min;
  max;

  last;

  // some attributes for the response:
  status;
  result;
  error;

  constructor(private http: HttpClient) { 
  }

  ngOnInit() {
  }

  doPrime(form: HTMLFormElement) {
    this.min = form.elements["min"].value;
    this.max = form.elements["max"].value;
    this.doAjax();
    return false;
  }

  doPrimeNext(max) {
    this.min = this.last;
    this.max = max.value;
    this.doAjax();
    return false;
  }

  doAjax() {
    this.http.get("http://localhost:4413/ProjF/Prime.do?min=" + this.min + "&max=" + this.max)
      .subscribe(data => {
        let resp = JSON.parse(JSON.stringify(data));
        this.status = resp.status;
        this.result = resp.result;
        if (this.status == 1)
        {
          this.last = resp.result
        }
        this.error = resp.error;
      });
  }
}
