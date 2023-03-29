<template>
  <div id="favourite">
    
    
    <h3>Favourites <button id="changefavourite" @click="changeFavourite = !changeFavourite">
      <font-awesome-icon :icon="['fas','trash-alt']" />
      <font-awesome-icon :icon="changeFavourite ?   'unlock':'lock'" />
    </button></h3>
    <div v-if="favList.length ===0" id="favouriteList">No favourites selected</div>
    <div v-for="(uni, idx) in favList" :key="idx" start="1" type="1" id="favouriteList">
      {{idx+1}}. {{uni}}
      <span v-if="changeFavourite" class="delete-icon" @click="deleteFavourite(idx)">
        <font-awesome-icon :icon="['fas','times']" />
    </span>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faTimes, faLock, faUnlock  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faTrashAlt, faTimes,faLock, faUnlock );
export default {
    name: "DeleteFavouriteUni",
    components: {
        FontAwesomeIcon,
    },
    data() {
        return {
            favList: ["a","b","c"],
            changeFavourite: false,
            deleteIdx: null,
        };
    },
    methods: {
        deleteFavourite(idx) {
            this.deleteIdx = idx;
            this.favList.splice(this.deleteIdx,1);
        },
    },
}
</script>

<style scoped>
#changefavourite {
  background-color: rgb(204, 204, 204, 0.5);
  margin: 4px 2px;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 15px;
  margin-left: 60%;
}
.delete-icon {
  float: right;
  margin-right: 50px;
  cursor: pointer;
}
.delete-icon:hover {
  color: red;
}

</style>