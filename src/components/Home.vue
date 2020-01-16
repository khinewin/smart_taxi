<template>
    <div class="container my-5">
        <div class="alert alert-danger small" v-if="error">
            <i class="fas fa-exclamation-circle"></i> {{error}}
        </div>
        <div class="alert alert-success small" v-if="success">
            <i class="fas fa-marker"></i> {{success}}
        </div>
        <div class="row">
            Home
        </div>
    </div>

</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>

</style>