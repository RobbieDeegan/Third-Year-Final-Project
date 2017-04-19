import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite } from "ionic-native";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public database: SQLite;
    public stats: Array<Object>;
 
    constructor(private navController: NavController, private platform: Platform, storage: Storage) {

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
        this.database.executeSql("INSERT INTO stats (goals, assits) VALUES (?, ?, ?, ?, ?, ?)", []).then((data) => {
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
                    this.stats.push({goals: data.rows.item(i).goals, assists: data.rows.item(i).assists});
                }
            }
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        });
    }

}
