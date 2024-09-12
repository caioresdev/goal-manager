const { select, input, checkbox } = require('@inquirer/prompts')

let mensagem = "Bem vindo!"

let meta = { value: "Beba água", checked: false }

let metas = [ meta ]

const adicionarMeta = async () => {

    const meta = await input({ message: "Digite a meta:" })

    if ( meta.length == 0 ) {

        mensagem = "A Meta deve ter pelo menos 1 caracter.."
        return

    }

    metas.push(
        { value: meta, checked: false }
    )

    mensagem = "Meta adicionada com sucesso!"

}

const listarMetas = async () => {

    const respostas = await checkbox({
        message: "Use as SETAS para selecionar as metas e o ESPAÇO para marcar",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {

        m.checked = false

    })

    if ( respostas.length == 0 ) {

        mensagem = "Nenhuma meta selecionada"
        return

    }

    respostas.forEach((resposta) => {

        const meta = metas.find(( m ) => {

            return m.value == resposta

        })

        meta.checked = true

    })

    mensagem = "Meta(s) concluída(s):"

}

const metasRealizadas = async () => {

    const realizadas = metas.filter((meta) => {

        return meta.checked

    })

    if ( realizadas.length == 0 ) {

        mensagem = "Nenhuma meta realizada"
        return

    }

    await select({
        message: "Metas Realizadas" + " " + "=" + " " +realizadas.length,
        choices: [...realizadas]
    })

}

const metasNaoRealizadas = async () => {

    const naoRealizadas = metas.filter((meta) => {

        return !meta.checked

    })

    if ( naoRealizadas.length == 0 ) {

        mensagem = "Nenhuma meta não realizada:"
        return

    }

    await select({
        message: "Metas Não Realizadas",
        choices: [...naoRealizadas]
    })

}

const deletarMetas = async () => {

    const metasDesmarcadas = metas.map((meta) => {

        return { value: meta.value, checked: false }

    })

    const itensparaDeletar = await checkbox({

        message: "Selecione os itens que deseja deletar",
        choices: [...metasDesmarcadas],
        instructions: false

    })

    if ( itensparaDeletar.length == 0 ) {

        mensagem = "Nenhum item selecionado"
        return

    }

    itensparaDeletar.forEach(( item ) => {
    
        meta.filter(( meta ) => {

            return meta.value != item

        })
    })

}

const mostrarMensagem = () => {

    console.clear();

    if ( mensagem != "" ) {

        console.log(mensagem)
        console.log("")
        mensagem = ""

    }

}

const start = async () => {

    while(true) {

        mostrarMensagem()

        const opcao = await select({

            message: "Menu >",
            choices: [
                {
                    name: "Inserir Meta",
                    value: "adicionar"
                },
                {
                    name: "Listar Metas",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Não Realizadas",
                    value: "naoRealizadas"
                },
                {
                    name: "Deletar Metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao) {
            case "adicionar":
                await adicionarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "naoRealizadas":
                await metasNaoRealizadas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Saindo...")
                return
        }

    }

}

start()