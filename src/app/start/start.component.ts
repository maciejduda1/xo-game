import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  playerName: string;
  nameInputValue = '';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.playerName = form.value.name;
    this.router.navigate(['game', this.playerName]);
  }

}
