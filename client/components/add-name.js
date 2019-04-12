Vue.component('add-detail',{
    props : {
        male_name : String,
        female_name : String,
        location : String,
        date : String,
        time : String,
        font : String
    },
    template : 
        `
        <b-col v-bind:style=font>
            <h1 >
                {{male_name}} 
            </h1>
            <h2 v-if="male_name && female_name">
                with
            </h2>
            <h1>
                {{female_name}} 
            </h1>
            <h4 v-if='location'>
                <i> Location : {{location}}</i>
            </h4>
            <h4 v-if="date">
                <i> date : {{date}}</i>
            </h4>
            <h4 v-if="time"> <i> time : {{time}} </i></h4>
        </b-col>
        `
})