import { Component, OnInit } from '@angular/core';
import { Genre } from '../shared/genre';
import { Playlist } from '../shared/playlist';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-pickproperties',
  templateUrl: './pickproperties.page.html',
  styleUrls: ['./pickproperties.page.scss'],
})
export class PickpropertiesPage implements OnInit {

  genres: Genre[];

  constructor(private storage: Storage) { }

  ionViewWillEnter() {
    this.genres = [];
    this.storage.get('genres').then(genres => {
      if (genres) {
        this.genres = genres;
        for (let i = 0; i < this.genres.length; i++) {
          if (!('playlists' in this.genres[i])) {
            this.genres[i].playlists= [];
          }
        }
        console.dir(this.genres);
      }
    }, reason => {
      console.log("Failed to read genres from storage: " + reason);
    });
  }

  ngOnInit() { }

}
