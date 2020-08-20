import { Subject } from 'rxjs';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export default class SpeechToText {
    constructor() {
        this.recognition = new SpeechRecognition();
        this.result = 'created';
        this.resultSubject = new Subject();

        this.recognition.continuous = true;

        this.recognition.lang = 'pt-BR';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;

        this.recognition.onresult = (event) => {

            const last = event.results.length - 1;
            this.result = event.results[last][0].transcript;

            this.resultSubject.next(this.result);
        };

        this.recognition.onspeechend = () => {
            this.recognition.stop();
            this.resultSubject.next('');
        };

        this.recognition.onnomatch = () => {
        };

        this.recognition.onerror = (event) => {
            this.resultSubject.error(`Error occurred in recognition: ${event.error}`);
        };        
    }

    speak() {
        this.recognition.start();
        return this.resultSubject;
    }

    stop(){
        this.recognition.stop();
    }
}