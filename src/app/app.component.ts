import { Component } from "@angular/core";
import { WebApiObservableService } from "./app.service";
import { NotificationsService } from "angular2-notifications";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "app";
  originalUrl;
  shortenedUrl = "";
  isUrlShortened = false;
  server_url = "http://localhost:8000/";
  public options = {
    position: ["top", "right"],
    showProgressBar: true,
    timeOut: 2000,
    lastOnBottom: true,
    clickToClose: true,
    preventDuplicates: true,
  };

  constructor(
    private spinner: NgxSpinnerService,
    private urlService: WebApiObservableService,
    private notifier: NotificationsService
  ) {}

  getShortenedUrl() {
    if (
      this.originalUrl == undefined ||
      this.originalUrl.length < 1 ||
      this.originalUrl == null
    ) {
      this.notifier.error("No URL was entered. Please Check and try again. ");
    } else {
      this.spinner.show();
      this.urlService
        .createService(this.server_url + "api/url/generateTinyUrl", {
          longUrl: this.originalUrl,
        })
        .subscribe(
          (response) => {
            if (JSON.parse(response._body).message == "Server Error") {
              this.isUrlShortened == false;
            } else {
              this.shortenedUrl = JSON.parse(response._body).data[0].shortUrl;
              this.spinner.hide();
              if (this.isUrlShortened == false) {
                this.isUrlShortened = true;
              }
            }
          },
          (error) => {
            this.spinner.hide();
            console.log(error);
          }
        );
    }
  }
}
