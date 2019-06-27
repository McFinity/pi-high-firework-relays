export const now = () => Date.now()
export const loop = (action = () => null, delayMillis, isExecuting) => {
    setTimeout(() => {
        if (isExecuting) {
            action()
            loop()
        }
    }, delayMillis)
}