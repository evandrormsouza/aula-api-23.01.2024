async function getSeries() {
    const url = "https://json-server-vercel-g648.vercel.app/series"

    const response = await fetch(url)
    console.log(response);

    const dados = await response.json()
    console.log(dados);

    const listaSeries = document.getElementById('listaSeries')

    dados.forEach(series => {

        const tr = document.createElement('tr');
        const div = document.createElement('div')

        //criar as células da nossa tabela
        const tdNomeSerie = document.createElement("td")
        tdNomeSerie.textContent = series.nomeSerie

        const tdNumTemp = document.createElement('td')
        tdNumTemp.textContent = series.temporadas

        const tdAnoLancamento = document.createElement('td')
        tdAnoLancamento.textContent = series.anoLancamento

        const tdProdutora = document.createElement('td')
        tdProdutora.textContent = series.produtora

        const tdEdit = document.createElement('img')
        tdEdit.src = './assets/icons/mdi_pencil.svg'

        tdEdit.addEventListener('click', () => {

            const id = series.id;

            document.getElementById('nomeSerie').value = series.nomeSerie
            document.getElementById('temporadas').value = series.temporadas
            document.getElementById('produtora').value = series.produtora
            document.getElementById('anoLancamento').value = series.anoLancamento

            document.getElementById('title-form').textContent = 'Atualizar Série'
            document.getElementById('btnCadastrar').textContent = 'Atualizar'

            if (window.confirm("Você deseja realizar uma alteração na série? ")) {
                //chamar a nossa API

                btnCadastro.

                btnCadastro.addEventListener('click', atualizarSerie);

                async function atualizarSerie() {
                    try {
                        const dadosEnviadosAtualizar = {
                            "id": null,
                            "nomeSerie": document.getElementById('nomeSerie').value,
                            "temporadas": document.getElementById('temporadas').value,
                            "produtora": document.getElementById('produtora').value,
                            "anoLancamento": document.getElementById('anoLancamento').value
                        }

                        const retorno = await fetch(`${url}/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dadosEnviadosAtualizar)
                        })

                        if (retorno.ok) {
                            alert("Série foi atualizada com sucesso!")
                        }else{
                            console.log(`Não foi possível atualizar a série ${retorno.status}`);
                        }

                        location.reload()
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        })

        const tdDelete = document.createElement('img')
        tdDelete.src = './assets/icons/mdi_trash.svg'

        tdDelete.addEventListener('click', async () => {
            //variavel para receber o id da serie

            const id = series.id

            if (window.confirm(`Você deseja mesmo remover a série: ${series.nomeSerie}`)) {
                //chamar a nossa API
                try {
                    const retorno = await fetch(`${url}/${id}`, {
                        method: 'DELETE'
                    })

                    if (retorno.ok) {
                        alert("A série foi removida com sucesso!")
                    }

                    location.reload()
                } catch (error) {
                    console.log(`deu ruim na requisição ${error}`);
                }
            }
        });


        //adicionando o nosso td dentro do nosso tr 
        tr.appendChild(tdNomeSerie)
        tr.appendChild(tdNumTemp)
        tr.appendChild(tdAnoLancamento)
        tr.appendChild(tdProdutora)
        tr.appendChild(div)
        div.appendChild(tdEdit)
        div.appendChild(tdDelete)

        listaSeries.appendChild(tr)
    });
}

getSeries()