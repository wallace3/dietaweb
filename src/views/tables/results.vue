<template>
    <div>
        <UIComponentCard title="Buscar Subasta" id="modal-position">
            <div class="form-group">
                <label>Subastas</label>
                <select class="form-select" v-model="idAuction" @change="getResults()">
                    <option selected>-- Seleccione --</option>
                    <option v-for="a in auctions" :key="a.idAuction" v-bind:value="a.idAuction" >{{ a.name }}</option>
                </select>
            </div>
        </UIComponentCard>
      <!-- Tabla de Pujas -->
        <b-row>
            <UIComponentCard id="basic" title="Tabla de Resultados" v-if="results">
                <b-table-simple responsive class="table-centered mb-0">
                    <b-thead>
                        <b-tr>
                            <b-th @click="sortTable('name')">Subasta</b-th>
                            <b-th @click="sortTable('producto')">Producto</b-th>
                            <b-th @click="sortTable('name')">Precio</b-th>
                            <b-th @click="sortTable('bid')">Precio Final</b-th>
                            <b-th @click="sortTable('idUser')">Usuario</b-th>
                        </b-tr>
                    </b-thead>
                    <b-tbody>
                        <b-tr  v-for="res in filteredResults" :key="res.idAuctionDetail">
                            <b-td>{{ res.name}}</b-td>
                            <b-td><img :src="'http://localhost:8080/' + res.image_url" style="width:60px;">{{ res.product }}</b-td>
                            <b-td>$ {{ res.price }}</b-td>
                            <b-td>{{ res.bid }}</b-td>
                            <b-td>{{ res.idUser }}</b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
            </UIComponentCard>
        </b-row>
    </div>

    <div>
      <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">Anterior</button>
      <span>{{ currentPage }} de {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">Siguiente</button>
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

import { ref, onMounted, computed } from "vue";
import UIComponentCard from "@/components/UIComponentCard.vue";

const results = ref([]);
const auctions = ref([]);
const idAuction = ref([]);
const sortDirection = ref('asc'); // ascendente o descendente
const itemsPerPage = ref(10); // Número de items por página
const currentPage = ref(1); // Página actual  
const searchQuery = ref('');
const sortKey = ref('');

const getResults = async () => {
    try {
        const response =  await fetch(`http://localhost:8080/auction/results/${idAuction.value}`);
        if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        results.value = Array.isArray(data) ? data : [];
        console.log(results);
        
    } catch (error) {
        console.error('Error en la petición:', error);
    }
};

const getAuctions = async() => {
    try {
        const response =  await fetch('http://localhost:8080/auction/endedAuctions/');
        if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        auctions.value = Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error en la petición:', error);
    }
}

const sortTable = (key) => {
    if (sortKey.value === key) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortDirection.value = 'asc';
    }
};

const filteredResults = computed(() => {
    let filtered = results.value.filter(result => {
        return result.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
    if (sortKey.value) {
        filtered = filtered.sort((a, b) => {
        if (a[sortKey.value] < b[sortKey.value]) return sortDirection.value === 'asc' ? -1 : 1;
        if (a[sortKey.value] > b[sortKey.value]) return sortDirection.value === 'asc' ? 1 : -1;
        return 0;
        });
    }
    return filtered;
});

const paginatedresults = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredResults.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredResults.value.length / itemsPerPage.value);
});

const changePage = (page) => {
  if (page < 1) page = 1;
  if (page > totalPages.value) page = totalPages.value;
  currentPage.value = page;
};

onMounted(() => {
    getAuctions();
});
</script>