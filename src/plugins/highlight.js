import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import php from 'highlight.js/lib/languages/php'
import curl from 'highlightjs-curl'
import md from 'highlight.js/lib/languages/markdown'
import Vue from 'vue'
import 'highlight.js/styles/github.css'
import vuePlugin from '@highlightjs/vue-plugin'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('php', php)
hljs.registerLanguage('markdown', md)
hljs.registerLanguage('curl', curl)

Vue.use(vuePlugin)
