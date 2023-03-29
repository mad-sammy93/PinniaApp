<script>
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['close'],
  methods: {
    tryClose() {
      console.log('tryClose')
      if (this.fixed) {
        return;
      }
      this.$emit('close');
    },
  },
};
</script>
<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="modal-backdrop"></div>
      <transition name="modal-fade">
        <dialog open v-if="show" class="modal">
            <header class="modal-header">
              <slot name="header">
                <h2>{{ title }}</h2>
              </slot>
            </header>
            <section>
              <slot name="body">

              </slot>
            </section>
            <menu v-if="!fixed">
              <slot name="actions">
                
                <button
                  type="button"
                  class="btn-close"
                  @click="tryClose"
                  aria-label="Close modal"
                >Close</button>
                <!-- <div @click="tryClose">Close</div> -->
              </slot>
            </menu>
          </dialog>
      </transition>
    </teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffd859b7;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: absolute;
  top:20vh;
  background-color: #ffd859;
  padding: 20px;
  margin-top: 20px;
  border-radius: 20px;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
    border-bottom: 1px solid #000;
  color: black;
  justify-content: space-between;
  background-color: transparent;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 15px;
  padding: 7px 15px;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}

.btn-close {
  color: black;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
