<script lang='ts'>
// import { pool } from '$lib/db/maria';
import Input from '$lib/components/Input.svelte';
let name = "";
let loading = false;

let formData = {
    codigo: '',
    estado: '',
    nombre: '',
    cod_usuario: '',
    cod_departamento: ''
};

function handleInput(event) {
    const { id, value } = event.target;
    formData = { ...formData, [id]: value }
    console.log(formData);
}

async function create(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formObject = Object.fromEntries(formData);

    loading = true;

    try {
        const response = await fetch('create', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formObject)
        });
      const data = await response.json();
      if (data.success) {
        alert("Enviado");
        (event.target as HTMLFormElement).reset();
      }
      message = data.success ? "Correo enviado" : data.error;

    }
    catch(error) {
        // message = "Error: " + error;
    }finally {
        loading = false;
    }
}
</script>




    <form on:submit={create}>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div class="card-body">
          <fieldset class="fieldset">
            <Input
    label = "Codigo"
    value = {name}
    type = "number"
    placeholder = "Escriba el codigo"
    onInput = {handleInput}
    id = "codigo"
/>
            <Input
                label = "estado"
                type = "number"
                placeholder = "Escriba un codigo"
                onInput = {handleInput}
                id = "estado"
                />

                <Input
                    label = "nombre"
                    type = "text"
                    placeholder = "Escriba el nombre del municipio"
                    onInput = {handleInput}
                    id = "nombre"
                />

                <Input
                    label = "Codigo de usuario"
                    type = "number"
                    placeholder = "Ingrese el codigo de usuario"
                    onInput = {handleInput}
                    id = "cod_usuario"
                />

                <Input
                    label = "Codigo de departamento"
                    type = "number"
                    placeholder = "Ingrese el codigo del departamento"
                    onInput = {handleInput}
                    id = "cod_departamento"
                />
            <!-- Indicador de carga -->
            {#if loading}
              <span class="loading loading-dots loading-lg"></span>
            {/if}

            <button class="btn btn-neutral mt-4" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </button>
      </div>
    </form>
