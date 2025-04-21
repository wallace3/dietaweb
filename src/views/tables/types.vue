<template>
    <UIComponentCard title="Agregar nuevo tipo deusuario" id="modal-position">
        <div class="d-flex flex-wrap gap-2 mt-3">
            <b-button variant="primary" @click="verticalCenteredModal = !verticalCenteredModal"> Agregar Nuevo tipo de usuario
            </b-button>
        </div>
        <input v-model="searchQuery" style="margin-top:10px;" type="text" class="form-control" placeholder="Buscar tipo de usuario ..." />
    </UIComponentCard>

     <!-- Tabla de categorías -->
     <b-row>
        <UIComponentCard id="basic" title="Tabla de tipos de usuario">
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
                    <b-tr  v-for="t in types" :key="t.idType">
                        <b-td>{{ t.name }}</b-td>
                        <b-td>{{ t.created_at }}</b-td>
                        <b-td>{{ t.updated_at }}</b-td>
                        <b-td>{{ t.status == 1 ? 'Activo' : 'Inactivo' }}</b-td>
                        <b-td>
                            <button @click="deleteType(t.idType)" class="btn btn-sm btn-danger">
                                Eliminar
                            </button>
                        </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </UIComponentCard>
    </b-row>

    <b-modal v-model="verticalCenteredModal" title="Agregar nuevo tipo de usuario" ok-title="Guardar tipo de usuario" @ok="saveType()" cancel-title="Cancelar" centered>
      <input type="text" v-model="type" class="form-control" placeholder="Escriba tipo de usuario ...">
    </b-modal>

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

const types = ref([]);
const type = ref('');
const message = ref('');
const searchQuery = ref('');
// MODALS
const successAlertModal = ref(false)
const verticalCenteredModal = ref(false);


const getTypes = async () => {
    try{
        const response = await fetch('http://localhost:8080/types');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        types.value = Array.isArray(data) ? data : [];
    }catch (error) {
        console.error('Error en la petición:', error);
    }
}

 // Función para guardar una nueva categoría
const saveType = async () => {
    if (type.value.trim()) {
        try {
        const response = await fetch('http://localhost:8080/types', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: type.value, status: 1 })
        });
        if (!response.ok) {
            throw new Error('Error al guardar el tipo de usuario');
        }
        successAlertModal.value = true;
        type.value = '';
        message.value = 'Se creo tipo de usuario correctamente';
        getTypes(); // Actualizar la lista de categorías
        } catch (error) {
            console.error('Error al guardar la categoría:', error);
        }
    } else {
        alert('Por favor, ingrese una categoría.');
    }
};
  

onMounted(()=>{
    getTypes();
})


</script>