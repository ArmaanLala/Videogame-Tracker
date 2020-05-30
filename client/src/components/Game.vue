<template>
    <div>
        <v-card width='300px' height ='400px' elevation="24" :class="{o: completion==3,f: completion==2,'h': completion==1,'n': completion==0}">
         <v-container fill-height>
        <v-layout column align-center>
          <v-flex class="text-xs-center i" >
            <img v-bind:src=imgSrc height='150px' class="in">
          </v-flex>
          <v-flex class="text-xs-center" width='500px'>
            <h2>{{name}}</h2>
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

.i{
    max-width: 200px !important;
}
h2{
    /* display: flex; */
    justify-content: center;
    text-align: center;
    margin: 0 auto;
    color: white;
}

.test {
    /* margin: 0 auto; */
    vertical-align: middle;
    
}
.in {
    /* display: inline-block; */
}

.green {
    /* display: flex; */
    /* padding-right: 2rem; */
    /* justify-content: right; */
    color: rgb(0, 255, 0);
}
.red {
    /* display: flex; */
    /* padding-right: 2rem; */
    justify-content: right;
	color: rgb(221, 0, 0);
}
.yellow{
    /* display: fle */
    /* padding-right: 2rem; */
    justify-content: right;
    color: yellow;
}
.v-application .red {
    background-color: transparent !important;
    /* border-color:transparent !important; */
}
.v-application .green {
    background-color: transparent !important;
    /* border-color:transparent !important; */
}
.v-application .yellow {
    background-color: transparent !important;
    /* border-color:transparent !important; */
}

.o{
background-color: #077C03 !important;
border-color: #077C03 !important;
}
.f{
    background-color:   #086788!important;
}
.h {
    background-color: #D62839 !important;
}
.n {
    background-color: #ffffff !important;
}
div{
    padding: .6rem;
    background-color:#404E5C;
}
</style>