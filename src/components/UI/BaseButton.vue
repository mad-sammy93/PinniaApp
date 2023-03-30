<template>
    <button>
        <slot></slot>
    </button>
</template>
<style scoped>
button{
    border: 1px solid #ff005d;
    background-color: #ff005d;
    color: white;
    border-radius: 5px;
    padding: 2px 20px;
    cursor:pointer;
}
button:hover{

    
    border: 1px solid #ff005d;
    color: #ff005d;
    background-color: transparent;
}
</style>