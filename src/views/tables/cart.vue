<template>
    <div>
        <UIComponentCard title="Buscar..." id="modal-position">
            <input v-model="searchQuery" style="margin-top:10px;" type="text" class="form-control" placeholder="Buscar..." />
        </UIComponentCard>
    <!-- Tabla de wishlist -->
      <b-row>
        <UIComponentCard id="basic" title="Tabla de wishlist">
            <b-table-simple responsive class="table-centered mb-0">
                <b-thead>
                    <b-tr>
                        <b-th @click="sortTable('image_url')">Imagen</b-th>
                        <b-th @click="sortTable('name')">Producto</b-th>
                        <b-th @click="sortTable('description')">Descripción</b-th>
                        <b-th @click="sortTable('userName')">Cliente</b-th>
                        <b-th @click="sortTable('email')">Email</b-th>
                        <b-th @click="sortTable('created_at')">Fecha Creación</b-th>
                        <b-th @click="sortTable('updated_at')">Fecha Actualización</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr  v-for="item in filteredCart" :key="item.idCart">
                        <b-td><img :src="'http://localhost:8080/' + item.image_url" class="product-img"/></b-td>
                        <b-td>{{ item.name }}</b-td>
                        <b-td>{{ item.description}}</b-td>
                        <b-td>{{ item.userName }} {{ item.lastName }}</b-td>
                        <b-td>{{ item.email }}</b-td>
                        <b-td>{{ item.created_at }}</b-td>
                        <b-td>{{ item.updated_at }}</b-td>
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

</template>
  
<script setup>
import { ref, computed, onMounted } from "vue";
import UIComponentCard from "@/components/UIComponentCard.vue";

const cart = ref([]);
const sortDirection = ref('asc'); // ascendente o descendente
const itemsPerPage = ref(10); // Número de items por página
const currentPage = ref(1); // Página actual  
const searchQuery = ref('');
const sortKey = ref('');

const getCart = async () => {
  try {
    const response =  await fetch('http://localhost:8080/cart');
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    cart.value = Array.isArray(data) ? data : [];
    console.log(wishlist);
    
  } catch (error) {
    console.error('Error en la petición:', error);
  }
};


// Función para ordenar la tabla
const sortTable = (key) => {
  // Cambiar la dirección de ordenamiento
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDirection.value = 'asc';
  }
};
  
// Filtrar las categorías basándonos en la búsqueda
const filteredCart = computed(() => {
  // Filtrar por el término de búsqueda
  let filtered = cart.value.filter(category => {
    return category.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });

  // Ordenar las categorías según la clave y dirección
  if (sortKey.value) {
    filtered = filtered.sort((a, b) => {
      if (a[sortKey.value] < b[sortKey.value]) return sortDirection.value === 'asc' ? -1 : 1;
      if (a[sortKey.value] > b[sortKey.value]) return sortDirection.value === 'asc' ? 1 : -1;
      return 0;
    });
  }
  return filtered;
});

  // Calcular las categorías a mostrar en la página actual (paginación)
const paginatedCart = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCart.value.slice(start, end);
});

// Calcular el número total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredCart.value.length / itemsPerPage.value);
});

// Cambiar de página
const changePage = (page) => {
  if (page < 1) page = 1;
  if (page > totalPages.value) page = totalPages.value;
  currentPage.value = page;
};

onMounted(() => {
    getCart();
});

</script>
<style>
.product-img{
    width:80px;
}
</style>