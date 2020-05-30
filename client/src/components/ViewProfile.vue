<template>
  <div class="outers">
    <router-link to="/add">
      <v-btn fab fixed bottom right color="#F15025" v-if="editAllowed">
        <v-icon color="white">fa-plus</v-icon></v-btn
      >
    </router-link>
    <h1 class="display-2 font-weight-thin mb-4">{{ name }}'s Profile</h1>
    <v-select
      :items="completion"
      label="Filter by Completion"
      v-model="filter"
      v-on:change="filteredGames"
      max-width="10%"
    >
    </v-select>
<div class="flexgr">
    <Game
      v-for="game in filteredGames"
      v-bind:key="game.score"
      v-bind:name="game.name"
      v-bind:score="game.score"
      v-bind:imgSrc="game.img"
      v-bind:completion="game.completion"
      class="game"
    />
    </div>
    <h3 v-if="editAllowed">Edit allowed</h3>
    <v-speed-dial
      v-model="fab"
      
      fixed
      absolute
      bottom
      right
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="#F15025"
          dark
          fab
        >
          <v-icon v-if="fab">mdi-dots-horizontal</v-icon>
          <v-icon v-else>mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>
      <router-link to="/add">
      <v-btn
        fab
        dark
        
        color="green"
      >
        <!-- <v-icon>mdi-plus</v-icon> -->
        Add
      </v-btn>
      </router-link>
      <v-btn
        fab
        dark
        
        color="indigo"
        v-on:click="cop"
      >
      Share
        <!-- <v-icon>mdi-share</v-icon> -->
      </v-btn>
      <v-btn
        fab
        dark
        
        color="red"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import firebase from "firebase";
import Game from "./Game";
import db from "./firebaseInit";
export default {
  name: "view-profile",
  components: {
    Game
  },
  data() {
    return {
      editAllowed: false,
      name: "",
      user:'',
      filter: "All",
      games: [],
      completion: [
        "All",
        "Never Played",
        "Haven't Beaten",
        "Finished",
        "Completed 100%"
      ],
      sorter: ["Score", "Alphabetically", "Completion"],
      sorted: "Score"
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("users")
      .doc(to.params.user_id)
      .get()
      .then(doc => {
        console.log(doc.data().name);
        // this.user = to.params.user_id
      });
    // db.collection('users').doc(to.params.user_id).get().then( q => {
    //     q.forEach( doc => {
    //         console.log('made it')
    //          console.log(doc.data().name)
    //     })
    // })

    db.collection("users")
      .doc(to.params.user_id)
      .get()
      .then(doc => {
        next(vm => {
          // console.log(doc.data().name)
          vm.name = doc.data().name;
          vm.user = to.params.user_id
          vm.games = doc.data().games;
          vm.games.sort((a, b) => (a.score < b.score ? 1 : -1));
          // console.log(doc.data().games[0].completion)
          if (doc.data().email == firebase.auth().currentUser.email) {
            vm.editAllowed = true;
          }
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("users")
        .doc(this.$route.params.user_id)
        .get()
        .then(doc => {
          this.name = doc.data().name;
          this.games = doc.data().games;
          if (doc.data().email == firebase.auth().currentUser.email) {
            this.editAllowed = true;
          }
        });
        this.user= this.$route.params.user_id
    },
    cop() {
      var result = "https://videogame-tracker.herokuapp.com/users/"+this.user
      //  this.user.select();
      // copyText.select();
      console.log(result)
      console.log('test')
      navigator.clipboard.writeText(result)
      document.execCommand("copy");
    }
  },
  computed: {
    filteredGames() {
      return this.games.filter(game => {
        if (
          this.completion[game.completion + 1] === this.filter ||
          this.filter === this.completion[0]
        ) {
          return game;
        }
      });
    }
  }
};
</script>

<style scoped>
.outers{
  padding-top: 2rem;
  }
/* .v-btn--fab.v-size--default.v-btn--absolute.v-btn--bottom {
  bottom: 2px;
} */
.game{
  margin: 1rem;
  background-color: display-4;
}
.flexgr {
  
  margin: 0 auto;
  flex-wrap: wrap;
  
  display: flex;
  justify-content: center;
}
.v-input {
  max-width: 15%;
  margin: 0 auto;
  color: white;
}
h1 {
  color: white;
  width: fit-content;
  margin: 0 auto;
}
template{
color: #778DA9;
}
</style>
