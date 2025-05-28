<template>
    <VerticalLayout>
        <OrdersTable />
    </VerticalLayout>
</template>

<script setup lang="ts">
    import VerticalLayout from '@/layouts/VerticalLayout.vue';
    import OrdersTable from '@/views/tables/unpaid-orders.vue';
</script>