<script>
    export let value = ""
    export let placeholder = ""
    export let type = ""
    export let onInput = ""
    export let id = ""
    export let label = ""
</script>

<fieldset class="fieldset">
<label calss="fieldset-label">{label}</label>
<input class="input"
    type = {type}
    placeholder = {placeholder}
    bind:value
    on:input = {onInput}
    name = {id}
    id = {id}
/>
</fieldset>
