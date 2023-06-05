export default function getModulePercent (progress, module) {
    if (!progress?.modules[module.id]?.progress) return '0%'
    if (progress?.modules[module.id].progress === 100 && progress.modules[module.id]?.regression?.points) return `${progress.modules[module.id].progress - progress.modules[module.id].regression.points}%`
    return `${progress?.modules[module.id].progress}%`
}