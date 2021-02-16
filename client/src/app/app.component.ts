import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatBotService } from './services/chat-bot.service';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isDisabled = true;
  valueaaa = "12345678";

  public sliderStart = 0;
  public sliderSize = 4;
  public sliderCurrent = 0;
  public sliderEnd = this.sliderSize;
  public properties = [
    {
      price: "30000",
      city: "Kolkata",
      type: "2BHK",
      desc: "This is an luxuarious 3BHK apartment with south facing balcony and bedroom. It has a moduler kitchen equipped with modern gadgets."
    },
    {
      price: "43888",
      city: "Pune",
      type: "2BHK",
      desc: "This is an luxuarious 3BHK apartment with south facing balcony and bedroom. It has a moduler kitchen equipped with modern gadgets."
    },
    {
      price: "78000",
      city: "Mumbai",
      type: "2BHK",
      desc: "This is an luxuarious 3BHK apartment with south facing balcony and bedroom. It has a moduler kitchen equipped with modern gadgets."
    },
    {
      price: "12565876",
      city: "Bangalore",
      type: "2BHK",
      desc: "This is an luxuarious 3BHK apartment with south facing balcony and bedroom. It has a moduler kitchen equipped with modern gadgets."
    },
    {
      price: "650000",
      city: "Chennai",
      type: "2BHK",
      desc: "This is an luxuarious 3BHK apartment with south facing balcony and bedroom. It has a moduler kitchen equipped with modern gadgets."
    },
    {
      price: "340000",
      city: "Delhi",
      type: "2BHK",
      desc: "This is an luxuarious 3BHK apartment with south facing balcony and bedroom. It has a moduler kitchen equipped with modern gadgets."
    },
    {
      price: "230000",
      city: "Jaipur",
      type: "2BHK",
      desc: "This is an luxuarious 3BHK apartment with south facing balcony and bedroom. It has a moduler kitchen equipped with modern gadgets."
    },
  ];
  queryForm = new FormGroup({
    firstName : new FormControl(),
    lastName : new FormControl(),
    phone : new FormControl(),
    email : new FormControl(),
    query : new FormControl()

  });
  public sliderProperties = this.properties.slice(this.sliderCurrent, this.sliderCurrent + this.sliderSize > this.properties.length ? this.properties.length - 1 : this.sliderCurrent + this.sliderSize);

  constructor(private queryService:ChatBotService){}

  AppComponent(){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.sliderProperties);
  }

  toggleChatBot()
  {
    this.isDisabled = !this.isDisabled;
    this.isDisabled = !this.isDisabled
  }

  sendQuery()
  {
    console.log(this.queryForm.value)
    this.queryService.submitQuery({ 
      name : this.queryForm.value.firstName + " " + this.queryForm.value.lastName,
      phone : this.queryForm.value.phone,
      email : this.queryForm.value.email,
      query : this.queryForm.value.query
    })
  }

  nextSlide() {
    // this.sliderCurrent = this.sliderCurrent + this.sliderSize > this.properties.length ? this.sliderCurrent - 2 : this.sliderCurrent + this.sliderSize
    console.log(this.sliderCurrent);
    this.sliderCurrent = this.sliderCurrent + this.sliderSize > this.properties.length ? this.properties.length - 4 : this.sliderCurrent + this.sliderSize

    if (this.sliderEnd <= this.properties.length - 1) 
    {
      this.sliderProperties = this.properties.slice(this.sliderCurrent, this.sliderEnd);
    }
    else {
      this.sliderCurrent = 0;
      this.sliderEnd = this.sliderCurrent + this.sliderSize;
      this.sliderProperties = this.properties.slice(this.sliderCurrent, this.sliderEnd);
    }


  }

}
