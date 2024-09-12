const { select } = require('@inquirer/prompts')

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
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao) {
            case "adicionar":
                console.log("Adicionando meta...")
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