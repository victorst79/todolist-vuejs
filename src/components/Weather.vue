<template>
    <div>
        <h2>PRUEBA API</h2>
        <h1>{{info.name}}</h1>
        <p>{{info.sys.country}}</p>
    </div>
</template>

<script>
    export default {
        name: 'Weather',
        data: function(){
            return{
                info: [],
                latitude: "",
                longitude: ""
            }
        },
        methods:{
            successFunction: function(position){
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
            },            
            errorFunction: function(){
                console.log("ERROR");
            }
        },
        created () {

            var info = this.info;
            // var lat = this.latitude;
            // var long = this.longitude;
            this.$http
                .get('https://api.openweathermap.org/data/2.5/weather?q=Granada,ES&APPID=b6b271cf0d64d59d26cc77545481af35')
                .then((response) => {(this.info = response.data)})
                .catch((error) => {console.error(error);})
            
        },
        mounted: function(){
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(this.successFunction, this.errorFunction);
            }else{
                alert('It seems like Geolocation, which is required for this page, is not enabled in your browser.');
            }
        }
    }
</script>

<style scoped>
    h2{
        color: white !important;
    }
</style>

