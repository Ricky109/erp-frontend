<template>
   <div>
      <LayoutBar pcTitulo="COBRANZAS TASAS EDUCATIVAS"/>
      <div style="padding:20px; width:100%; box-sizing:border-box;">
         <div v-if="pcScreen === '1'">
            <!-- Contenedor centrado -->
            <div style="width:60%; margin:0 auto;">
               <div style="margin-bottom:6px; font-weight:bold;">
                  UNIDAD ACADÉMICA <span style="color:red">*</span>
               </div>
               <select v-model="pcUniAca" :disabled="plLoading" :class="{'input-error': plError}" style="width:100%; padding:8px; box-sizing:border-box; margin-bottom:15px;">
                  <option value="">-- Seleccione --</option>
                  <option v-for="laItem in paDatos" :key="laItem.CUNIACA" :value="laItem.CUNIACA">
                     {{laItem.CNOMUNI}}
                  </option>
               </select>
               <!-- Mensaje de validación -->
               <div v-if="plError" style="color:red; margin-top:5px; font-size:13px;">
                  DEBE SELECCIONAR UNIDAD ACADÉMICA.
               </div>
               <!-- Spinner -->
               <div v-if="plLoading" style="margin-top:10px; text-align:center;">
                  <span class="spinner"></span> Cargando datos...
               </div>
               <!-- Botón Aplicar -->
               <div style="width:100%; display:flex; justify-content:flex-end; gap:10px;">
                  <Boton3D color="azul" texto="APLICAR" style="width:10%;" @click="f_Aplicar"></Boton3D>
                  <Boton3D color="rojo" texto="SALIR" style="width:10%;" @click="f_Salir"></Boton3D>
               </div>
            </div>
         </div>
         <div v-if="pcScreen === '2'">
            <div style="margin-bottom:10px; font-weight:bold;">
               UNIDAD ACADÉMICA: {{paData.CUNIACA}} - {{paData.CNOMUNI}}
            </div>
            <div v-if="plLoading" style="text-align:center; width:100%; margin-top:20px;">
               <span class="spinner"></span> Cargando datos...
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
                     <tr v-if="!paData?.DATOS?.value?.length">
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
   import { ref, computed, onMounted } from 'vue'
   import { useRouter } from 'vue-router'

   const plLoading = ref(false)
   const router   = useRouter()
   const paDatos  = ref([])
   const paData   = ref()
   const pcUniAca = ref("")
   const pcScreen = ref("1")
   const plError  = ref(false)

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
            body: JSON.stringify({ID: 'Dhb1020i', CCODUSU: '1221'})
         })
         if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
         }
         const laData = await response.json();
         // 🔎 Si viene ERROR → regresar al menú
         if (laData.ERROR) {
            alert(laData.ERROR);
            router.push({name: 'Mnu1001'});
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

   async function f_Aplicar() {
      if (!pcUniAca.value) {
         plError.value = true;
         return;
      }
      plError.value = false;
      try {
         plLoading.value = true;
         const response = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ID: 'Dhb1020a', CCODUSU: '1221', CUNIACA: pcUniAca.value
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

   function volver() {
      router.push('/mnu1001');
   }

   /*
   function f_ExportarExcel() {
      if (!laFiltrados.value.length) {
         alert("No hay datos para exportar.")
         return
      }
      let contenido = "CIDTESI,CNOMALU,DINICIO,CDESEST\n"
      laFiltrados.value.forEach(laItem => {
         contenido += `${laItem.CIDTESI},"${laItem.CNOMALU}",${laItem.DINICIO},${laItem.CDESEST}\n`
      })
      const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'reporte_unidad.csv'
      link.click()

      URL.revokeObjectURL(url)
   }
   */
</script>

<style>
   .spinner {
      display:inline-block;
      width:16px;
      height:16px;
      border:3px solid #ccc;
      border-top:3px solid #010B6F;
      border-radius:50%;
      animation: spin 1s linear infinite;
   }

   @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
   }

   .input-error {
      border:2px solid red !important;
   }
</style>
