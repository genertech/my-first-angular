import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  buttons: Array<any>;

  constructor(public translate: TranslateService) {
    this.i18nSetting();

  }

  ngOnInit() {
    this.buttons = [
      {
        name: '首页',
        routerLink: '/main-page'
      },
      {
        name: '虚拟车(3782)',
        routerLink: '/equip-structure/3782'
      },
      {
        name: '故障分析',
        routerLink: '/fault-analysis'
      },
      {
        name: '故障诊断',
        routerLink: '/fault-diagnosis'
      },
      {
        name: '故障诊断',
        routerLink: '/fault-prediction'
      },
      {
        name: '运维决策',
        routerLink: '/maintenance-decision'
      },
    ];
  }


  i18nSetting(){
    this.translate.addLangs(["en", "zh"]);

    let browserLang = this.translate.getBrowserLang();
    console.log(`browser language: ${browserLang}`);

    this.translate.use(browserLang.match(/en|zh/) ? 'zh' : 'en');
  }
}
