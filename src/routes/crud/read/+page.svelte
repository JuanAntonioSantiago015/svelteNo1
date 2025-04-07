<script>
import { onMount } from 'svelte';
let municipios = [];

onMount(async() => {
    try {
        const res = await fetch('read');
        const data = await res.json();

        if (res.ok) {
            municipios = data
        }
        else {
            console.error('Error ', data)
        }
    }
    catch(err) {
        console.log(err)
    }

    console.log(municipios)
})
</script>


<ul class="list bg-base-100 rounded-box shadow-md">
{#each municipios as municipio}

  <li class="list-row">
    <div class="text-4xl font-thin opacity-30 tabular-nums">{municipio.codigo}</div>
    <div class="list-col-grow">
      <div>{municipio.nombre}</div>
    </div>
    <a class="btn btn-warning" href="/crud/update/${municipio.codigo}">Editar</a>
  </li>
    {/each}
</ul>
