<template>
    <div>
        <UIComponentCard title="Agregar nueva subcategoria" id="modal-position">
          <div class="d-flex flex-wrap gap-2 mt-3">
            <b-button variant="primary" @click="verticalCenteredModal = !verticalCenteredModal"> Agregar nueva subcategoría
            </b-button>
          </div>

        <input v-model="searchQuery" style="margin-top:10px;" type="text" class="form-control" placeholder="Buscar subcategoría..." />

        </UIComponentCard>
      
      <!-- Barra de búsqueda -->
  
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

    <div>
      <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">Anterior</button>
      <span>{{ currentPage }} de {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">Siguiente</button>
    </div>


    <b-modal v-model="verticalCenteredModal" title="Agregar nueva subcategorías" ok-title="Guardar subcategorías" @ok="saveChanges()" cancel-title="Cancelar" centered>
        <div class="form-group">
            <label for="product">Subcategoría</label>
            <input type="text" v-model="subcategory" class="form-control" placeholder="Escriba subcategoría...">
        </div>
        <div class="form-group">
            <label for="product">Categoría</label>
            <select class = "form-select" v-model="category" >
                <option selected>-- Seleccione --</option>
                <option v-for="cat in categories" :key="cat.idCategory" v-bind:value="cat.idCategory">{{ cat.name }}</option>
            </select>
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

    <b-modal v-model="errorAlertModal" hide-header hide-footer size="sm" content-class="modal-filled bg-danger">
      <div class="text-center">
        <i class="bx bx-check-double display-6 mt-0 text-white"></i>
        <h4 class="mt-3 text-white">Error</h4>
        <p class="mt-3">{{ message }}</p>
        <b-button type="button" variant="light" class="mt-3" @click="errorAlertModal = !errorAlertModal"> Cerrar
        </b-button>
      </div>
    </b-modal>

    <b-modal v-model="editModal" title="Agregar nueva subcategoría" ok-title="Guardar Cambios" @ok="updateSubcategory()" cancel-title="Cancelar" centered>
        <div class="form-group">
          <label for="product">Nombre</label>
          <input type="text" v-model="subcategory" class="form-control" placeholder="Escriba nombre producto...">
        </div>
        <div class="form-group">
            <label for="product">Categoría</label>
            <select class = "form-select" v-model="category" >
                <option selected>-- Seleccione --</option>
                <option v-for="cat in categories" :key="cat.idCategory" v-bind:value="cat.idCategory">{{ cat.name }}</option>
            </select>
        </div>
    </b-modal>  
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import UIComponentCard from "@/components/UIComponentCard.vue";
  
  const subcategories = ref([]);
  const subcategory = ref('');
  const category = ref('');
  const successAlertModal = ref(false);
  const searchQuery = ref('');
  const sortKey = ref('');
  const message = ref('');
  const categories = ref([]);
  const idSubcategory = ref('');
  const editModal = ref(false);
  const verticalCenteredModal = ref(false);
  const errorAlertModal = ref(false);
  const sortDirection = ref('asc'); // ascendente o descendente
  const itemsPerPage = ref(10); // Número de items por página
  const currentPage = ref(1); // Página actual    
  
  // Función para obtener las subcategoríass desde el backend
  const getSubcategories = async () => {
    try {
      const response =  await fetch('http://localhost:8080/subcategories');
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      subcategories.value = Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const updateSubcategory = async () => {
    if (subcategory.value.trim()){
      try {
        const response = await fetch(`http://localhost:8080/subcategories/${idSubcategory.value}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: subcategory.value, idCategory: category.value })
        });
        if (!response.ok) {
          throw new Error('Error al guardar la subcategoría');
        }
        successAlertModal.value = true;
        subcategory.value = '';
        idSubcategory.value = '';
        category.value = '';
        message.value = 'Se edito subcategoria correctamente';
        getSubcategories(); 
      } catch (error) {
        console.error('Error al guardar la subcategoría:', error);
      }
    } else {
        errorAlertModal.value = true;
        message.value = 'Por favor, llene toda la información';
    }
  }
  
  const getCategories = async () =>{
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
  }
  
  // Función para guardar una nueva subcategorías
  const saveChanges = async () => {
    if (subcategory.value.trim()) {
      try {
        const response = await fetch('http://localhost:8080/subcategories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: subcategory.value, status: 1, idCategory: category.value  })
        });
        if (!response.ok) {
          throw new Error('Error al guardar la subcategorías');
        }
        successAlertModal.value = true;
        subcategory.value = '';
        message.value = 'Se creo subcategorías correctamente';
        getSubcategories(); // Actualizar la lista de subcategoríass
      } catch (error) {
        console.error('Error al guardar la subcategorías:', error);
      }
    } else {
      alert('Por favor, ingrese una subcategorías.');
    }
  };

  const editSubcategories = async (subcategorie) => {
    editModal.value = true;
    subcategory.value = subcategorie.name;
    idSubcategory.value = subcategorie.idSubcategory;
  }
  
  // Función para eliminar una subcategorías
  const deleteSubcategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/subcategories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la subcategorías');
      }
      successAlertModal.value = true;
      message.value = "Se elimino subcategorías correctamente";
      getSubcategories(); // Actualizar la lista de subcategoríass después de eliminar
    } catch (error) {
      console.error('Error al eliminar la subcategorías:', error);
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
  
  // Filtrar las subcategoríass basándonos en la búsqueda
  const filteredsubcategories = computed(() => {
    // Filtrar por el término de búsqueda
    let filtered = subcategories.value.filter(subcategory => {
      return subcategory.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
  
    // Ordenar las subcategoríass según la clave y dirección
    if (sortKey.value) {
      filtered = filtered.sort((a, b) => {
        if (a[sortKey.value] < b[sortKey.value]) return sortDirection.value === 'asc' ? -1 : 1;
        if (a[sortKey.value] > b[sortKey.value]) return sortDirection.value === 'asc' ? 1 : -1;
        return 0;
      });
    }
  
    return filtered;
  });

  // Calcular las subcategoríass a mostrar en la página actual (paginación)
const paginatedsubcategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredsubcategories.value.slice(start, end);
});

// Calcular el número total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredsubcategories.value.length / itemsPerPage.value);
});

// Cambiar de página
const changePage = (page) => {
  if (page < 1) page = 1;
  if (page > totalPages.value) page = totalPages.value;
  currentPage.value = page;
};
  
  // Obtener las subcategoríass cuando el componente se monte
  onMounted(() => {
    getSubcategories();
    getCategories();
  });
  </script>
  <style>
  .edit-button{
      margin-left: 15px;
  }
</style>