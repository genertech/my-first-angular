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
        name: '虚拟车(BF5001)',
        routerLink: '/equip-structure/CR400BF/CR400BF5001'
      },
      {
        name: '虚拟车DEMO(3C)',
        routerLink: '/equip-structure/CRH3C/DEMO'
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
        name: '故障预测',
        routerLink: '/fault-prediction'
      },
      {
        name: '健康评估',
        routerLink: '/health-evaluation'
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
