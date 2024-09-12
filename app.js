const { select, input, checkbox } = require('@inquirer/prompts')

let meta = { value: "Beba água", concluido: false }

let metas = [ meta ]

const adicionarMeta = async () => {

    const meta = await input({ message: "Digite a meta:" })

    if ( meta.length == 0 ) {

        console.log("A Meta deve ter pelo menos 1 caracter..")
        return

    }

    metas.push(
        { value: meta, concluido: false }
    )

}

const listarMetas = async () => {

    const respostas = await checkbox({
        message: "Use as SETAS para selecionar as metas e o ESPAÇO para marcar",
        choices: [...metas],
        instructions: false
    })

    if ( respostas.length == 0 ) {

        console.log("Nenhuma meta selecionada")
        return

    }

    metas.forEach((m) => {

        me.checked = false

    })


    respostas.forEach((resposta) => {

        const meta = metas.find(( m ) => {

            return m.value == resposta

        })

        meta.checked = true

    })

    console.log("Meta(s) concluída(s):")

}

const start = async () => {

    while(true) {

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
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao) {
            case "adicionar":
                await adicionarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "sair":
                console.log("Saindo...")
                return
        }

    }

}

start()