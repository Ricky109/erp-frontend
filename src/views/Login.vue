<template>
  <div>

    <!-- 🔵 Barra superior -->
    <div style="
      width: 100%;
      height: 5vh;
      background-color: #010B6F;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      box-sizing: border-box;
    ">
      <span style="font-weight: bold;">
  ERP - 
  <span style="font-style: italic; color: gold;">
    UNIVERSITARIO
  </span>
</span>

      <span style="font-size: 18px; cursor: pointer;">
        🏠
      </span>
    </div>

    <!-- 🧾 Contenedor principal -->
    <div style="
      height: 95vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f4f6fb;
    ">

      <!-- 📦 Ventana Login -->
<div style="
  width: 350px;
  padding: 30px;
  background: white;
  border-radius: 10px;
  border: 2px solid #010B6F;
  box-sizing: border-box;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.25),
    0 3px 6px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255,255,255,0.6);
  transform: perspective(1000px) translateY(-5px);
  transition: all 0.3s ease;
">


        <h3 style="text-align:center; margin-bottom: 20px;">
          Iniciar Sesión
        </h3>

        <!-- Código -->
        <div style="margin-bottom: 15px;">
          <label style="font-weight: bold;">Código</label>
<input
  v-model="codigo"
  type="text"
  autofocus
  style="
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    background-color: #fffbe6;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
  "
/>
        </div>

        <!-- Clave -->
        <div style="margin-bottom: 20px;">
          <label style="font-weight: bold;">Clave</label>
          <input
            v-model="clave"
            type="password"
            style="
              width: 100%;
              padding: 6px;
              margin-top: 5px;
    background-color: #fffbe6;
              border: 1px solid #ccc;
              box-sizing: border-box;
            "
          />
        </div>

        <!-- Botón -->
<Boton3D texto="INICIAR" color="azul" @click="f_Login" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Boton3D from '../components/Boton3D.vue'
import { ref } from 'vue'

const codigo = ref('')
const clave = ref('')

const router = useRouter()

async function f_Login() {
   if (!codigo.value || !clave.value) {
      alert('Ingrese código y clave');
      return;
   }
   try {
      const response = await fetch('http://localhost:3000/', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            CNRODNI: codigo.value,
            CCLAVE: clave.value,
            ID: 'LOGINERP'
         })
      })
      if (!response.ok) {
         throw new Error('Error en credenciales');
      }
      let data = await response.json();
      console.log(data);
      sessionStorage.setItem('GCNOMBRE', data.CNOMBRE);
      sessionStorage.setItem('GCCODUSU', data.CCODUSU);
      router.push({ name: 'Mnu1000' })
   } catch (error) {
      alert('Login incorrecto')
   }
}   
</script>