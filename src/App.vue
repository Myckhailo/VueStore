<template>
  <div class="conteiner">
    <my-componentSecond/>
    <my-component/>
  
    <my-componentFirst/>
    
  </div>
  
  
</template>

<script>



export default {
  name: 'App',
  
}
</script>

<style>
  *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      position: relative;
      
  };
  .conteiner{
      margin: 0 auto;
      max-width: 1240px;
  }
</style>
