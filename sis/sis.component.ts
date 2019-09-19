import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sis',
  templateUrl: './sis.component.html',
  styleUrls: ['./sis.component.css']
})
export class SisComponent implements OnInit {

  prefix;
  minGpa;
  sortBy;

  status;
  result;
  error;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  doSis(f: HTMLFormElement) {
    this.prefix = f.elements["prefix"].value;
    this.minGpa = f.elements["minGpa"].value;
    this.sortBy = f.elements["sortBy"].value;
    this.result = [];
    this.doAjax();
    return false;
  }

  doAjax() {
    this.http.get("http://localhost:4413/ProjF/Sis.do?prefix=" + this.prefix + "&minGpa=" + this.minGpa + "&sortBy=" + this.sortBy)
      .subscribe(data => {
        let resp = JSON.parse(JSON.stringify(data));
        this.status = resp.status;
        if (resp.status == 0) {
          this.error = resp.error;
          this.result = [];
        }
        else {
          for (let i = 0; i < resp.length; i++) {
            let e = resp[i];
            this.result.push(resp[i]);
          }
          this.error = "";
        }
      });
  }

}
