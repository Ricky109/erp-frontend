<template>
   <div>
      <LayoutBar pcTitulo="ESTADÍSTICAS EVALUACIÓN JURADO"/>
      <div style="padding:20px; width:100%; box-sizing:border-box;">
         <div v-if="pcScreen === '1'">
            <div style="width:50%; position:fixed; top:35%; left:50%; transform:translate(-50%, -35%); background:white;
                        padding:30px; border:1px solid #000; border-radius:10px; box-shadow: 0 6px 0 #444, 0 15px 30px rgba(0,0,0,0.25);">
               <div style="margin-bottom:20px; display:flex; justify-content:center; align-items:center;">
                  <label style="font-weight:bold; margin-right:10px;">AÑO:</label>
                  <input v-model="pcPeriod" maxlength="4" inputmode="numeric" autofocus @input="pcPeriod = pcPeriod.replace(/[^0-9]/g,'')" 
                         style="padding:8px; width:120px; font-size:16px; text-align:center; border:2px solid #000; border-radius:6px; background:#fff9c4; outline:none;">
               </div>
               <div style="text-align:right;">
               <div style="width:100%; display:flex; justify-content:flex-end; gap:10px;">
                  <Boton3D color="azul" texto="APLICAR" style="width:20%;" @click="f_Aplicar"></Boton3D>
                  <Boton3D color="rojo" texto="SALIR" style="width:20%;" @click="f_Salir"></Boton3D>
               </div>
               </div>
            </div>
         </div>
         <div v-if="pcScreen === '2'">
            <div style="width:80%; margin:0 auto;">
               <!-- INICIO -->
               <div v-if="plLoading" style="text-align:center; width:100%; margin-top:20px;">
                  <Spinner />
               </div>
               <div style="text-align:left; font-size:16px;">
                  <span style="font-weight:bold;">PERIODO:</span>
                  <span style="margin-left:8px; color:#002060; font-weight:600;">{{(pcPeriod || '').substring(0,4)}}</span>
               </div>
               <div v-if="!plLoading && paData" style="width:100%; max-height:400px; overflow-y:auto; border:1px solid #ccc; margin-top:10px;">
                  <table border="1" style="width:100%; border-collapse:collapse; font-size:14px;">
                     <thead>
                        <tr style="background:#f2f2f2;">
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2; text-align:left;">UNIDAD ACADÉMICA</th>
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2; text-align:right;">SOL.</th>
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2; text-align:right;">ASIG.</th>
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2; text-align:right;">EV.</th>
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2; text-align:right;">PEN.</th>
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2; text-align:right;">P.V.</th>
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2; text-align:center;">%</th>
                        <th style="padding:6px; position:sticky; top:0; background:#f2f2f2;">🔎</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="laItem in paData.DATOS" :key="laItem.CUNIACA">
                           <td style="padding:6px; text-align:left;">{{laItem.CUNIACA}} - {{laItem.CNOMUNI}}</td>
                           <td style="padding:6px; text-align:right;" title="Solicitudes">{{f_Format(laItem.NSOLICI, 0)}}</td>
                           <td style="padding:6px; text-align:right;" title="Asignadas">{{f_Format(laItem.NASIGNA, 0)}}</td>
                           <td style="padding:6px; text-align:right;" title="Evaluadas">{{f_Format(laItem.NFINALI, 0)}}</td>
                           <td style="padding:6px; text-align:right;" title="Pendientes">{{f_Format(laItem.NTRAMIT, 0)}}</td>
                           <td style="padding:6px; text-align:right;" title="Pendientes + 10 días">{{f_Format(laItem.NTRAVEN, 0)}}</td>
                           <td style="padding:6px; text-align:right;" title="% vencidos">{{f_Format(laItem.NPORVEN, 0)}}</td>
                           <td style="padding:6px; text-align:right; cursor:pointer;" @click="f_Detalle(laItem.CUNIACA)" title="Ver detalle de tesis">🔎</td>
                        </tr>
                        <!-- Si no hay resultados -->
                        <tr v-if="!paData.DATOS.length">
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
         <div v-if="pcScreen === '3'">
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
   const pcPeriod = ref('')

   // Init
   onMounted(() => {
      return;
      //f_Init();
   })

   async function f_Aplicar() {
      let lcPeriod = pcPeriod.value + '00';
      try {
         plLoading.value = true;
         const response = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ID: 'Dhb1050a', CCODUSU: '1221', CPERIOD: lcPeriod})
         })
         if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
         }
         const laData = await response.json();
         if (laData.ERROR) {
            alert(laData.ERROR);
            poRouter.push({name: 'Mnu1001'});
            return;
         }
         paData.value = laData;
         pcScreen.value = '2';
      } catch (error) {
         console.error("Error cargando unidades:", error);
         alert("ERROR AL CARGAR UNIDADES");
      } finally {
         plLoading.value = false;
      }
   }

   async function f_Detalle(p_cUniAca) {
      alert('OPCIÓN QUE MUESTRA DETALLE DE CONVALIDACIONES');
      return;
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
