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
          <ion-title size="large">Bienvenue</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="body">
        <div class="window" style="width: 300px" v-show="display">
          <div class="title-bar">
            <div class="title-bar-text">Bienvenue.exe</div>
            <div class="title-bar-controls">
              <button aria-label="Close" @click="show"></button>
            </div>
          </div>
          <div class="window-body">
            <p>
              Bienvenue sur Geo-France !<br>
              L'application utile et pratique de référencement des communes, départements et régions de France !<br><br>
              Remercions notre sponsor le gouvernement de France sans qui cette génialissime app n'aurait pas vue le jour !<br><br>
              Au cours de votre utilisation, vous rencontrerez sans doute ce bouton :  
            </p>
            <div class="title-bar-controls">
              <button aria-label="Help" @click="help" :disabled="!isActive"></button>
            </div>
            <p>
              Ce bouton une fois cliqué, vous affichera la démarche à suivre afin d'effectuer votre recherche de manière approprié !<br><br>
              Voilà c'est tout ce que j'avais à dire a plus tard !<br>
            </p>
          </div>
        </div>
        <div class="window" style="width: 150px" v-show="showHelp">
          <div class="title-bar">
            <div class="title-bar-text">Aide</div>
            <div class="title-bar-controls">
              <button aria-label="Close" @click="disableHelp"></button>
            </div>
          </div>
          <div class="window-body">
            <p><a href="https://youtu.be/z_HWtzUHm6s" target="blank">Un lien très très utile !</a></p>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default  {
  name: 'Welcome',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data(){
    return{
      display : true,
      showHelp : false,
      isActive : true,
    }
  },

  methods : {
    show(){
      this.display = !this.display
    },
    help(){
      if (this.isActive) {
        this.showHelp = !this.showHelp
        this.isActive = !this.isActive
      }
    },
    disableHelp(){
      this.showHelp = !this.showHelp
      this.isActive = !this.isActive
    }
  }
}
</script>

<style scoped>
.body{
  background: url('../../public/assets/img/WindowsXp-bg.png');
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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

p{
  font-size: 2.0vh;
}

ion-content > div > div:nth-child(2){
  z-index: 1;
  margin-left: -130px;
}

ion-content > div > div:nth-child(1){
  z-index: 0;
}

ion-conten{
  position: relative;
}
</style>