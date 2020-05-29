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
                <v-toolbar-title>Register for an account</v-toolbar-title>
                <v-spacer />
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <v-text-field
                    id="name"
                    label="Name"
                    name="name"
                    type="text"
                    v-model="name"
                    required
                    
                  />
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
                <v-btn v-on:click="register" color="#0D1821" dark>Sign Up</v-btn>
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
import db from './firebaseInit'
import { required } from 'vuelidate/lib/validators'
  export default {
      name: 'register',
    data()  {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    validations: {
        name:required
    },
    methods: {
    register (e) {

        
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`Account created for ${user.user.email}`);
            this.$router.go({path: this.$router.path});
          },
          err => {
            alert(err.message);
          }
          
        );
        db.collection('users').add( {
            name: this.name,
            email: this.email,
            games: []
        })
    // console.log('Wow')

      e.preventDefault();
    
    }
    
  }
  }
</script>