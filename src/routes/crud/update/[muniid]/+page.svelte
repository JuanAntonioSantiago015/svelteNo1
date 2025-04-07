<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { get } from 'svelte/store';
    import Input from '$lib/components/Input.svelte';

    function handleInput(event) {
        const {id, value } = value.target;
        formData = { ...formData, [id]: value }
        console.log(formData)
    }
    export let data;
    let estado = data?.estado || '';
    let nombre = data?.nombre || '';
    let cod_usuario = data?.codigo_usuario || '';
    let cod_departamento = data?.cod_departamento || '';
    let updated_at = data?.updated_at || '';

    async function actualizarMunicipio () {
        const muniid = get(page).params.muniid;

        const res = await fetch('update/${muniid}', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ estado, nombre, cod_usuario, cod_departamento, updated_at })
            })
            const response = await res.json()

            if (response.success) {
                setTimeout(() => goto('/read/'), 1500)
            } else {
                mensaje = 'Error ' + response.error;
            }
        }

</script>

<form on:submit={actualizarMunicipio}>
    <Input
        label = "estado"
        type = "number"
        defaultValue = estado
        onInput = {handleInput}
        id= "estado"
        />
    <Input
        label = "nombre"
        type = "text"
        defaultValue = nombre
        onInput = {handleInput}
        id = "nombre"
        />
    <Input
        label = "Codigo de usuario"
        type = "number"
        defaultValue = cod_usuario
        onInput = {handleInput}
        id = "cod_usuario"
        />



</form>
