<template>
    <div>
      <!-- Tabla de subcategoríass -->
        <b-row>
            <UIComponentCard id="basic" title="Tabla de subcategorías">
                <b-table-simple responsive class="table-centered mb-0">
                    <b-thead>
                        <b-tr>
                            <b-th @click="sortTable('name')">Nombre</b-th>
                            <b-th @click="sortTable('created_at')">Fecha de Creación</b-th>
                            <b-th @click="sortTable('updated_at')">Fecha Actualización</b-th>
                            <b-th @click="sortTable('status')">Estatus</b-th>
                            <b-th>Acciones</b-th>
                        </b-tr>
                    </b-thead>
                    <b-tbody>
                        <b-tr  v-for="subcategorie in filteredsubcategories" :key="subcategorie.idSubcategory">
                            <b-td>{{ subcategorie.name }}</b-td>
                            <b-td>{{ subcategorie.created_at }}</b-td>
                            <b-td>{{ subcategorie.updated_at }}</b-td>
                            <b-td>{{ subcategorie.status == 1 ? 'Activo' : 'Inactivo' }}</b-td>
                            <b-td>
                                <button @click="deleteSubcategory(subcategorie.idsubcategorie)" class="btn btn-sm btn-danger">
                                    Eliminar
                                </button>
                                <button @click="editSubcategories(subcategorie)" class="btn btn-sm btn-primary edit-button">
                                    Editar
                                </button>
                            </b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
            </UIComponentCard>
        </b-row>
    </div>

    <b-modal v-model="successAlertModal" hide-header hide-footer size="sm" content-class="modal-filled bg-success">
      <div class="text-center">
        <i class="bx bx-check-double display-6 mt-0 text-white"></i>
        <h4 class="mt-3 text-white">Éxito</h4>
        <p class="mt-3">{{ message }}</p>
        <b-button type="button" variant="light" class="mt-3" @click="successAlertModal = !successAlertModal"> Continue
        </b-button>
      </div>
    </b-modal>

  </template>
  
<script setup>

import { ref, computed, onMounted } from "vue";
import UIComponentCard from "@/components/UIComponentCard.vue";

const bids = ref([]);

//MODALS
const successAlertModal = ref(false);

const getBids = async () => {
    try {
        const response =  await fetch('http://localhost:8080/bids');
        if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        bids.value = Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error en la petición:', error);
    }
};


onMounted(() => {
    getBids();
});
</script>

<style>
.edit-button{
    margin-left: 15px;
}
</style>