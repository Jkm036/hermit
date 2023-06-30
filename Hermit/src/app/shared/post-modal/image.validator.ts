import { AbstractControl } from "@angular/forms";
import {Observable, Observer} from "rxjs";
export const imageValidator= (control: AbstractControl):Promise<{[key:string]:any}> | Observable<{[key:string]:any}> =>{

    const file = control.value as File;
    const filereader= new FileReader();
    // this is the file reader observable that will be subscribed to under the hood when we check the validity of this conrtrol 
    const frobservable =new Observable((observer:Observer<{[key:string]: any}>)=>{

                                    filereader.addEventListener("loadend", ()=>{
                                    const arr = new Uint8Array(filereader.result as ArrayBuffer).subarray(0,4);
                                    let header ="";
                                    let isValid:boolean=false;

                                    for(let i =0;i<arr.length;i++){
                                        // prints hexadecimal representatinon of unsigned integers
                                        header += arr[i].toString(16);
                                    }

                                    switch(header){
                                        // different headers for different image file types 
                                        case "89504e47":
                                        case "ffd8ffe0":
                                        case "ffd8ffe1":
                                        case "ffd8ffe2":
                                        case "ffd8ffe3":
                                        case "ffd8ffe8":
                                            isValid=true;
                                            break;
                                        default: 
                                            isValid=false;
                                            break;
                                    }
                                    if(isValid){
                                        observer.next(null);
                                    }else{
                                        observer.next({invalidImage:true});
                                    }
                                    observer.complete();
                                    })
                         });
        filereader.readAsArrayBuffer(file);
        return frobservable;

    }