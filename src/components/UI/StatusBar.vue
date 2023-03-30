<template>
    <MainSection>
        <div class="status__nav">
            <slot></slot>
        </div>
    </MainSection>
</template>
<script>
import MainSection from "./MainSection.vue";

export default{

    components: { MainSection }
}

</script>

<style scoped>
.status__nav{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
}

</style>