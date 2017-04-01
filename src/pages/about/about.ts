import { Component } from '@angular/core';

import { NavController , Platform} from 'ionic-angular';
import {SQLite} from "ionic-native";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public database: SQLite;
    public stats: Array<Object>;
 
    constructor(private navController: NavController, private platform: Platform) {
        this.platform.ready().then(() => {
            this.database = new SQLite();
            this.database.openDatabase({name: "stats.db", location: "default"}).then(() => {
                this.refresh();
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });
    }
 
    public add() {
        this.database.executeSql("INSERT INTO stats (games, goals, assists, minutes, yellow, red) VALUES (?, ?, ?, ?, ?, ?)", []).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data));
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err));
        });
    }

     public refresh() {
        this.database.executeSql("SELECT * FROM stats", []).then((data) => {
            this.stats = [];
            if(data.rows.length > 0) {
                for(var i = 0; i < data.rows.length; i++) {
                    this.stats.push({firstname: data.rows.item(i).firstname, lastname: data.rows.item(i).lastname});
                }
            }
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        });
    }

}
