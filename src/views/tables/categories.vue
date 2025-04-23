<template>
    <div>
      <UIComponentCard title="Agregar nueva categpría" id="modal-position">
        <div class="d-flex flex-wrap gap-2 mt-3">
          <b-button variant="primary" @click="verticalCenteredModal = !verticalCenteredModal"> Agregar Nueva categoría
          </b-button>
        </div>
      <input v-model="searchQuery" style="margin-top:10px;" type="text" class="form-control" placeholder="Buscar categoría..." />
      </UIComponentCard>

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
                            <button @click="deleteCategory(category.idCategory)" class="btn btn-sm btn-danger" style="margin-right:5px;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2.75 6.167c0-.46.345-.834.771-.834h2.665c.529-.015.996-.378 1.176-.916l.03-.095l.115-.372c.07-.228.131-.427.217-.605c.338-.702.964-1.189 1.687-1.314c.184-.031.377-.031.6-.031h3.478c.223 0 .417 0 .6.031c.723.125 1.35.612 1.687 1.314c.086.178.147.377.217.605l.115.372l.03.095c.18.538.74.902 1.27.916h2.57c.427 0 .772.373.772.834S20.405 7 19.979 7H3.52c-.426 0-.771-.373-.771-.833M11.607 22h.787c2.707 0 4.06 0 4.941-.863c.88-.864.97-2.28 1.15-5.111l.26-4.081c.098-1.537.147-2.305-.295-2.792s-1.187-.487-2.679-.487H8.23c-1.491 0-2.237 0-2.679.487s-.392 1.255-.295 2.792l.26 4.08c.18 2.833.27 4.248 1.15 5.112S8.9 22 11.607 22"/></svg>
                            </button>
                            <button class="btn btn-sm btn-primary" @click="editCategory(category)">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c1.845 0 3.33 0 4.54.088L13.1 7.25H8.4L11.9 2zM3.464 3.464c1.253-1.252 3.158-1.433 6.632-1.46L6.599 7.25H2.104c.147-1.764.503-2.928 1.36-3.786M2 12c0-1.237 0-2.311.026-3.25h19.948C22 9.689 22 10.763 22 12v.258c-.567-.405-1.205-.578-1.831-.662c-.714-.096-1.595-.096-2.577-.096h-.184c-.982 0-1.863 0-2.577.096c-.779.104-1.578.348-2.233 1.002c-.654.655-.898 1.454-1.002 2.233c-.096.714-.096 1.595-.096 2.577v.184c0 .982 0 1.863.096 2.577c.084.626.257 1.264.662 1.831H12c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12m19.896-4.75c-.147-1.764-.503-2.928-1.36-3.786c-.598-.597-1.344-.95-2.337-1.16L14.9 7.25z"/><path fill="currentColor" fill-rule="evenodd" d="M17.5 22c-2.121 0-3.182 0-3.841-.659S13 19.621 13 17.5s0-3.182.659-3.841S15.379 13 17.5 13s3.182 0 3.841.659S22 15.379 22 17.5s0 3.182-.659 3.841S19.621 22 17.5 22m2.212-6.712a.983.983 0 0 1 0 1.39l-.058.058a.24.24 0 0 1-.211.067a1.6 1.6 0 0 1-.81-.436a1.6 1.6 0 0 1-.436-.81a.24.24 0 0 1 .067-.211l.058-.058a.983.983 0 0 1 1.39 0M17.35 19.04a3 3 0 0 1-.296.279a1.6 1.6 0 0 1-.303.187a3 3 0 0 1-.381.14l-1.021.34a.265.265 0 0 1-.335-.335l.34-1.02c.064-.194.097-.291.14-.382q.077-.163.187-.303c.062-.08.134-.152.279-.296l1.799-1.799c.043-.043.118-.023.138.035a1.98 1.98 0 0 0 1.217 1.217c.058.02.078.095.035.138z" clip-rule="evenodd"/></svg>
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
      <div class="form-group">
        <label>Categoría</label>
        <input type="text" v-model="category" class="form-control" placeholder="Escriba categoría...">
      </div>
      <div class="form-group">
        <label>Añadir imagen</label>
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

    <b-modal v-model="editModal" title="Editar Categoría" ok-title="Actualizar" @ok="updateCategory()" cancel-title="Cancelar" centered>
      <div class="form-group">
        <label>Categoría</label>
        <input type="text" v-model="category" class="form-control" placeholder="Escriba categoría...">
      </div>
      <div class="form-group">
        <label>Añadir imagen</label>
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
      </div>
    </b-modal>
</template>
  
<script setup>
import { ref, computed, onMounted } from "vue";
import UIComponentCard from "@/components/UIComponentCard.vue";

const categories = ref([]);
const category = ref('');
const idCategory = ref('');
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
const editModal = ref(false);

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

const editCategory = async (data) =>{
  editModal.value = true;
  category.value = data.name;
  idCategory.value = data.idCategory;
}

// Función para editar categoría
const updateCategory = async() => {
  const formData = new FormData();
  formData.append('name', category.value);
  if(selectedFile.value!=''){
    formData.append('image', selectedFile.value); // el archivo
  }
  if (category.value.trim()) {
    try {
      const response = await fetch(`http://localhost:8080/categories/update/${idCategory.value}`, {
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
}
  
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