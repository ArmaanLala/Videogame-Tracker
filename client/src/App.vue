<template>
  <v-app>
    <v-app-bar app dark color="#0D1821">
      <router-link to="/">
        <v-toolbar-title>
          <v-btn text x-large>Video Game Tracker</v-btn>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <!-- <v-btn
          v-for="item in menu"
          :key="item.icon"
          :to="item.link"
          text
        >{{ item.title }}</v-btn>-->

        <v-btn v-on:click="getId" text v-if="isLoggedIn">
          <router-link v-bind:to="{name: 'view-profile', params : { user_id: id} }">
            <span class="mr-2">Profile</span>
          </router-link>
        </v-btn>

        <v-btn text v-if="!isLoggedIn">
          <router-link to="/login">
            <span class="mr-2">Login</span>
          </router-link>
        </v-btn>

        <v-btn text v-if="!isLoggedIn">
          <router-link to="/register">
            <span class="mr-2">Register</span>
          </router-link>
        </v-btn>

        <v-btn v-on:click="logout" v-if="isLoggedIn">Log Out</v-btn>
      </v-toolbar-items>

      <v-menu class="hidden-md-and-up" auto>
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon v-on="on" class="hidden-md-and-up"></v-app-bar-nav-icon>
        </template>

        <v-list>
          <v-list-item v-if="!isLoggedIn">
            <v-list-item-content>
              <router-link to="/login">
                <v-btn text>
                  <span class="mr-2">Login</span>
                </v-btn>
              </router-link>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="!isLoggedIn">
            <v-list-item-content>
              <router-link to="/register">
                <v-btn text>
                  <span class="mr-2">Register</span>
                </v-btn>
              </router-link>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="isLoggedIn">
            <v-list-item-content>
              <router-link v-bind:to="{name: 'view-profile', params : { user_id: id} }">
                <v-btn v-on:click="getId" text>
                  <span class="mr-2">Profile</span>
                </v-btn>
              </router-link>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="isLoggedIn">
            <v-list-item-content>
              <v-btn v-on:click="logout">Log Out</v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="#0D1821" fixed dark>Licensed under the MIT Open License by Armaan Lala</v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase";
import db from "./components/firebaseInit";
export default {
  name: "App",
  

  components: {},

  data() {
    return {
      isLoggedIn: false,
      id: "",
      menu: [
        { icon: "home", title: "Link A" },
        { icon: "info", title: "Link B" },
        { icon: "warning", title: "Link C" }
      ]
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
      db.collection("users")
        .where("email", "==", firebase.auth().currentUser.email)
        .get()
        .then(query => {
          query.forEach(doc => {
            this.id = doc.id;
          });
        });
    },
    menuItems() {
      return this.menu;
    }
  }
};
</script>

<style>

.v-btn.v-size--x-large {
  font-size: 1.5rem;
}
.v-application a {
  color: white !important;
  text-decoration: none !important;
}
.v-content{
  background-color: #27333F;
}
</style>