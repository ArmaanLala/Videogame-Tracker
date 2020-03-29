<template>
  <div>
      <v-card class="mx-auto" raised shaped max-width="700">
          <v-card-title class="mx-auto">Add a game</v-card-title>
          <v-form v-model="valid">
              <v-text-field
              v-model="name"
              label="Please Put the Complete Title of the Game"
              required
              :rules="nameRules">

              </v-text-field>

              <v-text-field
              v-model="score"
              label="Score"
              :rules="maxRules"
              required>

              </v-text-field>
              <v-select
              :items="system"
              label="Game Console"
              v-model="systemName"
              :rules="gameRules"
              required>

              </v-select>
              <v-select
              :items="completion"
              label="Completion"
              v-model="completed"
              :rules="gameRules"
              required>

              </v-select>
          </v-form>
          <v-card-actions>
              <v-btn>

              </v-btn>
              <v-spacer></v-spacer>
              <v-btn>

              </v-btn>
              <v-spacer></v-spacer>
              <v-btn v-if="valid" v-on:click="click">
                Submit
              </v-btn>
          </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import db from "./firebaseInit";
import firebase from "firebase";
import axios from 'axios'
export default {
  name: "add-games",
  data() {
    return {
        name:'',
        valid:false,
        score:0,
        systemName:'',
        completed:'',
        maxRules: [
        v => v >= 0 && v<= 100 && !!v || 'Score must be between 0 and 100'
      ],
      nameRules: [
          v=> !!v || 'Name is required'
      ],
      gameRules: [
          v=> !!v || 'Name is required'
      ],

      system: [
        'Dreamcast','Game Gear','GameBoy','GameBoy Advance','GameBoy Color','Gamecube','NES','Nintendo 3DS','Nintendo 64',
        'Nintendo DS','Nintendo Switch','PC','PSVita','Playstation','Playstation 2','Playstation 3','Playstation 4',
        'Playstation Portable','SNK NeoGeo','Sega Genesis','Sega Saturn','Super Nintendo','Wii','Wii U','Xbox','Xbox 360','Xbox One'
      ],
      completion:['Never Played',"Haven't Beaten",'Finished','Completed 100%'],
      cS:[0,1,2,3],
      systemId:[16,20,4,5,41,2,7,4912,3,8,4971,1,39,10,11,12,4919,13,24,18,17,6,9,38,14,15,4920],

    };
  },
  created() {
      // console.log(this.system.length)
      // console.log(this.systemId.length)
  },
  methods: {
    async click(){
      if (this.systemName!=null){
        const x = this.system.indexOf(this.systemName)
        let gameIdResp
        const name2 = this.name.replace(/\s/g, '%20');
        console.log(name2)
       await axios.get('api/name/' + this.systemId[x] + '/' + name2).then(res =>{
          gameIdResp = res.data
          // console.log()
        })
        let imgSrc
        await axios.get('api/images/' + gameIdResp).then(res =>{
          imgSrc = res.data
          // console.log()
        })
        db.collection('users').where('email','==', firebase.auth().currentUser.email).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log('here')
            doc.ref.update({
              games:firebase.firestore.FieldValue.arrayUnion({
                name:this.name,
                score:parseInt(this.score),
                systemId:this.systemId[x],
                completion: this.cS[this.completion.indexOf(this.completed)],
                gameId:gameIdResp,
                img: imgSrc
              })

            })
            this.$router.push('/users/' + doc.id)
          })
          
        })
      } else {
        console.log('err')
      }
    }
  },
};
</script>

<style scoped>
.v-card {
    padding: 1rem;
    margin: 1rem;
}
</style>
