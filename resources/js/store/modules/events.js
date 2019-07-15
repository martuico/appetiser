import { getEvents, postEvent } from '../../api/events'

const events = {
    state: {
        events: []
    },
    mutations: {
        GET_EVENTS(state, events)  {
            state.events = events
        }
    },
    actions: {
        async FetchEvents ({ commit } )  {
            return await new Promise((resolve, reject) => {
                getEvents()
                    .then((res) => {
                        if(res.length > 0) res.days = res.days.split(',')
                        resolve(res)
                    }).catch(err => reject(err))
            })
        },
        async addEvent({ commit }, form) {
            return await new Promise((resolve, reject) => {
                let data = form
                data.days = form.days.join(", ")

                postEvent(form)
                    .then((res) => {
                        console.log(res)
                        if(res.length > 0)  res.days = res.days.split(',')
                        resolve(res)
                    }).catch(err => reject(err))
            })
        }
    }
}

export default events