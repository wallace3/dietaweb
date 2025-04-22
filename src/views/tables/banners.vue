<template>
    <UIComponentCard title="Nuevo Banner" id="modal-position">
        <div class="d-flex flex-wrap gap-2 mt-3">
            <b-button variant="primary" @click="dropfileModal = !dropfileModal"> Agregar nuevo banner
            </b-button>
        </div>
    </UIComponentCard>

     <!-- Tabla de categorías -->
     <b-row>
        <UIComponentCard id="basic" title="Banners Actuales">
            <b-table-simple responsive class="table-centered mb-0">
                <b-thead>
                    <b-tr>
                        <b-th @click="sortTable('name')">Nombre</b-th>
                        <b-th @click="sortTable('url')">Imágen</b-th>
                        <b-th @click="sortTable('created_at')">Fecha de Creación</b-th>
                        <b-th>Acciones</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr  v-for="t in banners" :key="t.idBanner">
                        <b-td>{{ t.name }}</b-td>
                        <b-td><img :src="'http://localhost:8080/' + t.url" class="product-img"/></b-td>
                        <b-td>{{ t.created_at }}</b-td>
                        <b-td>
                            <button @click="deleteBanner(t.idBanner)" class="btn btn-sm btn-danger">
                                Eliminar
                            </button>
                        </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </UIComponentCard>
    </b-row>


    <b-modal v-model="successAlertModal" hide-header hide-footer size="sm" content-class="modal-filled bg-success">
      <div class="text-center">
        <i class="bx bx-check-double display-6 mt-0 text-white"></i>
        <h4 class="mt-3 text-white">Éxito</h4>
        <p class="mt-3">{{ message }}</p>
        <b-button type="button" variant="light" class="mt-3" @click="successAlertModal = !successAlertModal"> Continue
        </b-button>
      </div>
    </b-modal>

    <b-modal v-model="dropfileModal" title="Agregar Banner"  cancel-title="Cancelar" centered>
        <DropFileBanner/>
    </b-modal>
    
</template>
<script setup>

import { ref, computed, onMounted } from "vue";
import UIComponentCard from "@/components/UIComponentCard.vue";
import DropFileBanner from "@/components/DropFileBanner.vue";

const banners = ref([]);
const message = ref('');
const dropfileModal = ref(false);
// MODALS
const successAlertModal = ref(false);


const getBanners = async () => {
    try{
        const response = await fetch('http://localhost:8080/banners');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        banners.value = Array.isArray(data) ? data : [];
    }catch (error) {
        console.error('Error en la petición:', error);
    }
}


const deleteBanner = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/banners/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Error al eliminar la imágen');
        }
        successAlertModal.value = true;
        message.value = "Imagen eliminada correctamente";
        getBanners();
      } catch (error) {
        console.error('Error al guardar la imagen:', error);
      }
    }

  
onMounted(()=>{
    getBanners();
})

</script>

<style>
.product-img{
  width: 150px;
}
.delete-img{
  position: absolute;
  top: 0%;
  left:10px;
}
</style>