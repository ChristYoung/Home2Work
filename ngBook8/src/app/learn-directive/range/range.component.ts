import {Component, OnInit, Injector, Inject, ReflectiveInjector} from '@angular/core';

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
  constructor(@Inject(Id)id, @Inject(Address)address) {
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

  constructor() {
    // 手动操作依赖注入池
    // 练习
    const injector = Injector.create([
      {provide: Person, useClass: Person, deps: [Id, Address]},
      {
        provide: Address, useFactory: () => {
          return new Address('beijing', 'chaoyang');
        },
        deps: []
      },
      {provide: Id, useClass: Id, deps: []},
    ]);
    const person = injector.get(Person);
    console.log('person', JSON.stringify(person));
  }

  ngOnInit() {
  }

}
