import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: { id: 'G-G76JVY9BJ5', enabled: true },
})

const cpm = {}
function initGDPR(h, u, b) {
  const d = h.getElementsByTagName('script')[0]
  const e = h.createElement('script')
  e.async = true
  e.src = 'https://cookiehub.net/c2/7bce06d3.js'
  e.onload = function () {
    u.cookiehub.load(b)
  }
  d.parentNode.insertBefore(e, d)
}

if (process.env.NODE_ENV === 'production') {
  initGDPR(document, window, cpm)
}
