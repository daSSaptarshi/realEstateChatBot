import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatBotService } from '../services/chat-bot.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {

  hide:boolean;
  previousQuestion = '';
  chats = []
  isInputRequire = false;
  isSessionActive = true;
  intent = '';

  chatForm = new FormGroup({
    answer : new FormControl()
  })
  // chatService:ChatBotService;
  constructor(private chatService:ChatBotService,private httpClient:HttpClient) { 
    this.hide = true;
    this.chats.push({'actor' : 'bot', 'text' : 'Hi', 'timeStamp' : this.getTimestamp()})
    this.chats.push(
      {
        'actor' : 'bot',
        'text' : 'Please choose any one option',
        'actionElement' : 'button',
        'actionItems' : ['Buy Property', 'Sell Property', 'General Query'], 
        'timeStamp' : this.getTimestamp()
      }
      );
  }

  ngOnInit(): void 
  {
    
  }

  setIntent(intentValue)
  {
    this.intent = intentValue;
  }

  onClick(answer)
  {
    if(this.isSessionActive)
    {
      this.chats.push({'actor' : 'user', 'text' : answer, 'timeStamp' : this.getTimestamp()})
      this.sendAnswer(answer);
    }
  }

  getTimestamp()
  {
    var now = new Date();
    // now.setHours(now.getHours()+2);
    var isPM = now.getHours() >= 12;
    var isMidday = now.getHours() == 12;
    var result = document.querySelector('#result');
    var time = [now.getHours() - (isPM && !isMidday ? 12 : 0), 
                now.getMinutes()].join(':') +
              (isPM ? ' pm' : 'am');
    return time;
  }

  sendAnswer(answer)
  {
    if(this.isSessionActive)
    {
        if(answer == "Buy Property")
        this.setIntent('buy')
        if(answer == "Sell Property")
          this.setIntent('sell')
        if(answer == "General Query")
          this.setIntent('general')

        this.chatService.askQuery({ question : this.previousQuestion, answer : answer, intent : this.intent}).subscribe((result) =>
        {
          let botThread = {};
          this.previousQuestion = result['question'];
          botThread['actor'] = 'bot'
          botThread['text'] = this.previousQuestion
          botThread['actionItems'] = result['actionItems']
          botThread['actionElement'] = result['actionElement'];
          botThread['timeStamp'] = this.getTimestamp();

          if(result['actionElement'] != 'text' || result['actionType'] == 'answer')
            this.isInputRequire = false
          else
            this.isInputRequire = true
          
          if(result['actionType'] == 'answer')
            {
              this.isSessionActive = false;
              // this.isInputRequire = false
            }

          this.chats.push(botThread);
          setTimeout(() => {
            let objDiv = document.getElementById('chat_box');
            objDiv.scrollTop = objDiv.scrollHeight
          },
          0)

        });
    }
  }

  onSubmit()
  {
    this.chats.push({'actor' : 'user', 'text' : this.chatForm.value.answer, 'timeStamp' : this.getTimestamp()})
    this.sendAnswer(this.chatForm.value.answer);
    this.chatForm.reset()
  };
}
