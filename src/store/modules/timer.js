const pomodoro= 60 * 25
const shortBreak= 60 * 5
const longBreak= 60 * 15


const state = {   
    sectionsPomodoro: [
        pomodoro,
        shortBreak,
        pomodoro,
        shortBreak,
        pomodoro,
        longBreak   
    ],
    currentPomodoro: 0,
    time: 0,
    timer: null,
    numberPomodoros: 0,
    breakTime: false
}

const mutations = {    
    setBreakTime( state, payload ) {   
        state.breakTime = payload
    },
    initTimer( state ) {
        state.time = state.sectionsPomodoro[state.currentPomodoro]
        clearInterval(state.timer)
        state.timer = null   
        state.numberPomodoros = 0
    },
    playTimer( state ) {        
        state.numberPomodoros = 1
        if( state.time <= 0 ) {            
             state.time = state.sectionsPomodoro[state.currentPomodoro]
        }     
        state.timer = setInterval(() => {
            state.time -= 1
            
            if( state.time <= 0 ) {
                if ( state.currentPomodoro == state.sectionsPomodoro.length-1 ) {
                    state.currentPomodoro = 0
                } else {
                    state.currentPomodoro++
                }
                state.time = state.sectionsPomodoro[state.currentPomodoro]
                if ( state.time == pomodoro ) {
                    state.numberPomodoros++
                    state.breakTime = false    
                } else {
                    state.breakTime = true
                }                      
            }    
        }, 1000)
    }
}

export default {
    state, mutations
}