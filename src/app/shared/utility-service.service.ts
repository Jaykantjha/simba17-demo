import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private router: Router) { }

  /**
   * This method ensures that the hash value is properly calculated and also limits it to a 
   * 32-bit integer using the bitwise AND operation with 0xFFFFFFFF.
   * @param value string
   * @returns number
   */
  generateHash(value: string): number {
    return Array.from(value).reduce((hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0) & 0xFFFFFFFF;
  }

  decryptString(value: string) {
    return CryptoJS.AES.decrypt(value,
      CryptoJS.enc.Utf8.parse("8080808080808080"),
      {
        keySize: 128,
        iv: CryptoJS.enc.Utf8.parse("8080808080808080"),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
  }

  encryptData(payload: any) {
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(payload),
      CryptoJS.enc.Utf8.parse('8080808080808080'),
      {
        keySize: 128 / 8,
        iv: CryptoJS.enc.Utf8.parse("8080808080808080"),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();

  }

  sessionDecryption(sessionKey: string) {
    const item = sessionStorage.getItem(sessionKey);
    if (item) {
      return this.decryptString(item);
    } else {
      return null;
    }
  }

  sessionEncryption(sessionKey: string, value: any) {
    sessionStorage.setItem(sessionKey, value);
  }

  sessionData(sessionKey: string) {
    return sessionStorage.getItem(sessionKey);
  }

  handleBackEvent() {
    const stringfiedDipData = this.sessionDecryption('DIPdata') || '{}';
    const DIPData = JSON.parse(stringfiedDipData);
    if (this.router.url.includes('make-payment')) {
      window.location.href = environment.dipDomain;
    } else if (!DIPData?.UserID) {
      this.router.navigate(['/dashboard/landing']);
      return;
    }
    const { UserID, Page, SessionID, DIPUserId } = DIPData;
    const formData = {
      Status: "200",
      Message: "",
      Agreement_Code: UserID,
      Source: "DIP",
      Page: Page,
      SessionID: SessionID,
      DIPUserId: DIPUserId
    };

    const formHtml = `<html><head><title>Window with Blob</title></head><body onload='document.forms["form"].submit()'>
          <form name='form' action ='${environment.dipDomain}/Dashboard/RedirectToDIP' method='post'>
            <input type='hidden' name='postvalue' value='${JSON.stringify(formData)}'>
          </form>
        </body></html>`;

    const winUrl = URL.createObjectURL(new Blob([formHtml], { type: 'text/html' }));
    window.location.href = winUrl;
  }

}
