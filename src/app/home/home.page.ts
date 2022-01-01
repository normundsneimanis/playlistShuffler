import { Component } from '@angular/core';
import { Genre } from '../shared/genre';
import { Storage } from '@ionic/storage';
import { Platform, IonRouterOutlet, ToastController, LoadingController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  errMess: string;
  genresMessage: string = "No Genres added";
  playlistsMessage: string = "Playlists setup needed";
  generateMessage: string = "";
  settingsOk: boolean = false;
  genres: Genre[];
  loading: any = null;

  constructor(private storage: Storage,
      private file: File,
      private routerOutlet: IonRouterOutlet,
      private toastCtrl: ToastController,
      private splashScreen: SplashScreen,
      private loadingCtrl: LoadingController,
      private platform: Platform) {
        this.platform.backButton.subscribeWithPriority(-1, () => {
          if (!this.routerOutlet.canGoBack()) {
            navigator['app'].exitApp();
          }
        });
        this.splashScreen.hide();
  }

  ionViewWillEnter() {
    this.genres = [];
    this.storage.get('genres').then(genres => {
      if (genres) {
        this.genres = genres;
        this.genresMessage = this.genres.length + " genres added";
        let lengthOk = 1;
        for (let i = 0; i < this.genres.length; ++i) {
          if (!this.genres[i].playlists.length) {
            lengthOk = 0;
          }
        }
        if (lengthOk) {
          this.playlistsMessage = "Playlists added";
          this.settingsOk = true;
        } else {
          this.playlistsMessage = "Playlists setup needed";
          this.settingsOk = false;
        }
        if (! genres.length) {
          this.playlistsMessage = "Playlists setup needed";
          this.settingsOk = false;
        }
      } else {
        this.genresMessage = "No Genres added";
        this.playlistsMessage = "Playlists setup needed";
        this.settingsOk = false;
      }
    }, reason => {
      console.log("Failed to read genres from storage: " + reason);
    });
  }

  shuffle(a: string[]) {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
  }

  async generate() {
    if (!this.loading) {
      this.loading = await this.loadingCtrl.create({
        message: 'Creating, please wait ...'
      });
      await this.loading.present();
    }

    // let loggingString = "";
    let outputString = "#EXTM3U\n";
    let genreFiles = {};
    let sourcePlaylists = [];
    let sourcePlaylistCount = [];
    let sourcePlaylistReuse = [];
    let sourcePlaylistIters = [];
    for (let genre of this.genres) {
      genreFiles[genre.name] = [];
      for (let pl of genre.playlists) {
        let result = await this.listDir(pl.path);;
        genreFiles[genre.name] = genreFiles[genre.name].concat(result);
      }

      genreFiles[genre.name] = this.shuffle(genreFiles[genre.name]);
      console.log("Playlist " + JSON.stringify(genre.name) + ": " + JSON.stringify(genreFiles[genre.name].length) + " Files: " + JSON.stringify(genreFiles[genre.name]));
      // loggingString += "Playlist " + JSON.stringify(genre.name) + ": " + JSON.stringify(genreFiles[genre.name].length) + " Files: " + JSON.stringify(genreFiles[genre.name]) + "\n";
      sourcePlaylists.push(genreFiles[genre.name]);
      sourcePlaylistCount.push(genre.numSongs);
      sourcePlaylistReuse.push(0);
      sourcePlaylistIters.push(0);
    }

    let ended = false;
    while(true) {
      for (let sourcePlaylist = 0; sourcePlaylist < sourcePlaylists.length; ++sourcePlaylist) {
        let i = 0;
        while (i < sourcePlaylistCount[sourcePlaylist]) {
          if (sourcePlaylistIters[sourcePlaylist] + i >= sourcePlaylists[sourcePlaylist].length) {
            break;
          }
          // loggingString += "Adding file " + sourcePlaylists[sourcePlaylist][sourcePlaylistIters[sourcePlaylist] + i] + "\n";
          outputString += sourcePlaylists[sourcePlaylist][sourcePlaylistIters[sourcePlaylist] + i] + "\n";
          i++;
        }
        sourcePlaylistIters[sourcePlaylist] = sourcePlaylistIters[sourcePlaylist] + i + 1;
        if (sourcePlaylistIters[sourcePlaylist] >= sourcePlaylists[sourcePlaylist].length) {
          ended = true;
          break;
        }
      }
      if (ended) {
        break;
      }
    }

    // loggingString += "=========> Writing " + JSON.stringify(outputString);
    // this.file.writeFile(this.file.externalRootDirectory + "Download",
    //   "logs.txt",
    //   `${loggingString}`,
    //   { replace: true }
    // ).then(async res => {
    //
    // });

    this.file.writeFile(this.file.externalRootDirectory + "Download",
      "playlist.m3u8",
      `${outputString}`,
      { replace: true }
    ).then(async res => {
      if (this.loading) {
        this.loading.dismiss();
        this.loading = null;
      }
      const toast = await this.toastCtrl.create({
        message: 'Created playlist Downloads/playlist.m3u8',
        duration: 5000});
      toast.present();
      this.generateMessage = "Created playlist Downloads/playlist.m3u8";
    }).catch(async err => {
      if (this.loading) {
        this.loading.dismiss();
        this.loading = null;
      }
      const toast = await this.toastCtrl.create({
        message: 'Failed to create playlist',
        duration: 5000});
      toast.present();
    });
  }

  listDir(folder: string): Promise<string[]> {
    return new Promise(async resolve=>{
      let directories = [];
      await this.platform.ready().then(async () => {
        await this.file.listDir(this.file.externalRootDirectory, folder).then(async res => {
          for (let entry of res) {
            if (entry.isFile) {
              directories.push(entry.toURL());
            } else if (entry.isDirectory) {
              await this.listDir(entry.fullPath.substring(1)).then(res => {
                directories = directories.concat(res);
              });
            }
          }
        }).catch(err => this.errMess = "Error reading directory: " +
          JSON.stringify(this.file.externalRootDirectory) +
          JSON.stringify(folder) +
          JSON.stringify(err));
      });

      resolve(directories);
    })
  }

}
