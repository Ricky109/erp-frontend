<template>
   <div>
      <LayoutBar pcTitulo="GESTIÓN DE CALIDAD" />
      <!-- Opciones en horizontal -->
      <div style="display:flex; justify-content:center; gap:40px; margin-top:40px;">
         <div style="cursor:pointer; text-align:center; border:1px solid #999; padding:15px 20px; border-radius:6px; transition:all 0.2s ease;" @click="f_Opcion('/dhb1010')"
                     @mouseover="poHover = 1" @mouseleave="poHover = 0" :style="poHover === 1 ? 'background:#f5f5f5; transform:translateY(-3px); box-shadow:0 4px 8px rgba(0,0,0,0.1);' : ''">
            <div style="font-size:28px;">💰</div>
            <div style="margin-top:6px; font-weight:500; font-size:13px;">
               COBRANZA TASAS EDUCATIVAS
            </div>
         </div>
         <div style="cursor:pointer; text-align:center; border:1px solid #999; padding:15px 20px; border-radius:6px; transition:all 0.2s ease;" @click="f_Opcion('/dhb1020')"
                     @mouseover="poHover = 2" @mouseleave="poHover = 0" :style="poHover === 2 ? 'background:#f5f5f5; transform:translateY(-3px); box-shadow:0 4px 8px rgba(0,0,0,0.1);' : ''">
            <div style="font-size:28px;">🎓</div>
            <div style="margin-top:6px; font-weight:500; font-size:13px;">
               TESIS - UNIDAD ACADÉMICA
            </div>
         </div>
         <div style="cursor:pointer; text-align:center; border:1px solid #999; padding:15px 20px; border-radius:6px; transition:all 0.2s ease;" @click="f_Opcion('/dhb1030')"
                     @mouseover="poHover = 3" @mouseleave="poHover = 0" :style="poHover === 3 ? 'background:#f5f5f5; transform:translateY(-3px); box-shadow:0 4px 8px rgba(0,0,0,0.1);' : ''">
            <div style="font-size:28px;">📊</div>
            <div style="margin-top:6px; font-weight:500; font-size:13px;">
               INDICADORES TESIS
            </div>
         </div>
         <div style="cursor:pointer; text-align:center; border:1px solid #999; padding:15px 20px; border-radius:6px; transition:all 0.2s ease;" @click="f_Opcion('/dhb1040')"
                     @mouseover="poHover = 3" @mouseleave="poHover = 0" :style="poHover === 3 ? 'background:#f5f5f5; transform:translateY(-3px); box-shadow:0 4px 8px rgba(0,0,0,0.1);' : ''">
            <div style="font-size:28px;">📊</div>
            <div style="margin-top:6px; font-weight:500; font-size:13px;">
               CONVALIDACIONES
            </div>
         </div>
         <div style="cursor:pointer; text-align:center; border:1px solid #999; padding:15px 20px; border-radius:6px; transition:all 0.2s ease;" @click="f_Opcion('/dhb1050')"
                     @mouseover="poHover = 3" @mouseleave="poHover = 0" :style="poHover === 3 ? 'background:#f5f5f5; transform:translateY(-3px); box-shadow:0 4px 8px rgba(0,0,0,0.1);' : ''">
            <div style="font-size:28px;">📊</div>
            <div style="margin-top:6px; font-weight:500; font-size:13px;">
               EV.JURADO
            </div>
         </div>
      </div>
      <!-- Botón salir alineado derecha -->
      <div style="margin-top:40px; text-align:right; padding-right:20px;">
         <div style="width:5%; display:inline-block;">
            <Boton3D texto="SALIR" color="rojo" @click="f_Opcion('/mnu1000')"/>
         </div>
      </div>
   </div>
</template>

<script setup>
   import LayoutBar from '@/components/LayoutBar.vue'
   import Boton3D from '@/components/Boton3D.vue'
   import {useRouter} from 'vue-router'
   import {ref} from 'vue'

   const poRouter = useRouter()
   const poHover = ref(0)

   function f_Opcion(p_cOpcion) {
      poRouter.push(p_cOpcion)
   }
</script>
