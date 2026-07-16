<template>
   <div>
      <LayoutBar pcTitulo="ESTADÍSTICAS TESIS"/>
      <div style="padding:20px; width:100%; box-sizing:border-box;">
         <div v-if="pcScreen === '1'">
            <div style="width:80%; margin:0 auto;">
               <!-- INICIO -->
               <div v-if="plLoading" style="text-align:center; width:100%; margin-top:20px;">
                  <Spinner />
               </div>
               <div v-if="!plLoading && paDatos" style="width:100%; max-height:400px; overflow-y:auto; border:1px solid #ccc;">
                  <table border="1" style="width:100%; border-collapse:collapse; font-size:14px;">
                     <thead>
                        <tr style="background:#f2f2f2;">
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2; text-align:left;">UNIDAD ACADÉMICA</th>
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2; text-align:right;">EGR.</th>
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2; text-align:right;">BAC.</th>
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2; text-align:right;">TIT.</th>
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2; text-align:right;">T.I.</th>
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2; text-align:right;">T.V.</th>
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2; text-align:center;">%</th>
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2;">🔎</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="laItem in paDatos" :key="laItem.CUNIACA">
                           <td style="padding:6px; text-align:left;">{{laItem.CUNIACA}} - {{laItem.CNOMUNI}}</td>
                           <td style="padding:6px; text-align:right;" title="Egresados">{{f_Format(laItem.NEGRESA, 0)}}</td>
                           <td style="padding:6px; text-align:right;" title="Bachilleres">{{f_Format(laItem.NBACHIL, 0)}}</td>
                           <td style="padding:6px; text-align:right;" title="Titulados">{{f_Format(laItem.NTITULA, 0)}}</td>
                           <td style="padding:6px; text-align:right;" title="Tesis iniciadas">{{f_Format(laItem.NTESINI, 0)}}</td>
                           <td style="padding:6px; text-align:right;" title="Tesis vencidas">{{f_Format(laItem.NTESVEN, 0)}}</td>
                           <td style="padding:6px; text-align:right;" title="% titulados">{{f_Format(laItem.NPORTIT, 0)}}</td>
                           <td style="padding:6px; text-align:right; cursor:pointer;" @click="f_Detalle(laItem.CUNIACA)" title="Ver detalle de tesis">🔎</td>
                        </tr>
                        <!-- Si no hay resultados -->
                        <tr v-if="!paDatos.length">
                           <td colspan="4" style="padding:10px; text-align:center;">
                              NO SE ENCONTRARON REGISTROS
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <!-- Botón Regresar -->
               <div style="margin-top:15px; text-align:right;">
                  <Boton3D color="rojo" texto="SALIR" style="width:10%;" @click="f_Salir"></Boton3D>
               </div>
            </div>
         </div>
         <div v-if="pcScreen === '2'">
            <div style="margin-bottom:10px; font-weight:bold;">
               UNIDAD ACADÉMICA: {{paData.CUNIACA}} - {{paData.CNOMUNI}}
            </div>
            <div v-if="plLoading" style="text-align:center; width:100%; margin-top:20px;">
               <Spinner />
            </div>
            <div v-if="!plLoading && paData" style="width:100%; max-height:400px; overflow-y:auto; border:1px solid #ccc;">
               <table border="1" style="width:100%; border-collapse:collapse; font-size:14px;">
                  <thead>
                     <tr style="background:#f2f2f2;">
                     <th style="padding:6px; position:sticky; top:0; background:#f2f2f2;">ID</th>
                     <th style="padding:6px; position:sticky; top:0; background:#f2f2f2; text-align:left;">ALUMNO</th>
                     <th style="padding:6px; position:sticky; top:0; background:#f2f2f2;">F.INICIO</th>
                     <th style="padding:6px; position:sticky; top:0; background:#f2f2f2;">ESTADO</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr v-for="laItem in paData.DATOS" :key="laItem.CIDTESI">
                        <td style="padding:6px; text-align:center;">{{laItem.CIDTESI}}</td>
                        <td style="padding:6px;">{{laItem.CNOMBRE}}</td>
                        <td style="padding:6px; text-align:center;">{{laItem.DINICIO}}</td>
                        <td style="padding:6px;">{{laItem.CDESEST}}</td>
                     </tr>
                     <!-- Si no hay resultados -->
                     <tr v-if="!paData?.DATOS?.length">
                        <td colspan="4" style="padding:10px; text-align:center;">
                           NO SE ENCONTRARON REGISTROS
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <!-- Botón Regresar -->
            <div style="margin-top:15px; text-align:right;">
               <Boton3D color="rojo" texto="REGRESAR" style="width:10%;" @click="f_Regresar"></Boton3D>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
   import LayoutBar from '@/components/LayoutBar.vue'
   import Boton3D from '@/components/Boton3D.vue'
   import Spinner from '@/components/Spinner.vue'
   import {f_Format} from '@/utils/utils'
   import {ref, computed, onMounted} from 'vue'
   import {useRouter} from 'vue-router'

   const plLoading = ref(false)
   const poRouter  = useRouter()
   const paDatos   = ref([])
   const paData    = ref()
   const pcScreen  = ref("1")
   const plError   = ref(false)

   // Init
   onMounted(() => {
      f_Init();
   })

   async function f_Init() {
      try {
         plLoading.value = true;
         const response = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ID: 'Dhb1030i', CCODUSU: '1221'})
         })
         if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
         }
         const laData = await response.json();
         // 🔎 Si viene ERROR → regresar al menú
         if (laData.ERROR) {
            alert(laData.ERROR);
            poRouter.push({name: 'Mnu1001'});
            return;
         }
         paDatos.value = laData;
      } catch (error) {
         console.error("Error cargando unidades:", error);
         alert("ERROR AL CARGAR UNIDADES");
      } finally {
         plLoading.value = false;
      }
   }

   async function f_Detalle(p_cUniAca) {
      if (!p_cUniAca) {
         plError.value = true;
         return;
      }
      plError.value = false;
      try {
         plLoading.value = true;
         const response = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ID: 'Dhb1030d', CUNIACA: p_cUniAca
            })
         })
         if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
         }
         const laData = await response.json();
         if (laData.ERROR) {
            alert(laData.ERROR);
            pcScreen.value = '1';
            return;
         }
         paData.value = laData;
         pcScreen.value = "2";
      } catch (error) {
         console.error("Error consultando datos:", error);
         alert("ERROR AL CONSULTAR DATOS");
      } finally {
         plLoading.value = false;
      }
   }

   function f_Regresar() {
      pcScreen.value = "1";
      paData.value   = null;
   }

   function f_Salir() {
      poRouter.push('/mnu1001');
   }
</script>
