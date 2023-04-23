<!-- Log.vue functionality -->

<template>
  <div class="log">

    <!-- Title of the webpage -->
    <div class="title has-text-centered">
      View Log
    </div>

    <!-- The cards that hold the log -->
    <div 
      v-for="entry in log"
      class="card mb-5"
      >
      <div class="card-content">
        <div class="content">

          <div class="columns is-mobile is-vcentered">
            <div class="column">
              {{ entry.content }}
            </div>
            <div class="column is-5 has-text-right">
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<!-- Database Management -->
<script setup>

  import {ref, onMounted} from 'vue'
  import { collection, onSnapshot, 
          addDoc, doc, deleteDoc,
          query, orderBy} from "firebase/firestore"
  import {db} from '@/firebase'

  // the collection that holds all of the log
  const logCollectionRef = collection(db, 'log')
  const logCollectionQuery = query(logCollectionRef, orderBy("date", "desc"))

  // the array that holds all of the log
  const log = ref([
    // {
    //   id: 'id1',
    //   content: '1234'
    // },
    // {
    //   id: 'id2',
    //   content: '5678'
    // }
  ])

  //get log
  onMounted ( () => {
    onSnapshot(logCollectionRef, (querySnapshot) => {
      const fblog = []
      querySnapshot.forEach((doc) => {
        const log = {
          id: doc.id,
          content: doc.data().content,
        }
        fblog.push(log)
      })
      log.value = fblog
    })
  })

</script>


<!-- Using bulma to make the frontend look nicer -->
<style>
  @import 'bulma/css/bulma.min.css';

  .log {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px
  }
</style>