import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service';
import { take } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'test-view',
  templateUrl: 'test-view.page.html',
  styleUrls: ['test-view.page.scss']
})
export class TestViewPage implements OnInit {

    private static self: TestViewPage;
    private storage_data = null;
    public data = {employees_data:[],companies_data:[]};
    public months = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    public search_value1 = null;
    public search_value2 = null;
    public is_desc: boolean = false;
    public from_date = new Date("2018-01-01");
    public to_date = new Date("2018-01-31");
    

    constructor(private dataSrvc: DataService,
        private spinner: NgxSpinnerService,
        private datePipe: DatePipe) {
      console.log("constructor");
      TestViewPage.self = this;
      this.storage_data = JSON.parse(localStorage.getItem("data"));
    }

    ngOnInit() {
        this.getData();
    }

    public refreshData(){
        this.storage_data = null;
        localStorage.clear();
        this.getData();
    }

    private getData(){
        this.is_desc = true;
        if(this.storage_data === null || typeof this.storage_data === "undefined"){
            this.spinner.show();
            let from = this.datePipe.transform(this.from_date, 'yyyy-MM-dd');
            let to = this.datePipe.transform(this.to_date, 'yyyy-MM-dd');
            this.dataSrvc.getData(from, to).pipe(take(1)).subscribe(
                (result: any) => {
                    this.data = result.data;
                    this.storage_data = result.data;
                    this.sort(this.is_desc);
                    localStorage.setItem("data",JSON.stringify(result.data));
                    this.spinner.hide();
                },
                error => {
                    this.spinner.hide();
                    Swal.fire({
                        title: "Data loding failed",
                        text: "Data loading failed. Please try again or contact support",
                        type: 'error',
                        heightAuto: false,
                        confirmButtonText: "OK"
                    }); 
                },
                () => {
                  // 'onCompleted' callback.
                }
            )
        }else{
            this.sort(this.is_desc);
            this.data = this.storage_data;
        }   
    }

    public sort(val){
        this.is_desc = val;
        this.months.forEach(item => {
            if(this.data.companies_data.hasOwnProperty(item)){
                this.data.companies_data[item].sort(function(a, b){
                    var keyA = a.working_hours_total,
                        keyB = b.working_hours_total;
    
                    if(keyA < keyB) 
                    {      
                        if(TestViewPage.self.is_desc){
                            return 1;
                        }else{
                            return -1;
                        }                      
                    }
                    if(keyA > keyB) 
                    {
                        if(TestViewPage.self.is_desc){
                            return -1;
                        }else{
                            return 1;
                        }       
                    }
                    return 0;
                });
            }
        }); 
    }


}
