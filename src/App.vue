<template>
  <div id="app">
    <router-view/>
    <Footer />
    <FlashMessage :position="'right bottom'"></FlashMessage>
  </div>
</template>
<script>
import Footer from './components/Footer.vue'

export default{
  components: {
    Footer
    
  },
}
</script>


