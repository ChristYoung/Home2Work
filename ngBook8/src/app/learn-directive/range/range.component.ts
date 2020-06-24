import { Component, OnInit, Injector, Inject, ReflectiveInjector } from '@angular/core';

class Id {

}

class Address {
  city: string;
  street: string;
  constructor(city, street) {
    this.city = city;
    this.street = street;
  }
}

class Person {
  id: Id;
  address: Address;
  constructor(@Inject(Id) id, @Inject(Address) address) {
    this.id = id;
    this.address = address;
  }
}

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.css']
})
export class RangeComponent implements OnInit {

  conditon: boolean;

  ngOnInit() {
  }

}
