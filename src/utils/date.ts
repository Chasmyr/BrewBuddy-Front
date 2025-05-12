export const formattedDate = (date: string) => {
    const dateToTransform = new Date(date)
    return dateToTransform.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })
}