<template>
    <div>
        <UIComponentCard title="Agregar nuevo producto" id="modal-position">
          <div class="d-flex flex-wrap gap-2 mt-3">
            <b-button variant="primary" @click="verticalCenteredModal = !verticalCenteredModal"> Agregar nuevo producto
            </b-button>
          </div>

            <input v-model="searchQuery" style="margin-top:10px;" type="text" class="form-control" placeholder="Buscar producto" />

        </UIComponentCard>
      
      <!-- Barra de búsqueda -->
  
      <!-- Tabla de categorías -->
    <b-row>
        <UIComponentCard id="basic" title="Tabla de categorías">
            <b-table-simple responsive class="table-centered mb-0">
                <b-thead>
                    <b-tr>
                        <b-th @click="sortTable('name')">Nombre</b-th>
                        <b-th @click="sortTable('description')">Descripción</b-th>
                        <b-th @click="sortTable('idCategory')">Categoría</b-th>
                        <b-th @click="sortTable('idSubcategory')">Subcategoría</b-th>
                        <b-th @click="sortTable('price')">Precio</b-th>
                        <b-th @click="sortTable('idUser')">Usuario</b-th>
                        <b-th @click="sortTable('status')">Estatus</b-th>
                        <b-th @click="sortTable('created_at')">Fecha Creación</b-th>
                        <b-th @click="sortTable('updated_at')">Fecha Modificación</b-th>
                        <b-th>Acciones</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr  v-for="product in filteredProducts" :key="product.idProduct">
                        <b-td>{{ product.name }}</b-td>
                        <b-td>{{ product.description }}</b-td>
                        <b-td>{{ product.idCategory }}</b-td>
                        <b-td>{{ product.idSubcategory }}</b-td>
                        <b-td>{{ product.price }}</b-td>
                        <b-td>{{ product.idUser }}</b-td>
                        <b-td>{{ product.status == 1 ? 'Activo' : 'Inactivo' }}</b-td>
                        <b-td>{{ product.created_at }}</b-td>
                        <b-td>{{ product.updated_at }}</b-td>
                        <b-td>
                            <button @click="deleteProduct(product.idProduct)" class="btn btn-sm btn-danger">
                                Eliminar
                            </button><br>
                            <button @click="editProduct(product)" class="btn btn-sm btn-primary edit-button">
                                Editar
                            </button><br>
                            <button class="btn btn-sm btn-primary edit-button" @click="openDropfile(product.idProduct)"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAPhJREFUSEvt1TFKA0EUgOFvW8u0giAiih7GQmOrh0iTG5irRLD0EnY2FoIYsLYLpIsZswvjEmedMQsWTrOw+977Z/6deVPpeVQ915cCnOEGx5mTeMII9yEvBXjDbmbxJvwFB12AZR2dq/FLXir5H/BpJ1bUVtKl6Bpz3LY2wrf/IAdwggcscIj3CPJrwE5dPEDCCCu43AbgYlXsFPu4amk5x139rmgFAzwjPDeNoKhRVQSYYthxqhtVRYCcjvF3ADPs5Uw9in2tN0PyoIV2PcFRJuQR403tuuvkZnLW4alWUVSwnRQDSp0n74v4Y6nzHwO2oiSlqBfAB2qXPhnrK9GRAAAAAElFTkSuQmCC"/></button><br>
                            <button @click="showImages(product.idProduct)" class="btn btn-sm btn-primary edit-button">
                                Ver imagenes
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

    <b-modal v-model="verticalCenteredModal" title="Agregar nueva categoría" ok-title="Guardar Producto" @ok="saveChanges()" cancel-title="Cancelar" centered>
        <div class="form-group">
            <label for="product">Nombre</label>
            <input type="text" v-model="product" class="form-control" placeholder="Escriba nombre producto...">
        </div>
        <div class="form-group">
            <label for="product">Descripción</label>
            <textarea v-model="description" class="form-control" placeholder="Escriba descripción del producto..." rows="5" cols="5"></textarea>
        </div>
        <div class="form-group">
            <label for="product">Precio</label>
            <input type="text" v-model="price" class="form-control" placeholder="Escriba pecio...">
        </div>

        <div class="form-group">
            <label for="product">Categoría</label>
            <select class = "form-select" v-model="category" @change="getSubcategories()">
                <option selected>-- Seleccione --</option>
                <option v-for="cat in categories" :key="cat.idCategory" v-bind:value="cat.idCategory">{{ cat.name }}</option>
            </select>
        </div>

        <div class="form-group">
            <label for="product">Subcategoría</label>
            <select class = "form-select" v-model="subcategory" >
                <option selected>-- Seleccione --</option>
                <option v-for="sub in subcategories" :key="sub.idCategory" v-bind:value="sub.idSubcategory">{{ sub.name }}</option>
            </select>
        </div>

        <div class="form-group">
            <label for="product">Usuario Proveedor</label>
            <select class = "form-select" v-model="user" placeholder="Seleccione">
                <option  selected>-- Seleccione --</option>
                <option v-for="us in users" :key="us.idUser" v-bind:value="us.idUser">{{ us.name }} {{ us.lastName }}</option>
            </select>
        </div>
    </b-modal>

    <b-modal v-model="dropfileModal" title="Agregar imagen a producto"  cancel-title="Cancelar" centered>
        <DropFile :idProd = "idProduct"/>
    </b-modal>

    <b-modal v-model="imagesModal" title="Imagenes de Producto" cancel-title="Cerrar" centered>
      <div class = "row" v-if="images">
        <div class = "col-md-6" v-for="img in images">
          <img :src="'http://localhost:8080/' + img.url" class="product-img"/>
          <button class="btn btn-sm btn-danger delete-img"><i class='bx bx-x' @click="deleteImage(img.idImage, img.idProduct)"></i></button>
        </div>
      </div>
    </b-modal>

    <b-modal v-model="editModal" title="Actualizar producto" ok-title="Guardar Cambios" @ok="updateProduct()" cancel-title="Cancelar" centered>
        <div class="form-group">
            <label for="product">Nombre</label>
            <input type="text" v-model="product" class="form-control" placeholder="Escriba nombre producto...">
        </div>
        <div class="form-group">
            <label for="product">Descripción</label>
            <textarea v-model="description" class="form-control" placeholder="Escriba descripción del producto..." rows="5" cols="5"></textarea>
        </div>
        <div class="form-group">
            <label for="product">Precio</label>
            <input type="text" v-model="price" class="form-control" placeholder="Escriba pecio...">
        </div>

        <div class="form-group">
            <label for="product">Categoría</label>
            <select class = "form-select" v-model="category" @change="getSubcategories()" >
                <option selected>-- Seleccione --</option>
                <option v-for="cat in categories" :key="cat.idCategory" v-bind:value="cat.idCategory">{{ cat.name }}</option>
            </select>
        </div>

        <div class="form-group">
            <label for="product">Subcategoría</label>
            <select class = "form-select" v-model="subcategory" >
                <option selected>-- Seleccione --</option>
                <option v-for="sub in subcategories" :key="sub.idCategory" v-bind:value="sub.idSubcategory">{{ sub.name }}</option>
            </select>
        </div>

        <div class="form-group">
            <label for="product">Usuario Proveedor</label>
            <select class = "form-select" v-model="user" placeholder="Seleccione">
                <option  selected>-- Seleccione --</option>
                <option v-for="us in users" :key="us.idUser" v-bind:value="us.idUser">{{ us.name }} {{ us.lastName }}</option>
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
    
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import UIComponentCard from "@/components/UIComponentCard.vue";
  import DropFile from "@/components/DropFile.vue";

  const products = ref([]);
  const product = ref('');
  const categories = ref([]);
  const users = ref([]);
  const user = ref('');
  const idProduct = ref('');
  const category = ref('');
  const subcategories = ref ([]);
  const subcategory = ref('');
  const description = ref('');
  const price = ref('');
  const successAlertModal = ref(false);
  const errorAlertModal = ref(false);
  const searchQuery = ref('');
  const sortKey = ref('');
  const message = ref('');
  const verticalCenteredModal = ref(false);
  const editModal = ref(false);
  const dropfileModal = ref(false);
  const imagesModal = ref(false);
  const images = ref([]);
  const sortDirection = ref('asc'); // ascendente o descendente
  const itemsPerPage = ref(10); // Número de items por página
  const currentPage = ref(1); // Página actual    
  
  // Función para obtener los productos desde el backend
  const getProducts = async () => {
    try {
      const response =  await fetch('http://localhost:8080/products');
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      products.value = Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

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
    }

    const openDropfile = async (id) => {
      console.log(id);
      idProduct.value = id;
      dropfileModal.value = true;
    }

    const showImages = async (id) => {
      try {
          const response =  await fetch(`http://localhost:8080/images/${id}`);
          if (!response.ok) {
              throw new Error(`Error HTTP: ${response.status}`);
          }

          const data = await response.json();
          console.log(data);
          
          images.value = Array.isArray(data.data) ? data.data : [];
          console.log(images);
          
          imagesModal.value = true;
      } catch (error) {
          console.error('Error en la petición:', error);
      }
    }

    const deleteImage = async (id, idProd) => {
      try {
        const response = await fetch(`http://localhost:8080/images/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Error al guardar la categoría');
        }
        successAlertModal.value = true;
        message.value = "Imagen eliminada correctamente";
        showImages(idProd); 
      } catch (error) {
        console.error('Error al guardar el producto:', error);
      }
    }

    const getSubcategories = async () => {
      try {
        const response =  await fetch('http://localhost:8080/subcategories');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        subcategories.value = Array.isArray(data) ? data : [];
      }catch (error) {
        console.error('Error en la petición:', error);
      }
    }

    const getUsers = async () => {
        try {
            const response =  await fetch('http://localhost:8080/users');
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = await response.json();
            users.value = Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    }
  
  // Función para guardar nuevo producto
  const saveChanges = async () => {
    if (product.value.trim() && description.value.trim() && price.value.trim() && user.value.trim() && category.value.trim()) {
      try {
        const response = await fetch('http://localhost:8080/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: product.value, description: description.value, idCategory: category.value, idSubcategory: subcategory.value, idUser: user.value, price:price.value, status:1 })
        });
        if (!response.ok) {
          throw new Error('Error al guardar la categoría');
        }
        successAlertModal.value = true;
        category.value = '';
        message.value = 'Se agregó producto correctamente';
        category.value = '';
        product.value = '';
        price.value = '';
        description.value = '';
        user.value = '';
        getProducts(); 
      } catch (error) {
        console.error('Error al guardar el producto:', error);
      }
    } else {
        errorAlertModal.value = true;
        message.value = 'Por favor, llene toda la información';
    }
  };

  const editProduct = async (productData) => {
    product.value  = productData.name;
    category.value = productData.idCategory;
    price.value = productData.price;
    description.value = productData.description;
    user.value = productData.idUser;
    subcategory.value = productData.idSubcategory;
    idProduct.value = productData.idProduct;
    editModal.value = true;
  }

  const updateProduct = async () => {
    if (product.value.trim() && description.value.trim() && price.value.trim() && user.value.trim() && category.value.trim()) {
      try {
        const response = await fetch(`http://localhost:8080/products/${idProduct.value}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: product.value, description: description.value, idCategory: category.value, idSubcategory: subcategory.value, idUser: user.value, price:price.value, status:1 })
        });
        if (!response.ok) {
          throw new Error('Error al guardar la categoría');
        }
        successAlertModal.value = true;
        category.value = '';
        product.value = '';
        price.value = '';
        description.value = '';
        user.value = '';
        message.value = 'Se agregó producto correctamente';
        getProducts(); 
      } catch (error) {
        console.error('Error al guardar el producto:', error);
      }
    } else {
        errorAlertModal.value = true;
        message.value = 'Por favor, llene toda la información';
    }
  }
  
  // Función para eliminar un producto
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
    if (sortKey.value === key) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey.value = key;
      sortDirection.value = 'asc';
    }
  };
  
  
  const filteredProducts = computed(() => {
    let filtered = products.value.filter(product => {
      return product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
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

  // Calcular los productos a mostrar en la página actual (paginación)
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
});

// Calcular el número total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage.value);
});

// Cambiar de página
const changePage = (page) => {
  if (page < 1) page = 1;
  if (page > totalPages.value) page = totalPages.value;
  currentPage.value = page;
};
  
  onMounted(() => {
    getProducts();
    getCategories();
    getUsers();
  });
  </script>
  <style>
    .product-img{
      width: 100%;
    }
    .delete-img{
      position: absolute;
      top: 0%;
      left:10px;
    }
  </style>