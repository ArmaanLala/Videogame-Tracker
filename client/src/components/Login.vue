<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="#0D1821"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                
                  <v-text-field
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    v-model="email"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="password"
                  />
                  
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn v-on:click="login" color="#0D1821" dark>Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'
  export default {
      name: 'login',
    data()  {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
    login (e) {

        
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`Logged in for ${user.user.email}`);
            this.$router.go({path: this.$router.path});
          },
          err => {
            alert(err.message);
          }
          
        );
        
    // console.log('Wow')

      e.preventDefault();
    
    }
    
  }
  }
</script>

<style>
.row{
  margin: 0;
}
</style>