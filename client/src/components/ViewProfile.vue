<template>
  <div>
    <router-link to="/add">
      <v-btn fab fixed bottom right color="#F15025" v-if="editAllowed">
        <v-icon color="white">fa-plus</v-icon></v-btn
      >
    </router-link>
    <h1>{{ name }}'s Profile</h1>
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
