<script lang="ts">
    export let data: { datos: Array<{ codigo: string, nombre: string }> };
    console.log(data);
    // Accede a datos a través de data.datos
    $: console.log('Datos en vista:', data?.datos);
</script>

<main>
    <h1>Datos de la Base de datos:</h1>

    {#if !data || !data.datos}
        <p>No hay datos disponibles</p>
    {:else}

                <ul class="list bg-base-100 rounded-box shadow-md">
  <li class="list-row">
    <div class="text-4xl font-thin opacity-30 tabular-nums">{data.datos.codigo}</div>
    <div class="list-col-grow">
      <div>{data.datos.nombre}</div>
    </div>
  </li>
    </ul>
            {#each data.datos as muni}
                <ul class="list bg-base-100 rounded-box shadow-md">

  <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>

  <li class="list-row">
    <div class="text-4xl font-thin opacity-30 tabular-nums">01</div>
    <div class="list-col-grow">
      <div>Dio Lupa</div>
      <div class="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
    </div>
  </li>
    </ul>
            {/each}
            {#each data.datos as item (item.codigo)}
                <li>{item.codigo}: {item.nombre}</li>
            {/each}
    {/if}
</main>
