function validarParametros() {
    const verificaNomeSerie = document.getElementById('nomeSerie').value != "";
    const verificaTemporada = document.getElementById('temporadas').value != "";
    const verificaAnoLancamento = document.getElementById('anoLancamento').value != "";
    const verificaProdutora = document.getElementById('produtora').value != "";

    const botaoCadastroValidar = document.getElementById('btnCadastro')

    if (verificaNomeSerie || verificaTemporada || verificaAnoLancamento || verificaProdutora) {
        botaoCadastroValidar.removeAttribute('disabled')
    } else {
        alert("Todos os campos devem estar preenchidos!")
        botaoCadastroValidar.setAttribute('disabled', '')
    }
};

document.addEventListener('input', () => {
    validarParametros();
});

document.getElementById('btnCadastro').addEventListener('click', async (e) => {
    e.preventDefault(); // Movido para dentro do evento de clique

    const url = "https://json-server-vercel-brown.vercel.app/series";

    const dadosEnviados = {
        "id": null,
        "nomeSerie": document.getElementById('nomeSerie').value,
        "temporadas": document.getElementById('temporadas').value,
        "anoLancamento": document.getElementById('anoLancamento').value,
        "produtora": document.getElementById('produtora').value
    };

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosEnviados)
        });

        const resposta = await fetch(url);
        if (resposta.ok) {
            alert('Série cadastrada com sucesso!');
        }

        //remover o evento de clique após o cadastro!
        documento.getElementById('btnCadastrar').removeEventListener('click', arguments.calle);
        //se faz referência para a própria função!

        location.reload()

    } catch (error)
        // Atualizando a lista de séries
        getSeries();

        //atualizando a página
        location.reload()
    } catch (error) {
        console.log(error);
    }
});