<script lang="ts">
  import { ReCaptcha } from "$lib";
  let SITE_KEY: string = "6LcATQkrAAAAAIBluic6wsTssdaLLgrdrBNAAgeQ";
  let Captcha: ReCaptcha;

  let formData = {
    token: '',
    name: 'world'
  }

  let message = "";
  let loading = false;

  async function sendEmail(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formObject = Object.fromEntries(formData);
    formData.token = Captcha.getRecaptchaResponse();

    if (formData.token.length === 0) {
      return;
    }

    loading = true;

    try {
      const response = await fetch('/mail', {
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
    } catch (error) {
      message = "Error: " + error;
      console.log(error);
    } finally {
      loading = false;
    }
  }
</script>

<div class="hero bg-base-200 min-h-screen">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Hablanos pai!</h1>
      <p class="py-6">
        Este es un formulario para enviar correos
      </p>
    </div>
    <form on:submit={sendEmail}>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div class="card-body">
          <fieldset class="fieldset">
            <label class="fieldset-label">Email</label>
            <input type="email" class="input" name="from" placeholder="Email" />
            <label class="fieldset-label">Asunto</label>
            <input name="subject" class="input" placeholder="Password" />
            <label class="fieldset-label">Comentario</label>
            <textarea class="textarea" placeholder="Comentario" />
            <ReCaptcha bind:this={Captcha} {SITE_KEY} captchaStyle={{theme: 'dark', size: 'compact'}} />

            <!-- Indicador de carga -->
            {#if loading}
              <span class="loading loading-dots loading-lg"></span>
            {/if}

            <button class="btn btn-neutral mt-4" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </fieldset>
        </div>
      </div>
    </form>
  </div>
</div>
