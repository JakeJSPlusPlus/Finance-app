

export function dateLongToStandard(date: number){
    return new Intl.DateTimeFormat("en-US", {dateStyle: "long"}).format(date).toString()
}