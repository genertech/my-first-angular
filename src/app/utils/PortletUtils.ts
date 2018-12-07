import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PortletUtils {

  private _useRelativeUrl: boolean;
  private _serverIp: string;
  private _serverPort: string;
  private _p_l_id: string;
  private _pluginPortletName: string;

  public createResourceURL(useRelativeUrl: boolean, serviceIp: string, serverPort: string, p_l_id: string, p_p_id: string, pluginPortletName: string, resourceId: string):string {

    //http://192.168.3.151:8080/c/portal/layout?p_l_id=21704&p_p_cacheability=cacheLevelPage&p_p_id=heDetailSysPortlet_WAR_jetsphmportlet&p_p_lifecycle=2&p_p_resource_id=queryHeDetailSys

    return ( !useRelativeUrl ? `http://${serviceIp}:${serverPort}` : '' ) + `/c/portal/layout?p_p_cacheability=cacheLevelPage&p_p_lifecycle=2&p_l_id=${p_l_id}&p_p_id=${p_p_id}_WAR_${pluginPortletName}&p_p_resource_id=${resourceId}`;

  }

  public createDefaultResourceURL(p_p_id: string, resourceId: string):string {

    return ( !this._useRelativeUrl ? `http://${this._serverIp}:${this._serverPort}` : '' ) +  `/c/portal/layout?p_p_cacheability=cacheLevelPage&p_p_lifecycle=2&p_l_id=${this._p_l_id}&p_p_id=${p_p_id}_WAR_${this._pluginPortletName}&p_p_resource_id=${resourceId}`;

  }

  public setUseRelativeUrl(value: boolean) {
    this._useRelativeUrl = value;
  }

  public setServerIp(value: string) {
    this._serverIp = value;
  }

  public setServerPort(value: string) {
    this._serverPort = value;
  }

  public setPortletLayoutId(value: string) {
    this._p_l_id = value;
  }

  public setPluginPortletName(value: string) {
    this._pluginPortletName = value;
  }
}
