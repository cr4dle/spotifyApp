<template>
  <div class="unauthorised">
    <p>
      429 - Hold your hourses! You need to cool down before continue using the
      application
    </p>
    <p>
      go back to <router-link :to="{ name: 'Main' }">Main</router-link> page
    </p>
  </div>
</template>
