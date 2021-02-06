<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
         <ion-title>
          <div class="title">
            <img src="../../public/assets/img/France-outline.png" alt="France outline"> Geo-France
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="body">
        <div class="window form">
          <div class="title-bar">
            <div class="title-bar-text">Departement.exe</div>
            <div class="title-bar-controls">
              <button aria-label="Help" @click="help" :disabled="!isActive"></button>
            </div>
          </div>
          <div class="window-body input">
            <div class="field-row-stacked" style="width: 69.44444444444444vw">
              <label for="text22">Rechercher un département :</label>
              <select id="text22" v-model="q">
                <option v-for="departement in departements" :key="departement" :value="departement.code" >{{ departement.code }} - {{ departement.nom }}</option>
              </select>
              <button :disabled="!q" @click="search">Rechercher</button>
            </div>
          </div>
        </div>
        <div class="window" style="width: 83.3vw" v-show="showError">
          <div class="title-bar">
            <div class="title-bar-text">Error.exe</div>
            <div class="title-bar-controls">
              <button aria-label="Close" @click="disableError"></button>
            </div>
          </div>
          <div class="window-body">
            <div class="errorMessage">
              <img src="../../public/assets/img/Error.png" alt="error logo">
              <p>
                {{ errorMessage }}
              </p>
            </div>
          </div>
        </div>
        <div class="window departments" style="width: 83.3vw" v-show="results.length > 0">
          <div class="title-bar">
            <div class="title-bar-text">{{ results.length > 1 ? 'Résultats' : 'Résultat' }}({{ results.length }})</div>
          </div>
          <div class="window department" v-for="result in results" :key="result">
            <div class="title-bar">
              <div class="title-bar-text">{{ result.nom }}</div>
            </div>
            <div class="window-body">
              <div class="errorMessage">
                <table>
                  <thead>
                    <tr>
                      <th colspan="2">{{ result.nom }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>Code INSEE</td>
                        <td>{{ result.code }}</td>
                    </tr>
                    <tr>
                        <td>Code de département</td>
                        <td>{{ result.codeDepartement }}</td>
                    </tr>
                    <tr>
                        <td>Code de région</td>
                        <td>{{ result.codeRegion }}</td>
                    </tr>
                    <tr>
                        <td>{{ result.codesPostaux.length > 1 ? 'Code postaux' : 'Code postal' }}</td>
                        <td>{{ result.codesPostaux }}</td>
                    </tr>
                    <tr>
                        <td>Population</td>
                        <td>{{ result.population }} habitants</td>
                    </tr>
                </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="window help" style="width: 83.3vw" v-show="showHelp">
          <div class="title-bar">
            <div class="title-bar-text">Aide.exe</div>
            <div class="title-bar-controls">
              <button aria-label="Close" @click="disableHelp"></button>
            </div>
          </div>
          <div class="window-body">
            <p>  
              <span class="title">Comment faire une recherche qui fonctionne et ce de manière tout à fait légal en moins de 5 minutes en seulement 3 étapes :</span><br>
              <span class="subtitle">Étape n°1 :</span><br>
              Sélectionnez le département (ex:75) pour afficher toutes les communes du département.<br>
              Sélectionner département qui n'existe pas ou même un faux code de département entrainera également l'apparition d'une fenêtre d'erreur.<br><br>

              <span class="subtitle">Étape n°2 :</span><br>
              Clickez sur le bouton "Rechercher" et profiter du résultat !<br><br>

              <span class="subtitle">Étape n°3 :</span><br>
              En cas d'erreur, lisez le message !<br>
              Souvent le problème se situe entre la chaise et le clavier !
            </p>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default  {
  name: 'Tab2',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data(){
    return{
      q : '',
      showError : false,
      errorMessage : '',
      departements : [],
      results : [],
      isActive : true,
      showHelp : false,
    }
  },

  methods : {
    search(){
      if (this.q.length === 0) {
        this.showError = !this.showError
        this.errorMessage = "Afin d'effectuer une recherche, vous devez impérativement choisir l'un des départements proposé !"
        return
      }

      if (isNaN(parseInt(this.q))){
        this.showError = !this.showError
        this.errorMessage = "Code de département invalide !"
        return
      }

      fetch(`https://geo.api.gouv.fr/departements/${this.q}/communes`)
        .then(response => {
          if (response.status == 404) {
            this.showError = !this.showError
            this.errorMessage = `Pas de résultat pour le code de département suivant : ${this.q} !`
            return
          }
          response.json()
          .then(data=>{
            this.results = data
          })
        })
        .catch(error =>{
            console.log(error.response)
        })
    },
    disableError(){
      this.showError = !this.showError
    },
    help(){
      this.isActive = !this.isActive
      this.showHelp = !this.showHelp
    },
    disableHelp(){
      this.showHelp = !this.showHelp
      this.isActive = !this.isActive
    }
  },

  mounted(){
    fetch('https://geo.api.gouv.fr/departements')
    .then(response =>{
      response.json()
      .then(data => {
        this.departements = data
      })
    })
  },
}
</script>

<style scoped>
.body{
  background: url('../../public/assets/img/WindowsXp-bg.png');
  height: 100%;
  position: relative;
  display: grid;
  grid-template-rows: repeat(12, 8.3333333333333333333333333333333%);
  grid-template-columns: repeat(12, 8.3333333333333333333333333333333%);
}

img{
  width: auto;
  height: 7.5vh;
  padding-right: 10px;
}

ion-title{
  text-align: center;
  font-size: 4.6875vh; 
}

.title{
  display: flex;
  justify-content: center;
  align-items: center;
}

p, label, button, input::placeholder, input{
  font-size: 2.0vh;
}

.window{
  margin-top: 2.8125vh
}

.form{
  grid-column: 2/12;
  grid-row: 1/4;
}

.input{
  display: flex;
  justify-content: center;
}

ion-conten{
  position: relative;
}

ion-content > div > div:nth-child(1){
  z-index: 0;
}

ion-content > div > div:nth-child(2){
  z-index: 1;
  grid-column: 2/12;
  grid-row: 5/8;
}

.errorMessage{
  display: flex;
  justify-content: center;
  align-self: center;
}

.departments{
  height: 100%;
  grid-column: 2/12;
  grid-row: 4/12;
  overflow-x: hidden;
  overflow-y: scroll;
}

.department{
  width: 72.22222222222223vw;
  margin-left: 3.9305555555555554vw;
}

td{
  padding: 5px 10px;
}

tr:nth-child(even) {
  background: white
}

.help{
  grid-column: 2/12;
  grid-row: 1/12;
  z-index: 3;
}

.subtitle, .title{
  font-size: 2.4vh;
  font-weight: bold;
}

.title{
  text-align: center;
  font-size: 2.6vh;
}
</style>