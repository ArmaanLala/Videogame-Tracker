<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <!-- <router-link to="/"> -->
      <!-- <div class="d-flex align-center"> -->
      <router-link class="router-link" to="/">
      <v-btn text x-large>
      Video Game Tracker
      </v-btn>
      </router-link>
      <!-- </div> -->
      <!-- </router-link> -->

      <v-spacer></v-spacer>

      <router-link v-bind:to="{name: 'view-profile', params : { user_id: id} }" v-if="isLoggedIn">
        <v-btn v-on:click="getId" text>
          <span class="mr-2">Profile</span>
        </v-btn>
      </router-link>

      <router-link to="/login" v-if="!isLoggedIn">
        <v-btn text>
          <span class="mr-2">Login</span>
        </v-btn>
      </router-link>

      <router-link to="/register" v-if="!isLoggedIn">
        <v-btn text>
          <span class="mr-2">Register</span>
        </v-btn>
      </router-link>

      <v-btn v-on:click="logout" v-if="isLoggedIn">Log Out</v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color='primary' fixed>Test</v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase";
import db from './components/firebaseInit'
export default {
  name: "App",

  components: {},

  data() {
    return {
      isLoggedIn: false,
      id: ''
    };
    //
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.getId();
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    },
    getId() {
      db.collection('users').where('email', '==', firebase.auth().currentUser.email).get().then(query => {
        query.forEach( doc => {
          this.id = doc.id;
        }
        )
      })
    }
  
  }
};
</script>

<style>
.v-btn.v-size--x-large {
    font-size: 1.5rem;
}
</style>