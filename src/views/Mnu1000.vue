<template>
  <div>
    <LayoutBar pcTitulo="MENÚ PRINCIPAL" />

    <div style="padding:40px; text-align:center;">

      <div style="display:flex; 
                  justify-content:center; 
                  gap:60px; 
                  margin-top:40px;">

        <!-- TESIS -->
        <div style="cursor:pointer;" @click="irTesis">
          <div style="font-size:60px;">📘</div>
          <div style="margin-top:10px; font-weight:bold;">TESIS</div>
        </div>

        <!-- MESA DE PARTES -->
        <div style="cursor:pointer;" @click="irMesa">
          <div style="font-size:60px;">📂</div>
          <div style="margin-top:10px; font-weight:bold;">MESA DE PARTES</div>
        </div>

        <!-- GESTIÓN DE CALIDAD -->
        <div style="cursor:pointer;" @click="irCalidad">
          <div style="font-size:60px;">⚙</div>
          <div style="margin-top:10px; font-weight:bold;">
            GESTIÓN DE CALIDAD
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import LayoutBar from '@/components/LayoutBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function irTesis() {
  alert("Ir a TESIS")
}

function irMesa() {
  alert("Ir a MESA DE PARTES")
}

function irCalidad() {
  router.push('/mnu1001')
}
</script>
