import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from '../shared/genre';
import { Storage } from '@ionic/storage';
import { Platform, AlertController, ToastController, IonItemSliding } from '@ionic/angular';
import { File, Entry } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-pickdirectory',
  templateUrl: './pickdirectory.page.html',
  styleUrls: ['./pickdirectory.page.scss'],
})
export class PickdirectoryPage implements OnInit {

  genres: Genre[];
  id: number;
  errMess: string;

  directories = [];
  folder = '';
  prevFolder = '';
  prevFile: Entry;
  shouldMove = false;

//https://devdactic.com/ionic-4-file-explorer/

  constructor(
    private platform: Platform,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private fileOpener: FileOpener,
    private route: ActivatedRoute,
    private router: Router,
    private file: File,
    private storage: Storage) {

      this.id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.prevFolder = this.folder;
      this.folder = this.route.snapshot.paramMap.get('folder') || '';

      this.loadDocuments();
  }

  ionViewWillEnter() {
    this.genres = [];
    this.storage.get('genres').then(async genres => {
      if (genres) {
        this.genres = genres;
      } else {
        this.errMess = "Genres empty in storage!";
      }
    }, reason => {
      this.errMess = "Failed to read genres from storage: " + reason;
    });
  }

  ngOnInit() {

  }

  deletePlaylist(gid: number, pid: number) {
    this.genres[gid].playlists.splice(pid, 1);
    this.storage.set('genres', this.genres);
  }

  async itemClicked(file: Entry) {
    // Open the file or folder
    this.prevFile = file;
    if (!file.isFile) {
      let pathToOpen =
        this.folder != '' ? this.folder + '/' + file.name : file.name;
      let folder = encodeURIComponent(pathToOpen);
      this.router.navigateByUrl(`/pickdirectory/${this.id}/${folder}`, { skipLocationChange: true });
    }
  }

  loadDocuments() {
    this.platform.ready().then(() => {
      this.file.listDir(this.file.externalRootDirectory, this.folder).then(res => {
        this.directories = res;
      }).catch(err => this.errMess = "Error reading directory: " +
        JSON.stringify(this.file.externalRootDirectory) +
        "/" + JSON.stringify(this.folder) +
        JSON.stringify(err));
    });
  }

  async selectThis(file: Entry, item: IonItemSliding) {
    item.close();
    if (this.genres) {
      for (let i = 0; i < this.genres.length; i++) {
        if (!('playlists' in this.genres[i])) {
          this.genres[i].playlists = [];
        }
        if (i === this.id) {
          this.genres[i].playlists.push({name: file.name, path: this.folder + '/' + file.name});

          const toast = await this.toastCtrl.create({
            message: 'Directory ' + file.name + ' added successfully: ' + this.folder + '/' + file.name,
            duration: 5000});
          toast.present();
          console.log('Directory ' + file.name + ' added successfully: ' + this.folder + '/' + file.name);
        }
        await this.storage.set('genres', this.genres);
      }
    }
  }

}
