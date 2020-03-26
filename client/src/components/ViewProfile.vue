<template>
    <div>
        <h1>{{name}}</h1>
        <h3 v-if="editAllowed">Edit allowed</h3>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from './firebaseInit'
export default {
    name:'view-profile',
    data() {
        return {
        editAllowed: false,
        name: '',
        games: []
    }
    },
    beforeRouteEnter (to, from, next) {
        
       db.collection('users').doc(to.params.user_id).get().then(doc => {
            console.log(doc.data().name)
        })
        // db.collection('users').doc(to.params.user_id).get().then( q => {
        //     q.forEach( doc => {
        //         console.log('made it')
        //          console.log(doc.data().name)
        //     })
        // })

        
        db.collection('users').doc(to.params.user_id).get().then(doc => {
                next(vm => {
                    // console.log(doc.data().name)
                    vm.name = doc.data().name
                    vm.games = doc.data().games
                    if (doc.data().email == firebase.auth().currentUser.email){
                        vm.editAllowed = true
                    }
                })
            })
        
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData() {
            db.collection('users').doc(this.$route.params.user_id).get().then(doc => {
                    this.name = doc.data().name
                    this.games = doc.data().games
                    if (doc.data().email == firebase.auth().currentUser.email){
                        this.editAllowed = true
                    }
            })
        }
    }
    
}
</script>

<style scoped>
    
</style>