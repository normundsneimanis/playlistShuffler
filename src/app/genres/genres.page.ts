import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Genre } from '../shared/genre';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.page.html',
  styleUrls: ['./genres.page.scss'],
})
export class GenresPage implements OnInit {
  genreForm: FormGroup;
  genres: Genre[];

  constructor(private formBuilder: FormBuilder,
      private router: Router,
      private storage: Storage) {
    this.genreForm = this.formBuilder.group({
      name: ['', Validators.required],
      numSongs: 3,
    });

    this.genres = [];
    this.storage.get('genres').then(genres => {
      if (genres) {
        this.genres = genres;
      }
    }, reason => {
      console.log("Failed to read genres from storage: " + reason);
    });
  }

  ngOnInit() {

  }

  deleteGenre(name: string) {
    let genres2: Genre[];
    genres2 = [];
    for (let i = 0; i < this.genres.length; i++) {
      if (this.genres[i].name !== name) {
        genres2.push(this.genres[i]);
      }
    }
    this.genres = genres2;
    this.storage.set('genres', genres2);
    // Reload page
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
  }

  onSubmit() {
    this.genreForm.value.playlists = [];
    console.log(JSON.stringify(this.genreForm.value));

    this.genres.push(this.genreForm.value);
    this.storage.set('genres', this.genres);
    this.genreForm.reset();
    this.genreForm.patchValue({'numSongs': 3});
  }

}
