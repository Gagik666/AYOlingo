const moduleRepo = (moduleService) => {
    const createModule = (input) => moduleService.createModule(input)

    const updateModule = (input) => moduleService.updateModule(input)

    const deleteModule = (input) => moduleService.deleteModule(input)

    const listModules = (variables) => moduleService.listModules(variables)

    const searchModules = (variables) => moduleService.searchModules(variables)

    const getModule = (id) => moduleService.getModule(id)

    return {
        createModule,
        updateModule,
        deleteModule,
        getModule,
        listModules,
        searchModules,
    }
}

export default moduleRepo
