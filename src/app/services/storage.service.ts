import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage,
    private platform: Platform) { }

  public set(key, value) {
    return this.storage.set(key, value);
  }
  public get(key) {
    return this.storage.get(key);
  }
  public async remove(key) {
    return this.storage.remove(key);
  }
  public clear() {
    this.storage.clear();
  }



}
