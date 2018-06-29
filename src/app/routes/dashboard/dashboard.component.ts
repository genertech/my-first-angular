import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public translate: TranslateService) {
    this.i18nSetting();

  }

  ngOnInit() {
  }


  i18nSetting(){
    this.translate.addLangs(["en", "zh"]);

    let browserLang = this.translate.getBrowserLang();
    console.log(`browser language: ${browserLang}`);

    this.translate.use(browserLang.match(/en|zh/) ? 'zh' : 'en');
  }
}
