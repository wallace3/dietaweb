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
                            <b-th @click="sortTable('stripeId')">Stripe id</b-th>
                            <b-th @click="sortTable('orderDate')">Fecha de orden</b-th>
                            <b-th @click="sortTable('total')">Total</b-th>
                            <b-th @click="sortTable('name')">Comprador</b-th>
                            <b-th @click="sortTable('email')">Correo</b-th>
                            <b-th @click="sortTable('phone')">Télefono</b-th>
                            <b-th></b-th>
                        </b-tr>
                    </b-thead>
                    <b-tbody>
                        <b-tr  v-for="order in filteredorders" :key="order.idOrder">
                            <b-td>{{ order.stripeId }}</b-td>
                            <b-td>{{ order.orderDate }}</b-td>
                            <b-td>$ {{ order.total }}</b-td>
                            <b-td>{{ order.firstName }} {{ order.lastName }}</b-td>
                            <b-td>{{ order.email }}</b-td>
                            <b-td>{{ order.phone }}</b-td>
                            <b-td>
                                <button class="btn btn-sm btn-primary" @click="editOrder(order.idOrder)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c1.845 0 3.33 0 4.54.088L13.1 7.25H8.4L11.9 2zM3.464 3.464c1.253-1.252 3.158-1.433 6.632-1.46L6.599 7.25H2.104c.147-1.764.503-2.928 1.36-3.786M2 12c0-1.237 0-2.311.026-3.25h19.948C22 9.689 22 10.763 22 12v.258c-.567-.405-1.205-.578-1.831-.662c-.714-.096-1.595-.096-2.577-.096h-.184c-.982 0-1.863 0-2.577.096c-.779.104-1.578.348-2.233 1.002c-.654.655-.898 1.454-1.002 2.233c-.096.714-.096 1.595-.096 2.577v.184c0 .982 0 1.863.096 2.577c.084.626.257 1.264.662 1.831H12c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12m19.896-4.75c-.147-1.764-.503-2.928-1.36-3.786c-.598-.597-1.344-.95-2.337-1.16L14.9 7.25z"/><path fill="currentColor" fill-rule="evenodd" d="M17.5 22c-2.121 0-3.182 0-3.841-.659S13 19.621 13 17.5s0-3.182.659-3.841S15.379 13 17.5 13s3.182 0 3.841.659S22 15.379 22 17.5s0 3.182-.659 3.841S19.621 22 17.5 22m2.212-6.712a.983.983 0 0 1 0 1.39l-.058.058a.24.24 0 0 1-.211.067a1.6 1.6 0 0 1-.81-.436a1.6 1.6 0 0 1-.436-.81a.24.24 0 0 1 .067-.211l.058-.058a.983.983 0 0 1 1.39 0M17.35 19.04a3 3 0 0 1-.296.279a1.6 1.6 0 0 1-.303.187a3 3 0 0 1-.381.14l-1.021.34a.265.265 0 0 1-.335-.335l.34-1.02c.064-.194.097-.291.14-.382q.077-.163.187-.303c.062-.08.134-.152.279-.296l1.799-1.799c.043-.043.118-.023.138.035a1.98 1.98 0 0 0 1.217 1.217c.058.02.078.095.035.138z" clip-rule="evenodd"/></svg>
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

        <b-modal v-model="editModal" title="Editar Categoría" ok-title="Actualizar"  cancel-title="Cancelar" centered>
            <div class="form-group">
                <p>Producto {{ details.name }}</p>
                <p>Descripción {{ details.description }}</p>
                <p>Precio venta: </p>
            </div>
        </b-modal>

    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from "vue";
    import UIComponentCard from "@/components/UIComponentCard.vue";

    const orders = ref([]);
    const details = ref([]);
    const sortDirection = ref('asc'); // ascendente o descendente
    const itemsPerPage = ref(10); // Número de items por página
    const currentPage = ref(1); // Página actual  
    const searchQuery = ref('');
    const sortKey = ref('');
    const editModal = ref(false);

    const getOrders = async()=>{
        try{
            const response = await fetch('http://localhost:8080/stripe/paidOrders');
            if(!response.ok){
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = await response.json();
            orders.value = Array.isArray(data) ? data : [];
        }catch (error) {
            console.error('Error en la petición:', error);
        }
    }

    const editOrder = async(id) => {
        try{
            const response = await fetch(`http://localhost:8080/orderDetails/${id}`);
            if(!response.ok){
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = await response.json();
            details.value = Array.isArray(data) ? data : [];
        }catch(error){
            console.error("Error", error)
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

    const filteredorders = computed(() => {
        let filtered = orders.value.filter(order => {
            return order.idOrder.toLowerCase().includes(searchQuery.value.toLowerCase());
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

    const paginatedorders = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return filteredorders.value.slice(start, end);
    });

    const totalPages = computed(() => {
        return Math.ceil(filteredorders.value.length / itemsPerPage.value);
    });

    const changePage = (page) => {
        if (page < 1) page = 1;
        if (page > totalPages.value) page = totalPages.value;
        currentPage.value = page;
    };


    onMounted(()=>{
        getOrders();
    })


</script>