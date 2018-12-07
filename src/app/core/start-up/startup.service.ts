import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {PortletUtils} from "../../utils/PortletUtils";
import {PHMUtils} from "../../utils/PHMUtils";

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(private httpClient: HttpClient, private portletUtils: PortletUtils, private phmUtils: PHMUtils) {}

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {

        this.httpClient.get('assets/app-base-properties.json').subscribe(
          (appData) => {

            const res: any = appData;

            // application data
            this.portletUtils.setUseRelativeUrl(res.remotePortletProperties.useRelativeUrl);
            this.portletUtils.setServerIp(res.remotePortletProperties.serverIp);
            this.portletUtils.setServerPort(res.remotePortletProperties.serverPort);
            this.portletUtils.setPortletLayoutId(res.remotePortletProperties.portletLayoutId);
            this.portletUtils.setPluginPortletName(res.remotePortletProperties.pluginPortletName);

            this.phmUtils.setUseRelativeUrl(res.remotePHMProperties.useRelativeUrl);
            this.phmUtils.setServerIp(res.remotePHMProperties.serverIp);
            this.phmUtils.setServerPort(res.remotePHMProperties.serverPort);
            this.phmUtils.setCtx(res.remotePHMProperties.ctx);

          },
          () => {},
          () => {
            resolve(null);
          },
        );
    });
  }
}
