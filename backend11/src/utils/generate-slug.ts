const translit = (str: string): string => {
    const ru =
    'А-а-Б-б-В-в-Г-г-Д-д-Е-е-Ё-ё-Э-э-Ж-ж-З-з-И-и-Й-й-К-к-Л-л-М-м-Н-н_О-о-П-п-Р-р-С-с-Т-т_У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы_Ю-ю-Я-я'.split('-')
    const en = 
    'A-a-B-b-V-v-G-g-D-d-E-e-E-e-E-e-Zh-zh-Z-z-I-i-I-i-K-k-L-l-M-m-N-n_O-o-P-p-R-r-S-s-T-t_U-u-F-f-H-h-C-c-CH-ch-SH-sh-SCH-sch-Y-y'.split('-')
    let res = ''
    for (let i = 0, l =str.length; i<l;i++){
        const s = str.charAt(i)
            const n = ru.indexOf(s)
        if (n>=0) {
            res+= en[n]
        } else {
            res+=s
        }
    }
    return res
}
export const generateSlug = (str:string): string => {
    let url: string = str.replace(/[\s]+/gi, '-')
    url = translit(url)
    url=url
        .replace(/[^0-9a-z_\-.]+/g, '')
        .replace('---','-')
        .replace('--','-')
        .toLowerCase()
    return url
}