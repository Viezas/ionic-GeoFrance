<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="welcome" href="/welcome">
          <ion-icon :icon="homeOutline" />
          <ion-label>Accueil</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="commune" href="/communes">
          <ion-icon :icon="pricetagOutline" />
          <ion-label>Communes</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="department" href="/departments">
          <ion-icon :icon="flagOutline" />
          <ion-label>Départements</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/regions">
          <ion-icon :icon="mapOutline" />
          <ion-label>Régions</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { homeOutline, mapOutline, flagOutline, pricetagOutline } from 'ionicons/icons';
import "xp.css/dist/XP.css";

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      homeOutline,
      mapOutline,
      flagOutline,
      pricetagOutline
    }
  }
}
</script>