<template>
    <div class="num123">
        <v-card max-width='900px' height ='200px' :class="{o: completion==3,f: completion==2,'h': completion==1,'n': completion==0}">
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
    data() {
        return{
        completionS:['Never Played',"Haven't Beaten",'Finished','Completed 100%']
    }
    },
    props:{
        name: String,
        imgSrc:String,
        score: Number,
        completion: Number,
        
    },
    created() {
    }
}
</script>

<style scoped>
h1{
    color: white;
}
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
	color: rgb(0, 255, 0);
}
.red {
	color: rgb(221, 0, 0);
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
.o{
background-color: rgb(7, 124, 3) !important;
}
.f{
    background-color:   #1976D2!important;
}
.h {
    background-color: rgb(223, 172, 224) !important;
}
.n {
    background-color: rgb(155, 154, 154) !important;
}
</style>