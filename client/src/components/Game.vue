<template>
    <div class="num123">
        <v-card max-width='900px' height ='200px' >
         <v-container fill-height>
        <v-layout row wrap align-center>
          <v-flex class="text-xs-center">
            <img v-bind:src=imgSrc height='150px' class="in">
          </v-flex>
          <v-flex class="text-xs-center">
            <h1>{{name}}</h1>
          </v-flex>
          <v-flex class="text-xs-center">
            <h1 :class="{ green: score>=70, yellow: score >=50 && score<70,red: score<50 }">{{score}}</h1>
          </v-flex>
        </v-layout>
         </v-container>
         
        </v-card>
    </div>
</template>

<script>
export default {
    props:{
        name: String,
        imgSrc:String,
        score: Number,
        completion: String,
    },
    created() {
    }
}
</script>

<style scoped>
div{
    margin: 0 auto;
    /* display: inline; */
    
}
.test {
    /* margin: 0 auto; */
    vertical-align: middle;
    
}
.in {
    display: inline-block;
}
.v-application p {
    margin-bottom: 0px;
}
.green {
	color: green;
}
.red {
	color: red;
    background-color: transparent;
}
.yellow{
    color: yellow;
}
.v-application .red {
    background-color: transparent !important;
    border-color:transparent !important;
}
.v-application .green {
    background-color: transparent !important;
    border-color:transparent !important;
}
.v-application .yellow {
    background-color: transparent !important;
    border-color:transparent !important;
}
.num123{
    margin-bottom: 1rem;
}
</style>