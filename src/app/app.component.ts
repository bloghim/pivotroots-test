import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as _ from "underscore";
import { has, keys } from "underscore";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  Object = Object;
  title = "pivotroots-test";
  monthly: any = [];
  yearly: any = [];
  monthlyFilterData: any;
  monthlyDisplayData: any = [];
  yearlyDisplayData: any;

  constructor(private httpClient: HttpClient) {}
  ngOnInit() {
    this.httpClient.get("assets/data.json").subscribe((data: any = []) => {
      this.monthly = data[0].monthly;
      this.yearly = data[1].yearly;
      console.log(data);
      this.filterMonthData("Grade 6");
      this.filterYearData("Grade 6");
    });
  }

  filterMonthData(grade: string) {
    let finaldata;
    this.monthlyFilterData = _.findWhere(this.monthly, { grade: grade });
    _.each(this.monthlyFilterData, function (key, value) {
      if (value == "boards") {
        _.each(key, function (i, j) {
          finaldata = _.toArray(i);
        });
      }
    });
    this.monthlyDisplayData = finaldata;
  }

  filterYearData(grade: string) {
    return (this.yearlyDisplayData = _.findWhere(this.yearly, {
      grade: grade,
    }));
  }

  getTarget(target: any, hash: boolean) {
    if (hash) {
      return "#" + target.replace(/[^A-Z0-9]/gi, "_");
    } else {
      return target.replace(/[^A-Z0-9]/gi, "_");
    }
  }
}
