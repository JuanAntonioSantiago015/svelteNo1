<script lang="ts">
    export let data: { datos: Array <{ codigo: string, nombre: string }> };

    $: console.log('Datos en la vista: ', data?.datos);
</script>
<div class="hero bg-base-200 min-h-screen">
  <div class="hero-content text-center">
    <div class="max-w-md">

    {#if data }

      <h1 class="text-5xl font-bold">{data.datos.nombre}</h1>
      <p class="py-6">
                    {data.datos.codigo}
      </p>
    {/if}
    </div>
  </div>
</div>
