<template>
    <UIComponentCard title="Agregar nuevo usuario" id="modal-position">
        <div class="d-flex flex-wrap gap-2 mt-3">
            <b-button variant="primary" @click="verticalCenteredModal = !verticalCenteredModal"> Agregar nuevo usuario
            </b-button>
        </div>
        <input v-model="searchQuery" style="margin-top:10px;" type="text" class="form-control" placeholder="Buscar categoría..." />
    </UIComponentCard>

    <b-row>
        <UIComponentCard>
            <b-table-simple responsive class="table-centered mb-0">
                <b-thead>
                    <b-tr>
                        <b-th @click="sortTable('name')">Nombre</b-th>
                        <b-th @click="sortTable('lastName')">Apellido</b-th>
                        <b-th @click="sortTable('username')">Nombre de Usuario</b-th>
                        <b-th @click="sortTable('email')">Correo</b-th>
                        <b-th @click="sortTable('idType')">Tipo de usuario</b-th>
                        <b-th @click="sortTable('status')">Estatus</b-th>
                        <b-th @click="sortTable('created_at')">Fecha Creación</b-th>
                        <b-th @click="sortTable('updated_at')">Fecha Modificación</b-th>
                        <b-th>Acciones</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="user in users" :key="user.iduser">
                        <b-td>{{ user.name }}</b-td>
                        <b-td>{{ user.lastName }}</b-td>
                        <b-td>{{ user.username }}</b-td>
                        <b-td>{{ user.email }}</b-td>
                        <b-td>{{ user.idType }}</b-td>
                        <b-td>{{ user.status }}</b-td>
                        <b-td>{{ user.created_at }}</b-td>
                        <b-td>{{ user.updated_at }}</b-td>
                        <b-td>
                            <button @click="editUser(user)" class="btn btn-sm btn-primary edit-button">
                                Editar
                            </button>
                        </b-td>
                        <b-td>
                            <button @click="blockUser(user.idUser)" class="btn btn-sm btn-danger edit-button">
                                Bloquear
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

    <b-modal v-model="verticalCenteredModal" title="Agregar nuevo usuario" ok-title="Crear Usuario" @ok="saveUser()" cancel-title="Cancelar" centered>
        <div class="form-group">
          <label for="product">Nombre(s)</label>
          <input type="text" v-model="firstName" class="form-control" placeholder="Escriba nombres...">
        </div>
        <div class="form-group">
          <label for="product">Apellido(s)</label>
          <input type="text" v-model="lastName" class="form-control" placeholder="Escriba apellidos...">
        </div>
        <div class="form-group">
          <label for="product">Nombre de usuario</label>
          <input type="text" v-model="username" class="form-control" placeholder="Escriba un nombre de usuario...">
        </div>
        <div class="form-group">
          <label for="product">Correo Electrónico</label>
          <input type="email" v-model="email" class="form-control" placeholder="Escriba correo...">
        </div>
        <div class="form-group">
          <label for="product">Contraseña</label>
          <input type="password" v-model="password" class="form-control" placeholder="Escriba contraseña...">
        </div>
        <div class="form-group">
            <label for="product">Tipo de usuario</label>
            <select class = "form-select" v-model="usertype" >
                <option selected>-- Seleccione --</option>
                <option v-for="t in types" :key="t.idType" v-bind:value="t.idType">{{ t.name }}</option>
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

    <b-modal v-model="editModal" title="Editar usuario" ok-title="Guardar Cambios" @ok="updateUser()" cancel-title="Cancelar" centered>
        <div class="form-group">
          <label for="product">Nombre(s)</label>
          <input type="text" v-model="firstName" class="form-control" placeholder="Escriba nombres...">
        </div>
        <div class="form-group">
          <label for="product">Apellido(s)</label>
          <input type="text" v-model="lastName" class="form-control" placeholder="Escriba apellidos...">
        </div>
        <div class="form-group">
          <label for="product">Nombre de usuario</label>
          <input type="text" v-model="username" class="form-control" placeholder="Escriba un nombre de usuario...">
        </div>
        <div class="form-group">
          <label for="product">Correo Electrónico</label>
          <input type="email" v-model="email" class="form-control" placeholder="Escriba correo...">
        </div>
        <div class="form-group">
          <label for="product">Contraseña</label>
          <input type="password" v-model="password" class="form-control" placeholder="Escriba contraseña...">
        </div>
        <div class="form-group">
            <label for="product">Tipo de usuario</label>
            <select class = "form-select" v-model="usertype" >
                <option selected>-- Seleccione --</option>
                <option v-for="t in types" :key="t.idType" v-bind:value="t.idType">{{ t.name }}</option>
            </select>
        </div>
    </b-modal>  

