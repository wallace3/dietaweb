<template>
    <div>
        <UIComponentCard title="Buscar Subasta" id="modal-position">
            <input v-model="searchQuery" style="margin-top:10px;" type="text" class="form-control" placeholder="Buscar subasta..." />
        </UIComponentCard>
      <!-- Tabla de Pujas -->
        <b-row>
            <UIComponentCard id="basic" title="Tabla de Pujas">
                <b-table-simple responsive class="table-centered mb-0">
                    <b-thead>
                        <b-tr>
                            <b-th @click="sortTable('auction')">Subasta</b-th>
                            <b-th @click="sortTable('firstName')">Nombre</b-th>
                            <b-th @click="sortTable('name')">Producto</b-th>
                            <b-th @click="sortTable('amount')">Oferta</b-th>
                            <b-th @click="sortTable('created_at')">Fecha y Hora de Oferta</b-th>
                        </b-tr>
                    </b-thead>
                    <b-tbody>
                        <b-tr  v-for="bid in filteredbids" :key="bid.idBid">
                            <b-td>{{ bid.auction }}</b-td>
                            <b-td>{{ bid.firstName }} {{ bid.lastName }}</b-td>
                            <b-td><img :src="'http://localhost:8080/' + bid.image_url" style="width:60px;">{{ bid.name }}</b-td>
                            <b-td>$ {{ bid.amount }}</b-td>
                            <b-td>{{ bid.created_at }}</b-td>
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

import { ref, computed, onMounted } from "vue";
import UIComponentCard from "@/components/UIComponentCard.vue";

const bids = ref([]);
const sortDirection = ref('asc'); // ascendente o descendente
const itemsPerPage = ref(10); // Número de items por página
const currentPage = ref(1); // Página actual  
const searchQuery = ref('');
const sortKey = ref('');

const getBids = async () => {
    try {
        const response =  await fetch('http://localhost:8080/bids/history');
        if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        bids.value = Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error en la petición:', error);
    }
};

const sortTable = (key) => {
    if (sortKey.value === key) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortDirection.value = 'asc';
    }
};

const filteredbids = computed(() => {
    let filtered = bids.value.filter(bid => {
        return bid.auction.toLowerCase().includes(searchQuery.value.toLowerCase());
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

const paginatedbids = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredbids.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredbids.value.length / itemsPerPage.value);
});

const changePage = (page) => {
  if (page < 1) page = 1;
  if (page > totalPages.value) page = totalPages.value;
  currentPage.value = page;
};

onMounted(() => {
    getBids();
});
</script>