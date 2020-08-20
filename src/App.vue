<template>
<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">

<!-- Cabeçalho, aonde estão o Logo, slogan e menu -->
    <header role="header" class="masthead mb-auto">
      <div id="header" class="container">
          <div class="inner">
            <div class="row">
              <div class="col-sm">
                <h3 class="slogan-title">Registro de Anamnese
                  <span class="slogan-subtitle">Obtenha auxílio no diagnóstico de uma doença, em ponto inicial, através da anamnese.</span>
                </h3>  
              </div>
              <div class="col-sm">
                <nav class="nav nav-masthead justify-content-end">
                  <a class="nav-link a-menu active"  style="color: #fff" href="#">Home</a>
                  <a class="nav-link a-menu" href="#"> Features</a>
                  <a class="nav-link a-menu" href="#">Contact</a>
                </nav>
              </div>
            </div>
          </div>
      </div>
    </header>
    
<!-- Parte central, aonde estão o microfone e o texto -->
    <!-- <anaminesia> -->
          <main role="main" class="inner cover" slot-scope="">
            <div id="main" class="container">
              <div id="main-row" class="row">
                <div id="mic-column" class="col-sm-2 text-center">
                  <SpeechToText class="img-fluid rounded" @speech="onSpeechReceived($event)"/>
                </div>
                <div id="text-column" class="col-sm-10 text-center">
                  <p class="text-justify text-monospace"> <span v-html="speech"></span></p>
                  <p/>
                  <p v-if="!speech" class="text-justify text-monospace">Ambitioni <mark style="background-color: LightPink">dedisse</mark> scripsisse iudicaretur.
                  Cras mattis iudicium purus sit amet <mark style="background-color: LightGreen">fermentum</mark>.
                  Donec sed odio operae, eu vulputate felis <mark style="background-color: LightSkyBlue">rhoncus</mark>.
                  <mark style="background-color: LightPink">Praeterea</mark> iter est quasdam res quas ex communi.
                  At nos hinc <mark style="background-color: LightGreen">posthac</mark>, sitientis piros Afros.
                  Petierunt uti sibi concilium totius <mark style="background-color: LightSkyBlue">Galliae</mark> in diem certam indicere.
                  Cras <mark style="background-color: LightPink">mattis iudicium</mark> purus sit amet <mark style="background-color: LightGreen">fermentum</mark>.</p>
                </div>
              </div>
            </div>
          </main>
    <!-- </anaminesia>  -->

<!-- rodapé -->
  <footer class="mastfoot mt-auto">
    <div class="inner">
      <p>by IBM eightbar.</p>
    </div>
  </footer>

</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
import SpeechToText from './components/SpeechToText.vue';
import './style.css'

export default {
  name: 'app',
  components: {
    SpeechToText
  },
    data() {
        return {
            speech: ''
        };
    },
    methods: {
        onSpeechReceived(speech) {
          // eslint-disable-next-line
            console.log('Reveived', speech);
            this.speech = speech;
        }
    }
}
</script>
