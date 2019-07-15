<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label for="exampleInputEmail1">Event</label>
                    <input type="email" class="form-control" v-model="event.name"  placeholder="Event">
                </div>
                <div class="row">
                    <div class="col-6">
                        <label for="exampleInputEmail1">From</label>
                        <input type="date" class="form-control"  v-model="event.from"   placeholder="From">
                    </div>
                    <div class="col-6">
                        <label for="exampleInputEmail1">To</label>
                        <input type="date" class="form-control"  v-model="event.to"    placeholder="To">
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  v-model="event.days" value="mon" id="defaultCheck1">
                        <label class="form-check-label" for="defaultCheck1">
                            Mon
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  v-model="event.days" value="tue" id="defaultCheck2">
                        <label class="form-check-label" for="defaultCheck2">
                            Tue
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  v-model="event.days" value="wed" id="defaultCheck3">
                        <label class="form-check-label" for="defaultCheck3">
                            Wed
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  v-model="event.days" value="thu" id="defaultCheck4">
                        <label class="form-check-label" for="defaultCheck4">
                            Thu
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  v-model="event.days" value="fri" id="defaultCheck5">
                        <label class="form-check-label" for="defaultCheck5">
                            Fri
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  v-model="event.days" value="sat" id="defaultCheck6">
                        <label class="form-check-label" for="defaultCheck6">
                            Sat
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  v-model="event.days" value="sun" id="defaultCheck7">
                        <label class="form-check-label" for="defaultCheck7">
                            Sun
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-primary btn-block" @click="addDatesToEvent">Primary</button>
                </div>
            </div>
            <div class="col-8">
                <div class="alert alert-success" role="alert" v-if="alert">
                    Succesfully added
                     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" @click="alert = false">&times;</span>
                    </button>
                </div>
                <div class="card" v-for="(range, range_ind) in ranges"
                    :key="range_ind">
                    <div class="card-header">
                        {{ range.title }}
                    </div>
                    <ul class="list-group list-group-flush">
                        <li
                            :class="{ 'list-group-item-success': edate.eventDay != null, 'list-group-item' : true}"
                            v-for="(edate, edate_ind) in range.dates" :key="edate_ind">
                            {{ edate.date }} {{ edate.eventDay }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getDates, dateRangeByMonth } from '../../utils/dates'
import { mapGetters } from 'vuex'

export default {
    name: 'MainEvent',
    data() {
        return {
            event: {
                name: '',
                from: '',
                to: '',
                days: []
            },
            alert: false,
            ranges: []
        }
    },
    computed: {
        ...mapGetters([
            'events'
        ])
    },
    mounted() {
        this.$store.dispatch('FetchEvents')
    },
    methods: {
        addDatesToEvent() {
            let self = this
        if(this.event.name !== '' &&
            this.event.from !== '' &&
            this.event.to !== '' &&
            this.event.days.length > 0) {
                let form = this.event
                self.displayEvents()
                this.$store.dispatch('addEvent', form)
                        .then((res) => {
                            this.event = {
                                name: '',
                                from: '',
                                to: '',
                                days: []
                            }
                            this.$nextTick(() => {
                                self.$store.dispatch('FetchEvents')
                            })
                        })
            }
        },
        displayEvents() {
            let self = this
            let start =new Date(this.event.from)
            let end = new Date(this.event.to)
            let date = getDates(start, end)
            let month_range = dateRangeByMonth(this.event.from, this.event.to)

            /// month
            let ranges = []
            const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            month_range.forEach((month, month_ind) => {
                let date_obj = {}
                let current_month = new Date(month)
                date_obj.title = months[current_month.getMonth()] + "-" + current_month.getFullYear()
                date_obj.dates =  []
                date.forEach((dates, dates_ind) => {
                    if(dates.getMonth() == current_month.getMonth()) {
                        let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(dates).getDay()]

                        let eventDay =  (self.event.days.includes(weekday.toLowerCase()) ) ? self.event.name : null
                       date_obj.dates
                                    .push({ date: weekday + ' ' + dates.getDate(),
                                                 eventDay: eventDay})
                    }
                })
                ranges.push(date_obj)
            })
            this.ranges = ranges
            this.alert = true
        }
    }
}
</script>

<style lang="scss" scoped>
.form-check {
    display: inline-block;
}
</style>
