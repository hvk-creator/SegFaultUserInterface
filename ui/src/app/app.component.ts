import { Component } from '@angular/core';
import { Config } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Segfault';
  router: Router

  constructor(private snackBar: MatSnackBar, router: Router) {
    this.router = router
    this.fetchConfig()
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    const LightThemeSetExplicity = localStorage.getItem("theme") == "light" ? true : false
    if (darkThemeMq.matches && !LightThemeSetExplicity) {
      document.documentElement.setAttribute('data-theme', "dark");
      localStorage.setItem('theme', "dark")
    }

    // Duplicate session detection mechanism
    const tabIdKey = "tabId"
    const initTabId = (): string => {
      const id = sessionStorage.getItem(tabIdKey)
      if (id) {
        sessionStorage.removeItem(tabIdKey)
        return id
      }
      return Math.random().toString(16).substring(2, 18)
    }

    const tabId = initTabId()
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem(tabIdKey, tabId)
    })

    Config.TabId = tabId
  }

  async fetchConfig() {
    let response = fetch(Config.ApiEndpoint + "/config", { "method": "GET" })
    let rdata = await response
    if (rdata.status == 200) {
      let config = await rdata.json()
      Config.MaxOpenTerminals = config.max_terminals
      Config.DesktopDisabled = config.desktop_disabled
      Config.BuildHash = config.build_hash
      Config.BuildTime = config.build_time
      if (config.ws_ping_interval) {
        if (config.ws_ping_interval >= 5) {
          Config.WSPingInterval = config.ws_ping_interval
        }
      }
      if (config.available_endpoints) {
        if (Array.isArray(config.available_endpoints) && config.available_endpoints.length > 0) {
          Config.AllowedEndpoints = config.available_endpoints
        }
      }
    } else {
      this.snackBar.open("Failed to fetch config from server !", "OK", {
        duration: 2 * 1000
      });
    }
  }

}
