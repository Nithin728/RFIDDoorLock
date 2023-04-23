<!-- Keycodes.vue functionality -->

<template>
  <div class="keycodes">

    <!-- Title of the webpage -->
    <div class="title has-text-centered">
      Edit Keycodes
    </div>

    <!-- The bar and button to enter keycodes -->
    <form
      @submit.prevent="addKeycode"
    >
      <div class="field has-addons mb-5">
        <div class="control">
          <input 
          v-model="newKeycodeContent"
          class="input"
          type="text" 
          placeholder="Enter a keycode"
        >
        </div>
        <div class="control">
          <button
          :disabled="!newKeycodeContent"
           class="button is-info"
          >
            Add
          </button>
        </div>
      </div>
    </form>

    <!-- The cards that hold the keycodes -->
    <div 
      v-for="keycode in keycodes"
      class="card mb-5"
      >
      <div class="card-content">
        <div class="content">

          <div class="columns is-mobile is-vcentered">
            <div class="column">
              {{ keycode.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button
                @click="deleteKeycode(keycode.id)"
                class="button is-danger"
              >
                &cross;
              </button>
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

  // the collection that holds all of the keycodes
  const keycodesCollectionRef = collection(db, 'keycodes')
  const keycodesCollectionQuery = query(keycodesCollectionRef, orderBy("date", "desc"))

  // the array that holds all of the keycodes
  const keycodes = ref([
    // {
    //   id: 'id1',
    //   content: '1234'
    // },
    // {
    //   id: 'id2',
    //   content: '5678'
    // }
  ])

  //get keycodes
  onMounted ( () => {
    onSnapshot(keycodesCollectionRef, (querySnapshot) => {
      const fbkeycodes = []
      querySnapshot.forEach((doc) => {
        const keycodes = {
          id: doc.id,
          content: doc.data().content,
        }
        fbkeycodes.push(keycodes)
      })
      keycodes.value = fbkeycodes
    })
  })

  // whatever is typed in the input bar will show up here
  const newKeycodeContent = ref('')
  
  // adds keycodes through the input bar
  const addKeycode = () => {

    addDoc(keycodesCollectionRef, {
      content: newKeycodeContent.value,
      date: Date.now()
    })
    newKeycodeContent.value=''
  }

  //deletes keycodes through the input bar
  const deleteKeycode = id => {
    deleteDoc(doc(keycodesCollectionRef , id))
  }

</script>


<!-- Using bulma to make the frontend look nicer -->
<style>
  @import 'bulma/css/bulma.min.css';

  .keycodes {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px
  }
</style>