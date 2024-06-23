import { Component, NgZone, OnInit } from '@angular/core';
import { SendIntent } from 'send-intent';
import { SendIntentPlugin } from 'send-intent';
import { DeepLinkService } from './services/deep-link.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  result: string = '';

  constructor(private zone: NgZone, private deepLink: DeepLinkService) {
  }


  ngOnInit() {
    this.checkIntent();

    window.addEventListener('sendIntentReceived', () => {
      this.zone.run(() => {
        console.log('sendIntentReceived event triggered');
        this.checkIntent();
      });
    });
  }

  async checkIntent() {
    try {
      const result: any = await SendIntent.checkSendIntentReceived();
      if (result) {
        let res = JSON.stringify(result);
        console.log(res);
        this.result = res;
        this.deepLink.launchApp('com.thirumalai.otic');
        SendIntent.finish();
      }
    } catch (error) {
      console.error(error);
    }
  }
}
