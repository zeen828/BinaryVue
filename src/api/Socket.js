import Vue from 'vue'
const wsUrl = process.env.VUE_APP_WS_URL
var socket = new WebSocket(wsUrl)
const emitter = new Vue({
  methods: {
    send(message) {
      if (1 === socket.readyState) socket.send(JSON.stringify(message))
    },
    connect() {
      socket = new WebSocket(wsUrl)
      socket.onopen = function(open) {
        emitter.$emit('open', open)
      }
      socket.onmessage = function(message) {
        emitter.$emit('message', message.data)
      }
      socket.onerror = function(error) {
        emitter.$emit('error', error)
      }
      socket.onclose = function() {
        emitter.connect()
      }
    }
  }
})

emitter.connect()
export default emitter
