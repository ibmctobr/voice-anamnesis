<template>
  <div>
    <div
      @click="onClick()"
      :class="{ 'speech-to-text__button--speaking': isSpeaking }"
      class="speech-to-text__button"
    >
      <img v-if="!isSpeaking" :src="micImage" />
      <img v-if="isSpeaking" class="speech-to-text__stop" :src="stopImage" />
    </div>
  </div>
</template>

<script>
import SpeechToText from "../lib/speech-to-text";
import micImage from "../assets/mic.png";
import stopImage from "../assets/stop.gif";
import PythonAPI from "../lib/pythonAPI"

export default {
  name: "SpeechToText",
  data() {
    return {
      isSpeaking: false,
      speech: "",
      speechService: {},
      micImage,
      stopImage,
      pythonAPI: {},
    };
  },
  methods: {
    async onClick() {
      if (this.isSpeaking) {
        this.speechService.stop();
        const speech = this.speech;
        this.speech = '<mark style="background-color: Yellow">Aguarde um momento...</mark>';
        this.speech = await this.pythonAPI.callPython(speech).then(function(response){
          return response.data.highlightedText;
        });
        if(this.speech == 'Not enough text to translate. Try again.'){
          this.speech = '<mark style="background-color: Tomato">Não há texto suficiente para traduzir. Tente novamente.</mark>'
        }
        this.$emit("speech", this.speech);
        this.isSpeaking = false;
        return;
      }
      this.isSpeaking = true;
      this.speech = "";
      this.speechService.speak().subscribe(
        result => {
          //Transforma o texto capturado em um array
          var resultHtml = result.split(" ");
          //Coloca em maíuscula a primeira letra
          resultHtml[0] = resultHtml[0].charAt(0).toUpperCase() + resultHtml[0].slice(1);
          if(this.speech.includes(resultHtml.join(' ')) == false){
            this.speech += resultHtml.join(" "); //Transforma o array em string novamente e retorna o speech
          }
          this.$emit("speech", this.speech);
        },
        error => {
          // eslint-disable-next-line
          console.log("Error", error);
          this.isSpeaking = false;
        },
        () => {
          this.isSpeaking = false;
        }
      );
    }
  },
  props: {
    msg: String
  },
  created() {
    this.speechService = new SpeechToText();
    this.pythonAPI = new PythonAPI();
  }
};

</script>

<style></style>