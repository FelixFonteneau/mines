<template>
  <div class="page404">
    <div class="core">
      <h1>Page Not Found</h1>
      <p>Sorry, but the page you were trying to view does not exist.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
  * {
    line-height: 1.2;
    margin: 0;
  }

  .page404 {
    color: #888;
    display: table;
    font-family: sans-serif;
    height: 100%;
    text-align: center;
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);
  }

  .core {
    display: table-cell;
    vertical-align: middle;
    margin: 2em auto;
  }

  h1 {
    color: #555;
    font-size: 2em;
    font-weight: 400;
  }

  p {
    margin: 0 auto;
    width: 280px;
  }

  @media only screen and (max-width: 280px) {

    .page404,
    p {
      width: 95%;
    }

    h1 {
      font-size: 1.5em;
      margin: 0 0 0.3em;
    }

  }
</style>
