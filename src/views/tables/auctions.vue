<template>
    <UIComponentCard title="Agregar nueva subasta" id="modal-position">
        <div class="d-flex flex-wrap gap-2 mt-3">
          <b-button variant="primary" @click="addNewModal = !addNewModal"> Agregar nueva subasta
          </b-button>
        </div>
        <input v-model="searchQuery" style="margin-top:10px;" type="text" class="form-control" placeholder="Buscar Subasta ..." />
    </UIComponentCard>

    <b-row>
        <UIComponentCard id="basic" title="Tabla de Subastas">
            <b-table-simple responsive class="table-centered mb-0">
                <b-thead>
                    <b-tr>
                        <b-th @click="sortTable('name')">Nombre</b-th>
                        <b-th @click="sortTable('description')">Descripción</b-th>
                        <b-th @click="sortTable('startTime')">F. Inicio</b-th>
                        <b-th @click="sortTable('endTime')">F. Final</b-th>
                        <b-th @click="sortTable('created_at')">F. Creación</b-th>
                        <b-th @click="sortTable('updated_at')">F. Actualización</b-th>
                        <b-th @click="sortTable('status')">Status</b-th>
                        <b-th>Acciones</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr  v-for="auction in filteredAuctions" :key="auction.idAuction">
                        <b-td><img :src="'http://localhost:8080/' + auction.image_url" class="product-img"/>{{ auction.name }}</b-td>
                        <b-td>{{ auction.description }}</b-td>
                        <b-td>{{ auction.startTime }}</b-td>
                        <b-td>{{ auction.endTime }}</b-td>
                        <b-td>{{ auction.created_at }}</b-td>
                        <b-td>{{ auction.updated_at }}</b-td>
                        <b-td>{{ auction.status == 1 ? 'Activo' : 'Inactivo' }}</b-td>
                        <b-td>
                            <button @click="deleteAuction(auction.idAuction)" class="btn btn-sm btn-danger" style="margin-right:5px;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2.75 6.167c0-.46.345-.834.771-.834h2.665c.529-.015.996-.378 1.176-.916l.03-.095l.115-.372c.07-.228.131-.427.217-.605c.338-.702.964-1.189 1.687-1.314c.184-.031.377-.031.6-.031h3.478c.223 0 .417 0 .6.031c.723.125 1.35.612 1.687 1.314c.086.178.147.377.217.605l.115.372l.03.095c.18.538.74.902 1.27.916h2.57c.427 0 .772.373.772.834S20.405 7 19.979 7H3.52c-.426 0-.771-.373-.771-.833M11.607 22h.787c2.707 0 4.06 0 4.941-.863c.88-.864.97-2.28 1.15-5.111l.26-4.081c.098-1.537.147-2.305-.295-2.792s-1.187-.487-2.679-.487H8.23c-1.491 0-2.237 0-2.679.487s-.392 1.255-.295 2.792l.26 4.08c.18 2.833.27 4.248 1.15 5.112S8.9 22 11.607 22"/></svg>
                            </button>
                            <button class="btn btn-sm btn-primary" @click="editAuction(auction)" style="margin-right:5px;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c1.845 0 3.33 0 4.54.088L13.1 7.25H8.4L11.9 2zM3.464 3.464c1.253-1.252 3.158-1.433 6.632-1.46L6.599 7.25H2.104c.147-1.764.503-2.928 1.36-3.786M2 12c0-1.237 0-2.311.026-3.25h19.948C22 9.689 22 10.763 22 12v.258c-.567-.405-1.205-.578-1.831-.662c-.714-.096-1.595-.096-2.577-.096h-.184c-.982 0-1.863 0-2.577.096c-.779.104-1.578.348-2.233 1.002c-.654.655-.898 1.454-1.002 2.233c-.096.714-.096 1.595-.096 2.577v.184c0 .982 0 1.863.096 2.577c.084.626.257 1.264.662 1.831H12c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12m19.896-4.75c-.147-1.764-.503-2.928-1.36-3.786c-.598-.597-1.344-.95-2.337-1.16L14.9 7.25z"/><path fill="currentColor" fill-rule="evenodd" d="M17.5 22c-2.121 0-3.182 0-3.841-.659S13 19.621 13 17.5s0-3.182.659-3.841S15.379 13 17.5 13s3.182 0 3.841.659S22 15.379 22 17.5s0 3.182-.659 3.841S19.621 22 17.5 22m2.212-6.712a.983.983 0 0 1 0 1.39l-.058.058a.24.24 0 0 1-.211.067a1.6 1.6 0 0 1-.81-.436a1.6 1.6 0 0 1-.436-.81a.24.24 0 0 1 .067-.211l.058-.058a.983.983 0 0 1 1.39 0M17.35 19.04a3 3 0 0 1-.296.279a1.6 1.6 0 0 1-.303.187a3 3 0 0 1-.381.14l-1.021.34a.265.265 0 0 1-.335-.335l.34-1.02c.064-.194.097-.291.14-.382q.077-.163.187-.303c.062-.08.134-.152.279-.296l1.799-1.799c.043-.043.118-.023.138.035a1.98 1.98 0 0 0 1.217 1.217c.058.02.078.095.035.138z" clip-rule="evenodd"/></svg>
                            </button>
                            <button class="btn btn-sm btn-primary" @click="addProductModal(auction.idAuction)" style="margin-right:5px;">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M3.04 2.292a.75.75 0 0 0-.497 1.416l.261.091c.668.235 1.107.39 1.43.549c.303.149.436.27.524.398c.09.132.16.314.2.677c.04.38.042.875.042 1.615V9.64c0 2.942.063 3.912.93 4.826c.866.914 2.26.914 5.05.914h5.302c1.561 0 2.342 0 2.893-.45c.552-.45.71-1.214 1.025-2.742l.5-2.425c.347-1.74.52-2.609.076-3.186S18.816 6 17.131 6H6.492a9 9 0 0 0-.043-.738c-.054-.497-.17-.95-.452-1.362c-.284-.416-.662-.682-1.103-.899c-.412-.202-.936-.386-1.552-.603zM13 8.25a.75.75 0 0 1 .75.75v1.25H15a.75.75 0 0 1 0 1.5h-1.25V13a.75.75 0 0 1-1.5 0v-1.25H11a.75.75 0 0 1 0-1.5h1.25V9a.75.75 0 0 1 .75-.75" clip-rule="evenodd"/><path fill="currentColor" d="M7.5 18a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"/></svg>
                            </button>
                        </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </UIComponentCard>
    </b-row>

    <div>
        <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">Anterior</button>
        <span>{{ currentPage }} de {{ totalPages }}</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">Siguiente</button>
    </div>

    <!-- MODALS -->
    <b-modal v-model="addNewModal" title="Editar Subasta" ok-title="Guardar Subasta" @ok="saveAuction()" cancel-title="Cancelar" centered>
      <div class="form-group">
        <label>Nombre Subasta</label>
        <input type="text" v-model="auctionName" class="form-control" placeholder="Nombre de Subasta">
      </div>
      <div class="form-group">
        <label>Descripción</label>
        <textarea v-model="description" class="form-control" placeholder="Descripción de Subasta"></textarea>
      </div>
      <div class="form-group">
        <label>Fecha de Inicio de Subasta</label>
        <input type="datetime-local" v-model="startDate" class="form-control" placeholder="Nombre de Subasta">
      </div>
      <div class="form-group">
        <label>Fecha de termino</label>
        <input type="datetime-local" v-model="endDate" class="form-control" placeholder="Nombre de Subasta">
      </div>
      <div class="form-group">
        <label>Añadir imagen</label>
        <div class="dropzone-container"  @dragover="dragover" @dragleave="dragleave" @drop="drop">
        <input type="file" name="file" id="fileInput" class="hidden-input" @change="onChange" ref="fileInput" accept=".pdf,.jpg,.jpeg,.png"/>
        </div>
      </div>
    </b-modal>

     <b-modal v-model="editModal" title="Editar Subasta" ok-title="Actualizar" @ok="updateAuction()" cancel-title="Cancelar" centered>
      <div class="form-group">
        <label>Nombre Subasta</label>
        <input type="text" v-model="auctionName" class="form-control" placeholder="Nombre de Subasta">
      </div>
      <div class="form-group">
        <label>Descripción</label>
        <textarea v-model="description" class="form-control" placeholder="Descripción de Subasta"></textarea>
      </div>
      <div class="form-group">
        <label>Fecha de Inicio de Subasta</label>
        <input type="datetime-local" v-model="startDate" class="form-control" placeholder="Nombre de Subasta">
      </div>
      <div class="form-group">
        <label>Fecha de termino</label>
        <input type="datetime-local" v-model="endDate" class="form-control" placeholder="Nombre de Subasta">
      </div>
      <div class="form-group">
        <label>Añadir imagen</label>
        <div class="dropzone-container"  @dragover="dragover" @dragleave="dragleave" @drop="drop">
        <input type="file" name="file" id="fileInput" class="hidden-input" @change="onChange" ref="fileInput" accept=".pdf,.jpg,.jpeg,.png"/>
        </div>
      </div>
    </b-modal>

    <b-modal v-model="successAlertModal" hide-header hide-footer size="sm" content-class="modal-filled bg-success">
      <div class="text-center">
        <i class="bx bx-check-double display-6 mt-0 text-white"></i>
        <h4 class="mt-3 text-white">Éxito</h4>
        <p class="mt-3">{{ message }}</p>
        <b-button type="button" variant="light" class="mt-3" @click="successAlertModal = !successAlertModal"> Cerrar
        </b-button>
      </div>
    </b-modal>

    <b-modal v-model="errorModal" hide-header hide-footer size="sm" content-class="modal-filled bg-danger">
      <div class="text-center">
        <i class="bx bx-check-double display-6 mt-0 text-white"></i>
        <h4 class="mt-3 text-white">Error</h4>
        <p class="mt-3">{{ message }}</p>
        <b-button type="button" variant="light" class="mt-3" @click="errorModal = !errorModal"> Cerrar
        </b-button>
      </div>
    </b-modal>

    <b-modal v-model="productModal" title="Agregar producto a subasta" ok-title="Agregar producto" @ok="onOk" cancel-title="Cerrar" size="xl"  :bodyScrolling="true" :scrollable="true" centered>
      <div class="form-group">
        <label>Productos</label>
        <div class="dropdown">
          <button class="btn btn-outline-primary dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown">
            <img v-if="selectedItem" :src="'http://localhost:8080/' + selectedItem.image_url" class="me-2" width="24" height="24"/>
            <span>{{ selectedItem?.name || 'Selecciona una opción' }}</span>
          </button>
          <ul class="dropdown-menu">
            <li v-for="prod in products" :key="prod.idProduct">
              <a
                class="dropdown-item d-flex align-items-center"
                href="#"
                @click.prevent="selectItem(prod)"
              >
                <img
                  :src="'http://localhost:8080/' + prod.image_url"
                  class="me-2"
                  width="24"
                  height="24"
                />
                <span>{{ prod.name }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <UIComponentCard id="basic" title="Basic Example">
        <b-table-simple responsive class="table-centered mb-0">
          <b-thead>
            <b-tr>
              <b-th>Producto</b-th>
              <b-th>Descripción</b-th>
              <b-th>Acciones</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for=" d in auctionProducts" :key="d.idAuctionDetail">
              <b-td><img :src="'http://localhost:8080/' + d.image_url" style="width:60px;"> {{ d.name }}</b-td>
              <b-td>{{ d.description}}</b-td>
              <b-td> 
                <button @click="deleteProductFromAuction(d.idAuction)" class="btn btn-sm btn-danger" style="margin-right:5px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2.75 6.167c0-.46.345-.834.771-.834h2.665c.529-.015.996-.378 1.176-.916l.03-.095l.115-.372c.07-.228.131-.427.217-.605c.338-.702.964-1.189 1.687-1.314c.184-.031.377-.031.6-.031h3.478c.223 0 .417 0 .6.031c.723.125 1.35.612 1.687 1.314c.086.178.147.377.217.605l.115.372l.03.095c.18.538.74.902 1.27.916h2.57c.427 0 .772.373.772.834S20.405 7 19.979 7H3.52c-.426 0-.771-.373-.771-.833M11.607 22h.787c2.707 0 4.06 0 4.941-.863c.88-.864.97-2.28 1.15-5.111l.26-4.081c.098-1.537.147-2.305-.295-2.792s-1.187-.487-2.679-.487H8.23c-1.491 0-2.237 0-2.679.487s-.392 1.255-.295 2.792l.26 4.08c.18 2.833.27 4.248 1.15 5.112S8.9 22 11.607 22"/></svg>
                </button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </UIComponentCard>
    </b-modal>

</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import UIComponentCard from "@/components/UIComponentCard.vue";

const searchQuery = ref('');
const auctions = ref([]);
const auctionName = ref('');
const description = ref('');
const startDate = ref('');
const endDate = ref('');
const message = ref('');
const fileInput = ref(null);
const selectedFile = ref();
const products = ref([]);
const product = ref('');
const auctionProducts = ref([]);
const idAuction = ref('');
const selectedItem = ref(null)

// MODAL VARS
const addNewModal = ref(false);
const successAlertModal = ref(false);
const editModal = ref(false);
const productModal = ref(false);
const errorModal = ref(false);


// TABLE VARS 
const sortDirection = ref('asc');
const itemsPerPage = ref(10); 
const currentPage = ref(1); 
const sortKey = ref('');

const getAuctions = async () =>{
    try {
        const response =  await fetch('http://localhost:8080/auction');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        auctions.value = Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error en la petición:', error);
    } 
}

const getProducts = async () => {
  try{
    const response = await fetch('http://localhost:8080/products/categories');
    if(!response.ok){
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    products.value = Array.isArray(data) ? data:[];
  }catch(error){
      console.error('Error en la petición:', error);
  }
}

function onChange(){
    const input = fileInput.value;
    if (input?.files && input.files.length > 0) {
        selectedFile.value = input.files[0];
    }
    console.log(selectedFile.value);
    
}

const saveAuction = async () => {
    const formData = new FormData();
    formData.append('name', auctionName.value);
    formData.append('status', 1);
    formData.append('idUser', 1);
    formData.append('description', description.value);
    formData.append('startDate', startDate.value);
    formData.append('endDate', endDate.value);
    formData.append('image_url', selectedFile.value);
    if (auctionName.value.trim()) {
        try {
            const response = await fetch('http://localhost:8080/auction/create', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Error al guardar la categoría');
            }
            successAlertModal.value = true;
            auctionName.value = '';
            description.value= '';
            startDate.value = '';
            endDate.value = '';
            selectedFile.value = '';
            message.value = 'Se creo categoría correctamente';
            getAuctions(); 
        } catch (error) {
            console.error('Error al guardar la categoría:', error);
        }
    } else {
        alert('Por favor, ingrese una categoría.');
    }
};

const updateAuction = async () => {
    const formData = new FormData();
    formData.append('auction', auctionName.value);
    formData.append('status', 1);
    formData.append('idUser', 1);
    formData.append('description', description.value);
    formData.append('startDate', startDate.value);
    formData.append('endDate', endDate.value);
    formData.append('image_url', selectedFile.value);
    if (auctionName.value.trim()) {
        try {
            const response = await fetch(`http://localhost:8080/auction/update/${idAuction.value}`, {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Error al guardar la subasta');
            }
            successAlertModal.value = true;
            auctionName.value = '';
            description.value= '';
            startDate.value = '';
            endDate.value = '';
            idAuction.value = '';
            selectedFile.value = '';
            message.value = 'Se actualizo subasta correctamente.';
            getAuctions(); 
        } catch (error) {
            console.error('Error al actualizar la subasta:', error);
        }
    } else {
        alert('Por favor, ingrese una categoría.');
    }
};

const editAuction = async (data) =>{
  editModal.value = true;
  auctionName.value = data.name;
  description.value = data.description;
  startDate.value = data.startTime;
  idAuction.value = data.idAuction;
  endDate.value = data.endTime;
}

const deleteProductFromAuction = async(id) => {
  try {
      const response = await fetch(`http://localhost:8080/auction/details/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Error al eliminar producto de subasta');
      }
      successAlertModal.value = true;
      message.value = "Imagen eliminada correctamente";
      addProductModal(id);
  }catch (error) {
    console.error('Error al guardar la imagen:', error);
  }
}

const deleteAuction = async(id) => {
  try{
    const response = await fetch(`http://localhost:8080/auction/${id}`,{
      method:"DELETE",
      header: {
        'Content-Type' : 'application/json'
      }
    })
    if(!response.ok){
      throw new Error('Error al eliminar subasta')
    }
    successAlertModal.value = true; 
    message.value = "Subasta eliminada correctamente";
    getAuctions();
  }catch(error){
    console.log("error al eliminar subasta", error);
  }
}

const addProductModal = async(id) => {
  productModal.value = true;
  idAuction.value = id;
  try{
    const response = await fetch(`http://localhost:8080/auction/details/products/${id}`);
    if(!response.ok){
      throw new Error('Error al obtener información');
    }
    const data = await response.json();
    auctionProducts.value = Array.isArray(data) ? data:[];
  }catch(error){
    console.error("Error:", error)
  }
}

const addProductToAuction = async() => {
  try{
    const response = await fetch(`http://localhost:8080/auction/details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idProduct: product.value, idUser: 1, idAuction: idAuction.value, status:1})
    });
    if (!response.ok) {
      throw new Error('Error al guardar la subcategoría');
    }

    const data = await response.json();
    if(data.status == 405){
      errorModal.value = true;
      message.value = data.message;
    }else{
      successAlertModal.value = true;
      message.value = data.message;
      addProductModal(idAuction.value);
    }
  }catch(error){
    console.error("Error al agregar producto", error)
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
  
const filteredAuctions = computed(() => {
    let filtered = auctions.value.filter(auction => {
        return auction.name.toLowerCase().includes(searchQuery.value.toLowerCase());
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

const paginatedAuctions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredAuctions.value.slice(start, end);
});


const totalPages = computed(() => {
  return Math.ceil(filteredAuctions.value.length / itemsPerPage.value);
});

const changePage = (page) => {
  if (page < 1) page = 1;
  if (page > totalPages.value) page = totalPages.value;
  currentPage.value = page;
};


function selectItem(item) {
  selectedItem.value = item
  product.value = selectedItem.value.idProduct;
}

function onOk(evt) {
  evt.preventDefault() // ¡Evita que se cierre el modal!
  addProductToAuction()
}

onMounted(()=>{
    getAuctions();
    getProducts();
})

</script>

<style>
.product-img{
    width:80px;
}

.dropzone-container {
    padding: 4rem;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
}
</style>