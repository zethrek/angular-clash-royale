import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlayersService} from '../players.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})

export class PlayersComponent implements OnInit {

  player: any;
  searchPlayer: FormGroup;
  submitted = false;
  playerTag: string;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayersService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
     this.searchPlayer = this.formBuilder.group({
       playerTag: ['', Validators.required]
     });
  }

  // convenience getter for easy access to form fields
  get f() { return this.searchPlayer.controls; }

  onSubmit(): void {
    console.log(this.playerTag);
    const tagSanitizado = this.playerTag.replace('#', '%23');
    this.playerService.getPlayer(tagSanitizado)
      .subscribe(player => this.player = player);
  }

  getHero(value: any){

  }
}
