const { select, input } = require('@inquirer/prompts')

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
                console.log("Listando...")
                break
            case "sair":
                console.log("Saindo...")
                return
        }

    }

}

start()