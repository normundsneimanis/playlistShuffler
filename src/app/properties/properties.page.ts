import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { Genre } from '../shared/genre';
import { Storage } from '@ionic/storage';
import { Platform, AlertController, ToastController } from '@ionic/angular';
import { File, Entry } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {

  genre: Genre;
  errMess: string;

  directories = [];
  folder = '';
  copyFile: Entry = null;
  shouldMove = false;


  constructor(
    private route: ActivatedRoute,
    private storage: Storage) {

      // this.folder = this.route.snapshot.paramMap.get('folder') || '';
      const id: string = this.route.snapshot.params.id;

      this.storage.get('genres').then(genres => {
        if (genres) {
          this.genre = genres[id];
        }
      }, reason => {
        console.log("Failed to read genres from storage: " + reason);
        return;
      });

  }

  ngOnInit() { }

}
