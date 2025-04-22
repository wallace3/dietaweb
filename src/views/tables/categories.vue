<template>
    <div>
        <UIComponentCard title="Agregar nueva categpría" id="modal-position">
          <div class="d-flex flex-wrap gap-2 mt-3">
            <b-button variant="primary" @click="verticalCenteredModal = !verticalCenteredModal"> Agregar Nueva categoría
            </b-button>
          </div>

        <input v-model="searchQuery" style="margin-top:10px;" type="text" class="form-control" placeholder="Buscar categoría..." />

        </UIComponentCard>
      
      <!-- Barra de búsqueda -->
  
      <!-- Tabla de categorías -->
    <b-row>
        <UIComponentCard id="basic" title="Tabla de categorías">
            <b-table-simple responsive class="table-centered mb-0">
                <b-thead>
                    <b-tr>
                        <b-th @click="sortTable('name')">Nombre</b-th>
                        <b-th @click="sortTable('url')">Imagen</b-th>
                        <b-th @click="sortTable('created_at')">Fecha de Creación</b-th>
                        <b-th @click="sortTable('updated_at')">Fecha Actualización</b-th>
                        <b-th @click="sortTable('status')">Estatus</b-th>
                        <b-th>Acciones</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr  v-for="category in filteredCategories" :key="category.idCategory">
                        <b-td>{{ category.name }}</b-td>
                        <b-td><img :src="'http://localhost:8080/' + category.url" class="product-img"/></b-td>
                        <b-td>{{ category.created_at }}</b-td>
                        <b-td>{{ category.updated_at }}</b-td>
                        <b-td>{{ category.status == 1 ? 'Activo' : 'Inactivo' }}</b-td>
                        <b-td>
                            <button @click="deleteCategory(category.idCategory)" class="btn btn-sm btn-danger">
                                Eliminar
                            </button>
                        </b-td>
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


    <b-modal v-model="verticalCenteredModal" title="Agregar nueva categoría" ok-title="Guardar Categoría" @ok="saveChanges()" cancel-title="Cancelar" centered>
      <input type="text" v-model="category" class="form-control" placeholder="Escriba categoría...">
      <div
        class="dropzone-container"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
      <input
      type="file"
    name="file"
    id="fileInput"
    class="hidden-input"
    @change="onChange"
    ref="fileInput"
    accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>
  
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
  
  const categories = ref([]);
  const category = ref('');
  const successAlertModal = ref(false);
  const searchQuery = ref('');
  const sortKey = ref('');
  const message = ref('');
  const verticalCenteredModal = ref(false);
  const sortDirection = ref('asc'); // ascendente o descendente
  const itemsPerPage = ref(10); // Número de items por página
  const currentPage = ref(1); // Página actual    
  const fileInput = ref(null);
  const selectedFile = ref();  // un solo archivo
  
  // Función para obtener las categorías desde el backend
  const getCategories = async () => {
    try {
      const response =  await fetch('http://localhost:8080/categories');
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      categories.value = Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  function onChange(){
    const input = fileInput.value;
    if (input?.files && input.files.length > 0) {
      selectedFile.value = input.files[0];
    }
  }
  
  // Función para guardar una nueva categoría
  const saveChanges = async () => {
    const formData = new FormData();
    formData.append('name', category.value);
    formData.append('status', 1);
    formData.append('image', selectedFile.value); // el archivo
    if (category.value.trim()) {
      try {
        const response = await fetch('http://localhost:8080/categories', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) {
          throw new Error('Error al guardar la categoría');
        }
        successAlertModal.value = true;
        category.value = '';
        message.value = 'Se creo categoría correctamente';
        getCategories(); // Actualizar la lista de categorías
      } catch (error) {
        console.error('Error al guardar la categoría:', error);
      }
    } else {
      alert('Por favor, ingrese una categoría.');
    }
  };
  
  // Función para eliminar una categoría
  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la categoría');
      }
      successAlertModal.value = true;
      message.value = "Se elimino categoría correctamente";
      getCategories(); // Actualizar la lista de categorías después de eliminar
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
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
  const filteredCategories = computed(() => {
    // Filtrar por el término de búsqueda
    let filtered = categories.value.filter(category => {
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
const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCategories.value.slice(start, end);
});

// Calcular el número total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredCategories.value.length / itemsPerPage.value);
});

// Cambiar de página
const changePage = (page) => {
  if (page < 1) page = 1;
  if (page > totalPages.value) page = totalPages.value;
  currentPage.value = page;
};
  
  // Obtener las categorías cuando el componente se monte
  onMounted(() => {
    getCategories();
  });
  </script>

<style>
 .dropzone-container {
    padding: 4rem;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
  }
  .product-img{
   width: 150px;
  }
</style>