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
            <div class="title-bar-text">Communes.exe</div>
            <div class="title-bar-controls">
              <button aria-label="Help" @click="help" :disabled="!isActive"></button>
            </div>
          </div>
          <div class="window-body input">
            <div class="field-row-stacked" style="width: 69.44444444444444vw">
              <label for="text22">Rechercher une commune :</label>
              <input id="text22" type="text" placeholder="Nom/Code postal" v-model="q"/>
              <button :disabled="q.length == 0" @click="search">Rechercher</button>
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
        <div class="window communes" style="width: 83.3vw" v-show="communes.length > 0">
          <div class="title-bar">
            <div class="title-bar-text">{{ communes.length > 1 ? 'Résultats' : 'Résultat' }}({{ communes.length }})</div>
          </div>
          <div class="window commune" v-for="commune in communes" :key="commune">
            <div class="title-bar">
              <div class="title-bar-text">{{ commune.nom }}</div>
            </div>
            <div class="window-body">
              <div class="errorMessage">
                <table>
                  <thead>
                    <tr>
                      <th colspan="2">{{ commune.nom }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>Code INSEE</td> 
                        <td>{{ commune.code }}</td>
                    </tr>
                    <tr v-if="commune.codesPostaux.length > 0">
                        <td>{{ commune.codesPostaux.length > 1 ? 'Code postaux' : 'Code postal' }}</td>
                        <td>{{ commune.codesPostaux }}</td>
                    </tr>
                    <tr v-if="commune.departement.nom">
                        <td>Nom du département</td>
                        <td>{{ commune.departement.nom }}</td>
                    </tr>
                    <tr v-if="commune.departement.nom">
                        <td>Code du département</td>
                        <td>{{ commune.departement.code }}</td>
                    </tr>
                    <tr v-if="commune.codeRegion">
                        <td>Code de région</td>
                        <td>{{ commune.codeRegion }}</td>
                    </tr>
                    <tr v-if="commune.population">
                        <td>population</td>
                        <td>{{ commune.population }} habitants</td>
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
              Saisissez dans la barre de recherche le nom d'une commune (ex:paris) ou le code postal d'une commune (ex:75001).<br>
              Notez bien que les fautes d'orthographes seront prises en compte. Ainsi, si vous saisissez pahris et non paris, vous verrez une fenêtre d'erreur apparaitre.<br>
              Saisir le code postal d'une commune qui n'existe pas ou même un faux code postal entrainera également l'apparition d'une fenêtre d'erreur.<br><br>

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
  name: 'Tab1',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data(){
    return{
      q : '',
      showError : false,
      errorMessage : '',
      communes : [],
      isActive : true,
      showHelp : false,
    }
  },

  methods : {
    search(){
      if (this.q.length === 0) {
        this.showError = !this.showError
        this.errorMessage = "Afin d'effectuer une recherche, vous devez impérativement entrer le nom d'une commune ou le code postal !"
        return
      }

      if (isNaN(parseInt(this.q))){
        fetch(`https://geo.api.gouv.fr/communes?nom=${this.q}&fields=departement&boost=population`)
        .then(response => {
          response.json()
          .then(data=>{
            this.communes = []
            if (data.length === 0) { 
              this.errorMessage = `Il n'y a pas de résultat pour la commune suivante : ${this.q}`
              this.showError = !this.showError
              this.q = ''
              return
            }
            let i = 0
            while (i < data.length) {
              this.communes.push({
              nom : data[i].nom,
              code : data[i].code,
              departement : {
                code : data[i].departement.code,
                nom : data[i].departement.nom,
              },
              population : 0,
              codeRegion : 0,
              codesPostaux : []
             })
              i++
            }
          })
        })
        .catch(error =>{
            console.log(error.response)
        })
      }
      else{
        fetch(`https://geo.api.gouv.fr/communes?codePostal=${this.q}`)
        .then(response => {
          response.json()
          .then(data=>{
            this.communes = []
            if (data.length === 0) {
              this.errorMessage = `Il n'y a pas de résultat pour le code postal suivant : ${this.q}`
              this.showError = !this.showError
              this.q = ''
              return
            }
            this.communes.push({
              nom : data[0].nom,
              code : data[0].code,
              departement : {
                code : data[0].codeDepartement,
                nom : '',
              },
              population : data[0].population,
              codeRegion : data[0].codeRegion,
              codesPostaux : data[0].codesPostaux
            })
          })
        })
        .catch(error =>{
            console.log(error.response)
        })
      }

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

.communes{
  height: 100%;
  grid-column: 2/12;
  grid-row: 4/12;
  overflow-x: hidden;
  overflow-y: scroll;
}

.commune{
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