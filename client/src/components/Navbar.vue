<template>
  <nav>
    <div class="nav-wrapper green">
      <div class="container">
        <router-link to="/" class="brand-logo">Employee Manager</router-link>
        <ul class="right">
            <li v-if="isLoggedIn"><span class="email black-text">{{currentUser}}</span>
            </li>
            <li>
                <router-link v-if="isLoggedIn" to="/">Dashboard</router-link>
            </li>
            <li>
                <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
            </li>
            <li>
                <router-link v-if="!isLoggedIn" to="/register">Register</router-link>
            </li>
            <li><button v-on:click="logout" v-if="isLoggedIn" class="btn black">Logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'navbar',
    data () {
        return {
            isLoggedIn: false,
            currentUser: false
        }
    },
    created() {
        if(firebase.auth().currentUser){
            this.isLoggedIn = true
            this.currentUser = firebase.auth().currentUser.email
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(()=> {
                this.$router.go({path:this.$router.path})
            })
        }
    }
}
</script>

<style scoped>

</style>