</template>

<script setup>
import UIComponentCard from '@/components/UIComponentCard.vue'
import { ref, onMounted, computed } from "vue";
 
const users = ref([]);
const types = ref([]);
const firstName = ref('');
const lastName = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const idUser = ref('');
const usertype = ref('');
const searchQuery = ref('');
const message = ref('');
const sortDirection = ref('asc');
const itemsPerPage = ref(10);
const currentPage = ref(1);
const sortKey = ref('');    

// MODALS  //
const verticalCenteredModal = ref(false);
const successAlertModal = ref(false);
const editModal = ref(false);

const getUsers = async () => {
    try {
        const response = await fetch('http://localhost:8080/users');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        users.value = await response.json();
    } catch (error) {
        console.error('Error en la petición:', error);
    }
};

const getTypes = async () => {
    try {
        const response = await fetch('http://localhost:8080/types');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        types.value = await response.json();
    } catch (error) {
        console.error('Error en la petición:', error);
    }
}

const saveUser = async () => {
    try{
        const response = await fetch('http://localhost:8080/users',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username.value, name: firstName.value, lastName: lastName.value, email: email.value, password: password.value, idType:usertype.value, status: 1 })
        })
        if (!response.ok) {
          throw new Error('Error al guardar la categoría');
        }
        successAlertModal.value = true;
        username.value = '';
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        password.value = '';
        usertype.value = '';
        message.value = 'Se creo usuario correctamente';
        getUsers(); // Actualizar la lista de categorías
    }catch(error){
        console.error('Error en la peticion:', error);
    }
}

const editUser = async (user) => {
    editModal.value = true;
    firstName.value = user.name;
    lastName.value = user.lastName;
    usertype.value = user.idType;
    username.value = user.username;
    password.value = user.password;
    email.value = user.email;
    idUser.value = user.idUser;
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

const updateUser = async() => {
    try{
        const response = await fetch(`http://localhost:8080/users/${idUser.value}`,{
            method:"PUT",
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username.value, name: firstName.value, lastName: lastName.value, email: email.value, idType:usertype.value, status: 1 })
        })

        if (!response.ok) {
          throw new Error('Error al guardar la subcategoría');
        }

        successAlertModal.value = true;
        firstName.value = '';
        lastName.value = '';
        usertype.value = '';
        username.value = '';
        password.value = '';
        email.value = '';
        idUser.value = '';
        message.value = 'Se edito usuario correctamente';
        getUsers(); 
    }catch(error){
        console.error('Error en la petición', error);
    }
}

const blockUser = async (id) => {
    try{
        const response = await fetch (`http://localhost:8080/users/deactivate/${id}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({status:0})
        })

        if(!response.ok){
            throw new Error('Error al bloquear usuario');
        }

        getUsers();
        successAlertModal.value = true;
        message.value = "Se bloqueo usuario correctamente";
    }catch(error){
        console.error("Error en la petición", error)
    }
}
  
// Filtrar las categorías basándonos en la búsqueda
const filteredUsers = computed(() => {
    // Filtrar por el término de búsqueda
    let filtered = users.value.filter(user => {
      return user.name.toLowerCase().includes(searchQuery.value.toLowerCase());
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
  return Math.ceil(filteredUsers.value.length / itemsPerPage.value);
});

// Cambiar de página
const changePage = (page) => {
  if (page < 1) page = 1;
  if (page > totalPages.value) page = totalPages.value;
  currentPage.value = page;
};


onMounted(()=>{
    getUsers();
    getTypes();
})

</script>
