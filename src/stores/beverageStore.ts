import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";
import tempretures from "../data/tempretures.json";
import db from "../firebase.ts";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  QuerySnapshot,
  QueryDocumentSnapshot,
  
} from "firebase/firestore";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    currentTemp: tempretures[0],
    bases: [] as BaseBeverageType[],
    currentBase: null as BaseBeverageType | null,
    syrups: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,
    creamers: [] as CreamerType[],
    currentCreamer: null as CreamerType | null,
    beverages: [] as BeverageType[],
    currentBeverage: null as BeverageType | null,
    currentName: "",
  }),

  actions: {
    init() {
      const baseCollection = collection(db, "bases");
      getDocs(baseCollection).then((qs:QuerySnapshot) => { this.bases = qs.docs.map(
        (doc:QueryDocumentSnapshot) => 
          ({
            id:doc.id, 
            name:doc.data().name, 
            color:doc.data().color
          }) as BaseBeverageType
        ); 
        this.currentBase = this.bases[0];
        });
      const syrupCollection = collection(db, "syrups");
      getDocs(syrupCollection).then((qs) => { this.syrups = qs.docs.map(
        (doc) => 
          ({
            id:doc.id, 
            name:doc.data().name, 
            color:doc.data().color
          }) as SyrupType
        ); 
        this.currentSyrup = this.syrups[0];
        });
      const creamerCollection = collection(db, "creamers");
      getDocs(creamerCollection).then((qs) => { this.creamers = qs.docs.map(
        (doc) => 
          ({
            id:doc.id, 
            name:doc.data().name, 
            color:doc.data().color
          }) as CreamerType
        ); 
        this.currentCreamer = this.creamers[0];
        });
      const beverageCollection = collection(db, "beverages");
      getDocs(beverageCollection).then((qs) => { 
        if(!qs.empty) {
          this.beverages = qs.docs.map(
        (doc) => 
          ({
            id:doc.id, 
            name:doc.data().name, 
            base:doc.data().base, 
            syrup:doc.data().syrup, 
            creamer:doc.data().creamer,
            temp:doc.data().temp
          }) as BeverageType
        ); 
        this.currentBeverage = this.beverages[0];
        }
        });
    },
    makeBeverage() {
      if (
        this.currentName && 
        this.currentTemp && 
        this.currentBase && 
        this.currentSyrup && 
        this.currentCreamer
      ) {
        const id = `${this.currentBase.id}-${this.currentSyrup.id}-${this.currentCreamer.id}-${this.currentTemp}`;
        const beverage = doc(db, "beverages", id);
        setDoc(beverage, {
          name: this.currentName,
          base: this.currentBase,
          syrup: this.currentSyrup,
          creamer: this.currentCreamer,
          temp: this.currentTemp,
        }).then(() => {
          this.currentBeverage = ({
            id: id,
            name: this.currentName,
            base: this.currentBase!,
            syrup: this.currentSyrup!,
            creamer: this.currentCreamer!,
            temp: this.currentTemp,
          }) as BeverageType;
          this.beverages.push(this.currentBeverage);
          console.log("Beverage created");
        });
      }
    },    
        showBeverage() {
          if (this.currentBeverage) {
            this.currentBase = this.currentBeverage.base;
            this.currentCreamer = this.currentBeverage.creamer;
            this.currentSyrup = this.currentBeverage.syrup;
            this.currentTemp = this.currentBeverage.temp;
            this.currentName = this.currentBeverage.name;
          }
        },
        }   
  });